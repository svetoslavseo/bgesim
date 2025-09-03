import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import AuthorProfile from '../../components/AuthorProfile';
import { AUTHOR_INFO } from '../../constants';

const WhatsAppInChina: React.FC = () => {
  const { t, i18n } = useTranslation(['articles']);
  const isBulgarian = i18n.language === 'bg';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": isBulgarian ? t('whatsapp_in_china.title') : "Can You Use WhatsApp in China in 2025? The Complete Guide",
                  "description": isBulgarian ? t('whatsapp_in_china.description') : "Complete guide to using WhatsApp in China in 2025. Learn why it's blocked, how to access it with eSIM, VPN, or roaming, and discover alternatives like WeChat.",
        "image": "https://travelesim.bg/whatsapp-in-china.png",
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
            "@id": "https://travelesim.bg/articles/whatsapp-in-china"
          },
          "articleSection": "Travel Technology",
          "keywords": "WhatsApp China 2025, China internet restrictions, Great Firewall, travel eSIM China, VPN China, WeChat alternatives, international roaming China",
          "wordCount": 2000,
          "timeRequired": "PT8M",
          "inLanguage": i18n.language === 'bg' ? 'bg-BG' : 'en-US'
        })}
      </script>

      <Helmet>
        <title>{isBulgarian ? t('whatsapp_in_china.meta.title') : "Can You Use WhatsApp in China in 2025? Complete Guide - Travel eSIMple"}</title>
        <meta name="description" content={isBulgarian ? t('whatsapp_in_china.meta.description') : "Complete guide to using WhatsApp in China in 2025. Learn why it's blocked, how to access it with eSIM, VPN, or roaming, and discover alternatives like WeChat."} />
        <meta name="keywords" content={isBulgarian ? t('whatsapp_in_china.meta.keywords') : "WhatsApp China 2025, China internet restrictions, Great Firewall, travel eSIM China, VPN China, WeChat alternatives, international roaming China"} />
        <meta property="og:title" content="Can You Use WhatsApp in China in 2025? The Complete Guide" />
        <meta property="og:description" content="Complete guide to using WhatsApp in China in 2025. Learn why it's blocked, how to access it with eSIM, VPN, or roaming, and discover alternatives like WeChat." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://travelesim.bg/articles/whatsapp-in-china" />
        <meta property="og:image" content="https://travelesim.bg/whatsapp-in-china.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Can You Use WhatsApp in China in 2025? The Complete Guide" />
        <meta name="twitter:description" content="Complete guide to using WhatsApp in China in 2025. Learn why it's blocked, how to access it with eSIM, VPN, or roaming, and discover alternatives like WeChat." />
        <link rel="canonical" href="https://travelesim.bg/articles/whatsapp-in-china" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-blue-600">{i18n.language === 'bg' ? "Начало" : "Home"}</a> / 
            <a href="/articles" className="hover:text-blue-600">{i18n.language === 'bg' ? "Статии" : "Articles"}</a> / 
            <span className="ml-2">{isBulgarian ? t('whatsapp_in_china.breadcrumb') : "WhatsApp in China 2025"}</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isBulgarian ? t('whatsapp_in_china.title') : "Can You Use WhatsApp in China in 2025? The Complete Guide"}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {isBulgarian ? t('whatsapp_in_china.description') : "If you're travelling to China and wondering whether WhatsApp works, here's the quick answer: "}<strong>No, WhatsApp is blocked in mainland China</strong>{isBulgarian ? "" : ". But don't worry - you can still use it with the right setup. This guide explains why WhatsApp is restricted, the best ways to access it, and alternative apps you might need during your trip."}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <span>{i18n.language === 'bg' ? 'Обновено' : 'Updated'}: {new Date().toLocaleDateString(i18n.language === 'bg' ? 'bg-BG' : 'en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center">
              <span>{isBulgarian ? t('whatsapp_in_china.reading_time') : "Reading time: 8 minutes"}</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center">
              <span>{i18n.language === 'bg' ? 'От' : 'By'} <a href="/author/vasil-andreev" className="text-blue-600 hover:underline">Vasil Andreev</a></span>
            </div>
          </div>
        </header>

        {/* Main Image */}
        <div className="mb-8">
          <img 
            src="/whatsapp-in-china.png" 
            alt={i18n.language === 'bg' ? "Смартфон с логото на WhatsApp и икона на VPN - сигурна комуникация в Китай" : "Smartphone with WhatsApp logo and VPN icon - secure communication in China"} 
            className="w-full h-auto rounded-lg shadow-lg"
            width="800"
            height="600"
            loading="eager"
          />
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{isBulgarian ? t('whatsapp_in_china.table_of_contents') : "Table of Contents"}</h2>
          <ul className="space-y-2">
            <li><a href="#why-blocked" className="text-blue-600 hover:underline">{isBulgarian ? t('whatsapp_in_china.toc_items.why_blocked') : "1. Why Is WhatsApp Blocked in China?"}</a></li>
            <li><a href="#solutions" className="text-blue-600 hover:underline">{isBulgarian ? t('whatsapp_in_china.toc_items.solutions') : "2. How to Use WhatsApp in China: 3 Reliable Solutions"}</a></li>
            <li><a href="#alternatives" className="text-blue-600 hover:underline">{isBulgarian ? t('whatsapp_in_china.toc_items.alternatives') : "3. WhatsApp Alternatives in China"}</a></li>
            <li><a href="#essential-apps" className="text-blue-600 hover:underline">{isBulgarian ? t('whatsapp_in_china.toc_items.essential_apps') : "4. Essential Apps to Download Before Your Trip"}</a></li>
            <li><a href="#faqs" className="text-blue-600 hover:underline">{isBulgarian ? t('whatsapp_in_china.toc_items.faqs') : "5. FAQs About WhatsApp in China (2025)"}</a></li>
          </ul>
        </div>

        {/* Main Content */}
        <article className="space-y-8">
          
          {/* Why Blocked Section */}
          <section id="why-blocked" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{isBulgarian ? t('whatsapp_in_china.sections.why_blocked.title') : "1. Why Is WhatsApp Blocked in China?"}</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              {isBulgarian ? t('whatsapp_in_china.sections.why_blocked.description') : "WhatsApp was officially blocked in 2017 as part of China's "}<strong>"Great Firewall"</strong>{isBulgarian ? "" : ", a system of strict internet controls that also blocks Facebook, Instagram, Google services, and many news websites."}
            </p>


          </section>

          {/* Solutions Section */}
          <section id="solutions" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{isBulgarian ? t('whatsapp_in_china.sections.solutions.title') : "2. How to Use WhatsApp in China: 3 Reliable Solutions"}</h2>
            
            {/* Solution 1: Travel eSIM */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">1</span>
                {isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.title') : "Use a Travel eSIM (Best Solution for Tourists)"}
              </h3>
              
              <p className="text-lg text-gray-700 mb-4">
                {isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.description') : "A travel eSIM is the easiest way to stay connected. It routes your data through servers outside China, meaning WhatsApp, Google, and Instagram will work normally."}
              </p>

              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-green-800 mb-2">{isBulgarian ? "Защо работи" : "Why it works"}:</h4>
                <p className="text-green-700">{isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.why_works') : ""}<a href={isBulgarian ? "/asia/china" : "/asia/china"} className="text-green-800 underline hover:text-green-900">eSIMs connect to Chinese</a>{isBulgarian ? "" : " networks but avoid local restrictions by using foreign carriers."}</p>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">{isBulgarian ? "Предимства" : "Advantages"}:</h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.advantages.instant') : "Works instantly upon arrival"}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.advantages.no_vpn') : "No VPN setup needed"}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.advantages.reliable') : "More reliable than hotel WiFi or free VPNs"}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.advantages.no_battery_drain') : "No extra battery drain"}</span>
                </li>
              </ul>

              <h4 className="font-semibold text-gray-900 mb-3">{isBulgarian ? "Стъпки" : "Steps"}:</h4>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>{isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.steps.buy') : "Buy a China-ready eSIM online before departure"}</li>
                <li>{isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.steps.scan') : "Scan the QR code to install"}</li>
                <li>{isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.steps.activate') : "Activate when you land"}</li>
                <li>{isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.steps.open') : "Open WhatsApp - no extra steps required"}</li>
              </ol>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>💡 {isBulgarian ? "Проверете съвместимостта на телефона си първо" : "Check your phone compatibility first"}:</strong> {isBulgarian ? t('whatsapp_in_china.sections.solutions.esim.compatibility_note') : "iPhone XR/XS and newer, Samsung Galaxy S20+, Google Pixel 3+, and most 2020+ models support eSIMs."} {isBulgarian ? "Можете да използвате нашия безплатен инструмент за проверка на съвместимостта на устройството си." : "You can use our free tool to check your device compatibility."} <a href={isBulgarian ? "/esim-compatibility" : "/esim-compatibility"} className="text-blue-900 underline hover:text-blue-700 font-medium">{isBulgarian ? "Проверете съвместимостта" : "Check compatibility"}</a>
                </p>
              </div>
            </div>

            {/* Solution 2: International Roaming */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">2</span>
                {isBulgarian ? t('whatsapp_in_china.sections.solutions.roaming.title') : "International Roaming"}
              </h3>
              
              <p className="text-lg text-gray-700 mb-4">
                {isBulgarian ? t('whatsapp_in_china.sections.solutions.roaming.description') : "Some travellers stick with their home SIM and enable international roaming. Since data is routed through your home network, WhatsApp usually works."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">{isBulgarian ? "Предимства" : "Pros"}:</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• {isBulgarian ? t('whatsapp_in_china.sections.solutions.roaming.pros.no_setup') : "No setup"}</li>
                    <li>• {isBulgarian ? t('whatsapp_in_china.sections.solutions.roaming.pros.keep_number') : "Keeps your number active"}</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">{isBulgarian ? "Недостатъци" : "Cons"}:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• {isBulgarian ? t('whatsapp_in_china.sections.solutions.roaming.cons.expensive') : "Extremely expensive ($10–15/day)"}</li>
                    <li>• {isBulgarian ? t('whatsapp_in_china.sections.solutions.roaming.cons.limited_speed') : "Limited speed"}</li>
                    <li>• {isBulgarian ? t('whatsapp_in_china.sections.solutions.roaming.cons.not_reliable') : "Not always reliable"}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Solution 3: VPN */}
            <div className="mb-8 mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">3</span>
                {isBulgarian ? t('whatsapp_in_china.sections.solutions.vpn.title') : "VPN (Virtual Private Network)"}
              </h3>
              
              <p className="text-lg text-gray-700 mb-4">
                {isBulgarian ? t('whatsapp_in_china.sections.solutions.vpn.description') : "VPNs are another option, but they've become less reliable."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">{isBulgarian ? "Предимства" : "Pros"}:</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• {isBulgarian ? t('whatsapp_in_china.sections.solutions.vpn.pros.works_on_wifi') : "Works on hotel WiFi and public hotspots"}</li>
                    <li>• {isBulgarian ? t('whatsapp_in_china.sections.solutions.vpn.pros.unlocks_all') : "Unlocks all blocked apps, not just WhatsApp"}</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">{isBulgarian ? "Недостатъци" : "Cons"}:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• {isBulgarian ? t('whatsapp_in_china.sections.solutions.vpn.cons.detected') : "Many VPNs are detected and blocked"}</li>
                    <li>• {isBulgarian ? t('whatsapp_in_china.sections.solutions.vpn.cons.must_install_before') : "Must be installed before arriving in China"}</li>
                    <li>• {isBulgarian ? t('whatsapp_in_china.sections.solutions.vpn.cons.slow_internet') : "Can slow internet and drain battery"}</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>✅ {isBulgarian ? "Препоръчани VPN услуги" : "Recommended VPNs"} {isBulgarian ? "които все още работят" : "that still work"}:</strong> ExpressVPN, Astrill, NordVPN
                </p>
              </div>
            </div>
          </section>

          {/* Alternatives Section */}
          <section id="alternatives" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{isBulgarian ? t('whatsapp_in_china.sections.alternatives.title') : "3. WhatsApp Alternatives in China"}</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              {isBulgarian ? t('whatsapp_in_china.sections.alternatives.description') : "Even if you unlock WhatsApp, you'll find locals almost exclusively use "}<strong>WeChat (Weixin)</strong>{isBulgarian ? "" : "."}
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{isBulgarian ? "WeChat не е само чат приложение" : "It's more than a messenger"}</h3>
              <p className="text-blue-800 mb-4">
                {isBulgarian ? t('whatsapp_in_china.sections.alternatives.wechat_features') : "It's used for payments, shopping, ride-hailing, and even restaurant menus."}
              </p>
              
              <div className="bg-white p-4 rounded-lg">
                <p className="text-blue-900 text-sm">
                  <strong>👉 {isBulgarian ? "Съвет за краткосрочни посетители" : "Tip for short-term visitors"}:</strong> {isBulgarian ? t('whatsapp_in_china.sections.alternatives.short_term_tip') : "Use WhatsApp for your family and friends abroad, but install WeChat to communicate with locals and access services."}
                </p>
              </div>
            </div>
          </section>

          {/* Essential Apps Section */}
          <section id="essential-apps" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{isBulgarian ? t('whatsapp_in_china.sections.essential_apps.title') : "4. Essential Apps to Download Before Your Trip"}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">{isBulgarian ? "Комуникационни приложения" : "Communication Apps"}</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>WhatsApp + VPN/eSIM setup</strong> ({isBulgarian ? "направено преди заминаване" : "done before arrival"})</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>WeChat</strong> ({isBulgarian ? "за местна комуникация и плащания" : "for local communication and payments"})</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">{isBulgarian ? "Полезни приложения" : "Utility Apps"}</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Google Maps (offline)</strong> {isBulgarian ? "или Baidu Maps" : "or Baidu Maps"}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Translation apps</strong> ({isBulgarian ? "Google Translate или Pleco" : "Google Translate or Pleco"})</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faqs" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{isBulgarian ? t('whatsapp_in_china.sections.faqs.title') : "5. FAQs About WhatsApp in China (2025)"}</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{isBulgarian ? t('whatsapp_in_china.sections.faqs.q1') : "Is WhatsApp still blocked in China?"}</h3>
                <p className="text-gray-700"><strong>{isBulgarian ? "Да" : "Yes"}</strong>, {isBulgarian ? t('whatsapp_in_china.sections.faqs.a1') : "as of 2025 WhatsApp is blocked across mainland China."}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{isBulgarian ? t('whatsapp_in_china.sections.faqs.q2') : "Can tourists use WhatsApp?"}</h3>
                <p className="text-gray-700"><strong>{isBulgarian ? "Да" : "Yes"}</strong>, {isBulgarian ? t('whatsapp_in_china.sections.faqs.a2') : "if you use a travel eSIM, VPN, or roaming service."}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{isBulgarian ? t('whatsapp_in_china.sections.faqs.q3') : "Does WhatsApp calling work in China?"}</h3>
                <p className="text-gray-700"><strong>{isBulgarian ? "Да" : "Yes"}</strong> - {isBulgarian ? t('whatsapp_in_china.sections.faqs.a3') : "voice and video calls work if you bypass restrictions with eSIM, VPN, or roaming."}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{isBulgarian ? t('whatsapp_in_china.sections.faqs.q4') : "Does hotel WiFi unblock WhatsApp?"}</h3>
                <p className="text-gray-700"><strong>{isBulgarian ? "Не" : "No"}</strong>, {isBulgarian ? t('whatsapp_in_china.sections.faqs.a4') : "hotel and café WiFi follow the same restrictions. You'll still need an eSIM or VPN."}</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{isBulgarian ? t('whatsapp_in_china.sections.faqs.q5') : "Do I need both a Chinese SIM and an eSIM?"}</h3>
                <p className="text-gray-700">{isBulgarian ? t('whatsapp_in_china.sections.faqs.a5') : "Not necessarily. If you just need WhatsApp and data, a travel eSIM is enough. If you need a Chinese number for taxis, food delivery, or local apps, combine both."}</p>
              </div>
            </div>
          </section>




        </article>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-gray-900 to-black text-white rounded-lg p-8 text-center shadow-lg mt-8">
          <h2 className="text-3xl font-bold mb-4">{isBulgarian ? t('whatsapp_in_china.cta.title') : "Ready to Stay Connected in China?"}</h2>
          <p className="text-xl mb-6 text-gray-200">{isBulgarian ? t('whatsapp_in_china.cta.description') : "Get your travel eSIM and ensure seamless communication during your trip to China."}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={isBulgarian ? "/asia/china" : "/asia/china"} className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm">
              {isBulgarian ? t('whatsapp_in_china.cta.explore_china') : "Explore China Plans"}
            </a>
            <a href={isBulgarian ? "/esim-compatibility" : "/esim-compatibility"} className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
              {isBulgarian ? t('whatsapp_in_china.cta.check_compatibility') : "Check Compatibility"}
            </a>
          </div>
        </section>

        {/* Author Profile */}
        <div className="mt-12">
          <AuthorProfile author={AUTHOR_INFO} />
        </div>
      </div>
    </div>
  );
};

export default WhatsAppInChina; 