import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, Settings, LogOut, Menu, X, Languages as LanguageIcon, Power } from 'lucide-react'; // Added Power
import Logo from '../common/Logo'; 
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockUser } from '../../data/mockData'; 
import { motion, AnimatePresence } from 'framer-motion';

const AdminHeader = ({ toggleSidebar, isSidebarOpen, userRole }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isDeliveryOnline, setIsDeliveryOnline] = useState(true); // Mock state for delivery staff

  const profileMenuItems = [
    // { name: language === 'ar' ? 'الملف الشخصي' : 'Profile', path: '#', icon: <User size={18}/> },
    // { name: language === 'ar' ? 'الإعدادات' : 'Settings', path: '#', icon: <Settings size={18}/> },
  ];

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    navigate('/login');
  };
  
  const roleName = userRole.charAt(0).toUpperCase() + userRole.slice(1).replace('_', ' ');

  const handleDeliveryStatusToggle = () => {
    setIsDeliveryOnline(!isDeliveryOnline);
    // Add logic to update backend/state
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden mr-3 rtl:ml-3 rtl:mr-0"
            aria-label={isSidebarOpen ? (language === 'ar' ? 'إغلاق الشريط الجانبي' : 'Close sidebar') : (language === 'ar' ? 'فتح الشريط الجانبي' : 'Open sidebar')}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="hidden sm:block">
            <Logo />
          </div>
           <span className="ml-2 rtl:mr-2 text-xs sm:text-sm text-gray-500 font-medium hidden md:inline">({roleName} {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'})</span>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <LanguageSwitcher />
          
          {userRole === 'delivery_staff' && (
            <button
              onClick={handleDeliveryStatusToggle}
              className={`flex items-center space-x-1 rtl:space-x-reverse px-2 py-1 rounded-md text-xs font-medium transition-colors
                ${isDeliveryOnline ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
            >
              <Power size={14} />
              <span>{isDeliveryOnline ? (language === 'ar' ? 'متصل' : 'Online') : (language === 'ar' ? 'غير متصل' : 'Offline')}</span>
            </button>
          )}

          {userRole !== 'delivery_staff' && (
            <button className="relative text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
          )}

          <div className="relative">
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 rtl:space-x-reverse p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <img 
                src={mockUser.profilePictureUrl} 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden md:inline text-sm text-gray-700 font-medium">{mockUser.name}</span>
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
                    <p className="text-xs text-gray-500">{mockUser.email}</p>
                    <p className="text-xs text-medical-primary font-medium mt-1">{roleName}</p>
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
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
