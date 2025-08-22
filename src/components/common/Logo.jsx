import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const Logo = ({ className = '', imgClassName = 'h-8 sm:h-10', textClassName = 'text-lg sm:text-xl font-bold' }) => {
  const { language } = useLanguage();
  const logoImageUrl = "https://i0.wp.com/taibahealthcare.com/wp-content/uploads/2023/04/001.jpg?fit=800%2C800&ssl=1";
  const companyName = language === 'ar' ? 'صيدلية طيبة' : 'Taiba Pharmacy';

  return (
    <Link to="/home" className={`inline-flex items-center space-x-2 rtl:space-x-reverse hover:opacity-90 transition-opacity ${className}`}>
      <img 
        src={logoImageUrl} 
        alt="Taiba Pharmacy Logo" 
        className={`${imgClassName} w-auto object-contain`}
      />
      <span className={`${textClassName} text-medical-primary`}>
        {companyName}
      </span>
    </Link>
  );
};

export default Logo;
