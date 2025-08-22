import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, titleAr, value, icon, link, linkText, linkTextAr, color = 'medical-primary', description, descriptionAr }) => {
  const { language } = useLanguage();
  const IconComponent = icon;

  const cardColorClasses = {
    'medical-primary': 'border-medical-primary bg-medical-primary/5 hover:border-medical-primary/70',
    'medical-secondary': 'border-medical-secondary bg-medical-secondary/5 hover:border-medical-secondary/70',
    'medical-accent': 'border-medical-accent bg-medical-accent/5 hover:border-medical-accent/70',
    'green': 'border-green-500 bg-green-500/5 hover:border-green-600',
    'yellow': 'border-yellow-500 bg-yellow-500/5 hover:border-yellow-600',
    'red': 'border-red-500 bg-red-500/5 hover:border-red-600',
  };
  
  const iconColorClasses = {
    'medical-primary': 'text-medical-primary',
    'medical-secondary': 'text-medical-secondary',
    'medical-accent': 'text-medical-accent',
    'green': 'text-green-500',
    'yellow': 'text-yellow-500',
    'red': 'text-red-500',
  };


  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-5 bg-white rounded-xl shadow-lg border-t-4 ${cardColorClasses[color]} transition-all duration-300 hover:shadow-xl flex flex-col h-full`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-700">{language === 'ar' ? titleAr : title}</h3>
        {IconComponent && <IconComponent size={24} className={`${iconColorClasses[color]}`} />}
      </div>
      {value && <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>}
      {description && <p className="text-xs text-gray-500 mb-3 flex-grow">{language === 'ar' ? descriptionAr : description}</p>}
      
      {link && (
        <Link to={link} className="mt-auto text-sm font-medium text-gray-600 hover:text-gray-900 group flex items-center self-start">
          <span>{language === 'ar' ? linkTextAr : linkText}</span>
          <ArrowRight size={16} className={`ml-1 rtl:mr-1 rtl:transform rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${iconColorClasses[color]}`} />
        </Link>
      )}
    </motion.div>
  );
};

export default DashboardCard;
