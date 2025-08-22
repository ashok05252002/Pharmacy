import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockProducts, mockCategories, mockBrands, mockBrandsAr } from '../../data/mockData'; // Assuming brands are exported
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const { language } = useLanguage();
  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const productSuggestions = mockProducts
        .filter(p => (language === 'ar' ? p.nameAr : p.name).toLowerCase().includes(lowerSearchTerm))
        .slice(0, 3)
        .map(p => ({ type: language === 'ar' ? 'منتج' : 'Product', name: language === 'ar' ? p.nameAr : p.name, link: `/product/${p.id}` }));

      const categorySuggestions = mockCategories
        .filter(c => (language === 'ar' ? c.nameAr : c.name).toLowerCase().includes(lowerSearchTerm))
        .slice(0, 2)
        .map(c => ({ type: language === 'ar' ? 'فئة' : 'Category', name: language === 'ar' ? c.nameAr : c.name, link: `/products/${c.id}` }));
      
      const currentBrands = language === 'ar' ? mockBrandsAr : mockBrands;
      const brandSuggestions = currentBrands
        .filter(b => b.toLowerCase().includes(lowerSearchTerm))
        .slice(0, 2)
        .map(b => ({ type: language === 'ar' ? 'ماركة' : 'Brand', name: b, link: `/products?brand=${encodeURIComponent(b)}` }));

      setSuggestions([...productSuggestions, ...categorySuggestions, ...brandSuggestions]);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, language]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSuggestions([]);
      setIsFocused(false);
      // navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`); // Optional: navigate on submit
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div ref={searchContainerRef} className={`relative w-full max-w-md lg:max-w-xl ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`absolute inset-y-0 ${language === 'ar' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={language === 'ar' ? 'ابحث عن منتجات, ماركات...' : 'Search products, brands...'}
          className={`w-full py-2.5 border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-medical-primary focus:border-transparent outline-none transition-all
            ${language === 'ar' ? 'pr-10 pl-10 sm:pl-12' : 'pl-10 pr-10 sm:pr-12'} 
          `}
        />
        {searchTerm && (
           <button
            type="button"
            onClick={handleClearSearch}
            className={`absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-gray-500 hover:text-gray-700`}
            aria-label={language === 'ar' ? 'مسح البحث' : 'Clear search'}
          >
            <X size={18} />
          </button>
        )}
         {/* Voice search icon placeholder - visual only */}
        <button 
          type="button" 
          className={`absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3 sm:pl-4' : 'right-0 pr-3 sm:pr-4'} ${searchTerm ? (language === 'ar' ? 'sm:left-8' : 'sm:right-8') : ''} items-center text-gray-500 hover:text-medical-primary hidden sm:flex`}
          aria-label={language === 'ar' ? 'بحث صوتي' : 'Voice search'}
          onClick={() => alert(language === 'ar' ? 'ميزة البحث الصوتي قيد التطوير' : 'Voice search feature is under development')}
        >
          <Mic size={20} />
        </button>
      </form>
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-80 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <Link
                  to={suggestion.link}
                  onClick={() => {
                    setSearchTerm(suggestion.name); // Optional: fill search bar with suggestion name
                    setIsFocused(false);
                    setSuggestions([]);
                  }}
                  className="flex justify-between items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-medical-primary transition-colors"
                >
                  <span>{suggestion.name}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                    {suggestion.type}
                  </span>
                </Link>
              </li>
            ))}
             {searchTerm && suggestions.length > 0 && (
              <li>
                <Link
                  to={`/products?search=${encodeURIComponent(searchTerm)}`}
                  onClick={() => { setIsFocused(false); setSuggestions([]); }}
                  className="block px-4 py-2.5 text-sm font-semibold text-medical-primary hover:bg-gray-100 text-center"
                >
                  {language === 'ar' ? `عرض كل النتائج لـ "${searchTerm}"` : `View all results for "${searchTerm}"`}
                </Link>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
