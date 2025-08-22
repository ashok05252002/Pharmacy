import React, { useState } from 'react';
import { User, Phone, KeyRound, Eye, EyeOff, LogIn, UserPlus, MessageSquare, Smartphone } from 'lucide-react';
import InputField from './InputField';
import Button from './Button';
import OtpInput from './OtpInput';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import


const GoogleIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2.18 12.19,2.18C6.42,2.18 2.03,6.8 2.03,12C2.03,17.05 6.16,21.82 12.19,21.82C17.6,21.82 21.54,18.05 21.54,12.5C21.54,11.92 21.45,11.5 21.35,11.1V11.1Z" /></svg>;
const FacebookIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.32 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>;
const AppleIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M19.2,11.38c-.05-.08-1.12-1.7-2.87-1.75c-.76,0-1.65.49-2.28.49c-.65,0-1.32-.49-2.19-.49c-1.63,0-2.95,1.11-3.71,2.62c-1.5,3.06-.38,7.58,1.2,10c.73,1.1,1.59,2.44,2.72,2.44c1.11,0,1.52-.72,2.89-.75c1.37,0,1.71.75,2.91.75c1.19,0,1.92-1.21,2.63-2.33c.81-1.26,1.18-2.63,1.19-2.71c-.05,0-2.33-.92-2.33-3.64c0-2.3,1.85-3.43,1.96-3.52M15.7,5.07c.87-.98,1.4-2.31,1.28-3.64c-.9.08-2.08.69-2.93,1.64c-.73.84-1.43,2.18-1.28,3.52c1.03.17,2.06-.54,2.93-1.52" /></svg>;

const CustomerLoginForm = ({ language }) => {
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone', 'social', 'password'
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = (via) => {
    if(phone.length > 8) { 
        setOtpSent(true);
        console.log(`OTP sent to ${phone} via ${via}`);
    } else {
        alert(language === 'ar' ? 'الرجاء إدخال رقم هاتف صحيح.' : 'Please enter a valid phone number.');
    }
  };

  const handleOtpSubmit = () => {
    console.log(`Verifying OTP: ${otp}`);
    alert(language === 'ar' ? `تم التحقق من OTP: ${otp}. يتم تسجيل الدخول...` : `OTP Verified: ${otp}. Logging in...`);
    // Mock successful login
    navigate('/home'); // Navigate to customer home page
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    console.log("Password login attempt");
    alert(language === 'ar' ? 'محاولة تسجيل الدخول بكلمة المرور...' : 'Attempting password login...');
    // Mock successful login
    navigate('/home');
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login attempt with ${provider}`);
    alert(language === 'ar' ? `محاولة تسجيل الدخول عبر ${provider}...` : `Attempting login with ${provider}...`);
    // Mock successful login
    navigate('/home');
  };


  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const renderFormContent = () => {
    if (otpSent) {
      return (
        <motion.div key="otp-form" variants={formVariants} initial="hidden" animate="visible" exit="exit">
          <p className="text-center text-sm text-medical-gray mb-4">
            {language === 'ar' ? `تم إرسال رمز التحقق إلى ${phone}.` : `OTP sent to ${phone}.`}
          </p>
          <OtpInput length={6} onChange={setOtp} language={language} />
          <Button 
            onClick={handleOtpSubmit} 
            icon={<LogIn size={18} />} 
            className="w-full mt-6"
            disabled={otp.length !== 6}
          >
            {language === 'ar' ? 'تحقق وتسجيل الدخول' : 'Verify & Login'}
          </Button>
          <button 
            onClick={() => setOtpSent(false)}
            className="text-sm text-medical-accent hover:underline mt-4 block text-center w-full"
          >
            {language === 'ar' ? 'تغيير رقم الهاتف' : 'Change phone number'}
          </button>
        </motion.div>
      );
    }

    switch (loginMethod) {
      case 'phone':
        return (
          <motion.form key="phone-login" variants={formVariants} initial="hidden" animate="visible" exit="exit">
            <InputField
              id="phone"
              type="tel"
              label={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
              placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
              icon={<Phone size={18} className="text-medical-gray" />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              language={language}
            />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button type="button" onClick={() => handleSendOtp('SMS')} variant="outline" icon={<MessageSquare size={18} />}>
                {language === 'ar' ? 'OTP عبر SMS' : 'OTP via SMS'}
              </Button>
              <Button type="button" onClick={() => handleSendOtp('WhatsApp')} variant="outline" icon={<Smartphone size={18} />}>
                {language === 'ar' ? 'OTP عبر WhatsApp' : 'OTP via WhatsApp'}
              </Button>
            </div>
          </motion.form>
        );
      case 'password':
        return (
          <motion.form key="password-login" variants={formVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handlePasswordLogin}>
            <InputField
              id="emailOrPhone"
              type="text"
              label={language === 'ar' ? 'البريد الإلكتروني / رقم الهاتف' : 'Email / Phone Number'}
              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني أو رقم هاتفك' : 'Enter your email or phone'}
              icon={<User size={18} className="text-medical-gray" />}
              language={language}
            />
            <InputField
              id="password"
              type={showPassword ? 'text' : 'password'}
              label={language === 'ar' ? 'كلمة المرور' : 'Password'}
              placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
              icon={<KeyRound size={18} className="text-medical-gray" />}
              language={language}
              showPasswordToggle={{showPassword, setShowPassword}}
            />
            <div className="flex justify-end mt-2">
              <a href="#" className="text-sm text-medical-accent hover:underline">
                {language === 'ar' ? 'هل نسيت كلمة المرور؟' : 'Forgot Password?'}
              </a>
            </div>
            <Button type="submit" icon={<LogIn size={18} />} className="w-full mt-6">
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Button>
          </motion.form>
        );
      case 'social':
        return (
          <motion.div key="social-login" variants={formVariants} initial="hidden" animate="visible" exit="exit">
            <p className="text-center text-sm text-medical-gray mb-4">
              {language === 'ar' ? 'أو سجل الدخول باستخدام' : 'Or login using'}
            </p>
            <div className="space-y-3">
              <Button type="button" variant="outline" icon={<GoogleIcon />} className="w-full justify-center" onClick={() => handleSocialLogin('Google')}>
                {language === 'ar' ? 'تسجيل الدخول باستخدام جوجل' : 'Login with Google'}
              </Button>
              <Button type="button" variant="outline" icon={<FacebookIcon />} className="w-full justify-center" onClick={() => handleSocialLogin('Facebook')}>
                {language === 'ar' ? 'تسجيل الدخول باستخدام فيسبوك' : 'Login with Facebook'}
              </Button>
              <Button type="button" variant="outline" icon={<AppleIcon />} className="w-full justify-center" onClick={() => handleSocialLogin('Apple')}>
                {language === 'ar' ? 'تسجيل الدخول باستخدام آبل' : 'Login with Apple'}
              </Button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {!otpSent && (
        <div className="mb-6 flex justify-center space-x-2 rtl:space-x-reverse border-b pb-4">
          {['phone', 'password', 'social'].map((method) => (
            <button
              key={method}
              onClick={() => setLoginMethod(method)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${loginMethod === method ? 'bg-medical-primary text-white shadow-sm' : 'text-medical-gray hover:bg-gray-100'}`}
            >
              {language === 'ar' ? 
                (method === 'phone' ? 'الهاتف' : method === 'password' ? 'كلمة المرور' : 'التواصل الاجتماعي') :
                (method.charAt(0).toUpperCase() + method.slice(1))
              }
            </button>
          ))}
        </div>
      )}
      
      <AnimatePresence mode="wait">
        {renderFormContent()}
      </AnimatePresence>

      {!otpSent && (
        <div className="mt-8 text-center">
          <p className="text-sm text-medical-gray">
            {language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
            <Link to="/register" className="font-medium text-medical-accent hover:underline">
              {language === 'ar' ? 'إنشاء حساب' : 'Register'} <UserPlus size={16} className="inline ml-1 rtl:mr-1" />
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerLoginForm;
