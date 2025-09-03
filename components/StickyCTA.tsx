import React from 'react';
import { useTranslation } from 'react-i18next';

const StickyCTA: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { t } = useTranslation('cta');
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Try to find the Choose Your Plan section
    const choosePlanSection = document.getElementById('choose-your-plan');
    if (choosePlanSection) {
      choosePlanSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback to the original onClick if section not found
      onClick();
    }
  };

  return (
    <a
      href="#choose-your-plan"
      onClick={handleClick}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-8 py-4 rounded-full shadow-lg z-50 text-lg font-bold hover:bg-gray-800 transition-all inline-block"
    >
      {t('buy_esim_now')}
    </a>
  );
};

export default StickyCTA; 