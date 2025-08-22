import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-medical-gray dark:text-gray-300 ${className}`}
      aria-label={language === 'ar' ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'}
    >
      <div className="flex items-center">
        <Languages size={20} />
        <span className="ml-2 rtl:mr-2 text-sm font-medium">
          {language === 'en' ? 'AR' : 'EN'}
        </span>
      </div>
    </button>
  );
};

export default LanguageSwitcher;
