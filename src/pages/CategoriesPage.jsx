import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockCategories } from '../data/mockData';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Sparkles, Pill, FileText, Activity, Baby, Thermometer } from 'lucide-react'; // Assuming you have these icons
import { motion } from 'framer-motion';

const iconMap = { Sparkles, Pill, FileText, Activity, Baby, Thermometer, ShoppingBag };


const CategoriesPage = () => {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <ShoppingBag size={32} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {language === 'ar' ? 'جميع الفئات' : 'All Categories'}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockCategories.map((category, index) => {
          const IconComponent = iconMap[category.icon || 'ShoppingBag']; // Fallback to ShoppingBag
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link 
                to={`/products/${category.id}`} 
                className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
              >
                <div className="flex-grow">
                    <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-4">
                        <img src={category.image} alt={language === 'ar' ? category.nameAr : category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    </div>
                    <div className="flex items-center mb-2">
                        <IconComponent size={24} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0 transition-colors group-hover:text-medical-dark" />
                        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-medical-primary transition-colors">
                        {language === 'ar' ? category.nameAr : category.name}
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {language === 'ar' ? `تصفح منتجات ${category.nameAr}` : `Browse products in ${category.name}`}
                    </p>
                </div>
                <div className="mt-auto text-right rtl:text-left">
                    <span className="text-sm font-medium text-medical-accent group-hover:underline flex items-center justify-end rtl:justify-start">
                        {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                        {language === 'ar' ? <ChevronRight size={18} className="transform rotate-180 ml-1" /> : <ChevronRight size={18} className="ml-1" />}
                    </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesPage;
