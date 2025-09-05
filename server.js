import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

async function createServer() {
  const app = express();

  let vite;
  if (!isProduction) {
    // In development, use Vite's dev server
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static assets
    app.use(express.static(path.resolve(__dirname, 'dist/client')));
  }

  // Serve JSON files with correct content type
  app.get('*.json', (req, res) => {
    const filePath = path.resolve(__dirname, 'dist/client', req.path.substring(1));
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'application/json');
      res.sendFile(filePath);
    } else {
      res.status(404).end();
    }
  });

  // Serve locales files specifically
  app.get('/locales/*', (req, res) => {
    const filePath = path.resolve(__dirname, 'dist/client', req.path.substring(1));
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.sendFile(filePath);
    } else {
      res.status(404).end();
    }
  });

  // Handle all routes with SSR
  app.get('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      let template;
      let render;

      if (!isProduction) {
        // Development: load files from Vite
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const module = await vite.ssrLoadModule('/src/entry-server.js');
        render = module.render;
      } else {
        // Production: load pre-built files
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
        try {
          console.log('📦 Loading production entry-server module...');
          const module = await import('./dist/server/entry-server.js');
          render = module.render;
          console.log('✅ Production entry-server loaded successfully');
        } catch (importError) {
          console.error('❌ Failed to load production entry-server:', importError);
          throw new Error(`Failed to load SSR module: ${importError.message}`);
        }
      }

      // Make plans data available globally for SSR (development convenience)
      try {
        const devPlansPathCandidates = [
          path.resolve(__dirname, 'plans.json'),
          path.resolve(__dirname, 'public/plans.json'),
          path.resolve(__dirname, 'dist/client/plans.json')
        ];
        let devPlansPath = null;
        for (const p of devPlansPathCandidates) {
          if (fs.existsSync(p)) { devPlansPath = p; break; }
        }
        if (devPlansPath) {
          const plansRaw = fs.readFileSync(devPlansPath, 'utf-8');
          const plansJson = JSON.parse(plansRaw);
          globalThis.plansData = plansJson;
        }
      } catch (e) {
        // Non-fatal in dev
        console.warn('Dev SSR: could not preload plans.json for SSR:', e?.message || e);
      }

      // Render the app
      let appHtml, helmet;
      try {
        console.log(`🎨 Starting render for URL: ${url}`);
        const renderResult = await render(url);
        appHtml = renderResult.appHtml;
        helmet = renderResult.helmet;
        console.log(`✅ Render completed. HTML length: ${appHtml ? appHtml.length : 0}`);
      } catch (renderError) {
        console.error('❌ Render function failed:', renderError);
        appHtml = '<div style="display:none;">Error loading page</div>';
        helmet = null;
      }

      // Replace the placeholder with rendered content
      let html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // Handle helmet metadata injection
      if (helmet) {
        // Extract helmet content
        const helmetTitle = helmet.title?.toString() || '';
        const helmetMeta = helmet.meta?.toString() || '';
        const helmetLink = helmet.link?.toString() || '';
        const helmetScript = helmet.script?.toString() || '';
        const helmetStyle = helmet.style?.toString() || '';
        const helmetHtmlAttributes = helmet.htmlAttributes?.toString() || '';
        
        // Handle HTML attributes (like lang)
        if (helmetHtmlAttributes) {
          // Extract lang attribute if present
          const langMatch = helmetHtmlAttributes.match(/lang="([^"]+)"/);
          if (langMatch) {
            html = html.replace(/<html lang="[^"]*"/, `<html lang="${langMatch[1]}"`);
          }
        }
        
        const helmetHtml = `
          ${helmetTitle}
          ${helmetMeta}
          ${helmetLink}
          ${helmetScript}
          ${helmetStyle}
        `.trim();

        if (helmetHtml) {
          // Remove the default title tag if helmet has a title
          if (helmetTitle) {
            html = html.replace(/<title>.*?<\/title>/, '');
          }
          
                // Inject helmet content before </head> using precise substring method
      const headEndIndex = html.indexOf('</head>');
      if (headEndIndex !== -1) {
        const beforeHead = html.substring(0, headEndIndex);
        const afterHead = html.substring(headEndIndex);
        
        // Inject initial language script for client-side hydration
        const detectedLanguage = url.startsWith('/en') ? 'en' : 'bg';
        const languageScript = `
          <script>
            window.__INITIAL_LANGUAGE__ = '${detectedLanguage}';
          </script>
        `;
        // Inject preloaded plans (if available) to ensure hydration parity
        const preloadedPlansScript = (globalThis.plansData ? `
          <script>
            window.__PRELOADED_PLANS__ = ${JSON.stringify(globalThis.plansData)};
          </script>
        ` : '');

        html = beforeHead + helmetHtml + '\n' + languageScript + preloadedPlansScript + afterHead;
      }
          
          // Remove any Helmet-generated tags that might have been rendered **inside the body**
          // while keeping the ones we just placed in <head>.
          html = html.replace(/<body([\s\S]*?)>([\s\S]*?)<\/body>/i, (_match, bodyAttrs, bodyContent) => {
            const cleanedBody = bodyContent
              .replace(/<meta[^>]*data-rh="true"[^>]*\/?>/gi, '')
              .replace(/<link[^>]*data-rh="true"[^>]*\/?>/gi, '')
              .replace(/<title[^>]*data-rh="true"[^>]*>[\s\S]*?<\/title>/gi, '');
            return `<body${bodyAttrs}>${cleanedBody}</body>`;
          });
        }
      }

      // In development, make sure global CSS is linked for SSR so styles load without waiting for JS
      if (!isProduction) {
        const headEndIdx = html.indexOf('</head>');
        if (headEndIdx !== -1 && !/href="\/index\.css"/i.test(html)) {
          const before = html.substring(0, headEndIdx);
          const after = html.substring(headEndIdx);
          html = `${before}<link rel="stylesheet" href="/index.css">${after}`;
        }
      }

      // Determine if this is a not-found page by looking for the special marker added in the React markup
      const isNotFoundPage = html.includes('data-page-404="true"');
      // Remove any stray Helmet-generated <title> that might still be present in the body (but keep the one in head)
      html = html.replace(/<body([\s\S]*?)>([\s\S]*?)<\/body>/i, (_match, bodyAttrs, bodyContent) => {
        const cleanedBody = bodyContent
          .replace(/<title[^>]*data-rh="true"[^>]*>[\s\S]*?<\/title>/gi, '');
        return `<body${bodyAttrs}>${cleanedBody}</body>`;
      });

      // Fix malformed <body class="stable<title ..."> leakage
      html = html.replace(/<body class="stable[^"]*"/i, '<body class="stable"');

      // Set appropriate cache headers for better SEO
      res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      
      // Return HTTP 410 for not-found pages while keeping 404 UI for users
      res.status(isNotFoundPage ? 410 : 200).end(html);
    } catch (e) {
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error('SSR Error:', e);
      
      // Send a lightweight visible shell allowing client hydration to recover
      res.status(500).end(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Loading…</title></head><body><div id="root">Loading…</div><script type="module" src="/index.tsx"></script></body></html>`);
    }
  });

  return app;
}

createServer().then(app => {
  const port = process.env.PORT || 3010;
  const server = app.listen(port, () => {
    console.log(`SSR Server running at http://localhost:${port} in ${isProduction ? 'production' : 'development'} mode`);
  });

  // Add graceful shutdown handling
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});
