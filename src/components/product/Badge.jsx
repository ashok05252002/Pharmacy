import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PRODUCT_BADGES } from '../../data/mockData'; // Assuming PRODUCT_BADGES is exported

const Badge = ({ text, className = '' }) => {
  const { language } = useLanguage();
  let bgColor = 'bg-gray-500';
  let textColor = 'text-white';
  let translatedText = text;

  switch (text) {
    case PRODUCT_BADGES.NEW:
      bgColor = 'bg-medical-accent'; // Blue
      translatedText = language === 'ar' ? 'جديد' : 'New';
      break;
    case PRODUCT_BADGES.OFFER:
      bgColor = 'bg-red-500';
      translatedText = language === 'ar' ? 'عرض' : 'Offer';
      break;
    case PRODUCT_BADGES.PRESCRIPTION_REQUIRED:
      bgColor = 'bg-yellow-500';
      textColor = 'text-yellow-900';
      translatedText = language === 'ar' ? 'وصفة إلزامية' : 'Rx Only';
      break;
    default:
      // Keep default gray for unknown badges
      break;
  }

  return (
    <span 
      className={`px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full shadow ${bgColor} ${textColor} ${className}`}
    >
      {translatedText}
    </span>
  );
};

export default Badge;
