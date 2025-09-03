import React from 'react';
import { useTranslation } from 'react-i18next';

interface ESIMCompatibilityProps {
  onCheckCompatibility?: () => void;
}

const ESIMCompatibility: React.FC<ESIMCompatibilityProps> = ({ onCheckCompatibility }) => {
  const { t } = useTranslation('home');
  
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Top Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 border-2 border-blue-300 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('compatibility_title')}
          </h2>

          {/* Descriptive Text */}
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {t('compatibility_description')}
          </p>

          {/* Call-to-Action Button */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onCheckCompatibility) onCheckCompatibility();
            }}
            className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            {t('check_compatibility')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ESIMCompatibility; 