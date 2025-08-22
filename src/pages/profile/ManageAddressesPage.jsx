import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockUser } from '../../data/mockData'; // Assuming mockUser has addresses
import { MapPin, PlusCircle, Edit3, Trash2, CheckCircle, Home, Briefcase } from 'lucide-react';
import Button from '../../components/Button';
import InputField from '../../components/InputField'; // Assuming InputField exists
import { motion, AnimatePresence } from 'framer-motion';

const ManageAddressesPage = () => {
  const { language } = useLanguage();
  const [addresses, setAddresses] = useState(mockUser.addresses || []);
  const [editingAddress, setEditingAddress] = useState(null); // null or address object
  const [showForm, setShowForm] = useState(false);

  const initialFormState = { id: null, recipientName: '', phone: '', address: '', pincode: '', city: '', tag: 'Home', isDefault: false };

  const handleAddNew = () => {
    setEditingAddress(initialFormState);
    setShowForm(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = (addressId) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد أنك تريد حذف هذا العنوان؟' : 'Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
      // Also ensure default is reassigned if deleted address was default
      if (addresses.find(a => a.id === addressId)?.isDefault && addresses.length > 1) {
        const nextDefault = addresses.find(a => a.id !== addressId);
        if (nextDefault) handleSetDefault(nextDefault.id);
      }
    }
  };

  const handleSetDefault = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingAddress.id) { // Editing existing
      setAddresses(prev => prev.map(addr => addr.id === editingAddress.id ? editingAddress : addr));
    } else { // Adding new
      const newAddress = { ...editingAddress, id: `addr${Date.now()}` };
      setAddresses(prev => [...prev, newAddress]);
    }
    if (editingAddress.isDefault) { // Ensure only one default
        handleSetDefault(editingAddress.id || `addr${Date.now()}`);
    }
    setShowForm(false);
    setEditingAddress(null);
  };

  const addressTags = [
    { value: 'Home', label: language === 'ar' ? 'المنزل' : 'Home', icon: Home },
    { value: 'Work', label: language === 'ar' ? 'العمل' : 'Work', icon: Briefcase },
    { value: 'Other', label: language === 'ar' ? 'آخر' : 'Other', icon: MapPin },
  ];

  return (
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <MapPin size={32} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {language === 'ar' ? 'إدارة العناوين' : 'Manage Addresses'}
            </h1>
          </div>
          {!showForm && (
            <Button onClick={handleAddNew} icon={<PlusCircle size={18}/>}>
              {language === 'ar' ? 'إضافة عنوان جديد' : 'Add New Address'}
            </Button>
          )}
        </div>

        <AnimatePresence>
        {showForm && editingAddress && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-6 rounded-xl shadow-xl mb-8 overflow-hidden"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {editingAddress.id ? (language === 'ar' ? 'تعديل العنوان' : 'Edit Address') : (language === 'ar' ? 'إضافة عنوان جديد' : 'Add New Address')}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <InputField id="recipientName" name="recipientName" label={language === 'ar' ? 'اسم المستلم' : 'Recipient Name'} value={editingAddress.recipientName} onChange={handleFormChange} language={language} required />
              <InputField id="phone" name="phone" label={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} type="tel" value={editingAddress.phone} onChange={handleFormChange} language={language} required />
              <InputField id="address" name="address" label={language === 'ar' ? 'العنوان التفصيلي' : 'Address Line'} value={editingAddress.address} onChange={handleFormChange} language={language} required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField id="city" name="city" label={language === 'ar' ? 'المدينة' : 'City'} value={editingAddress.city} onChange={handleFormChange} language={language} required />
                <InputField id="pincode" name="pincode" label={language === 'ar' ? 'الرمز البريدي' : 'Pincode/ZIP'} value={editingAddress.pincode} onChange={handleFormChange} language={language} required />
              </div>
              <div>
                <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">{language === 'ar' ? 'تسمية العنوان' : 'Address Tag'}</label>
                <select id="tag" name="tag" value={editingAddress.tag} onChange={handleFormChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-medical-primary focus:border-medical-primary text-sm">
                  {addressTags.map(tagOpt => <option key={tagOpt.value} value={tagOpt.value}>{tagOpt.label}</option>)}
                </select>
              </div>
              <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" name="isDefault" checked={editingAddress.isDefault} onChange={handleFormChange} className="form-checkbox h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary"/>
                <span>{language === 'ar' ? 'تعيين كعنوان افتراضي' : 'Set as default address'}</span>
              </label>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">{language === 'ar' ? 'حفظ' : 'Save'}</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingAddress(null); }} className="flex-1">
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
        </AnimatePresence>

        {!showForm && addresses.length > 0 && (
          <div className="space-y-4">
            {addresses.map((addr, index) => {
              const TagIcon = addressTags.find(t => t.value === addr.tag)?.icon || MapPin;
              return (
              <motion.div
                key={addr.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white p-4 sm:p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <TagIcon size={18} className="text-medical-accent mr-2 rtl:ml-2 rtl:mr-0" />
                      <h3 className="font-semibold text-gray-800">{addr.tag}</h3>
                      {addr.isDefault && (
                        <span className="ml-2 rtl:mr-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center">
                          <CheckCircle size={12} className="mr-1 rtl:ml-1"/> {language === 'ar' ? 'افتراضي' : 'Default'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{addr.recipientName}</p>
                    <p className="text-sm text-gray-600">{addr.address}, {addr.city}, {addr.pincode}</p>
                    <p className="text-sm text-gray-600">{language === 'ar' ? 'الهاتف:' : 'Phone:'} {addr.phone}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-shrink-0">
                    {!addr.isDefault && (
                        <Button variant="ghost" size="sm" onClick={() => handleSetDefault(addr.id)} className="text-xs text-gray-500 hover:text-medical-primary p-1.5">
                            {language === 'ar' ? 'تعيين كافتراضي' : 'Set Default'}
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleEdit(addr)} className="text-xs p-1.5 h-8 w-8" aria-label={language === 'ar' ? 'تعديل' : 'Edit'}>
                      <Edit3 size={14}/>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(addr.id)} className="text-xs p-1.5 h-8 w-8 text-red-500 hover:border-red-400 hover:bg-red-50" aria-label={language === 'ar' ? 'حذف' : 'Delete'}>
                      <Trash2 size={14}/>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )})}
          </div>
        )}

        {!showForm && addresses.length === 0 && (
           <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {language === 'ar' ? 'لا توجد عناوين محفوظة' : 'No Saved Addresses'}
            </h3>
            <p className="text-gray-500 mb-4">
              {language === 'ar' ? 'ابدأ بإضافة عنوان توصيل جديد.' : 'Start by adding a new delivery address.'}
            </p>
            <Button onClick={handleAddNew} icon={<PlusCircle size={18}/>}>
              {language === 'ar' ? 'إضافة عنوان جديد' : 'Add New Address'}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageAddressesPage;
