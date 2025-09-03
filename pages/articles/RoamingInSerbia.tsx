import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthorProfile from '../../components/AuthorProfile';
import { AUTHOR_INFO } from '../../constants';

const RoamingInSerbia: React.FC = () => {
  const publishedDate = '2025-08-13';

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Роуминг в Сърбия: Пълно ръководство за пътуващи - Travel eSIMple</title>
        <meta
          name="description"
          content="Пълно ръководство за роуминг в Сърбия: тарифи по оператор, eSIM алтернативи, локални SIM карти, Wi‑Fi, съвети за спестяване, покритие и често задавани въпроси."
        />
        <meta
          name="keywords"
          content="роуминг Сърбия, цени роуминг Сърбия, eSIM Сърбия, локална SIM Сърбия, мобилни данни Сърбия, пътуване Сърбия интернет"
        />
        <meta property="og:title" content="Роуминг в Сърбия: Пълно ръководство за пътуващи" />
        <meta
          property="og:description"
          content="Цени за роуминг, eSIM алтернативи, локални оператори, съвети за спестяване и покритие в Сърбия."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://travelesim.bg/articles/roaming-v-sarbia-pualno-rakovodstvo" />
        <meta property="og:image" content="https://travelesim.bg/blog/syrbia-rouming-min.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Роуминг в Сърбия: Пълно ръководство за пътуващи" />
        <meta name="twitter:description" content="Цени, алтернативи, съвети и покритие. Всичко за връзка в Сърбия." />
        <link rel="canonical" href="https://travelesim.bg/articles/roaming-v-sarbia-pualno-rakovodstvo" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-blue-600">Начало</a> / 
            <a href="/articles" className="hover:text-blue-600">Статии</a> / 
            <span className="text-blue-600">Роуминг в Сърбия</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Роуминг в Сърбия: Пълно ръководство за пътуващи
          </h1>
          <p className="text-gray-600 mb-4">Публикувано на: август 13, 2025 • Време за четене: ~6 минути</p>
          <p className="text-lg text-gray-700">
            Планираш пътуване до Сърбия и се чудиш как да останеш онлайн? В това ръководство ще намериш актуални тарифи за роуминг,
            сравнение с eSIM и локални SIM карти, настройки за икономия на данни, покритие и практични съвети.
          </p>
        </header>

        <div className="mb-8">
          <img src="/blog/syrbia-rouming-min.png" alt="Роуминг в Сърбия - мобилна свързаност" className="w-full h-auto rounded-lg shadow" loading="eager" />
        </div>

        {/* Key takeaways */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-3">Най-важното накратко</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Сърбия е извън ЕС – роумингът се таксува по специални тарифи на оператора.</li>
            <li>eSIM е най-удобната и често по-изгодна алтернатива за кратки пътувания.</li>
            <li>Локална SIM е добра при по-дълъг престой и голям обем данни.</li>
            <li>Ограничете фоновите данни и използвайте Wi‑Fi, за да намалите разходите.</li>
          </ul>
        </section>

        {/* Table of contents */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Съдържание</h2>
          <ol className="list-decimal pl-6 space-y-2 text-blue-700">
            <li><a href="#roaming-bg-rs" className="hover:underline">Роуминг от България към Сърбия</a></li>
            <li><a href="#prices" className="hover:underline">Тарифи по оператор</a></li>
            <li><a href="#alternatives" className="hover:underline">Алтернативи: eSIM, локална SIM, Wi‑Fi</a></li>
            <li><a href="#save" className="hover:underline">Съвети за спестяване</a></li>
            <li><a href="#coverage" className="hover:underline">Покритие и Wi‑Fi</a></li>
            <li><a href="#compare" className="hover:underline">Сравнение: eSIM vs Роуминг vs Локална SIM</a></li>
            <li><a href="#faq" className="hover:underline">ЧЗВ</a></li>
          </ol>
        </section>

        <article className="space-y-10">
          <section id="roaming-bg-rs" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1) Роуминг от България към Сърбия</h2>
            <p className="text-gray-700">Сърбия не е част от ЕС и правилата „роуминг като у дома“ не важат. При ползване на български план в Сърбия ще се прилагат специални тарифи на оператора.</p>
          </section>

          <section id="prices" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2) Тарифи по оператор (ориентировъчно)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left">Оператор</th>
                    <th className="border border-gray-200 p-3 text-left">Изходящи</th>
                    <th className="border border-gray-200 p-3 text-left">Входящи</th>
                    <th className="border border-gray-200 p-3 text-left">SMS</th>
                    <th className="border border-gray-200 p-3 text-left">Мобилни данни</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3">Виваком</td>
                    <td className="border border-gray-200 p-3">~1.20 лв/мин</td>
                    <td className="border border-gray-200 p-3">~0.60 лв/мин</td>
                    <td className="border border-gray-200 p-3">~0.30 лв</td>
                    <td className="border border-gray-200 p-3">~12 лв/МБ</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3">А1</td>
                    <td className="border border-gray-200 p-3">~1.15 лв/мин</td>
                    <td className="border border-gray-200 p-3">~0.58 лв/мин</td>
                    <td className="border border-gray-200 p-3">~0.29 лв</td>
                    <td className="border border-gray-200 p-3">~11.50 лв/МБ</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3">Yettel</td>
                    <td className="border border-gray-200 p-3">~1.10 лв/мин</td>
                    <td className="border border-gray-200 p-3">~0.55 лв/мин</td>
                    <td className="border border-gray-200 p-3">~0.28 лв</td>
                    <td className="border border-gray-200 p-3">~11 лв/МБ</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-2">Цените са ориентировъчни. Провери актуалните тарифи при твоя оператор.</p>
          </section>

          <section id="alternatives" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3) Алтернативи на роуминга</h2>
            <h3 className="text-xl font-semibold mb-2">eSIM карти</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Мгновено активиране</li>
              <li>Без физическа SIM</li>
              <li>Запазваш основния си номер</li>
              <li>Често по-ниска цена от роуминг</li>
            </ul>
            <p className="text-gray-700 mb-4">За планиране на пътуване виж <a href="/all-destinations" className="text-blue-700 underline hover:text-blue-900">всички дестинации</a> и провери <a href="/esim-compatibility" className="text-blue-700 underline hover:text-blue-900">съвместимостта на устройството</a>.</p>

            <h3 className="text-xl font-semibold mb-2">Локални SIM карти</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>mts (Telekom Srbija) – най-широко покритие, туристически планове</li>
              <li>Yettel Serbia – добро градско покритие</li>
              <li>A1 Serbia – конкурентни цени, лесно активиране</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Мобилни Wi‑Fi устройства</h3>
            <p className="text-gray-700">Подходящи за групи/семейства – споделяш връзката между няколко устройства.</p>
          </section>

          <section id="save" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4) Съвети за спестяване</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Преди заминаване</h3>
                <ol className="list-decimal pl-6 space-y-1 text-gray-700">
                  <li>Провери роуминг тарифите</li>
                  <li>Купи eSIM план за Сърбия</li>
                  <li>Изключи автоматични актуализации</li>
                  <li>Свали офлайн карти</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">По време на пътуване</h3>
                <ol className="list-decimal pl-6 space-y-1 text-gray-700">
                  <li>Използвай Wi‑Fi, когато е възможно</li>
                  <li>Ограничи фоновите данни</li>
                  <li>Използвай приложения за обаждания (WhatsApp, Viber)</li>
                  <li>Изключи роуминг за данни, ако не го ползваш</li>
                </ol>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mt-4 mb-2">Настройки на телефона</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>iOS</strong>: Настройки → Мобилни данни → Опции → Роуминг данни (изключи)</li>
              <li><strong>Android</strong>: Настройки → Мрежи → Мобилни мрежи → Роуминг данни (изключи)</li>
            </ul>
          </section>

          <section id="coverage" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5) Покритие и Wi‑Fi</h2>
            <p className="text-gray-700 mb-2">Градовете и главните пътища имат добро покритие; в планински райони сигналът отслабва.</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Белград</strong>: отлично покритие</li>
              <li><strong>Нови Сад</strong>: добро покритие</li>
              <li><strong>Ниш</strong>: добро покритие в града</li>
              <li><strong>Планински райони</strong>: ограничено покритие</li>
            </ul>
            <p className="text-gray-700 mt-2">В повечето хотели, заведения и молове има безплатен Wi‑Fi.</p>
          </section>

          <section id="compare" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6) Сравнение: eSIM vs Роуминг vs Локална SIM</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left">Критерий</th>
                    <th className="border border-gray-200 p-3 text-left">eSIM</th>
                    <th className="border border-gray-200 p-3 text-left">Роуминг</th>
                    <th className="border border-gray-200 p-3 text-left">Локална SIM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3">Цена</td>
                    <td className="border border-gray-200 p-3">Обикновено ниска/средна</td>
                    <td className="border border-gray-200 p-3">Висока</td>
                    <td className="border border-gray-200 p-3">Ниска при голям обем</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3">Удобство</td>
                    <td className="border border-gray-200 p-3">Мгновено, без карта</td>
                    <td className="border border-gray-200 p-3">Без смяна на карта</td>
                    <td className="border border-gray-200 p-3">Нужен е магазин/активация</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3">Най-подходящо за</td>
                    <td className="border border-gray-200 p-3">Кратки пътувания</td>
                    <td className="border border-gray-200 p-3">Спешни случаи</td>
                    <td className="border border-gray-200 p-3">Дълги престои</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="faq" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7) Често задавани въпроси</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Работи ли WhatsApp/Viber в Сърбия?</h3>
                <p className="text-gray-700">Да. При eSIM/локална SIM мобилните приложения работят нормално според планa.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">По-добре ли е eSIM от роуминг?</h3>
                <p className="text-gray-700">За кратки пътувания – обикновено да, заради по-ниската цена и лесната активация.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Мога ли да запазя българския си номер?</h3>
                <p className="text-gray-700">Да. Използвай eSIM за данни и остави основната SIM активна само за обаждания/SMS.</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 text-white text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-3">Готов ли си за пътуването?</h2>
            <p className="text-gray-200 mb-6">Провери съвместимостта на телефона си и избери подходящ eSIM план.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/esim-compatibility" className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">Провери съвместимост</a>
              <a href="/all-destinations" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black">Виж всички дестинации</a>
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
          "headline": "Роуминг в Сърбия: Пълно ръководство за пътуващи",
          "description": "Ръководство за роуминг в Сърбия: цени, eSIM, локални SIM, Wi‑Fi и съвети.",
          "datePublished": publishedDate,
          "dateModified": publishedDate,
          "image": "https://travelesim.bg/blog/esim-adoption.png",
          "author": {"@type": "Person", "name": "Vasil Andreev", "url": "https://travelesim.bg/author/vasil-andreev"},
          "publisher": {"@type": "Organization", "name": "Travel eSIMple", "logo": {"@type": "ImageObject", "url": "https://travelesim.bg/esim-data/travelesim-logo.png"}},
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://travelesim.bg/articles/roaming-v-sarbia-pualno-rakovodstvo"},
          "keywords": ["роуминг Сърбия","eSIM Сърбия","локална SIM Сърбия"],
          "articleSection": "Пътни ръководства",
          "timeRequired": "PT6M",
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
            {"@type": "ListItem", "position": 3, "name": "Роуминг в Сърбия"}
          ]
        })}
      </script>
    </div>
  );
};

export default RoamingInSerbia; 