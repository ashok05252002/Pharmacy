import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockUser } from '../data/mockData';
import { User, Edit3, ShoppingBag, Heart, Award, Settings, LogOut, MapPin, FileText, Gift, Shield, Camera } from 'lucide-react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';

const ProfilePage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [biometricEnabled, setBiometricEnabled] = useState(false); // Mock state

  const profileSections = [
    { name: language === 'ar' ? 'طلباتي' : 'My Orders', icon: ShoppingBag, link: '/orders', count: mockUser.ordersCount || 5 }, // Assuming ordersCount is added to mockUser
    { name: language === 'ar' ? 'وصفاتي الطبية' : 'My Prescriptions', icon: FileText, link: '/profile/my-prescriptions', count: mockUser.prescriptionsCount || 3 },
    { name: language === 'ar' ? 'العناوين' : 'Addresses', icon: MapPin, link: '/profile/manage-addresses' },
    { name: language === 'ar' ? 'نقاط الولاء' : 'Loyalty Points', icon: Award, link: '/loyalty', value: `${mockUser.loyaltyPoints} pts` },
    { name: language === 'ar' ? 'العروض والقسائم' : 'Campaigns & Coupons', icon: Gift, link: '/profile/campaigns' },
    { name: language === 'ar' ? 'إعدادات الحساب' : 'Account Settings', icon: Settings, link: '/profile/edit' },
  ];

  const handleLogout = () => {
    console.log("User logged out from profile");
    navigate('/login');
  };

  const handleProfilePicChange = () => {
    // Mock functionality
    alert(language === 'ar' ? 'ميزة تغيير صورة الملف الشخصي قيد التطوير.' : 'Change profile picture feature is under development.');
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration:0.5 }}
      >
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <img 
              src={mockUser.profilePictureUrl} 
              alt={mockUser.name} 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-4 ring-medical-primary/30 shadow-md object-cover"
            />
            <button 
                onClick={handleProfilePicChange}
                className="absolute bottom-0 right-0 rtl:left-0 rtl:right-auto bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100" 
                aria-label={language === 'ar' ? 'تغيير الصورة' : 'Change Photo'}
            >
              <Camera size={18} className="text-medical-primary"/>
            </button>
          </div>
          <div className="text-center sm:text-left rtl:sm:text-right flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{mockUser.name}</h1>
            <p className="text-medical-gray text-sm">{mockUser.email}</p>
            <p className="text-xs text-medical-gray mt-1">
              {language === 'ar' ? 'عضو منذ:' : 'Member since:'} {new Date(mockUser.memberSince).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-GB')}
            </p>
            <Link to="/profile/edit" className="mt-2 inline-flex items-center text-sm text-medical-accent hover:underline">
              <Edit3 size={14} className="mr-1 rtl:ml-1"/> {language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}
            </Link>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {profileSections.map((section, index) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link 
                to={section.link} 
                className="block bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center group"
              >
                <div className={`p-3 rounded-full mb-3 transition-colors ${index % 3 === 0 ? 'bg-medical-primary/10 group-hover:bg-medical-primary/20' : index % 3 === 1 ? 'bg-medical-secondary/10 group-hover:bg-medical-secondary/20' : 'bg-medical-accent/10 group-hover:bg-medical-accent/20'}`}>
                    <section.icon size={28} className={`transition-colors ${index % 3 === 0 ? 'text-medical-primary' : index % 3 === 1 ? 'text-medical-secondary' : 'text-medical-accent'}`} />
                </div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{section.name}</h2>
                {section.count !== undefined && (
                  <p className="text-xs text-gray-500 mt-1">({section.count} {language === 'ar' ? 'عناصر' : 'items'})</p>
                )}
                 {section.value && (
                  <p className="text-xs text-gray-500 mt-1">{section.value}</p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Biometric Toggle (Mobile Mock) */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Shield size={22} className="text-medical-primary mr-3 rtl:ml-3"/>
                    <h2 className="text-lg font-semibold text-gray-700">{language === 'ar' ? 'تسجيل الدخول بالبصمة' : 'Biometric Login'}</h2>
                </div>
                <label htmlFor="biometricToggle" className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        id="biometricToggle" 
                        className="sr-only peer" 
                        checked={biometricEnabled}
                        onChange={() => setBiometricEnabled(!biometricEnabled)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-medical-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-medical-primary"></div>
                </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">{language === 'ar' ? '(متوفر على الأجهزة المدعومة)' : '(Available on supported devices)'}</p>
        </div>


        <motion.div
          initial={{ opacity: 0, y:20 }}
          animate={{ opacity: 1, y:0 }}
          transition={{ duration:0.5, delay: profileSections.length * 0.05 }} 
          className="mt-8 text-center"
        >
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            icon={<LogOut size={18}/>}
          >
            {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
