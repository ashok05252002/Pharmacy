import React from 'react';
import { Languages, User, Briefcase, Truck, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext'; 
import Button from './Button'; 
import Logo from './common/Logo'; // Import the updated Logo component

const userTypes = [
  { id: 'customer', name: 'Customer', nameAr: 'عميل', icon: <User size={20} />, path: '/customer-auth' },
  { id: 'admin', name: 'Admin', nameAr: 'مسؤول', icon: <Briefcase size={20} />, path: '/admin/dashboard' }, // Changed icon for Admin
  { id: 'store_owner', name: 'Store Owner', nameAr: 'صاحب المتجر', icon: <Briefcase size={20} />, path: '/store-owner/dashboard' },
  { id: 'delivery_staff', name: 'Delivery Staff', nameAr: 'موظف توصيل', icon: <Truck size={20} />, path: '/delivery/dashboard' },
  { id: 'pharmacist', name: 'Pharmacist', nameAr: 'صيدلي', icon: <Stethoscope size={20} />, path: '/pharmacist/dashboard' },
];

const LoginPage = () => {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleRoleSelection = (path) => {
    navigate(path);
  };

  const pageTitle = language === 'ar' ? 'حدد دورك للمتابعة' : 'Select Your Role to Proceed';
  const subText = language === 'ar' ? 'اختر نوع المستخدم للوصول إلى الواجهة المخصصة.' : 'Choose a user type to access the respective interface.';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl bg-white p-6 sm:p-10 rounded-xl shadow-2xl"
    >
      <div className="flex justify-between items-center mb-6">
        <Logo textClassName="text-2xl font-bold text-medical-dark" /> {/* Use Logo component */}
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors text-medical-gray"
          aria-label={language === 'ar' ? 'تغيير اللغة' : 'Change language'}
        >
          <div className="flex items-center">
            <Languages size={20} />
            <span className="ml-1 rtl:mr-1 text-xs font-medium">
              {language === 'en' ? 'AR' : 'EN'}
            </span>
          </div>
        </button>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{pageTitle}</h2>
        <p className="text-medical-gray text-sm mt-1 mb-8">{subText}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userTypes.map((userType, index) => (
            <motion.div
              key={userType.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                onClick={() => handleRoleSelection(userType.path)}
                variant="outline"
                className="w-full py-4 text-base justify-start hover:bg-medical-primary/10 hover:border-medical-primary group"
                icon={React.cloneElement(userType.icon, { className: "text-medical-primary group-hover:text-medical-dark transition-colors"})}
              >
                <span className="text-gray-700 group-hover:text-medical-dark transition-colors">
                  {language === 'ar' ? userType.nameAr : userType.name}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
