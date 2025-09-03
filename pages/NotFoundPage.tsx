import React from 'react';
import { FaRegCompass } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface NotFoundPageProps {
  navigateTo: (route: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigateTo }) => {
  const { t } = useTranslation('common');
  return (
    <section
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      data-page-404="true"
    >
      {/* Icon */}
      <FaRegCompass className="text-brand-accent w-16 h-16 mb-6" aria-hidden="true" />

      {/* Heading */}
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-600 mb-8 max-w-lg">
        {t('not_found.message')}
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-md shadow hover:bg-gray-900 transition-colors"
        >
          {t('not_found.go_home')}
        </button>
        <button
          onClick={() => navigateTo('/all-destinations')}
          className="inline-flex items-center justify-center px-6 py-3 border border-brand-accent text-brand-accent rounded-md hover:bg-brand-accent/10 transition-colors"
        >
          {t('not_found.explore_destinations')}
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
