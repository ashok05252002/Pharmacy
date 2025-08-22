import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockUser } from '../../data/mockData';
import { User, Mail, Phone, KeyRound, Camera, Save } from 'lucide-react';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EditProfilePage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone || '',
    profilePictureUrl: mockUser.profilePictureUrl, // For display
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePictureFile(file);
      // Display preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData(prev => ({...prev, profilePictureUrl: event.target.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Mock save profile data
    console.log('Profile data saved:', profileData, 'Picture file:', profilePictureFile);
    alert(language === 'ar' ? 'تم حفظ معلومات الملف الشخصي!' : 'Profile information saved!');
    // Update mockUser (in a real app, this would be a state update from context/API)
    mockUser.name = profileData.name;
    mockUser.email = profileData.email;
    mockUser.phone = profileData.phone;
    if (profilePictureFile) mockUser.profilePictureUrl = profileData.profilePictureUrl; // If preview is URL
    navigate('/profile');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert(language === 'ar' ? 'كلمات المرور الجديدة غير متطابقة!' : 'New passwords do not match!');
      return;
    }
    // Mock save password
    console.log('Password change requested:', passwordData);
    alert(language === 'ar' ? 'تم تغيير كلمة المرور (محاكاة)!' : 'Password changed (mock)!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
          {language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Edit Personal Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-6">{language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  <img 
                    src={profileData.profilePictureUrl} 
                    alt={profileData.name} 
                    className="w-32 h-32 rounded-full ring-4 ring-medical-primary/30 shadow-md object-cover"
                  />
                  <label htmlFor="profilePictureInput" className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer">
                    <Camera size={20} className="text-medical-primary"/>
                  </label>
                  <input type="file" id="profilePictureInput" className="hidden" accept="image/*" onChange={handlePictureChange} />
                </div>
              </div>
              <InputField id="name" name="name" label={language === 'ar' ? 'الاسم الكامل' : 'Full Name'} value={profileData.name} onChange={handleProfileChange} icon={<User size={18}/>} language={language} required />
              <InputField id="email" name="email" type="email" label={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} value={profileData.email} onChange={handleProfileChange} icon={<Mail size={18}/>} language={language} required />
              <InputField id="phone" name="phone" type="tel" label={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} value={profileData.phone} onChange={handleProfileChange} icon={<Phone size={18}/>} language={language} />
              <Button type="submit" icon={<Save size={18}/>} className="w-full mt-2">{language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}</Button>
            </form>
          </motion.div>

          {/* Change Password */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-6">{language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <InputField id="currentPassword" name="currentPassword" type="password" label={language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'} value={passwordData.currentPassword} onChange={handlePasswordChange} icon={<KeyRound size={18}/>} language={language} required />
              <InputField id="newPassword" name="newPassword" type="password" label={language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'} value={passwordData.newPassword} onChange={handlePasswordChange} icon={<KeyRound size={18}/>} language={language} required />
              <InputField id="confirmPassword" name="confirmPassword" type="password" label={language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'} value={passwordData.confirmPassword} onChange={handlePasswordChange} icon={<KeyRound size={18}/>} language={language} required />
              <Button type="submit" icon={<Save size={18}/>} className="w-full mt-2">{language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}</Button>
            </form>
          </motion.div>
        </div>
        <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate('/profile')}>
                {language === 'ar' ? 'العودة إلى الملف الشخصي' : 'Back to Profile'}
            </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfilePage;
