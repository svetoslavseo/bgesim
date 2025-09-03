import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthorProfile from '../../components/AuthorProfile';
import { AUTHOR_INFO } from '../../constants';

const EIDBgArticle: React.FC = () => {
  const publishedDate = '2025-03-26';

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Какво е EID номер и как да го откриете (iPhone, Android, други) - Travel eSIMple</title>
        <meta name="description" content="Разберете какво е EID номер, защо е важен за eSIM и как да го намерите на iPhone, Android, iPad, Apple Watch, Windows и Chromebook." />
        <meta name="keywords" content="EID номер, как да намеря EID, eSIM активация, EID iPhone, EID Android, eSIM идентификатор" />
        <meta property="og:title" content="Какво е EID номер и как да го откриете" />
        <meta property="og:description" content="Пълно ръководство за EID номера: намиране на различни устройства, съвети за сигурност и разлики между EID, IMEI и ICCID." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://travelesim.bg/blog/3-4.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://travelesim.bg/articles/kakvo-e-eid-nomer-kak-da-go-odkrijete" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-blue-600">Начало</a> / 
            <a href="/articles" className="hover:text-blue-600">Статии</a> / 
            <span className="text-blue-600">Какво е EID номер?</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Какво е EID номер и как да го откриете на iPhone, Android или друго устройство
          </h1>
          <p className="text-gray-600 mb-4">Публикувано на: март 26, 2025 • Време за четене: ~8 минути</p>
          <p className="text-lg text-gray-700">EID номерът е ключов за eSIM активацията. По-долу ще откриете как да го намерите на различни устройства и как да го съхранявате безопасно.</p>
        </header>

        <div className="mb-8">
          <img src="/blog/3-4.png" alt="Какво е EID номер - ръководство" className="w-full h-auto rounded-lg shadow" loading="eager" />
        </div>

        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-3">Най-важното накратко</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>EID е 32-цифрен идентификатор на eSIM чипа.</li>
            <li>Най-бързите начини за iPhone/Android: Настройки или *#06#.</li>
            <li>Съхранявайте EID на безопасно място – не го споделяйте публично.</li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Съдържание</h2>
          <ol className="list-decimal pl-6 space-y-2 text-blue-700">
            <li><a href="#what" className="hover:underline">Какво е EID</a></li>
            <li><a href="#why" className="hover:underline">Защо е важен</a></li>
            <li><a href="#iphone" className="hover:underline">Как да го намерите на iPhone</a></li>
            <li><a href="#android" className="hover:underline">Как да го намерите на Android</a></li>
            <li><a href="#others" className="hover:underline">Други устройства</a></li>
            <li><a href="#tips" className="hover:underline">Съвети и сигурност</a></li>
            <li><a href="#compare" className="hover:underline">Сравнение: EID vs IMEI vs ICCID</a></li>
            <li><a href="#faq" className="hover:underline">Често задавани въпроси</a></li>
          </ol>
        </section>

        <article className="space-y-10">
          <section id="what" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Какво е EID номер?</h2>
            <p>EID (Embedded Identity Document) е уникален 32-цифрен номер, свързан с eSIM картата на вашето устройство. Мобилните оператори го използват за активиране и управление на eSIM планове. Както IMEI номерът идентифицира физическия телефон, така EID номерът служи за уникално идентифициране на eSIM чипа.</p>
          </section>

          <section id="why" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Защо е важен EID номерът?</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Активиране на eSIM планове:</strong> При покупка на eSIM ще трябва да предоставите своя EID номер за правилно активиране.</li>
              <li><strong>Управление на профили:</strong> Помага на операторите да управляват различните eSIM профили на устройството.</li>
              <li><strong>Техническа поддръжка:</strong> Ползва се за диагностика при проблеми с eSIM връзката.</li>
              <li><strong>Сигурност:</strong> Гарантира, че eSIM профилите се инсталират на правилното устройство.</li>
            </ul>
          </section>

          <section id="iphone" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Как да намерите EID номера на iPhone</h2>
            <h3 className="text-xl font-semibold mb-2">Метод 1: Чрез настройките</h3>
            <ol className="list-decimal pl-6 text-gray-700 space-y-1">
              <li>Отворете Настройки → Основни → Относно</li>
              <li>Превъртете и потърсете EID</li>
            </ol>
            <h3 className="text-xl font-semibold mt-4 mb-2">Метод 2: Чрез приложението за телефон</h3>
            <ol className="list-decimal pl-6 text-gray-700 space-y-1">
              <li>Отворете Телефон</li>
              <li>Наберете <code>*#06#</code></li>
              <li>EID се показва заедно с IMEI</li>
            </ol>
            <h3 className="text-xl font-semibold mt-4 mb-2">Метод 3: В настройките за мобилни данни</h3>
            <ol className="list-decimal pl-6 text-gray-700 space-y-1">
              <li>Настройки → Мобилни данни</li>
              <li>EID е в долната част</li>
            </ol>
          </section>

          <section id="android" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Как да намерите EID номера на Android</h2>
            <h3 className="text-xl font-semibold mb-2">Метод 1: Чрез настройките</h3>
            <ol className="list-decimal pl-6 text-gray-700 space-y-1">
              <li>Настройки → Относно телефона/устройството</li>
              <li>SIM статус / Информация за SIM</li>
              <li>Намерете EID</li>
            </ol>
            <p className="text-sm text-gray-600">Стъпките може да варират според модела и производителя.</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Метод 2: Dial код</h3>
            <ol className="list-decimal pl-6 text-gray-700 space-y-1">
              <li>Отворете Телефон</li>
              <li>Наберете <code>*#06#</code></li>
              <li>Ще видите EID заедно с другата информация</li>
            </ol>
          </section>

          <section id="others" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Как да намерите EID номера на други устройства</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>iPad</strong>: Настройки → Основни → Относно → EID</li>
              <li><strong>Apple Watch</strong>: iPhone → Watch → Основни → Относно → EID</li>
              <li><strong>Windows лаптопи с eSIM</strong>: Настройки → Мрежа и интернет → Мобилни данни → Разширени опции</li>
              <li><strong>Chromebook</strong>: Настройки → Мрежа → Мобилни данни → Информация за SIM</li>
            </ul>
          </section>

          <section id="tips" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Важни съвети за EID номера</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Сигурност:</strong> Не споделяйте EID публично.</li>
              <li><strong>Съхранение:</strong> Запишете EID на безопасно място.</li>
              <li><strong>Проверка:</strong> Потвърдете EID преди поръчка на eSIM план.</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4 rounded">
              <p className="text-blue-900">Планирате eSIM? Проверете първо съвместимостта на телефона си: <a href="/esim-compatibility" className="text-blue-800 underline hover:text-blue-900">Проверка на съвместимост</a>.</p>
            </div>
          </section>

          <section id="compare" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Разлика между EID и други идентификатори</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left">Идентификатор</th>
                    <th className="border border-gray-200 p-3 text-left">Описание</th>
                    <th className="border border-gray-200 p-3 text-left">Използване</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3">EID</td>
                    <td className="border border-gray-200 p-3">32-цифрен номер за eSIM</td>
                    <td className="border border-gray-200 p-3">Активиране на eSIM профили</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3">IMEI</td>
                    <td className="border border-gray-200 p-3">15-цифрен номер за устройството</td>
                    <td className="border border-gray-200 p-3">Идентификация на устройството</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3">ICCID</td>
                    <td className="border border-gray-200 p-3">19–20 цифрен номер за SIM</td>
                    <td className="border border-gray-200 p-3">Идентификация на физическа SIM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="faq" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Често задавани въпроси</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Мога ли да използвам eSIM без да знам EID?</h3>
                <p className="text-gray-700">Някои оператори го позволяват, но много изискват EID за сигурност и съвместимост.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Къде се намира EID при Android устройствата?</h3>
                <p className="text-gray-700">Обичайно: Настройки → Относно телефона → SIM статус/Информация за SIM, или чрез *#06#.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Как да запазя EID безопасно?</h3>
                <p className="text-gray-700">Запишете го на сигурно място или направете екранна снимка и съхранявайте в защитено приложение.</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 text-white text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-3">Готови ли сте за eSIM?</h2>
            <p className="text-gray-200 mb-6">Проверете съвместимостта на телефона си и изберете eSIM план за вашата дестинация.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/esim-compatibility" className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">Проверка на съвместимост</a>
              <a href="/all-destinations" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black">Всички дестинации</a>
            </div>
          </section>
        </article>

        <div className="mt-12">
          <AuthorProfile author={AUTHOR_INFO} />
        </div>
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Какво е EID номер и как да го откриете",
          "description": "Ръководство за EID номера: намиране на iPhone, Android и други устройства; сигурност и сравнения.",
          "datePublished": publishedDate,
          "dateModified": publishedDate,
          "image": "https://travelesim.bg/blog/eid-number-guide.svg",
          "author": {"@type": "Person", "name": "Vasil Andreev", "url": "https://travelesim.bg/author/vasil-andreev"},
          "publisher": {"@type": "Organization", "name": "Travel eSIMple", "logo": {"@type": "ImageObject", "url": "https://travelesim.bg/esim-data/travelesim-logo.png"}},
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://travelesim.bg/articles/kakvo-e-eid-nomer-kak-da-go-odkrijete"},
          "keywords": ["EID номер","eSIM активация","EID iPhone","EID Android"],
          "articleSection": "eSIM ръководство",
          "timeRequired": "PT8M",
          "inLanguage": "bg-BG"
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Начало", "item": "https://travelesim.bg/"},
        {"@type": "ListItem", "position": 2, "name": "Статии", "item": "https://travelesim.bg/articles"},
            {"@type": "ListItem", "position": 3, "name": "Какво е EID номер"}
          ]
        })}
      </script>
    </div>
  );
};

export default EIDBgArticle; 