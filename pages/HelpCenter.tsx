import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { 
  MdRocketLaunch, 
  MdCreditCard, 
  MdBuild, 
  MdQuestionAnswer,
  MdSearch,
  MdKeyboardArrowRight,
  MdClose,
  MdArticle
} from 'react-icons/md';
import i18n from '../i18n';

interface HelpCenterProps {
  navigateTo: (route: string) => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ navigateTo }) => {
  const { t } = useTranslation(['help-center']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Define searchable content
  const searchableContent = [
    {
      id: 'esim-activation',
      title: i18n.language === 'zh' ? 'eSIM激活指南' : i18n.language === 'bg' ? 'Ръководство за активиране на eSIM' : 'eSIM Activation Guide',
      description: i18n.language === 'zh' ? '学习如何逐步激活您的eSIM' : i18n.language === 'bg' ? 'Научете как да активирате вашия eSIM стъпка по стъпка' : 'Learn how to activate your eSIM step by step',
      category: i18n.language === 'zh' ? '开始使用' : i18n.language === 'bg' ? 'Започване' : 'Getting Started',
      link: '/help-center/articles/esim-activation-guide',
      keywords: ['activation', 'setup', 'install', 'qr code', 'esim']
    },
    {
      id: 'data-plan-management',
      title: i18n.language === 'zh' ? 'eSIM数据套餐管理' : i18n.language === 'bg' ? 'Управление на eSIM планове за данни' : 'eSIM Data Plan Management',
      description: i18n.language === 'zh' ? '管理您的eSIM数据套餐和使用情况' : i18n.language === 'bg' ? 'Управлявайте вашите eSIM планове за данни и използване' : 'Manage your eSIM data plans and usage',
      category: i18n.language === 'zh' ? '套餐和支付' : i18n.language === 'bg' ? 'Планове и плащания' : 'Plans and Payments',
      link: '/help-center/articles/saily-data-plan-management',
      keywords: ['data', 'plan', 'usage', 'management', 'billing']
    },
    {
      id: 'device-compatibility',
      title: i18n.language === 'zh' ? '设备兼容性' : i18n.language === 'bg' ? 'Съвместимост на устройствата' : 'Device Compatibility',
      description: i18n.language === 'zh' ? '检查您的设备是否支持eSIM' : i18n.language === 'bg' ? 'Проверете дали вашето устройство поддържа eSIM' : 'Check if your device supports eSIM',
      category: i18n.language === 'zh' ? '开始使用' : i18n.language === 'bg' ? 'Започване' : 'Getting Started',
      link: '/esim-compatibility',
      keywords: ['compatibility', 'device', 'support', 'iphone', 'android']
    },
    {
      id: 'troubleshooting',
      title: i18n.language === 'zh' ? '常见问题故障排除' : i18n.language === 'bg' ? 'Отстраняване на чести проблеми' : 'Troubleshooting Common Issues',
      description: i18n.language === 'zh' ? '常见eSIM问题的解决方案' : i18n.language === 'bg' ? 'Решения на чести eSIM проблеми' : 'Solutions to common eSIM problems',
      category: i18n.language === 'zh' ? '故障排除' : i18n.language === 'bg' ? 'Отстраняване на проблеми' : 'Troubleshooting',
      link: '#troubleshooting',
      keywords: ['troubleshooting', 'problems', 'issues', 'fix', 'help']
    },
    {
      id: 'whatsapp-china',
      title: i18n.language === 'zh' ? '在中国使用WhatsApp' : i18n.language === 'bg' ? 'Използване на WhatsApp в Китай' : 'Using WhatsApp in China',
      description: i18n.language === 'zh' ? '使用eSIM在中国使用WhatsApp的完整指南' : i18n.language === 'bg' ? 'Пълно ръководство за използване на WhatsApp в Китай с eSIM' : 'Complete guide to using WhatsApp in China with eSIM',
      category: i18n.language === 'zh' ? '旅行指南' : i18n.language === 'bg' ? 'Ръководство за пътуване' : 'Travel Guide',
      link: '/articles/whatsapp-in-china',
      keywords: ['whatsapp', 'china', 'vpn', 'blocked', 'travel']
    },
    {
      id: 'payment-methods',
      title: i18n.language === 'zh' ? '支付方式' : i18n.language === 'bg' ? 'Методи на плащане' : 'Payment Methods',
      description: i18n.language === 'zh' ? 'eSIM套餐的可用支付选项' : i18n.language === 'bg' ? 'Налични опции за плащане за eSIM планове' : 'Available payment options for eSIM plans',
      category: i18n.language === 'zh' ? '套餐和支付' : i18n.language === 'bg' ? 'Планове и плащания' : 'Plans and Payments',
      link: '#payment-methods',
      keywords: ['payment', 'billing', 'credit card', 'paypal', 'methods']
    }
  ];

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return searchableContent.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const descriptionMatch = item.description.toLowerCase().includes(query);
      const categoryMatch = item.category.toLowerCase().includes(query);
      const keywordsMatch = item.keywords.some(keyword => keyword.includes(query));
      
      return titleMatch || descriptionMatch || categoryMatch || keywordsMatch;
    });
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleResultClick = (link: string) => {
    if (link.startsWith('#')) {
      // Handle anchor links (scroll to section)
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to page
      navigateTo(link);
    }
    clearSearch();
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    if (showSearchResults) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSearchResults]);

  const handleCategoryClick = (category: string) => {
    // TODO: Navigate to category-specific help pages
    if (category === 'plans_payments') {
      navigateTo('/help-center/plans-and-payments');
    } else {
      console.log('Category clicked:', category);
    }
  };





  const categories = [
    {
      id: 'getting_started',
      icon: <MdRocketLaunch className="w-8 h-8" />,
      title: t('categories.getting_started.title'),
      description: t('categories.getting_started.description')
    },
    {
      id: 'plans_payments',
      icon: <MdCreditCard className="w-8 h-8" />,
      title: t('categories.plans_payments.title'),
      description: t('categories.plans_payments.description')
    },
    {
      id: 'troubleshooting',
      icon: <MdBuild className="w-8 h-8" />,
      title: t('categories.troubleshooting.title'),
      description: t('categories.troubleshooting.description')
    },
    {
      id: 'faq',
      icon: <MdQuestionAnswer className="w-8 h-8" />,
      title: t('categories.faq.title'),
      description: t('categories.faq.description')
    }
  ];

  const recentArticles = [
         {
       tag: t('articles.plans'),
       title: i18n.language === 'zh' ? 'eSIM数据套餐管理' : i18n.language === 'bg' ? 'Управление на eSIM планове за данни' : 'eSIM Data Plan Management',
       date: i18n.language === 'zh' ? '1天前' : i18n.language === 'bg' ? 'преди 1 ден' : '1 day ago',
       link: '/help-center/articles/saily-data-plan-management',
       category: i18n.language === 'zh' ? '套餐和支付' : i18n.language === 'bg' ? 'Планове и плащания' : 'Plans and Payments'
     },
    {
      tag: t('articles.about_travel_esimple'),
      title: i18n.language === 'zh' ? '支持的休息室目的地' : i18n.language === 'bg' ? 'Поддържани дестинации за лаундж' : 'Supported lounge destinations',
      date: i18n.language === 'zh' ? '3天前' : i18n.language === 'bg' ? 'преди 3 дни' : '3 days ago',
      link: '/help-center/articles/supported-lounge-destinations',
      category: i18n.language === 'zh' ? '关于Travel eSIMple' : i18n.language === 'bg' ? 'За Travel eSIMple' : 'About Travel eSIMple'
    },
    {
      tag: t('articles.using_esim'),
      title: i18n.language === 'zh' ? 'Travel eSIMple使用和常见问题' : i18n.language === 'bg' ? 'Използване на Travel eSIMple и често задавани въпроси' : 'Travel eSIMple usage and commonly asked questions',
      date: i18n.language === 'zh' ? '17天前' : i18n.language === 'bg' ? 'преди 17 дни' : '17 days ago',
      link: '/help-center/articles/travel-esimple-usage',
      category: i18n.language === 'zh' ? '使用eSIM' : i18n.language === 'bg' ? 'Използване на eSIM' : 'Using eSIM'
    },
    {
      tag: t('articles.plans'),
      title: i18n.language === 'zh' ? 'Travel eSIMple数据套餐管理' : i18n.language === 'bg' ? 'Управление на планове за данни на Travel eSIMple' : 'Travel eSIMple data plan management',
      date: i18n.language === 'zh' ? '17天前' : i18n.language === 'bg' ? 'преди 17 дни' : '17 days ago',
      link: '/help-center/articles/travel-esimple-data-plan-management',
      category: i18n.language === 'zh' ? '套餐和支付' : i18n.language === 'bg' ? 'Планове и плащания' : 'Plans and Payments'
    },
    {
      tag: t('articles.using_esim'),
      title: i18n.language === 'zh' ? 'Travel eSIMple基础知识和功能' : i18n.language === 'bg' ? 'Основни знания и функционалност на Travel eSIMple' : 'Travel eSIMple basics and functionality',
      date: i18n.language === 'zh' ? '17天前' : i18n.language === 'bg' ? 'преди 17 дни' : '17 days ago',
      link: '/help-center/articles/travel-esimple-basics',
      category: i18n.language === 'zh' ? '使用eSIM' : i18n.language === 'bg' ? 'Използване на eSIM' : 'Using eSIM'
    }
  ];

  return (
    <>
      <Helmet>
        <html lang={i18n.language === 'bg' ? 'bg' : 'en'} />
        <title>{i18n.language === 'zh' ? 'Travel eSIMple 帮助中心' : i18n.language === 'bg' ? 'Travel eSIMple Център за помощ' : 'Travel eSIMple Help Center'}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        
        {/* Hreflang tags for language alternatives */}
        <link rel="canonical" href={`https://travelesim.bg${i18n.language === 'en' ? '/en' : ''}/help-center`} />
        <link rel="alternate" hrefLang="bg" href="https://travelesim.bg/help-center" />
        <link rel="alternate" hrefLang="en" href="https://travelesim.bg/en/help-center" />
        <link rel="alternate" hrefLang="x-default" href="https://travelesim.bg/help-center" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={i18n.language === 'zh' ? 'Travel eSIMple 帮助中心' : i18n.language === 'bg' ? 'Travel eSIMple Център за помощ' : 'Travel eSIMple Help Center'} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travelesim.bg/help-center" />
        <meta property="og:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        <meta property="og:locale" content={i18n.language === 'zh' ? 'zh_CN' : i18n.language === 'bg' ? 'en_US' : 'en_US'} />
        <meta property="og:locale:alternate" content={i18n.language === 'zh' ? 'en_US' : i18n.language === 'bg' ? 'zh_CN' : 'zh_CN'} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={i18n.language === 'zh' ? 'Travel eSIMple 帮助中心' : i18n.language === 'bg' ? 'Travel eSIMple Център за помощ' : 'Travel eSIMple Help Center'} />
        <meta name="twitter:description" content={t('meta.description')} />
        <meta name="twitter:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
      </Helmet>

      <div className="bg-white min-h-screen">
        {/* Header Navigation */}
        <header className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <a href={i18n.language === 'zh' ? "/zh" : "/"} className="text-xl sm:text-2xl font-bold text-gray-800">
                  Travel eSIMple
                </a>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a 
                  href={i18n.language === 'zh' ? "/zh/all-destinations" : "/all-destinations"}
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
              {/* Mobile menu button could be added here if needed */}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-white py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            {/* Background decorative elements - hidden on mobile */}
            <div className="hidden md:block absolute top-0 right-0 w-96 h-96 opacity-20">
              <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400 rounded-full"></div>
              <div className="absolute top-40 right-40 w-24 h-24 bg-yellow-400 rounded-full"></div>
              <div className="absolute top-60 right-60 w-16 h-16 bg-blue-300 rounded-full"></div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 sm:mb-8 leading-tight">
              {t('hero.title')}
            </h1>
            
            <div className="max-w-4xl mx-auto relative" ref={searchRef}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white border-2 border-gray-200 rounded-2xl sm:rounded-full p-2 shadow-lg">
                <div className="flex-1 flex items-center px-4 sm:px-6 py-2 sm:py-0">
                  <MdSearch className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mr-2 sm:mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder={t('hero.search_placeholder')}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="flex-1 text-base sm:text-lg outline-none min-w-0"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                    >
                      <MdClose className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-black text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-full font-semibold hover:bg-gray-800 transition-colors mt-2 sm:mt-0 text-sm sm:text-base"
                >
                  {t('hero.search_button')}
                </button>
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      <div className="text-xs text-gray-500 px-4 py-2 font-medium uppercase tracking-wide">
                        {i18n.language === 'zh' 
                          ? `找到 ${searchResults.length} 个结果`
                          : `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} found`}
                      </div>
                      {searchResults.map((result) => (
                        <a
                          key={result.id}
                          href={i18n.language === 'zh' && result.link.startsWith('/help-center/') ? `/zh${result.link}` : result.link}
                          onClick={(e) => {
                            e.preventDefault();
                            handleResultClick(result.link);
                          }}
                          className="block w-full text-left p-4 hover:bg-gray-50 rounded-xl transition-colors group"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <MdArticle className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 line-clamp-1">
                                {result.title}
                              </h3>
                              <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">
                                {result.description}
                              </p>
                              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                {result.category}
                              </span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                                          <div className="p-8 text-center">
                        <MdSearch className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-gray-900 font-medium mb-1">
                          {i18n.language === 'zh' ? '未找到结果' : i18n.language === 'bg' ? 'Не са намерени резултати' : 'No results found'}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {i18n.language === 'zh' 
                            ? '尝试搜索其他内容或浏览下面的类别。'
                            : 'Try searching for something else or browse our categories below.'}
                        </p>
                      </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              {t('categories.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  {category.id === 'plans_payments' ? (
                    <a 
                      href={i18n.language === 'zh' ? "/zh/help-center/plans-and-payments" : "/help-center/plans-and-payments"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(category.id);
                      }}
                      className="block w-full h-full"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                        <div className="text-blue-600">
                          {category.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </a>
                  ) : (
                    <div onClick={() => handleCategoryClick(category.id)}>
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                        <div className="text-blue-600">
                          {category.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  {t('recent_activity.title')}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 {recentArticles.map((article, index) => (
                   <div
                     key={index}
                     className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                   >
                     <a 
                       href={i18n.language === 'zh' ? `/zh${article.link}` : article.link}
                       onClick={(e) => {
                         e.preventDefault();
                         navigateTo(article.link);
                       }}
                       className="block w-full h-full"
                     >
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                         {article.category}
                       </span>
                     </div>
                     <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                       {article.title}
                     </h3>
                     <p className="text-sm text-gray-500">
                       {i18n.language === 'zh' ? '文章创建于' : i18n.language === 'bg' ? 'Статията е създадена на' : 'Article created'} {article.date}
                     </p>
                     </a>
                   </div>
                 ))}
              </div>
              
              <div className="text-center mt-8">
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto group">
                  {t('recent_activity.see_more')}
                  <MdKeyboardArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  );
};

export default HelpCenter;
