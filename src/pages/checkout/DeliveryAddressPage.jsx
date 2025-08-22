import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import CheckoutStepper from '../../components/checkout/CheckoutStepper';
import Button from '../../components/Button';
import InputField from '../../components/InputField'; // Assuming InputField component exists
import { MapPin, PlusCircle, ArrowRight, LocateFixed, Store } from 'lucide-react';
import { faker } from '@faker-js/faker';
import { motion } from 'framer-motion';

// Mock saved addresses
const mockSavedAddresses = [
  { id: 'addr1', name: 'Home', recipientName: faker.person.fullName(), phone: faker.phone.number(), address: faker.location.streetAddress(), pincode: faker.location.zipCode(), city: faker.location.city(), tag: 'Home' },
  { id: 'addr2', name: 'Work', recipientName: faker.person.fullName(), phone: faker.phone.number(), address: faker.location.streetAddress(), pincode: faker.location.zipCode(), city: faker.location.city(), tag: 'Work' },
];

const DeliveryAddressPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState(mockSavedAddresses.length > 0 ? mockSavedAddresses[0].id : null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(mockSavedAddresses.length === 0);
  const [newAddress, setNewAddress] = useState({
    recipientName: '', phone: '', address: '', pincode: '', city: '', tag: 'Other'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    // Mock save: add to a list (in real app, send to backend)
    const newAddrWithId = { ...newAddress, id: `addr${Date.now()}` };
    mockSavedAddresses.push(newAddrWithId); // Mutating for demo, use state in real app
    setSelectedAddressId(newAddrWithId.id);
    setShowNewAddressForm(false);
    setNewAddress({ recipientName: '', phone: '', address: '', pincode: '', city: '', tag: 'Other' });
    alert(language === 'ar' ? 'تم حفظ العنوان الجديد بنجاح!' : 'New address saved successfully!');
  };

  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      alert(language === 'ar' ? 'الرجاء تحديد أو إضافة عنوان توصيل.' : 'Please select or add a delivery address.');
      return;
    }
    console.log("Selected Address ID:", selectedAddressId);
    navigate('/checkout/payment');
  };

  return (
    <div className="container mx-auto py-8">
      <CheckoutStepper currentStep="address" />
      <motion.div 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration:0.5 }}
        className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <MapPin size={28} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
          {language === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'}
        </h1>

        {/* Saved Addresses */}
        {mockSavedAddresses.length > 0 && !showNewAddressForm && (
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-700">{language === 'ar' ? 'العناوين المحفوظة' : 'Saved Addresses'}</h2>
            {mockSavedAddresses.map(addr => (
              <label
                key={addr.id}
                className={`block p-4 border rounded-lg cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-medical-primary ring-2 ring-medical-primary/50 bg-medical-light/30' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <input 
                  type="radio" 
                  name="savedAddress" 
                  value={addr.id} 
                  checked={selectedAddressId === addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                  className="sr-only"
                />
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-gray-800">{addr.tag} <span className="text-xs text-gray-500">({addr.recipientName})</span></p>
                        <p className="text-sm text-gray-600">{addr.address}, {addr.city}, {addr.pincode}</p>
                        <p className="text-sm text-gray-600">{language === 'ar' ? 'الهاتف:' : 'Phone:'} {addr.phone}</p>
                    </div>
                    {selectedAddressId === addr.id && <CheckCircle size={20} className="text-medical-primary"/>}
                </div>
              </label>
            ))}
          </div>
        )}

        {/* Add New Address Button / Form Toggle */}
        {!showNewAddressForm && (
          <Button variant="outline" onClick={() => setShowNewAddressForm(true)} icon={<PlusCircle size={18}/>} className="mb-6 w-full sm:w-auto">
            {language === 'ar' ? 'إضافة عنوان جديد' : 'Add New Address'}
          </Button>
        )}
        
        {showNewAddressForm && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSaveNewAddress} className="space-y-4 border-t pt-6 mt-6"
          >
            <h2 className="text-lg font-semibold text-gray-700">{language === 'ar' ? 'إضافة عنوان جديد' : 'Add New Address'}</h2>
            <InputField id="recipientName" label={language === 'ar' ? 'اسم المستلم' : 'Recipient Name'} value={newAddress.recipientName} onChange={handleInputChange} language={language} required/>
            <InputField id="phone" label={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} type="tel" value={newAddress.phone} onChange={handleInputChange} language={language} required/>
            <InputField id="address" label={language === 'ar' ? 'العنوان التفصيلي' : 'Address Line'} value={newAddress.address} onChange={handleInputChange} language={language} required/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField id="city" label={language === 'ar' ? 'المدينة' : 'City'} value={newAddress.city} onChange={handleInputChange} language={language} required/>
                <InputField id="pincode" label={language === 'ar' ? 'الرمز البريدي' : 'Pincode/ZIP'} value={newAddress.pincode} onChange={handleInputChange} language={language} required/>
            </div>
            <InputField id="tag" label={language === 'ar' ? 'تسمية العنوان (مثل: المنزل، العمل)' : 'Address Tag (e.g., Home, Work)'} value={newAddress.tag} onChange={handleInputChange} language={language}/>
            <div className="flex items-center gap-2">
                <Button type="button" variant="outline" icon={<LocateFixed size={16}/>} onClick={() => alert(language === 'ar' ? 'ميزة تحديد الموقع التلقائي قيد التطوير' : 'Auto-detect location feature is under development')}>
                    {language === 'ar' ? 'تحديد الموقع تلقائياً' : 'Auto-detect Location'}
                </Button>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1">{language === 'ar' ? 'حفظ العنوان' : 'Save Address'}</Button>
              {mockSavedAddresses.length > 0 && (
                <Button type="button" variant="ghost" onClick={() => setShowNewAddressForm(false)} className="flex-1">
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
              )}
            </div>
          </motion.form>
        )}

        {/* Store & ETA Preview */}
        {selectedAddressId && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center text-sm text-gray-700 mb-2">
                    <Store size={18} className="text-medical-accent mr-2 rtl:ml-2"/>
                    <span>{language === 'ar' ? 'أقرب متجر للتوصيل:' : 'Nearest dispatching store:'} <strong className="text-medical-dark">{faker.company.name()} ({faker.location.city()})</strong></span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                    <Truck size={18} className="text-medical-accent mr-2 rtl:ml-2"/>
                    <span>{language === 'ar' ? 'التوصيل المتوقع:' : 'Expected delivery by:'} <strong className="text-medical-dark">{faker.date.soon({days:3}).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</strong></span>
                </div>
            </div>
        )}

        <div className="mt-8 pt-6 border-t">
          <Button 
            onClick={handleProceedToPayment} 
            disabled={!selectedAddressId}
            className="w-full py-3 text-base"
            icon={<ArrowRight className={language === 'ar' ? 'transform rotate-180 order-first' : 'order-last'} size={20}/>}
          >
            {language === 'ar' ? 'المتابعة إلى الدفع' : 'Continue to Payment'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeliveryAddressPage;
