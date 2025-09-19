import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = '', imgClassName = 'h-8 sm:h-10' }) => {
  const logoImageUrl = "https://taibarare.com/wp-content/themes/taiba/assets/img/home/footer/TAIBA%20ACCESS%20RARE%20FOOTER%20LOGO_.png";

  return (
    <Link to="/home" className={`inline-flex items-center space-x-2 rtl:space-x-reverse hover:opacity-90 transition-opacity ${className}`}>
      <img 
        src={logoImageUrl} 
        alt="Taiba Pharmacy Logo" 
        className={`${imgClassName} w-auto object-contain`}
      />
    </Link>
  );
};

export default Logo;
