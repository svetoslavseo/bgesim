import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ArticleFeedback from '../../components/ArticleFeedback';
import i18n from '../../i18n';

interface SailyDataPlanManagementProps {
  navigateTo: (route: string) => void;
}

const SailyDataPlanManagement: React.FC<SailyDataPlanManagementProps> = ({ navigateTo }) => {
  const { t } = useTranslation(['help-center']);

  const isBulgarian = i18n.language === 'bg';
  const isChinese = i18n.language === 'zh';

  return (
    <>
      <Helmet>
        <html lang={isBulgarian ? 'bg' : 'en'} />
        <title>{isChinese ? 'eSIM数据套餐管理 - Travel eSIMple 帮助中心' : 
                 isBulgarian ? 'Управление на eSIM планове за данни - Travel eSIMple Център за помощ' :
                 'eSIM Data Plan Management - Travel eSIMple Help Center'}</title>
        <meta name="description" content={isChinese 
          ? '了解eSIM数据套餐管理、激活、过期以及如何检查剩余数据。获取关于eSIM服务的常见问题答案。'
          : isBulgarian
          ? 'Научете за управлението на eSIM планове за данни, активиране, изтичане и как да проверите останалите данни. Получете отговори на често задавани въпроси за вашия eSIM сервиз.'
          : 'Learn about eSIM data plan management, activation, expiration, and how to check your remaining data. Get answers to common questions about your eSIM service.'} />
        <meta name="keywords" content={isChinese 
          ? 'esim数据套餐, esim管理, 数据激活, 数据过期, 剩余数据, 附加包'
          : isBulgarian
          ? 'esim планове за данни, esim управление, активиране на данни, изтичане на данни, останали данни, допълнителни пакети'
          : 'esim data plan, esim management, data activation, data expiration, remaining data, addon packs'} />
        
        {/* Hreflang tags for language alternatives */}
        <link rel="canonical" href={`https://travelesim.bg${isBulgarian ? '' : '/en'}/help-center/articles/saily-data-plan-management`} />
        <link rel="alternate" hrefLang="bg" href="https://travelesim.bg/help-center/articles/saily-data-plan-management" />
        <link rel="alternate" hrefLang="en" href="https://travelesim.bg/en/help-center/articles/saily-data-plan-management" />
        <link rel="alternate" hrefLang="x-default" href="https://travelesim.bg/help-center/articles/saily-data-plan-management" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={isChinese ? 'eSIM数据套餐管理 - Travel eSIMple 帮助中心' : 
                                          isBulgarian ? 'Управление на eSIM планове за данни - Travel eSIMple Център за помощ' :
                                          'eSIM Data Plan Management - Travel eSIMple Help Center'} />
        <meta property="og:description" content={isChinese 
          ? '了解eSIM数据套餐管理、激活、过期以及如何检查剩余数据。'
          : isBulgarian
          ? 'Научете за управлението на eSIM планове за данни, активиране, изтичане и как да проверите останалите данни.'
          : 'Learn about eSIM data plan management, activation, expiration, and how to check your remaining data.'} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://travelesim.bg/help-center/articles/saily-data-plan-management" />
        <meta property="og:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        <meta property="og:locale" content={isChinese ? 'zh_CN' : isBulgarian ? 'bg_BG' : 'en_US'} />
        <meta property="og:locale:alternate" content={isChinese ? 'en_US' : isBulgarian ? 'en_US' : 'bg_BG'} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isChinese ? 'eSIM数据套餐管理 - Travel eSIMple 帮助中心' : 
                                              isBulgarian ? 'Управление на eSIM планове за данни - Travel eSIMple Център за помощ' :
                                              'eSIM Data Plan Management - Travel eSIMple Help Center'} />
        <meta name="twitter:description" content={isChinese 
          ? '了解eSIM数据套餐管理、激活、过期以及如何检查剩余数据。'
          : isBulgarian
          ? 'Научете за управлението на eSIM планове за данни, активиране, изтичане и как да проверите останалите данни.'
          : 'Learn about eSIM data plan management, activation, expiration, and how to check your remaining data.'} />
        <meta name="twitter:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        
        {/* Article Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": isChinese ? "eSIM数据套餐管理" : 
                       isBulgarian ? "Управление на eSIM планове за данни" :
                       "eSIM Data Plan Management",
            "description": isChinese 
              ? "了解eSIM数据套餐管理、激活、过期以及如何检查剩余数据。获取关于eSIM服务的常见问题答案。"
              : isBulgarian
              ? "Научете за управлението на eSIM планове за данни, активиране, изтичане и как да проверите останалите данни. Получете отговори на често задавани въпроси за вашия eSIM сервиз."
              : "Learn about eSIM data plan management, activation, expiration, and how to check your remaining data. Get answers to common questions about your eSIM service.",
            "image": "https://travelesim.bg/esim-data/travelesim-logo.png",
            "author": {
              "@type": "Organization",
              "name": "Travel eSIMple"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Travel eSIMple",
              "logo": {
                "@type": "ImageObject",
                "url": "https://travelesim.bg/esim-data/travelesim-logo.png"
              }
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://travelesim.bg${isChinese ? '/zh' : ''}/help-center/articles/saily-data-plan-management`
            },
            "articleSection": isChinese ? "套餐和支付" : isBulgarian ? "Планове и плащания" : "Plans and Payments",
            "keywords": isChinese 
              ? "esim数据套餐, esim管理, 数据激活, 数据过期, 剩余数据, 附加包"
              : isBulgarian
              ? "esim планове за данни, esim управление, активиране на данни, изтичане на данни, останали данни, допълнителни пакети"
              : "esim data plan, esim management, data activation, data expiration, remaining data, addon packs"
          })}
        </script>
      </Helmet>

      <div className="bg-white min-h-screen">
        {/* Header Navigation */}
        <header className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <a href={isChinese ? "/zh" : "/"} className="text-2xl font-bold text-gray-800">
                  Travel eSIMple
                </a>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a 
                  href={isChinese ? "/zh/all-destinations" : "/all-destinations"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/all-destinations");
                  }}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {t('navigation.destinations')}
                </a>
                <a href="/what-is-esim" className="text-gray-700 hover:text-gray-900 transition-colors">
                  {t('navigation.what_is_esim')}
                </a>
                <a href="/about-us" className="text-gray-700 hover:text-gray-900 transition-colors">
                  {t('navigation.about_us')}
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <a href={isChinese ? "/zh/help-center" : "/help-center"} className="hover:text-gray-700">
              {isChinese ? '帮助中心' : isBulgarian ? 'Център за помощ' : 'Help Center'}
            </a>
            <span className="mx-2">/</span>
            <a 
              href={isChinese ? "/zh/help-center/plans-and-payments" : "/help-center/plans-and-payments"}
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/help-center/plans-and-payments");
              }}
              className="hover:text-gray-700 hover:underline"
            >
              {isChinese ? '套餐和支付' : isBulgarian ? 'Планове и плащания' : 'Plans and Payments'}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{isChinese ? 'eSIM数据套餐管理' : isBulgarian ? 'Управление на eSIM планове за данни' : 'eSIM Data Plan Management'}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isChinese ? 'eSIM数据套餐管理' : isBulgarian ? 'Управление на eSIM планове за данни' : 'eSIM Data Plan Management'}
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>{isChinese ? '最后更新：' : isBulgarian ? 'Последна актуализация: ' : 'Last updated: '}{new Date().toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{isChinese ? '阅读时间：5分钟' : isBulgarian ? 'Време за четене: 5 мин' : 'Reading time: 5 min'}</span>
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            {/* Disclaimer Section */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-amber-800 mb-2">
                    {isChinese ? '重要通知' : isBulgarian ? 'Важно уведомление' : 'Important Notice'}
                  </h3>
                  <p className="text-amber-700 text-base leading-relaxed">
                    <strong>Travel eSIMple</strong> {isChinese ? '提供' : isBulgarian ? 'предоставя продукта на ' : 'is providing the product of '}<strong>Saily</strong>{isChinese ? '的产品。' : isBulgarian ? '.' : '.'} 
                    {isChinese 
                      ? 'Saily负责与其eSIM服务相关的任何不便、服务问题或技术问题。Travel eSIMple作为经销商，无法保证Saily服务的质量或可靠性。'
                      : isBulgarian
                      ? 'Saily е отговорен за всякакви неудобства, проблеми със сервиза или технически проблеми, свързани с техния eSIM сервиз. Travel eSIMple действа като дистрибутор и не може да гарантира качеството или надеждността на сервиза на Saily.'
                      : 'Saily is responsible for any inconveniences, service issues, or technical problems related to their eSIM service. Travel eSIMple acts as a reseller and cannot guarantee the quality or reliability of Saily\'s service.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{isChinese ? '概述' : isBulgarian ? 'Обзор' : 'Overview'}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isChinese 
                  ? '在本文中，我们将介绍一些关于Saily数据套餐管理的常见问题。了解您的数据套餐如何工作将帮助您充分利用Saily eSIM服务，并在旅行期间避免任何意外问题。'
                  : isBulgarian
                  ? 'В тази статия ще разгледаме някои често задавани въпроси относно управлението на планове за данни на Saily. Разбирането как работи вашият план за данни ще ви помогне да използвате максимално услугата Saily eSIM и да избегнете всякакви неочаквани проблеми по време на пътуванията си.'
                  : 'In this article, we will cover some commonly asked questions regarding Saily data plan management. Understanding how your data plan works will help you make the most of your Saily eSIM service and avoid any unexpected issues during your travels.'}
              </p>
            </section>

            {/* Data Expiration Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {isChinese ? '有效期结束后未使用的数据会发生什么？' : isBulgarian ? 'Какво се случва с неизползваните данни след изтичане на валидността?' : 'What happens to the unused data after the validity period?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isChinese 
                  ? '一旦有效期结束，您的套餐和任何可能剩余的数据都会过期。这意味着您无法将未使用的数据转移到新套餐或延长有效期。重要的是在指定的时间范围内使用您的数据，以获得购买的完整价值。'
                  : isBulgarian
                  ? 'След като периодът на валидност приключи, вашият план и всички данни, които може да са останали, изтичат. Това означава, че не можете да пренесете неизползвани данни към нов план или да удължите периода на валидност. Важно е да използвате данните си в рамките на определеното време, за да получите пълната стойност на покупката си.'
                  : 'Once the validity period is over, your plan and any data that might have been left expire. This means you cannot carry forward unused data to a new plan or extend the validity period. It\'s important to use your data within the specified timeframe to get the full value of your purchase.'}
              </p>
            </section>

            {/* Activation Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {isChinese ? '我什么时候可以激活我的数据套餐？' : isBulgarian ? 'Кога мога да активирам плана си за данни?' : 'When can I activate my data plan?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isChinese 
                  ? '您可以在购买后30天内安装和激活eSIM。只要您确保在旅行前安装了Saily eSIM，数据套餐就会自动激活。这为您提供了提前准备的灵活性，同时确保您的服务在需要时准备就绪。'
                  : isBulgarian
                  ? 'Можете да инсталирате и активирате eSIM в рамките на 30 дни от покупката. Планът за данни ще се активира автоматично, стига да се уверите, че вашият Saily eSIM е инсталиран преди пътуването си. Това ви дава гъвкавост да се подготвите предварително, като същевременно гарантира, че услугата ви е готова, когато имате нужда от нея.'
                  : 'You can install and activate the eSIM within 30 days of purchase. The data plan will be activated automatically as long as you make sure that your Saily eSIM is installed prior to your trip. This gives you flexibility to prepare in advance while ensuring your service is ready when you need it.'}
              </p>
            </section>

            {/* Package Start Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {isChinese ? '我的eSIM数据套餐什么时候开始？' : isBulgarian ? 'Кога започва пакетът ми за eSIM данни?' : 'When does my eSIM data package start?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isChinese 
                  ? '如果您在旅行前安装了Saily eSIM，您的Saily eSIM数据套餐将在您到达目的地后自动开始工作。系统会检测您的位置并激活相应的数据套餐，因此您可以立即开始使用互联网，无需任何手动配置。'
                  : isBulgarian
                  ? 'Ако инсталирате вашия Saily eSIM преди пътуването си, пакетът ви за Saily eSIM данни ще започне да работи автоматично веднага щом кацнете на дестинацията си. Системата открива местоположението ви и активира съответния план за данни, така че можете веднага да започнете да използвате интернет без никаква ръчна конфигурация.'
                  : 'If you install your Saily eSIM prior to your trip, your Saily eSIM data package will start working automatically as soon as you land at your destination. The system detects your location and activates the appropriate data plan, so you can start using the internet immediately without any manual configuration.'}
              </p>
            </section>

            {/* Check Data Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {isChinese ? '如何检查我的剩余数据？' : isBulgarian ? 'Как да проверя останалите си данни?' : 'How do I check my remaining data?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isChinese 
                  ? '您可以通过Saily移动应用程序或登录网站上的账户来检查剩余数据。该应用程序提供数据使用的实时更新，以易于阅读的格式显示已使用和剩余的数据。这有助于您监控消费并相应地进行规划。'
                  : isBulgarian
                  ? 'Можете да проверите останалите си данни чрез мобилното приложение на Saily или като влезете в акаунта си на уебсайта. Приложението предоставя актуализации в реално време за използването на данни, показвайки както използваните, така и останалите данни в лесно четим формат. Това ви помага да следите консумацията си и да планирате съответно.'
                  : 'You can check your remaining data through the Saily mobile app or by logging into your account on the website. The app provides real-time updates on your data usage, showing both used and remaining data in an easy-to-read format. This helps you monitor your consumption and plan accordingly.'}
              </p>
            </section>

            {/* Run Out of Data Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {isChinese ? '如果我的数据用完了怎么办？' : isBulgarian ? 'Какво се случва, ако ми свършат данните?' : 'What happens if I run out of data?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isChinese 
                  ? '如果您在有效期结束前用完数据，可以购买额外的数据包来继续使用服务。这些附加包有各种大小，可以直接通过Saily应用程序购买。额外的数据将使用与您原始套餐相同的有效期。'
                  : isBulgarian
                  ? 'Ако ви свършат данните преди да приключи периодът на валидност, можете да закупите допълнителни пакети с данни, за да продължите да използвате услугата. Тези допълнителни пакети са налични в различни размери и могат да бъдат закупени директно чрез приложението на Saily. Допълнителните данни ще използват същия период на валидност като оригиналния ви план.'
                  : 'If you run out of data before your validity period ends, you can purchase additional data packs to continue using the service. These add-on packs are available in various sizes and can be purchased directly through the Saily app. The additional data will use the same validity period as your original plan.'}
              </p>
            </section>

            {/* Pause Plan Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {isChinese ? '我可以暂停或暂停我的数据套餐吗？' : isBulgarian ? 'Мога ли да спря или приостановя плана си за данни?' : 'Can I pause or suspend my data plan?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isChinese 
                  ? '目前，Saily数据套餐一旦激活就无法暂停或暂停。套餐将继续运行，直到有效期到期或所有数据被消耗。如果您需要暂时停止使用服务，可以在设备设置中禁用eSIM，但套餐将继续倒计时。'
                  : isBulgarian
                  ? 'В момента плановете за данни на Saily не могат да бъдат спрени или приостановени след активиране. Планът ще продължи да работи, докато не изтече периодът на валидност или не се изразходят всички данни. Ако имате нужда временно да спрете използването на услугата, можете да деактивирате eSIM в настройките на устройството си, но планът ще продължи да брои обратно.'
                  : 'Currently, Saily data plans cannot be paused or suspended once activated. The plan will continue running until the validity period expires or all data is consumed. If you need to temporarily stop using the service, you can disable the eSIM in your device settings, but the plan will continue counting down.'}
              </p>
            </section>
          </article>

          {/* Feedback Component */}
          <div className="mt-12">
            <ArticleFeedback 
              articleId="saily-data-plan-management"
              articleTitle={isChinese ? 'eSIM数据套餐管理' : isBulgarian ? 'Управление на eSIM планове за данни' : 'eSIM Data Plan Management'}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default SailyDataPlanManagement;
