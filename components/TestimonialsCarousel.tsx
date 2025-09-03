import React, { useState, useEffect } from 'react';
// Remove react-world-flags import to fix loading issue
// import WorldFlag from 'react-world-flags';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const testimonials = [
  {
    name: 'Anna Smith',
    country: 'UK',
    countryCode: 'GB',
    avatar: '🇬🇧',
    text: 'Best eSIM experience ever! Fast, easy, and reliable.'
  },
  {
    name: 'Carlos Mendez',
    country: 'Spain',
    countryCode: 'ES',
    avatar: '🇪🇸',
    text: 'Saved me so much money on roaming. Highly recommended!'
  },
  {
    name: 'Yuki Tanaka',
    country: 'Japan',
    countryCode: 'JP',
    avatar: '🇯🇵',
    text: 'Setup was instant. Great coverage during my trip.'
  }
];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const TestimonialsCarousel: React.FC = () => {
  const { t } = useTranslation('testimonials');
  const isMobile = useIsMobile();
  const visibleCount = isMobile ? 1 : 2;
  const [index, setIndex] = useState(0);
  const maxIndex = testimonials.length - visibleCount;
  const next = () => setIndex((i) => (i + visibleCount > maxIndex ? 0 : i + visibleCount));
  const prev = () => setIndex((i) => (i - visibleCount < 0 ? maxIndex : i - visibleCount));
  const visibleTestimonials = testimonials.slice(index, index + visibleCount).concat(
    index + visibleCount > testimonials.length
      ? testimonials.slice(0, index + visibleCount - testimonials.length)
      : []
  );
  return (
    <section className="my-12 max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">{t('title')}</h2>
      <div className="relative">
        <div className={`grid gap-6 transition-all duration-500 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {visibleTestimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-xl shadow text-center flex flex-col items-center">
              <div className="flex justify-center mb-4">
                {/* <WorldFlag code={t.countryCode} height="48" /> */}
              </div>
              <blockquote className="text-lg text-gray-700 italic mb-4">"{t.text}"</blockquote>
              <div className="font-semibold text-gray-900">{t.name}</div>
              <div className="text-sm text-gray-500 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2">
                  <img 
                    src={`https://flagcdn.com/w40/${t.countryCode.toLowerCase()}.png`} 
                    alt={`${t.country} flag`} 
                    className="w-6 h-auto rounded-sm shadow-sm"
                  />
                  {t.country}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          <button aria-label="Previous testimonial" onClick={prev} className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100">‹</button>
          <button aria-label="Next testimonial" onClick={next} className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100">›</button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel; 