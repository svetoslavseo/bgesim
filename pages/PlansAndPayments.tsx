import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MdArrowBack, MdArticle, MdAccessTime } from 'react-icons/md';
import i18n from '../i18n';

interface PlansAndPaymentsProps {
  navigateTo: (route: string) => void;
}

const PlansAndPayments: React.FC<PlansAndPaymentsProps> = ({ navigateTo }) => {
  const { t } = useTranslation(['help-center']);

  const plansAndPaymentsArticles = [
    {
      id: 'saily-data-plan-management',
      title: i18n.language === 'zh' ? 'eSIM数据套餐管理' : 
             i18n.language === 'bg' ? 'Управление на eSIM планове за данни' : 
             'eSIM Data Plan Management',
      description: i18n.language === 'zh' 
        ? '了解eSIM数据套餐管理、激活、过期以及如何检查剩余数据。获取关于eSIM服务的常见问题答案。'
        : i18n.language === 'bg'
        ? 'Научете за управлението на eSIM планове за данни, активиране, изтичане и как да проверите останалите данни. Получете отговори на често задавани въпроси за вашия eSIM сервиз.'
        : 'Learn about eSIM data plan management, activation, expiration, and how to check your remaining data. Get answers to common questions about your eSIM service.',
      readingTime: i18n.language === 'zh' ? '5分钟' : 
                   i18n.language === 'bg' ? '5 мин' : 
                   '5 min',
      lastUpdated: i18n.language === 'zh' ? '1天前' : 
                   i18n.language === 'bg' ? 'преди 1 ден' : 
                   '1 day ago',
      link: '/help-center/articles/saily-data-plan-management'
    }
  ];

  const handleArticleClick = (article: any) => {
    if (article.link) {
      navigateTo(article.link);
    }
  };

  const isBulgarian = i18n.language === 'bg';
  const isChinese = i18n.language === 'zh';

  return (
    <>
      <Helmet>
        <html lang={isBulgarian ? 'bg' : 'en'} />
        <title>{isChinese ? '套餐和支付 - Travel eSIMple 帮助中心' : 
                 isBulgarian ? 'Планове и плащания - Travel eSIMple Център за помощ' :
                 'Plans and Payments - Travel eSIMple Help Center'}</title>
        <meta name="description" content={isChinese 
          ? '查找关于eSIM数据套餐、支付、激活和管理的帮助文章。获取关于Travel eSIMple服务的问题答案。'
          : isBulgarian
          ? 'Намерете статии за помощ за eSIM планове за данни, плащания, активиране и управление. Получете отговори на вашите въпроси за услугите на Travel eSIMple.'
          : 'Find help articles about eSIM data plans, payments, activation, and management. Get answers to your questions about Travel eSIMple services.'} />
        <meta name="keywords" content={isChinese 
          ? 'esim套餐, 数据套餐, 支付, 激活, 管理, 帮助文章'
          : isBulgarian
          ? 'esim планове, планове за данни, плащания, активиране, управление, статии за помощ'
          : 'esim plans, data plans, payments, activation, management, help articles'} />
        
        {/* Hreflang tags for language alternatives */}
        <link rel="canonical" href={`https://travelesim.bg${isBulgarian ? '' : '/en'}/help-center/plans-and-payments`} />
        <link rel="alternate" hrefLang="bg" href="https://travelesim.bg/help-center/plans-and-payments" />
        <link rel="alternate" hrefLang="en" href="https://travelesim.bg/en/help-center/plans-and-payments" />
        <link rel="alternate" hrefLang="x-default" href="https://travelesim.bg/help-center/plans-and-payments" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={isChinese ? '套餐和支付 - Travel eSIMple 帮助中心' : 
                                          isBulgarian ? 'Планове и плащания - Travel eSIMple Център за помощ' :
                                          'Plans and Payments - Travel eSIMple Help Center'} />
        <meta property="og:description" content={isChinese 
          ? '查找关于eSIM数据套餐、支付、激活和管理的帮助文章。'
          : isBulgarian
          ? 'Намерете статии за помощ за eSIM планове за данни, плащания, активиране и управление.'
          : 'Find help articles about eSIM data plans, payments, activation, and management.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travelesim.bg/help-center/plans-and-payments" />
        <meta property="og:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        <meta property="og:locale" content={isChinese ? 'zh_CN' : isBulgarian ? 'bg_BG' : 'en_US'} />
        <meta property="og:locale:alternate" content={isChinese ? 'en_US' : isBulgarian ? 'en_US' : 'bg_BG'} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isChinese ? '套餐和支付 - Travel eSIMple 帮助中心' : 
                                              isBulgarian ? 'Планове и плащания - Travel eSIMple Център за помощ' :
                                              'Plans and Payments - Travel eSIMple Help Center'} />
        <meta name="twitter:description" content={isChinese 
          ? '查找关于eSIM数据套餐、支付、激活和管理的帮助文章。'
          : isBulgarian
          ? 'Намерете статии за помощ за eSIM планове за данни, плащания, активиране и управление.'
          : 'Find help articles about eSIM data plans, payments, activation, and management.'} />
        <meta name="twitter:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
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

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <a href={isChinese ? "/zh/help-center" : "/help-center"} className="hover:text-gray-700">
              {isChinese ? '帮助中心' : isBulgarian ? 'Център за помощ' : 'Help Center'}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{isChinese ? '套餐和支付' : isBulgarian ? 'Планове и плащания' : 'Plans and Payments'}</span>
          </nav>

          {/* Page Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isChinese ? '套餐和支付' : isBulgarian ? 'Планове и плащания' : 'Plans and Payments'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isChinese 
                ? '查找关于eSIM数据套餐、支付、激活和管理的帮助文章。获取关于Travel eSIMple服务的问题答案。'
                : isBulgarian
                ? 'Намерете статии за помощ за eSIM планове за данни, плащания, активиране и управление. Получете отговори на вашите въпроси за услугите на Travel eSIMple.'
                : 'Find help articles about eSIM data plans, payments, activation, and management. Get answers to your questions about Travel eSIMple services.'}
            </p>
          </header>

          {/* Back to Help Center */}
          <div className="mb-8">
            <a
              href={isChinese ? "/zh/help-center" : "/help-center"}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/help-center');
              }}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <MdArrowBack className="w-5 h-5 mr-2" />
              {isChinese ? '返回帮助中心' : isBulgarian ? 'Обратно към центъра за помощ' : 'Back to Help Center'}
            </a>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plansAndPaymentsArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <a 
                  href={isChinese ? `/zh${article.link}` : article.link}
                  onClick={(e) => {
                    e.preventDefault();
                    handleArticleClick(article);
                  }}
                  className="block w-full h-full"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <MdArticle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MdAccessTime className="w-4 h-4 mr-1" />
                      {article.readingTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {isChinese ? '更新于' : isBulgarian ? 'Актуализирано' : 'Updated'} {article.lastUpdated}
                    </span>
                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800 transition-colors">
                      {isChinese ? '阅读文章 →' : isBulgarian ? 'Прочетете статията →' : 'Read Article →'}
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {/* No Articles Message */}
          {plansAndPaymentsArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdArticle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isChinese ? '暂无可用文章' : isBulgarian ? 'Все още няма налични статии' : 'No articles available yet'}
              </h3>
              <p className="text-gray-600">
                {isChinese 
                  ? '我们正在为这个类别创建有用的内容。请稍后再来查看，或访问我们的'
                  : isBulgarian
                  ? 'Работим върху създаването на полезно съдържание за тази категория. Проверете отново скоро или посетете нашия '
                  : 'We\'re working on creating helpful content for this category. Check back soon or visit our '}
                <a 
                  href={isChinese ? "/zh/help-center" : "/help-center"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/help-center');
                  }}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {isChinese ? '帮助中心' : isBulgarian ? 'център за помощ' : 'Help Center'}
                </a>
                {isChinese ? '查看其他文章。' : isBulgarian ? ' за други статии.' : ' for other articles.'}
              </p>
            </div>
          )}

          {/* Related Categories */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {isChinese ? '探索其他类别' : isBulgarian ? 'Разгледайте други категории' : 'Explore Other Categories'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href={isChinese ? "/zh/help-center" : "/help-center"}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/help-center');
                }}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 text-center transition-colors block"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {isChinese ? '开始使用' : isBulgarian ? 'Започване' : 'Getting Started'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isChinese ? '设置、激活和首次使用指南' : isBulgarian ? 'Ръководства за настройка, активиране и първоначално използване' : 'Setup, activation, and first-time use guides'}
                </p>
              </a>
              <a
                href={isChinese ? "/zh/help-center" : "/help-center"}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/help-center');
                }}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 text-center transition-colors block"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {isChinese ? '故障排除' : isBulgarian ? 'Отстраняване на проблеми' : 'Troubleshooting'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isChinese ? '常见问题及其解决方案' : isBulgarian ? 'Общи проблеми и техните решения' : 'Common issues and their solutions'}
                </p>
              </a>
              <a
                href={isChinese ? "/zh/help-center" : "/help-center"}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/help-center');
                }}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 text-center transition-colors block"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {isChinese ? '常见问题' : isBulgarian ? 'Често задавани въпроси' : 'FAQ'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isChinese ? '常见问题和答案' : isBulgarian ? 'Често задавани въпроси и отговори' : 'Frequently asked questions and answers'}
                </p>
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PlansAndPayments;
