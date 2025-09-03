import React from 'react';
import { useTranslation } from 'react-i18next';

const CountryContentSection: React.FC<{ countryName: string }> = ({ countryName }) => {
  const { t } = useTranslation('content');
  
  return (
    <section className="my-16 max-w-3xl mx-auto text-gray-700 text-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('why_use_esim', { country: countryName })}</h2>
      <p>{t('esim_benefits', { country: countryName })}</p>
    </section>
  );
};

export default CountryContentSection; 