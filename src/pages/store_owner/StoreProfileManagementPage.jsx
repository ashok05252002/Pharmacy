import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Building, Clock, MapPin, Phone, Save, Edit3 } from 'lucide-react';
import Button from '../../components/Button';
import InputField from '../../components/InputField'; // Assuming this exists

const mockStoreProfile = {
  name: 'City Center Pharmacy', nameAr: 'صيدلية سيتي سنتر',
  hours: '9 AM - 10 PM Daily', hoursAr: '9 صباحًا - 10 مساءً يوميًا',
  contact: '+971 4 123 4567', contactAr: '+٩٧١ ٤ ١٢٣ ٤٥٦٧',
  zones: ['Downtown', 'Business Bay'], zonesAr: ['وسط المدينة', 'الخليج التجاري'],
  address: '123 Main Street, Downtown, Dubai', addressAr: '123 الشارع الرئيسي، وسط المدينة، دبي'
};

const StoreProfileManagementPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();
  const [profile, setProfile] = useState(mockStoreProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For array fields like zones, split by comma or handle as needed
    if (name === 'zones' || name === 'zonesAr') {
        setProfile(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
    } else {
        setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving store profile:", profile);
    alert(language === 'ar' ? 'تم حفظ ملف المتجر!' : 'Store profile saved!');
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <Building size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'إدارة ملف المتجر' : 'Store Profile Management'}
            </h1>
        </div>
        {!isEditing && (
            <Button icon={<Edit3 size={18}/>} onClick={() => setIsEditing(true)}>
                {language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}
            </Button>
        )}
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
                <InputField id="storeName" name={language === 'ar' ? 'nameAr' : 'name'} label={language === 'ar' ? 'اسم المتجر' : 'Store Name'} value={language === 'ar' ? profile.nameAr : profile.name} onChange={handleChange} language={language} />
                <InputField id="storeAddress" name={language === 'ar' ? 'addressAr' : 'address'} label={language === 'ar' ? 'عنوان المتجر' : 'Store Address'} value={language === 'ar' ? profile.addressAr : profile.address} onChange={handleChange} language={language} />
                <InputField id="storeHours" name={language === 'ar' ? 'hoursAr' : 'hours'} label={language === 'ar' ? 'ساعات العمل' : 'Operating Hours'} value={language === 'ar' ? profile.hoursAr : profile.hours} onChange={handleChange} language={language} />
                <InputField id="storeContact" name={language === 'ar' ? 'contactAr' : 'contact'} label={language === 'ar' ? 'رقم الاتصال' : 'Contact Number'} value={language === 'ar' ? profile.contactAr : profile.contact} onChange={handleChange} language={language} type="tel"/>
                <InputField id="storeZones" name={language === 'ar' ? 'zonesAr' : 'zones'} label={language === 'ar' ? 'مناطق التوصيل (مفصولة بفواصل)' : 'Delivery Zones (comma-separated)'} value={(language === 'ar' ? profile.zonesAr : profile.zones).join(', ')} onChange={handleChange} language={language} />
                <div className="flex gap-3 pt-2">
                    <Button type="submit" icon={<Save size={18}/>}>{language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>{language === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
                </div>
            </form>
        ) : (
            <div className="space-y-3 text-sm">
                <InfoItem icon={Building} label={language === 'ar' ? 'اسم المتجر' : 'Store Name'} value={language === 'ar' ? profile.nameAr : profile.name} />
                <InfoItem icon={MapPin} label={language === 'ar' ? 'العنوان' : 'Address'} value={language === 'ar' ? profile.addressAr : profile.address} />
                <InfoItem icon={Clock} label={language === 'ar' ? 'ساعات العمل' : 'Operating Hours'} value={language === 'ar' ? profile.hoursAr : profile.hours} />
                <InfoItem icon={Phone} label={language === 'ar' ? 'رقم الاتصال' : 'Contact Number'} value={language === 'ar' ? profile.contactAr : profile.contact} />
                <InfoItem icon={MapPin} label={language === 'ar' ? 'مناطق التوصيل' : 'Delivery Zones'} value={(language === 'ar' ? profile.zonesAr : profile.zones).join(', ')} />
            </div>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start">
        <Icon size={18} className="text-medical-accent mr-2 rtl:ml-2 mt-0.5 flex-shrink-0"/>
        <div>
            <p className="font-medium text-gray-500">{label}:</p>
            <p className="text-gray-700">{value}</p>
        </div>
    </div>
);


export default StoreProfileManagementPage;
