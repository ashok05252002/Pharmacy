import React, { useState } from 'react';
import { User, KeyRound, Eye, EyeOff, Fingerprint, LogIn } from 'lucide-react';
import InputField from './InputField';
import Button from './Button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StaffLoginForm = ({ userType, language, userTypeName }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    console.log(`Login attempt for ${userType} as ${userTypeName}`);
    // Removed alert for smoother navigation in mock setup

    // Navigate to role-specific dashboard (mock)
    switch (userType) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'store_owner':
        navigate('/store-panel');
        break;
      case 'delivery_staff':
        navigate('/delivery-panel');
        break;
      case 'pharmacist':
        navigate('/pharmacist-panel');
        break;
      default:
        navigate('/home'); // Fallback
    }
  };


  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleLogin}
    >
      <InputField
        id="emailOrUsername"
        type="text"
        label={language === 'ar' ? 'البريد الإلكتروني / اسم المستخدم' : 'Email / Username'}
        placeholder={language === 'ar' ? `أدخل البريد الإلكتروني أو اسم المستخدم الخاص بـ${userTypeName}` : `Enter ${userTypeName} email or username`}
        icon={<User size={18} className="text-medical-gray" />}
        language={language}
        required
      />
      <InputField
        id="password"
        type={showPassword ? 'text' : 'password'}
        label={language === 'ar' ? 'كلمة المرور' : 'Password'}
        placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
        icon={<KeyRound size={18} className="text-medical-gray" />}
        language={language}
        showPasswordToggle={{showPassword, setShowPassword}}
        required
      />
      <div className="flex justify-between items-center mt-2">
        <a href="#" className="text-sm text-medical-accent hover:underline">
          {language === 'ar' ? 'هل نسيت كلمة المرور؟' : 'Forgot Password?'}
        </a>
        <button type="button" className="text-medical-gray hover:text-medical-primary p-1 rounded-full" title={language === 'ar' ? 'تسجيل الدخول بالبصمة' : 'Biometric Login'}>
          <Fingerprint size={22} />
        </button>
      </div>
      <Button type="submit" icon={<LogIn size={18} />} className="w-full mt-6">
        {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
      </Button>
    </motion.form>
  );
};

export default StaffLoginForm;
