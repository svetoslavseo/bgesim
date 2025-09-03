import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface ArticlesPageProps {
  navigateTo: (route: string) => void;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ navigateTo }) => {
  const { t, i18n } = useTranslation(['articles']);
  const isBulgarian = i18n.language === 'bg';

  const articles = [
    {
      id: 'whatsapp-in-china',
      title: isBulgarian ? t('whatsapp_in_china.title') : 'Can You Use WhatsApp in China in 2025? The Complete Guide',
      description: isBulgarian ? t('whatsapp_in_china.description') : 'Complete guide to using WhatsApp in China in 2025. Learn why it\'s blocked, how to access it with eSIM, VPN, or roaming, and discover alternatives like WeChat.',
      image: '/whatsapp-in-china.png',
      readingTime: isBulgarian ? t('whatsapp_in_china.reading_time') : 'Reading time: 8 minutes',
      date: '2025-01-20',
      category: isBulgarian ? 'Пътни ръководства' : 'Travel Guide',
      slug: 'whatsapp-in-china'
    },
    {
      id: 'esim-adoption-trends',
      title: isBulgarian ? t('esim_adoption_trends.title') : '2024 Global eSIM Adoption Trends: Market Size, Growth Drivers & iSIM Future',
      description: isBulgarian ? t('esim_adoption_trends.description') : '2024 is a defining year for mobile connectivity. eSIM technology has evolved from a niche market for early adopters to a mainstream global force.',
      image: '/blog/esim-adoption.png',
      readingTime: isBulgarian ? t('esim_adoption_trends.reading_time') : 'Reading time: 10 minutes',
      date: '2024-01-15',
      category: isBulgarian ? 'eSIM технология' : 'eSIM Technology',
      slug: 'esim-adoption-trends'
    },
    {
      id: 'kakvo-e-eid-nomer',
      title: 'Какво е EID номер и как да го откриете',
      description: 'Какво е EID, защо е важен и как да го намерите на iPhone, Android, iPad, Apple Watch, Windows и Chromebook.',
      image: '/blog/3-4.png',
      readingTime: 'Време за четене: 8 минути',
      date: '2025-03-26',
      category: 'eSIM ръководство',
      slug: 'kakvo-e-eid-nomer-kak-da-go-odkrijete'
    },
    {
      id: 'esim-vs-sim-bg',
      title: 'eSIM или SIM карта: Коя е по-подходяща за вас?',
      description: 'Сравнение между eSIM и физическа SIM карта: плюсове, минуси, сигурност, съвместимост и препоръки.',
      image: '/blog/1-4.png',
      readingTime: 'Време за четене: 9 минути',
      date: '2025-03-25',
      category: 'eSIM ръководство',
      slug: 'esim-ili-sim-karta-koja-e-po-podhodascha'
    },
    {
      id: 'roaming-serbia',
      title: 'Роуминг в Сърбия: Пълно ръководство за пътуващи',
      description: 'Цени за роуминг, eSIM алтернативи, локални оператори, съвети за спестяване и покритие в Сърбия.',
      image: '/blog/syrbia-rouming-min.png',
      readingTime: 'Време за четене: 6 минути',
      date: '2025-08-13',
      category: 'Пътни ръководства',
      slug: 'roaming-v-sarbia-pualno-rakovodstvo'
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{i18n.language === 'bg' ? 'Статии - Travel eSIMple' : 'Articles - Travel eSIMple'}</title>
        <meta name="description" content={i18n.language === 'bg' ? 'Разгледайте задълбочени статии и ръководства за технологията eSIM, свързаност при пътуване и мобилни технологии.' : 'Explore in-depth articles and guides about eSIM technology, travel connectivity, and mobile technology.'} />
        <meta property="og:title" content={i18n.language === 'bg' ? 'Статии - Travel eSIMple' : 'Articles - Travel eSIMple'} />
        <meta property="og:description" content={i18n.language === 'bg' ? 'Разгледайте задълбочени статии и ръководства за технологията eSIM, свързаност при пътуване и мобилни технологии.' : 'Explore in-depth articles and guides about eSIM technology, travel connectivity, and mobile technology.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travelesim.bg/articles" />
        <link rel="canonical" href="https://travelesim.bg/articles" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <nav className="text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-blue-600">{i18n.language === 'bg' ? "Начало" : "Home"}</a> / 
            <span className="text-blue-600">{i18n.language === 'bg' ? "Статии" : "Articles"}</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {i18n.language === 'bg' ? "Статии за eSIM и технологии за пътуване" : "eSIM & Travel Technology Articles"}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {i18n.language === 'bg' ? "Надникнете в технологията eSIM, решенията за свързаност при пътуване и последните тенденции в мобилните технологии. Нашият екип от експерти предлага практични ръководства и задълбочени анализи, за да извлечете максимума от модерната свързаност." : "Dive deep into eSIM technology, travel connectivity solutions, and the latest trends in mobile technology. Our expert team provides practical guides and in-depth analysis to help you make the most of modern connectivity technology."}
          </p>
        </header>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">{article.readingTime}</span>
                </div>
                
                <a 
                  href={`/articles/${article.slug}`}
                  className="block mb-3 hover:text-blue-600 transition-colors duration-200"
                >
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {article.title}
                  </h2>
                </a>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString(isBulgarian ? 'bg-BG' : 'en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  
                  <a 
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
                  >
                    {i18n.language === 'bg' ? "Прочети още" : "Read More"}
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage; 