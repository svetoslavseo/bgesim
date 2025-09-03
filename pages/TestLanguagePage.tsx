import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import i18n from '../i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';

const TestLanguagePage: React.FC = () => {
  const { t } = useTranslation(['common', 'navigation', 'home']);

  return (
    <>
      <Helmet>
        <html lang={i18n.language === 'bg' ? 'bg' : 'en'} />
        <title>Language Test - eSIM Global Connect</title>
        <meta name="description" content="Test page for language switching functionality" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {t('common.test')} - Language Switching Test
              </h1>
              <LanguageSwitcher />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Navigation Tests</h2>
                <div className="space-y-2">
                  <p><strong>Home:</strong> {t('navigation.home')}</p>
                  <p><strong>About:</strong> {t('navigation.about')}</p>
                  <p><strong>Countries:</strong> {t('navigation.countries')}</p>
                  <p><strong>FAQ:</strong> {t('navigation.faq')}</p>
                  <p><strong>Contact:</strong> {t('navigation.contact')}</p>
                  <p><strong>What is eSIM:</strong> {t('navigation.what_is_esim')}</p>
                  <p><strong>Tools:</strong> {t('navigation.tools')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Home Page Tests</h2>
                <div className="space-y-2">
                  <p><strong>Hero Title:</strong> {t('home.hero.title')}</p>
                  <p><strong>Hero Subtitle:</strong> {t('home.hero.subtitle')}</p>
                  <p><strong>Search Placeholder:</strong> {t('home.hero.search_placeholder')}</p>
                  <p><strong>CTA:</strong> {t('home.hero.cta')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Common Tests</h2>
                <div className="space-y-2">
                  <p><strong>Loading:</strong> {t('common.loading')}</p>
                  <p><strong>Error:</strong> {t('common.error')}</p>
                  <p><strong>Success:</strong> {t('common.success')}</p>
                  <p><strong>Cancel:</strong> {t('common.cancel')}</p>
                  <p><strong>Confirm:</strong> {t('common.confirm')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Current Language</h2>
                <div className="space-y-2">
                  <p><strong>Language Code:</strong> {t('common.language')}</p>
                  <p><strong>Is Chinese:</strong> {t('common.language') === 'zh' ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Instructions</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Use the language switcher in the top right to change languages</li>
                <li>• Check that the URL updates with /zh prefix for Chinese</li>
                <li>• Verify that all text changes to the selected language</li>
                <li>• Test browser back/forward buttons</li>
                <li>• Refresh the page to ensure language persists</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestLanguagePage; 