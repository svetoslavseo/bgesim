import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

// Load plans data for SSR
let plansData = null;
const loadPlansData = () => {
  try {
    const plansPath = path.resolve(__dirname, 'dist/client/plans.json');
    if (fs.existsSync(plansPath)) {
      const data = fs.readFileSync(plansPath, 'utf-8');
      plansData = JSON.parse(data);
      console.log('✅ Loaded plans data for SSR');
    } else {
      console.log('⚠️ plans.json not found, will load dynamically');
    }
  } catch (error) {
    console.error('Failed to load plans data for SSR:', error);
  }
};

// Load plans data on startup (non-blocking)
setTimeout(loadPlansData, 100);

async function createServer() {
  const app = express();

  // Add security headers middleware
  app.use((req, res, next) => {
    // HSTS (HTTP Strict Transport Security)
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Content Security Policy
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: https://picsum.photos; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';");
    
    // X-Content-Type-Options
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // X-Frame-Options
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    
    // Referrer Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Additional security headers
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    next();
  });

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

  // Add headers specifically for plans JavaScript files in assets directory to prevent indexing
  app.use('/assets/plans*.js', (req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    next();
  });



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

  // Custom redirects for old URLs
  app.use((req, res, next) => {
    const url = req.url;
    
    const redirectMap = {
      '/esim-thailand/': '/asia/thailand',
      '/turcia/': '/europe/turkey',
      '/blog/rouming-v-syrbia-ceni-paketi-esim-alternativi/': '/articles/roaming-v-sarbia-pualno-rakovodstvo',
      '/blog/esim-ili-sim-karta/': '/articles/esim-ili-sim-karta-koja-e-po-podhodascha',
      '/blog/kakvo-e-eid-nomer/': '/articles/kakvo-e-eid-nomer-kak-da-go-odkrijete',
      '/blog/': '/articles',
      '/proverka-na-syvmestimost-s-esim/': '/esim-compatibility',
      '/esim-za-usa/': '/north-america/united-states',
      '/contacts/': '/about-us',
      '/esim-velikobritania/': '/europe/united-kingdom',
      '/esim-dubai/': '/asia/united-arab-emirates',
      '/calculator-za-izpolzvani-mobilni-danni/': '/data-usage-calculator',
      '/blog/kakvo-e-esim/': '/what-is-esim',
      '/esim-serbia/': '/europe/serbia',
      '/blog/syvmestimi-telefoni-s-esim/': '/esim-compatibility',
      '/v-andreev/': '/author/vasil-andreev'
    };
    
    if (redirectMap[url]) {
      res.redirect(301, redirectMap[url]);
      return;
    }
    
    next();
  });

  // Redirect URLs with trailing slashes to non-trailing slash versions
  app.use((req, res, next) => {
    const url = req.url;
    
    // Only redirect if:
    // 1. URL ends with a trailing slash
    // 2. URL is not just the root path "/"
    // 3. URL doesn't contain query parameters or fragments that might be important
    if (url.length > 1 && url.endsWith('/') && !url.includes('?') && !url.includes('#')) {
      // Remove trailing slash and redirect
      const newUrl = url.slice(0, -1);
      
      // Use 301 redirect for SEO benefits (permanent redirect)
      res.redirect(301, newUrl);
      return;
    }
    
    next();
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

      // Make plans data available globally for SSR
      if (plansData) {
        globalThis.plansData = plansData;
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

      // Inject preloaded data for client-side hydration
      if (plansData) {
        const preloadedDataScript = `
          <script>
            window.__PRELOADED_PLANS__ = ${JSON.stringify(plansData)};
          </script>
        `;
        html = html.replace('</head>', `${preloadedDataScript}</head>`);
      }

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
            html = beforeHead + helmetHtml + '\n' + afterHead;
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
  const port = process.env.PORT || 8080; // Use 8080 as default for production
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

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    server.close(() => {
      console.log('Server closed due to uncaught exception');
      process.exit(1);
    });
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    server.close(() => {
      console.log('Server closed due to unhandled rejection');
      process.exit(1);
    });
  });
}); 