import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const MobileBottomNav = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const navItems = [
    { name: language === 'ar' ? 'الرئيسية' : 'Home', path: '/home', icon: Home },
    { name: language === 'ar' ? 'الفئات' : 'Categories', path: '/categories', icon: ShoppingBag },
    { name: language === 'ar' ? 'السلة' : 'Cart', path: '/cart', icon: ShoppingCart },
    { name: language === 'ar' ? 'الدردشة' : 'Chat', path: '/chat', icon: MessageSquare },
    { name: language === 'ar' ? 'حسابي' : 'Profile', path: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path || (path === '/home' && location.pathname === '/');


  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-top p-2 z-40">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors w-1/5
                ${isActive(item.path) ? 'text-medical-primary bg-medical-primary/10' : 'text-medical-gray hover:bg-gray-100 hover:text-medical-primary'}`}
            >
              <IconComponent size={22} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              <span className={`mt-1 text-xs font-medium ${isActive(item.path) ? 'font-semibold' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
