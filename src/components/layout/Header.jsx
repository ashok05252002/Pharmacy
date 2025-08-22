import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Settings, LogOut, Bell } from 'lucide-react';
import Logo from '../common/Logo';
import LanguageSwitcher from '../common/LanguageSwitcher';
import SearchBar from '../common/SearchBar'; 
import NotificationsPanel from './NotificationsPanel'; // Added
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUser, mockNotifications } from '../../data/mockData'; // Assuming mockNotifications for unread count
import { faker } from '@faker-js/faker';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false); // Added state
  const { language } = useLanguage();
  const navigate = useNavigate();
  const notificationsButtonRef = useRef(null);
  const notificationsPanelRef = useRef(null);


  const navLinks = [
    { name: language === 'ar' ? 'الرئيسية' : 'Home', path: '/home' },
    { name: language === 'ar' ? 'المنتجات' : 'Products', path: '/products' },
    { name: language === 'ar' ? 'الفئات' : 'Categories', path: '/categories' },
    { name: language === 'ar' ? 'التذاكر' : 'Support', path: '/support-tickets' }, // Added Support Tickets
  ];

  const profileMenuItems = [
    { name: language === 'ar' ? 'ملفي الشخصي' : 'My Profile', path: '/profile', icon: <User size={18}/> },
    { name: language === 'ar' ? 'طلباتي' : 'My Orders', path: '/orders', icon: <ShoppingCart size={18}/> },
    { name: language === 'ar' ? 'الإعدادات' : 'Settings', path: '/profile/settings', icon: <Settings size={18}/> },
  ];

  const handleLogout = () => {
    console.log("User logged out");
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false); // Close mobile menu on logout too
    navigate('/login');
  };

  const unreadNotificationsCount = mockNotifications.filter(n => !n.isRead).length;

  // Close notifications panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsButtonRef.current && !notificationsButtonRef.current.contains(event.target) &&
        notificationsPanelRef.current && !notificationsPanelRef.current.contains(event.target) 
      ) {
        setIsNotificationsPanelOpen(false);
      }
      // Similar logic for profile dropdown can be added here if needed
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <Logo />

        <div className="hidden lg:flex flex-1 justify-center px-8">
          <SearchBar onSearch={(term) => console.log('Searching for:', term)} />
        </div>

        <nav className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-medical-gray hover:text-medical-primary transition-colors font-medium px-2 py-1 rounded-md text-sm"
            >
              {link.name}
            </Link>
          ))}
          <LanguageSwitcher />
          
          {/* Notifications Button - Desktop */}
          <div className="relative" ref={notificationsButtonRef}>
            <button 
              onClick={() => setIsNotificationsPanelOpen(!isNotificationsPanelOpen)}
              className="relative text-medical-gray hover:text-medical-primary p-2 rounded-full hover:bg-gray-100"
            >
              <Bell size={22} />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            <div ref={notificationsPanelRef}> {/* This div wraps the panel to help with outside click detection */}
              <NotificationsPanel isOpen={isNotificationsPanelOpen} onClose={() => setIsNotificationsPanelOpen(false)} />
            </div>
          </div>

          <Link to="/cart" className="relative text-medical-gray hover:text-medical-primary p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart size={22} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {faker.number.int({min:0, max: 9})}
            </span>
          </Link>
           <div className="relative">
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="p-2 rounded-full hover:bg-gray-100 text-medical-gray focus:outline-none"
            >
              <User size={22} />
            </button>
            <AnimatePresence>
            {isProfileDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden ring-1 ring-black ring-opacity-5 z-20`}
              >
                <div className="py-1">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{mockUser.name}</p>
                    <p className="text-xs text-medical-gray">{mockUser.email}</p>
                  </div>
                  {profileMenuItems.map((item) => (
                     <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-medical-primary transition-colors"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors border-t border-gray-200"
                  >
                    <LogOut size={18} />
                    <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
                  </button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Menu Button & Icons */}
        <div className="lg:hidden flex items-center space-x-1 rtl:space-x-reverse">
          <LanguageSwitcher className="sm:hidden p-1.5"/>
          {/* Notifications Button - Mobile */}
           <div className="relative sm:hidden" ref={notificationsButtonRef}>
            <button 
              onClick={() => setIsNotificationsPanelOpen(!isNotificationsPanelOpen)}
              className="relative text-medical-gray hover:text-medical-primary p-1.5 rounded-full hover:bg-gray-100"
            >
              <Bell size={20} />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full h-3 w-3 flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
             <div ref={notificationsPanelRef}>
                <NotificationsPanel isOpen={isNotificationsPanelOpen} onClose={() => setIsNotificationsPanelOpen(false)} />
             </div>
          </div>
          <Link to="/cart" className="relative text-medical-gray hover:text-medical-primary p-1.5 block sm:hidden">
            <ShoppingCart size={20} />
             <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full h-3 w-3 flex items-center justify-center">
               {faker.number.int({min:0, max: 9})}
             </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-medical-gray hover:text-medical-primary p-1.5"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <div className="mb-4">
                <SearchBar onSearch={(term) => console.log('Mobile searching for:', term)} />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-medical-gray hover:bg-gray-100 hover:text-medical-primary"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-medical-gray hover:bg-gray-100 hover:text-medical-primary"
                >
                  {language === 'ar' ? 'ملفي الشخصي' : 'My Profile'}
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-medical-gray hover:bg-gray-100 hover:text-red-600"
                  >
                    {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                </button>
              </div>
               <div className="sm:hidden pt-2 border-t border-gray-100">
                 <LanguageSwitcher className="w-full justify-start"/>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
