import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import i18n from '../i18n';
import AuthorProfile from '../components/AuthorProfile';
import { AUTHOR_INFO } from '../constants';

const WhatIsESIM: React.FC = () => {
  const { t } = useTranslation('what_is_esim');
  const { t: tCommon } = useTranslation('common');
  const isBulgarian = i18n.language === 'bg';
  // Translated list/heading helpers
  const keyFacts = t('key_facts', { returnObjects: true }) as string[];
  const advantages = t('advantages', { returnObjects: true }) as string[];
  const useCases = t('use_cases', { returnObjects: true }) as string[];
  const travelReasons = t('travel_reasons', { returnObjects: true }) as string[];
  const limitations = t('limitations', { returnObjects: true }) as string[];
  const considerations = t('considerations', { returnObjects: true }) as string[];
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "What is an eSIM? Complete Guide to Digital SIM Cards",
          "description": "Learn everything about eSIMs - digital SIM cards that work without physical cards. Discover how eSIMs work, their benefits for travel, compatibility, and how to get started.",
          "image": "https://travelesim.dk/wp-content/uploads/2025/02/What-is-an-esim.png",
          "author": {
            "@type": "Person",
            "name": "Vasil Andreev",
            "url": "https://travelesim.bg/author/vasil-andreev"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Travel eSIMple",
            "logo": {
              "@type": "ImageObject",
              "url": "https://travelesim.bg/esim-data/travelesim-logo.png"
            }
          },
          "datePublished": new Date().toISOString().split('T')[0],
          "dateModified": new Date().toISOString().split('T')[0],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://travelesim.bg/what-is-esim"
          },
          "articleSection": "Travel Technology",
          "keywords": "eSIM, digital SIM, travel SIM, international roaming, mobile data, smartphone compatibility, embedded SIM",
          "wordCount": 3000,
          "timeRequired": "PT8M",
          "inLanguage": "en-US"
        })}
      </script>
      <Helmet>
        <html lang={i18n.language === 'bg' ? 'bg' : 'en'} />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <meta property="og:title" content={t('meta.og_title')} />
        <meta property="og:description" content={t('meta.og_description')} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://travelesim.bg/what-is-esim" />
        <meta property="og:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.twitter_title')} />
        <meta name="twitter:description" content={t('meta.twitter_description')} />
        <link rel="canonical" href={`https://travelesim.bg${i18n.language === 'en' ? '/en' : ''}/what-is-esim`} />
        <link rel="alternate" hrefLang="bg" href="https://travelesim.bg/what-is-esim" />
        <link rel="alternate" hrefLang="en" href="https://travelesim.bg/en/what-is-esim" />
        <link rel="alternate" hrefLang="x-default" href="https://travelesim.bg/what-is-esim" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <a href={isBulgarian ? '/' : '/en'} className="hover:text-blue-600">{tCommon('breadcrumbs.home')}</a> / 
            <span className="ml-2">{tCommon('breadcrumbs.what_is_esim')}</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <span>{t('meta.updated')}: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center">
              <span>{t('meta.reading_time')}</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center">
              <span>{t('meta.by')} <a href={isBulgarian ? "/author/vasil-andreev" : "/en/author/vasil-andreev"} className="text-blue-600 hover:underline">{t('meta.author')}</a></span>
            </div>
          </div>
        </header>

        {/* Main Image */}
        <div className="mb-8">
          <img 
            src="https://travelesim.dk/wp-content/uploads/2025/02/What-is-an-esim.png" 
            alt="What is an eSIM - Digital SIM card technology illustration" 
            className="w-full h-auto rounded-lg shadow-lg"
            loading="eager"
          />
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('toc.title')}</h2>
          <ul className="space-y-2">
            <li><a href="#what-is-esim" className="text-blue-600 hover:underline">{t('toc_links.what_is_esim')}</a></li>
            <li><a href="#how-esims-work" className="text-blue-600 hover:underline">{t('toc_links.how_it_works')}</a></li>
            <li><a href="#benefits" className="text-blue-600 hover:underline">{t('toc_links.benefits')}</a></li>
            <li><a href="#compatibility" className="text-blue-600 hover:underline">{t('toc_links.compatibility')}</a></li>
            <li><a href="#travel" className="text-blue-600 hover:underline">{t('toc_links.travel')}</a></li>
            <li><a href="#networks" className="text-blue-600 hover:underline">{t('toc_links.networks')}</a></li>
            <li><a href="#installation" className="text-blue-600 hover:underline">{t('toc_links.installation')}</a></li>
            <li><a href="#disadvantages" className="text-blue-600 hover:underline">{t('toc_links.disadvantages')}</a></li>
            <li><a href="#faq" className="text-blue-600 hover:underline">{t('toc_links.faq')}</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          
          {/* What is eSIM Section */}
          <section id="what-is-esim" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">{t('sections.what_is_esim.title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  {t('sections.what_is_esim.detailed_explanation.paragraph1')}
                </p>
                
                <p className="text-lg text-gray-700 mb-4">
                  {t('sections.what_is_esim.detailed_explanation.paragraph2')}
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">{t('key_facts_heading')}</h3>
                <ul className="space-y-2 text-gray-700">
                  {keyFacts.map((fact, idx) => (
                    <li key={idx}>• {fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* How eSIMs Work Section */}
          <section id="how-esims-work" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">{t('sections.how_it_works.title')}</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">{t('how_it_works_steps.step1.title')}</h3>
                <p className="text-gray-600">{t('how_it_works_steps.step1.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">{t('how_it_works_steps.step2.title')}</h3>
                <p className="text-gray-600">{t('how_it_works_steps.step2.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">{t('how_it_works_steps.step3.title')}</h3>
                <p className="text-gray-600">{t('how_it_works_steps.step3.description')}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">{t('technical_process.title')}</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {(t('technical_process.steps', { returnObjects: true }) as string[]).map((step: string, idx: number) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">{t('sections.benefits.title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-600">{t('advantages_heading')}</h3>
                <ul className="space-y-3">
                  {advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">{t('use_cases_heading')}</h3>
                <ul className="space-y-3">
                  {useCases.map((uc, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-3">•</span>
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Compatibility Section */}
          <section id="compatibility" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">{t('compatibility.title')}</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">{t('compatibility.table.phone_model')}</th>
                    <th className="border border-gray-300 p-3 text-center">{t('compatibility.table.esim_support')}</th>
                    <th className="border border-gray-300 p-3 text-center">{t('compatibility.table.physical_sim')}</th>
                    <th className="border border-gray-300 p-3 text-center">{t('compatibility.table.dual_sim')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">iPhone XS and newer</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Samsung Galaxy S20+ and newer</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">Google Pixel 3 and newer</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Huawei P40 and newer</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">Oppo Find X3 and newer</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Sony Xperia 1 III and newer</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{t('compatibility.important_note.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('compatibility.important_note.content')}
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{t('compatibility.check_compatibility.title')}</h4>
                <p className="text-gray-600 mb-4">
                  {t('compatibility.check_compatibility.content')}
                </p>
                <a 
                  href="https://travelesim.bg/esim-compatibility" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  <span>{t('compatibility.check_compatibility.button')}</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* Travel Section */}
          <section id="travel" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">{t('sections.travel_advantages.title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('travel_reasons_heading')}</h3>
                <ul className="space-y-3">
                  {travelReasons.map((tr, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span>{tr}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('travel_providers.title')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-semibold">{t('travel_providers.providers.airalo.name')}</span>
                    <span className="text-sm text-gray-600">{t('travel_providers.providers.airalo.feature')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-semibold">{t('travel_providers.providers.holafly.name')}</span>
                    <span className="text-sm text-gray-600">{t('travel_providers.providers.holafly.feature')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-semibold">{t('travel_providers.providers.nomad.name')}</span>
                    <span className="text-sm text-gray-600">{t('travel_providers.providers.nomad.feature')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-semibold">{t('travel_providers.providers.ubigi.name')}</span>
                    <span className="text-sm text-gray-600">{t('travel_providers.providers.ubigi.feature')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black text-white rounded">
                    <span className="font-semibold">{t('travel_providers.providers.travelesimple.name')}</span>
                    <span className="text-sm text-gray-200">{t('travel_providers.providers.travelesimple.feature')}</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <a 
                    href="https://travelesim.bg/all-destinations" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-black text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    <span>{t('buttons.browse_all_destinations')}</span>
                    <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">{t('cost_comparison.title')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">{t('cost_comparison.table.region_country')}</th>
                      <th className="text-left p-2">{t('cost_comparison.table.data')}</th>
                      <th className="text-left p-2">{t('cost_comparison.table.validity')}</th>
                      <th className="text-left p-2">{t('cost_comparison.table.cost')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">
                        <div className="space-y-2">
                          <a href={isBulgarian ? "/europe" : "/en/europe"} className="text-blue-600 hover:underline font-medium">Europe</a>
                          <div className="ml-4 space-y-1">
                            <a href={isBulgarian ? "/europe/spain" : "/en/europe/spain"} className="text-gray-600 hover:underline text-xs">Spain</a>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">10GB</td>
                      <td className="p-2">30 days</td>
                      <td className="p-2">$15.99</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">
                        <div className="space-y-2">
                          <a href={isBulgarian ? "/north-america" : "/en/north-america"} className="text-blue-600 hover:underline font-medium">North America</a>
                          <div className="ml-4 space-y-1">
                            <a href={isBulgarian ? "/north-america/united-states" : "/en/north-america/united-states"} className="text-gray-600 hover:underline text-xs">United States</a>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">10GB</td>
                      <td className="p-2">30 days</td>
                      <td className="p-2">$22.99</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">
                        <div className="space-y-2">
                          <a href={isBulgarian ? "/asia" : "/en/asia"} className="text-blue-600 hover:underline font-medium">Asia</a>
                          <div className="ml-4 space-y-1">
                            <a href={isBulgarian ? "/asia/japan" : "/en/asia/japan"} className="text-gray-600 hover:underline text-xs">Japan</a>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">10GB</td>
                      <td className="p-2">30 days</td>
                      <td className="p-2">$17.99</td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <div className="space-y-2">
                          <a href={isBulgarian ? "/all-destinations" : "/en/all-destinations"} className="text-blue-600 hover:underline font-medium">Global</a>
                        </div>
                        <br />
                        <span className="text-gray-500 text-xs">200+ countries</span>
                      </td>
                      <td className="p-2">3GB</td>
                      <td className="p-2">30 days</td>
                      <td className="p-2">$7.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="https://travelesim.bg/all-destinations" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-black text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  <span>{t('cost_comparison.view_all_plans')}</span>
                  <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* Network Support Section */}
          <section id="networks" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">{t('sections.networks.title')}</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">UK Network</th>
                    <th className="border border-gray-300 p-3 text-center">Pay Monthly</th>
                    <th className="border border-gray-300 p-3 text-center">Pay As You Go</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">EE</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">O2</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Vodafone</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Three</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Virgin Media</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-red-600">✗</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Sky Mobile</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">✓</td>
                    <td className="border border-gray-300 p-3 text-center text-red-600">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Installation Section */}
          <section id="installation" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">{t('sections.installation.title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('installation_guide.step_by_step.title')}</h3>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                    <div>
                      <strong>{t('installation_guide.step_by_step.steps.step1.title')}</strong>
                      <p className="text-gray-600 mt-1">{t('installation_guide.step_by_step.steps.step1.description')}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
                    <div>
                      <strong>{t('installation_guide.step_by_step.steps.step2.title')}</strong>
                      <p className="text-gray-600 mt-1">{t('installation_guide.step_by_step.steps.step2.description')}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
                    <div>
                      <strong>{t('installation_guide.step_by_step.steps.step3.title')}</strong>
                      <p className="text-gray-600 mt-1">{t('installation_guide.step_by_step.steps.step3.description')}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</span>
                    <div>
                      <strong>{t('installation_guide.step_by_step.steps.step4.title')}</strong>
                      <p className="text-gray-600 mt-1">{t('installation_guide.step_by_step.steps.step4.description')}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">5</span>
                    <div>
                      <strong>{t('installation_guide.step_by_step.steps.step5.title')}</strong>
                      <p className="text-gray-600 mt-1">{t('installation_guide.step_by_step.steps.step5.description')}</p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('installation_guide.device_specific.title')}</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">{t('installation_guide.device_specific.devices.iphone.name')}</h4>
                    <p className="text-gray-600 text-sm">{t('installation_guide.device_specific.devices.iphone.instructions')}</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold">{t('installation_guide.device_specific.devices.samsung.name')}</h4>
                    <p className="text-gray-600 text-sm">{t('installation_guide.device_specific.devices.samsung.instructions')}</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold">{t('installation_guide.device_specific.devices.google_pixel.name')}</h4>
                    <p className="text-gray-600 text-sm">{t('installation_guide.device_specific.devices.google_pixel.instructions')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Disadvantages Section */}
          <section id="disadvantages" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">{t('sections.disadvantages.title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-600">{t('limitations_heading')}</h3>
                <ul className="space-y-3">
                  {limitations.map((lim, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-500 mr-3">✗</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-orange-600">{t('considerations_heading')}</h3>
                <ul className="space-y-3">
                  {considerations.map((con, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-orange-500 mr-3">⚠</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">{t('sections.faq.title')}</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg mb-2">{t('faq.questions.q1.question')}</h3>
                <p className="text-gray-700">{t('faq.questions.q1.answer')}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg mb-2">{t('faq.questions.q2.question')}</h3>
                <p className="text-gray-700">{t('faq.questions.q2.answer')}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg mb-2">{t('faq.questions.q3.question')}</h3>
                <p className="text-gray-700">{t('faq.questions.q3.answer')}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg mb-2">{t('faq.questions.q4.question')}</h3>
                <p className="text-gray-700">{t('faq.questions.q4.answer')}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg mb-2">{t('faq.questions.q5.question')}</h3>
                <p className="text-gray-700">{t('faq.questions.q5.answer')}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg mb-2">{t('faq.questions.q6.question')}</h3>
                <p className="text-gray-700">{t('faq.questions.q6.answer')}</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 text-white text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">{t('cta_heading')}</h2>
            <p className="text-xl mb-6 text-gray-200">{t('cta_description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <a href={isBulgarian ? "/esim-compatibility" : "/en/esim-compatibility"} className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm">
                {t('cta.check_compatibility')}
              </a>
              <a href="https://travelesim.bg/all-destinations" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                {t('buttons.browse_all_destinations')}
              </a>
            </div>
          </section>
        </div>

        {/* Author Profile */}
        <div className="mt-12">
          <AuthorProfile author={AUTHOR_INFO} />
        </div>
      </div>
    </div>
  );
};

export default WhatIsESIM; 