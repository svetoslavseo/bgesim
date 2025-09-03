import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import AuthorProfile from '../../components/AuthorProfile';
import { AUTHOR_INFO } from '../../constants';

const EIDArticle: React.FC = () => {
  const { t, i18n } = useTranslation(['articles']);
  const isBulgarian = i18n.language === 'bg';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": isBulgarian ? t('eid_article.title') : "What Is An EID Number? Complete Guide for iPhone & Android Users",
          "description": isBulgarian ? t('eid_article.description') : "Learn what an EID number is, why it matters for eSIM activation, and how to find it on your iPhone or Android device. Essential guide for travelers.",
          "image": "https://travelesim.bg/blog/eid-number-guide.svg",
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
            "@id": "https://travelesim.bg/articles/what-is-eid-number"
          },
          "articleSection": "Travel Technology",
          "keywords": "EID number, eSIM activation, iPhone EID, Android EID, travel eSIM, device compatibility, international travel",
          "wordCount": 2500,
          "timeRequired": "PT8M",
          "inLanguage": i18n.language === 'bg' ? 'bg-BG' : 'en-US'
        })}
      </script>

      <Helmet>
        <title>{isBulgarian ? t('eid_article.meta.title') : "What Is An EID Number? Complete Guide for iPhone & Android Users - Travel eSIMple"}</title>
        <meta name="description" content={isBulgarian ? t('eid_article.meta.description') : "Learn what an EID number is, why it matters for eSIM activation, and how to find it on your iPhone or Android device. Essential guide for travelers."} />
        <meta name="keywords" content={isBulgarian ? t('eid_article.meta.keywords') : "EID number, eSIM activation, iPhone EID, Android EID, travel eSIM, device compatibility, international travel"} />
        <meta property="og:title" content={isBulgarian ? t('eid_article.title') : "What Is An EID Number? Complete Guide for iPhone & Android Users"} />
        <meta property="og:description" content={isBulgarian ? t('eid_article.description') : "Learn what an EID number is, why it matters for eSIM activation, and how to find it on your iPhone or Android device. Essential guide for travelers."} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://travelesim.bg/articles/what-is-eid-number" />
        <meta property="og:image" content="https://travelesim.bg/blog/eid-number-guide.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isBulgarian ? t('eid_article.title') : "What Is An EID Number? Complete Guide for iPhone & Android Users"} />
        <meta name="twitter:description" content={isBulgarian ? t('eid_article.description') : "Learn what an EID number is, why it matters for eSIM activation, and how to find it on your iPhone or Android device. Essential guide for travelers."} />
        <link rel="canonical" href="https://travelesim.bg/articles/what-is-eid-number" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-blue-600">{i18n.language === 'bg' ? "Начало" : "Home"}</a> / 
            <a href="/articles" className="hover:text-blue-600">{i18n.language === 'bg' ? "Статии" : "Articles"}</a> / 
            <span className="text-blue-600">{isChinese ? t('eid_article.breadcrumb') : "What Is An EID Number?"}</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isChinese ? t('eid_article.title') : "What Is An EID Number? Complete Guide for iPhone & Android Users"}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {isChinese ? t('eid_article.description') : "An EID number is essential for eSIM activation. Learn what it is, why it matters, and how to find it on your device for seamless international travel connectivity."}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <span>{i18n.language === 'bg' ? "Обновено: " : "Updated: "}{new Date().toLocaleDateString(i18n.language === 'bg' ? 'bg-BG' : 'en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center">
              <span>{isChinese ? t('eid_article.reading_time') : "Reading time: 8 minutes"}</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center">
              <span>{i18n.language === 'bg' ? "От " : "By "}<a href="/author/vasil-andreev" className="text-blue-600 hover:underline">Vasil Andreev</a></span>
            </div>
          </div>
        </header>

        {/* Main Image */}
        <div className="mb-8">
          <img 
            src="/blog/eid-number-guide.svg" 
            alt={i18n.language === 'bg' ? "Ръководство за EID номер - Какво е EID и как да го намерите на iPhone и Android" : "EID Number Guide - What is an EID number and how to find it on iPhone and Android devices"} 
            className="w-full h-auto rounded-lg shadow-lg"
            loading="eager"
          />
        </div>

        {/* Main Content */}
        <article className="space-y-8">
          
          {/* What is EID Section */}
          <section id="what-is-eid" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{isChinese ? t('eid_article.what_is_eid.title') : "What is an EID Number?"}</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              {isChinese ? t('eid_article.what_is_eid.description') : "An <strong>EID</strong> (Embedded Integrated Circuit Card Identifier) is a unique 15-digit number that identifies the eSIM chip in your device. It's essential for activating eSIM services, as carriers need this number to configure your device."}
            </p>
          </section>

          {/* Why Important Section */}
          <section id="why-important" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{isChinese ? t('eid_article.why_important.title') : "Why is the EID Number Important?"}</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              {isChinese ? t('eid_article.why_important.description') : "The EID number is a crucial component in the eSIM activation process. Without it, carriers cannot configure eSIM services for your device. It ensures your device can connect to the correct network and receive the appropriate service configuration."}
            </p>
          </section>

          {/* How to Find Section */}
          <section id="how-to-find" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{isChinese ? t('eid_article.how_to_find.title') : "How to Find the EID Number on Your Device"}</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-green-900 mb-3">{isChinese ? t('eid_article.how_to_find.iphone.title') : "On iPhone Devices"}</h3>
                <ol className="space-y-2 text-green-800">
                  {isChinese ? (t('eid_article.how_to_find.iphone.steps', { returnObjects: true }) as string[]).map((step: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2 font-bold">{index + 1}.</span>
                      {step}
                    </li>
                  )) : (
                    <>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 font-bold">1.</span>
                        Open <strong>Settings</strong>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 font-bold">2.</span>
                        Tap <strong>General</strong>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 font-bold">3.</span>
                        Tap <strong>About</strong>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 font-bold">4.</span>
                        Scroll down to find <strong>EID</strong> (if your device supports eSIM)
                      </li>
                    </>
                  )}
                </ol>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6 rounded-lg">
                <h3 className="text-lg font-bold text-blue-900 mb-3">{isChinese ? t('eid_article.how_to_find.android.title') : "On Android Devices"}</h3>
                <ol className="space-y-2 text-blue-800">
                  {isChinese ? (t('eid_article.how_to_find.android.steps', { returnObjects: true }) as string[]).map((step: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2 font-bold">{index + 1}.</span>
                      {step}
                    </li>
                  )) : (
                    <>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">1.</span>
                        Open <strong>Settings</strong>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">2.</span>
                        Tap <strong>About phone</strong> or <strong>About device</strong>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">3.</span>
                        Look for <strong>EID</strong> in the device information
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">4.</span>
                        Alternatively, go to <strong>Settings → Network & Internet → Mobile network → Advanced → EID</strong>
                      </li>
                    </>
                  )}
                </ol>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded-lg">
              <p className="text-blue-800">
                <strong>{isChinese ? "注意：" : "Note:"}</strong> {isChinese ? "并非所有设备都在设置中显示EID。一些运营商可能要求您直接联系他们以获取EID号码。" : "Not all devices display the EID in settings. Some carriers may require you to contact them directly to obtain your EID number."}
              </p>
            </div>
          </section>

          {/* Security and Privacy Section */}
          <section id="security" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{isChinese ? t('eid_article.security_privacy.title') : "Security and Privacy"}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isChinese ? t('eid_article.security_privacy.description') : "Your EID number is sensitive information that should be treated with care:"}
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              {isChinese ? (t('eid_article.security_privacy.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  {point}
                </li>
              )) : (
                <>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    Only share your EID with trusted carriers and eSIM providers
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    Be cautious of unsolicited requests for your EID
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    Your EID cannot be changed, so keep it secure
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    Consider it similar to your device's IMEI number in terms of sensitivity
                  </li>
                </>
              )}
            </ul>
          </section>

          {/* Troubleshooting Section */}
          <section id="troubleshooting" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{isChinese ? t('eid_article.troubleshooting.title') : "Troubleshooting Common Issues"}</h2>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6 rounded-lg">
              <h3 className="text-lg font-bold text-red-900 mb-3">{isChinese ? t('eid_article.troubleshooting.eid_not_found.title') : "EID Not Found"}</h3>
              <p className="text-red-800 mb-3">{isChinese ? t('eid_article.troubleshooting.eid_not_found.description') : "If you can't find your EID in device settings:"}</p>
              <ul className="space-y-2 text-red-800">
                {isChinese ? (t('eid_article.troubleshooting.eid_not_found.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    {point}
                  </li>
                )) : (
                  <>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Ensure your device supports eSIM technology
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Check if your carrier supports eSIM activation
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Contact your device manufacturer or carrier for assistance
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6 rounded-lg">
              <h3 className="text-lg font-bold text-red-900 mb-3">{isChinese ? t('eid_article.troubleshooting.esim_not_working.title') : "eSIM Not Working"}</h3>
              <p className="text-red-800 mb-3">{isChinese ? t('eid_article.troubleshooting.esim_not_working.description') : "If eSIM activation fails despite having your EID:"}</p>
              <ul className="space-y-2 text-red-800">
                {isChinese ? (t('eid_article.troubleshooting.esim_not_working.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    {point}
                  </li>
                )) : (
                  <>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Verify the EID number is entered correctly
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Ensure your device is compatible with the eSIM provider
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Check if your device has available eSIM slots
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      Contact the eSIM provider's support team
                    </li>
                  </>
                )}
              </ul>
            </div>
          </section>

          {/* Use Cases Section */}
          <section id="use-cases" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{isChinese ? t('eid_article.use_cases.title') : "Practical Use Cases"}</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{isChinese ? t('eid_article.use_cases.travel_esim.title') : "Travel eSIM Activation"}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isChinese ? t('eid_article.use_cases.travel_esim.description') : "When activating travel eSIMs, you'll typically need to provide your EID number. This allows the eSIM provider to:"}
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              {isChinese ? (t('eid_article.use_cases.travel_esim.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  {point}
                </li>
              )) : (
                <>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    Verify your device compatibility
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    Activate the eSIM profile remotely
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    Ensure secure activation
                  </li>
                </>
              )}
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">{isChinese ? t('eid_article.use_cases.dual_sim.title') : "Dual SIM Setup"}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isChinese ? t('eid_article.use_cases.dual_sim.description') : "Your EID enables dual SIM functionality, allowing you to:"}
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              {isChinese ? (t('eid_article.use_cases.dual_sim.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  {point}
                </li>
              )) : (
                <>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    Use your primary number and a travel eSIM simultaneously
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    Switch between different carriers seamlessly
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600 mr-2">•</span>
                    Maintain separate data plans for different purposes
                  </li>
                </>
              )}
            </ul>
          </section>

          {/* EID vs IMEI Section */}
          <section id="eid-vs-imei" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{isChinese ? t('eid_article.eid_vs_imei.title') : "EID vs IMEI: What's the Difference?"}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isChinese ? t('eid_article.eid_vs_imei.description') : "While both EID and IMEI are device identifiers, they serve different purposes:"}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-semibold">{isChinese ? t('eid_article.eid_vs_imei.table.feature') : "Feature"}</th>
                    <th className="border border-gray-300 p-3 text-left font-semibold">EID</th>
                    <th className="border border-gray-300 p-3 text-left font-semibold">IMEI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.purpose') : "Purpose"}</td>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.eid_purpose') : "eSIM hardware identifier"}</td>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.imei_purpose') : "Device hardware identifier"}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.length') : "Length"}</td>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.eid_length') : "32 characters"}</td>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.imei_length') : "15 digits"}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.format') : "Format"}</td>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.eid_format') : "Alphanumeric"}</td>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.imei_format') : "Numeric only"}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.accessibility') : "Accessibility"}</td>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.eid_accessibility') : "Device settings"}</td>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.imei_accessibility') : "Device settings, dialer"}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.transferability') : "Transferability"}</td>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.eid_transferability') : "Device-specific"}</td>
                    <td className="border border-gray-300 p-3">{isChinese ? t('eid_article.eid_vs_imei.table.imei_transferability') : "Device-specific"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Travel Tips Section */}
          <section id="travel-tips" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{isChinese ? t('eid_article.travel_tips.title') : "Tips for Travelers"}</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-900 mb-3">{isChinese ? t('eid_article.travel_tips.before_travel.title') : "Before You Travel"}</h3>
                <ul className="space-y-2 text-yellow-800">
                  {isChinese ? (t('eid_article.travel_tips.before_travel.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-600 mr-2">✓</span>
                      {point}
                    </li>
                  )) : (
                    <>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">✓</span>
                        Save your EID number in a secure location
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">✓</span>
                        Research eSIM compatibility for your destination
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">✓</span>
                        Have a physical SIM as backup for critical connectivity
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-600 mr-2">✓</span>
                        Test eSIM activation before departure
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-green-900 mb-3">{isChinese ? t('eid_article.travel_tips.during_trip.title') : "During Your Trip"}</h3>
                <ul className="space-y-2 text-green-800">
                  {isChinese ? (t('eid_article.travel_tips.during_trip.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      {point}
                    </li>
                  )) : (
                    <>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Keep your EID number easily accessible
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Monitor your data usage regularly
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Have backup connectivity options
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Know your eSIM provider's support contact
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{isChinese ? t('eid_article.faq.title') : "Frequently Asked Questions"}</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{isChinese ? t('eid_article.faq.questions.change_eid.question') : "Q: Can I change my EID number?"}</h3>
                <p className="text-gray-700">
                  <strong>{isChinese ? "答：" : "A:"}</strong> {isChinese ? t('eid_article.faq.questions.change_eid.answer') : "No, your EID number is permanently embedded in your device's hardware and cannot be changed."}
                </p>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{isChinese ? t('eid_article.faq.questions.all_devices.question') : "Q: Do all devices have an EID?"}</h3>
                <p className="text-gray-700">
                  <strong>{isChinese ? "答：" : "A:"}</strong> {isChinese ? t('eid_article.faq.questions.all_devices.answer') : "No, only devices with eSIM capability have an EID. Older devices or those without eSIM support won't have an EID."}
                </p>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{isChinese ? t('eid_article.faq.questions.same_as_imei.question') : "Q: Is my EID the same as my IMEI?"}</h3>
                <p className="text-gray-700">
                  <strong>{isChinese ? "答：" : "A:"}</strong> {isChinese ? t('eid_article.faq.questions.same_as_imei.answer') : "No, they are different identifiers. Your EID is specific to eSIM functionality, while IMEI identifies your entire device."}
                </p>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{isChinese ? t('eid_article.faq.questions.without_eid.question') : "Q: Can I use eSIM without knowing my EID?"}</h3>
                <p className="text-gray-700">
                  <strong>{isChinese ? "答：" : "A:"}</strong> {isChinese ? t('eid_article.faq.questions.without_eid.answer') : "Some carriers may be able to activate eSIMs without your EID, but many require it for security and compatibility verification."}
                </p>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{isChinese ? t('eid_article.faq.questions.cant_find_eid.question') : "Q: What if I can't find my EID?"}</h3>
                <p className="text-gray-700">
                  <strong>{isChinese ? "答：" : "A:"}</strong> {isChinese ? t('eid_article.faq.questions.cant_find_eid.answer') : "Contact your device manufacturer or carrier. They can help you locate your EID or determine if your device supports eSIM."}
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 text-white text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-4">{isChinese ? t('eid_article.cta.title') : "Ready to Get Started with eSIM?"}</h2>
            <p className="text-xl mb-6 text-gray-200">{isChinese ? t('eid_article.cta.description') : "Check your device compatibility now and find the perfect eSIM plan for your travels."}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={isChinese ? "/zh/esim-compatibility" : "/esim-compatibility"} className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm">
                {isChinese ? t('eid_article.cta.check_compatibility') : "Check Device Compatibility"}
              </a>
              <a href="https://travelesim.bg/all-destinations" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                {isChinese ? t('eid_article.cta.browse_destinations') : "Browse All Destinations"}
              </a>
            </div>
          </section>
        </article>

        {/* Author Profile */}
        <div className="mt-12">
          <AuthorProfile author={AUTHOR_INFO} />
        </div>
      </div>
    </div>
  );
};

export default EIDArticle; 