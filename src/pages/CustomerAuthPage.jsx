import React from 'react';
import { Fingerprint, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import CustomerLoginForm from '../components/CustomerLoginForm'; 
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo'; // Import the updated Logo component

const CustomerAuthPage = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white p-6 sm:p-10 rounded-xl shadow-2xl"
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

      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-2">
        {language === 'ar' ? 'تسجيل دخول / إنشاء حساب عميل' : 'Customer Login / Register'}
      </h2>
      <p className="text-sm text-center text-medical-gray mb-6">
        {language === 'ar' ? 'مرحباً بك! يرجى تسجيل الدخول للمتابعة.' : 'Welcome! Please login to continue.'}
      </p>

      <CustomerLoginForm language={language} />

      <div className="mt-6 flex justify-center items-center">
        <button 
            type="button" 
            className="flex items-center text-sm text-medical-gray hover:text-medical-primary transition-colors p-2 rounded-md"
            onClick={() => alert(language === 'ar' ? 'ميزة تسجيل الدخول بالبصمة قيد التطوير.' : 'Biometric login feature is under development.')}
        >
          <Fingerprint size={20} className="mr-2 rtl:ml-2" />
          {language === 'ar' ? 'تسجيل الدخول بالبصمة' : 'Login with Biometrics'}
        </button>
      </div>

      <div className="mt-6 text-center text-xs text-medical-gray">
        <p>
          {language === 'ar' ? 'بالتسجيل، أنت توافق على ' : 'By signing up, you agree to our '}
          <Link to="/terms" className="text-medical-accent hover:underline">{language === 'ar' ? 'الشروط' : 'Terms'}</Link>
          {language === 'ar' ? ' و ' : ' and '}
          <Link to="/privacy" className="text-medical-accent hover:underline">{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link>.
        </p>
      </div>
    </motion.div>
  );
};

export default CustomerAuthPage;
