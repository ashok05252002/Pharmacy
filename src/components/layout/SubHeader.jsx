import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockCategories } from '../../data/mockData';

const SubHeader = () => {
    const { language } = useLanguage();

    const linkClasses = "text-white hover:bg-white/10 whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors";
    const activeLinkClasses = "bg-white/20 font-semibold";

    return (
        <div className="bg-medical-primary shadow-md sticky top-[68px] sm:top-[76px] z-40">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-start">
                    <nav className="flex items-center -ml-3 rtl:-mr-3 overflow-x-auto custom-scrollbar w-full">
                        {mockCategories.map(category => (
                            <NavLink
                                key={category.id}
                                to={`/products/${category.id}`}
                                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                            >
                                {language === 'ar' ? category.nameAr : category.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SubHeader;
