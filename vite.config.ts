import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// Plugin to copy JSON data files to dist and public
function copyDataFiles() {
  return {
    name: 'copy-data-files',
    writeBundle() {
      // Ensure dist/client directory exists
      const distClientPath = 'dist/client';
      if (!fs.existsSync(distClientPath)) {
        fs.mkdirSync(distClientPath, { recursive: true });
      }
      
      // Ensure dist/client/data directory exists
      const distDataPath = 'dist/client/data';
      if (!fs.existsSync(distDataPath)) {
        fs.mkdirSync(distDataPath, { recursive: true });
      }
      
      // Ensure public/data directory exists
      const publicDataPath = 'public/data';
      if (!fs.existsSync(publicDataPath)) {
        fs.mkdirSync(publicDataPath, { recursive: true });
      }
      
      // Copy plans.json to dist/client
      if (fs.existsSync('plans.json')) {
        fs.copyFileSync('plans.json', 'dist/client/plans.json');
        console.log('✅ Copied plans.json to dist/client/');
      } else {
        console.warn('⚠️ plans.json not found in root directory');
      }

      // Copy Saily data so it is accessible on client and SSR
      if (fs.existsSync('saily_plans.json')) {
        fs.copyFileSync('saily_plans.json', 'dist/client/saily_plans.json');
        fs.copyFileSync('saily_plans.json', 'public/saily_plans.json');
        console.log('✅ Copied saily_plans.json to dist/client/ and public/');
      } else {
        console.warn('⚠️ saily_plans.json not found in root directory');
      }
      if (fs.existsSync('saily_metadata.json')) {
        fs.copyFileSync('saily_metadata.json', 'dist/client/saily_metadata.json');
        fs.copyFileSync('saily_metadata.json', 'public/saily_metadata.json');
        console.log('✅ Copied saily_metadata.json to dist/client/ and public/');
      }
      
      // Copy where-now-nomad.png to dist for proper serving
      if (fs.existsSync('public/where-now-nomad.png')) {
        fs.copyFileSync('public/where-now-nomad.png', 'dist/where-now-nomad.png');
        console.log('✅ Copied where-now-nomad.png to dist/');
      } else {
        console.warn('⚠️ where-now-nomad.png not found in public/ directory');
      }
      
      // Copy where-now-nomad.png to dist/esim-data for proper serving
      if (fs.existsSync('public/esim-data/where-now-nomad.png')) {
        fs.copyFileSync('public/esim-data/where-now-nomad.png', 'dist/esim-data/where-now-nomad.png');
        console.log('✅ Copied where-now-nomad.png to dist/esim-data/');
      } else {
        console.warn('⚠️ where-now-nomad.png not found in public/esim-data/ directory');
      }
      
      // Copy locales folder to dist/client for SSR translation loading
      const copyDirectory = (src: string, dest: string) => {
        if (fs.existsSync(src)) {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }
          const entries = fs.readdirSync(src, { withFileTypes: true });
          for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            if (entry.isDirectory()) {
              copyDirectory(srcPath, destPath);
            } else {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        }
      };
      
      copyDirectory('public/locales', 'dist/client/locales');
      console.log('✅ Copied locales folder to dist/client/');
      
      // Copy data files from src/data to both dist/client/data and public/data
      const dataFiles = ['global-speed-test.json', 'opensignaldata.json'];
      
      // Also copy language-specific data files from public/data if they exist
      const publicDataFiles = ['opensignaldata-en.json', 'global-speed-test-en.json'];
      publicDataFiles.forEach(file => {
        const srcPath = `public/data/${file}`;
        const distDestPath = `dist/client/data/${file}`;
        
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, distDestPath);
          console.log(`✅ Copied ${file} to dist/client/data/`);
        }
      });
      dataFiles.forEach(file => {
        const srcPath = `src/data/${file}`;
        const distDestPath = `dist/client/data/${file}`;
        const publicDestPath = `public/data/${file}`;
        
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, distDestPath);
          fs.copyFileSync(srcPath, publicDestPath);
          console.log(`✅ Copied ${file} to dist/client/data/ and public/data/`);
        } else {
          console.warn(`⚠️ ${file} not found in src/data/`);
        }
      });
    }
  };
}

export default defineConfig((envConfig: any) => {
    const { mode } = envConfig;
    // Vite passes `ssrBuild` flag when building with `--ssr`. Use it to detect SSR build mode correctly.
    const isSsr = envConfig?.ssrBuild === true;
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react(), copyDataFiles()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.NODE_ENV': JSON.stringify(mode),
        'VITE_IMAGES_PATH': JSON.stringify('./esim-data'),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Ensure ES modules for better tree-shaking
        target: 'esnext',
        minify: mode === 'production' ? 'esbuild' : false,
        sourcemap: mode !== 'production',
        rollupOptions: {
          output: {
            format: 'es',
            ...(isSsr ? {
              // For SSR bundle, use stable file names so server-production.js can import it.
              entryFileNames: '[name].js',
              chunkFileNames: '[name].js',
              assetFileNames: '[name][extname]'
            } : {
              // Client bundle: Enhanced code-splitting for better performance
              manualChunks: (id) => {
                // Core vendor libraries
                if (id.includes('node_modules')) {
                  // React core
                  if (id.includes('react') && !id.includes('react-icons') && !id.includes('react-i18next') && !id.includes('react-world-flags')) {
                    return 'react-vendor';
                  }
                  // Icons library (large)
                  if (id.includes('react-icons')) {
                    return 'icons';
                  }
                  // i18n libraries
                  if (id.includes('i18next') || id.includes('react-i18next')) {
                    return 'i18n';
                  }
                  // Material UI
                  if (id.includes('@mui') || id.includes('@emotion')) {
                    return 'mui';
                  }
                  // Helmet for SEO
                  if (id.includes('react-helmet')) {
                    return 'meta';
                  }
                  // Other vendor libraries
                  return 'vendor';
                }
                
                // Application code splitting
                if (id.includes('pages/CountryPage')) {
                  return 'country-page';
                }
                if (id.includes('pages/RegionPage')) {
                  return 'region-page';
                }
                if (id.includes('pages/HomePage')) {
                  return 'home-page';
                }
                if (id.includes('pages/checkout')) {
                  return 'checkout';
                }
                // Article pages
                if (id.includes('pages/articles')) {
                  return 'articles';
                }
                // Help center pages
                if (id.includes('pages/HelpCenter') || id.includes('pages/PlansAndPayments')) {
                  return 'help-center';
                }
                // Utility pages
                if (id.includes('pages/') && (
                  id.includes('TermsAndConditions') || 
                  id.includes('PrivacyPolicy') || 
                  id.includes('RefundPolicy') || 
                  id.includes('AboutUs')
                )) {
                  return 'legal-pages';
                }
                // Components
                if (id.includes('components/')) {
                  // Large components get their own chunks
                  if (id.includes('PlanSelector') || id.includes('CountryPlansGrid') || id.includes('RegionPlansGrid')) {
                    return 'plan-components';
                  }
                  if (id.includes('TestimonialsCarousel') || id.includes('CustomerSatisfaction')) {
                    return 'testimonials';
                  }
                  if (id.includes('DeviceCompatibilityModal') || id.includes('ESIMCompatibility')) {
                    return 'compatibility';
                  }
                  // Other components
                  return 'components';
                }
                // Utils and data service
                if (id.includes('utils/dataService')) {
                  return 'data-service';
                }
                if (id.includes('utils/')) {
                  return 'utils';
                }
                // Constants (could be large with all countries)
                if (id.includes('constants')) {
                  return 'constants';
                }
              }
            }),
            // Optimize asset names for better caching
            assetFileNames: (assetInfo) => {
              const info = assetInfo.name?.split('.') || [];
              const ext = info[info.length - 1];
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                return `assets/images/[name]-[hash][extname]`;
              }
              if (/css/i.test(ext)) {
                return `assets/css/[name]-[hash][extname]`;
              }
              return `assets/[name]-[hash][extname]`;
            },
            chunkFileNames: isSsr ? '[name].js' : 'assets/js/[name]-[hash].js',
            entryFileNames: isSsr ? '[name].js' : 'assets/js/[name]-[hash].js'
          },
          // Prevent large chunks
          maxParallelFileOps: 5,
        },
        // Optimize chunk size for better loading
        chunkSizeWarningLimit: 500,
        // Enable CSS code splitting
        cssCodeSplit: true,
        // Optimize deps
        commonjsOptions: {
          transformMixedEsModules: true
        }
      },
      ssr: {
        // React and related libraries are CommonJS; keep them external so Node can load them at runtime.
        external: ['react', 'react-dom'],
        noExternal: ['react-helmet-async']
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'react-helmet-async', 'react-i18next', 'i18next'],
        exclude: ['react-world-flags']
      }
    };
});
