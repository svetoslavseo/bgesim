import { render } from './src/entry-server.js';

console.log('🧪 Testing SSR translation loading...');

try {
  const result = await render('/');
  console.log('✅ SSR render completed');
  console.log('📄 HTML length:', result.appHtml.length);
  
  // Check for translation keys in the HTML
  const hasTranslationKeys = result.appHtml.includes('hero.search_placeholder') || 
                            result.appHtml.includes('step3_title') ||
                            result.appHtml.includes('why_choose_our_esims');
  
  if (hasTranslationKeys) {
    console.log('❌ Translation keys found in HTML - translations not working');
    console.log('🔍 Sample HTML content:');
    console.log(result.appHtml.substring(0, 1000));
  } else {
    console.log('✅ No translation keys found - translations working');
  }
  
} catch (error) {
  console.error('❌ SSR render failed:', error);
}
