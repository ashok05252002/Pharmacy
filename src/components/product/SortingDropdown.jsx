import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const SortingDropdown = ({ currentSort, onSortChange }) => {
    const { language } = useLanguage();
    const sortOptions = [
        { value: 'popular', label: language === 'ar' ? 'الأكثر رواجاً' : 'Most Popular' },
        { value: 'price_asc', label: language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High' },
        { value: 'price_desc', label: language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low' },
        { value: 'newest', label: language === 'ar' ? 'الأحدث' : 'Newest' },
    ];
    return (
        <select 
            value={currentSort} 
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm border-gray-300 rounded-md p-2.5 focus:ring-medical-primary focus:border-medical-primary bg-white shadow-sm appearance-none"
            aria-label={language === 'ar' ? 'ترتيب حسب' : 'Sort by'}
        >
            {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
};

export default SortingDropdown;
