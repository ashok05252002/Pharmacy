import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import CheckoutStepper from '../../components/checkout/CheckoutStepper';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { CreditCard, DollarSign, ShieldCheck, Pocket, ArrowRight, Info } from 'lucide-react'; // Pocket for Mobile Wallets, Info for Insurance
import { faker } from '@faker-js/faker';
import { motion } from 'framer-motion';

const PaymentSelectionPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card'); // 'cod', 'card', 'wallet', 'insurance'
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [saveCard, setSaveCard] = useState(false);
  const [insuranceDetails, setInsuranceDetails] = useState({ insurer: '', policyNo: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleInputChange = (setter) => (e) => {
    setter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (!termsAccepted) {
      alert(language === 'ar' ? 'الرجاء قبول الشروط والأحكام.' : 'Please accept the terms and conditions.');
      return;
    }
    // Mock order placement
    const orderId = `ORD-${faker.string.alphanumeric(10).toUpperCase()}`;
    console.log("Placing order with method:", selectedPaymentMethod, "Order ID:", orderId);
    // In a real app, you'd send data to backend and then navigate
    navigate(`/order-confirmation/${orderId}`);
  };

  const paymentMethods = [
    { id: 'card', name: language === 'ar' ? 'بطاقة ائتمان/خصم' : 'Credit/Debit Card', icon: CreditCard },
    { id: 'cod', name: language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery', icon: DollarSign },
    { id: 'wallet', name: language === 'ar' ? 'محافظ الجوال' : 'Mobile Wallets', icon: Pocket },
    { id: 'insurance', name: language === 'ar' ? 'مطالبة تأمين' : 'Insurance Claim', icon: ShieldCheck },
  ];

  return (
    <div className="container mx-auto py-8">
      <CheckoutStepper currentStep="payment" />
      <motion.div 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration:0.5 }}
        className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <CreditCard size={28} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
          {language === 'ar' ? 'اختيار طريقة الدفع' : 'Select Payment Method'}
        </h1>

        <div className="space-y-4 mb-6">
          {paymentMethods.map(method => (
            <label
              key={method.id}
              className={`block p-4 border rounded-lg cursor-pointer transition-all ${selectedPaymentMethod === method.id ? 'border-medical-primary ring-2 ring-medical-primary/50 bg-medical-light/30' : 'border-gray-300 hover:border-gray-400'}`}
            >
              <input 
                type="radio" 
                name="paymentMethod" 
                value={method.id} 
                checked={selectedPaymentMethod === method.id}
                onChange={() => setSelectedPaymentMethod(method.id)}
                className="sr-only"
              />
              <div className="flex items-center">
                <method.icon size={22} className={`mr-3 rtl:ml-3 rtl:mr-0 ${selectedPaymentMethod === method.id ? 'text-medical-primary' : 'text-gray-500'}`} />
                <span className={`font-medium ${selectedPaymentMethod === method.id ? 'text-gray-800' : 'text-gray-700'}`}>{method.name}</span>
              </div>
            </label>
          ))}
        </div>

        {/* Payment Method Specific Fields */}
        <AnimatePresence mode="wait">
        {selectedPaymentMethod === 'card' && (
          <motion.div 
            key="card-details"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="space-y-4 border-t pt-6 mt-6"
          >
            <h3 className="text-lg font-semibold text-gray-700">{language === 'ar' ? 'تفاصيل البطاقة' : 'Card Details'}</h3>
            <InputField id="cardNumber" name="number" label={language === 'ar' ? 'رقم البطاقة' : 'Card Number'} value={cardDetails.number} onChange={handleInputChange(setCardDetails)} language={language} placeholder="0000 0000 0000 0000" />
            <div className="grid grid-cols-2 gap-4">
              <InputField id="cardExpiry" name="expiry" label={language === 'ar' ? 'تاريخ انتهاء الصلاحية' : 'Expiry Date'} value={cardDetails.expiry} onChange={handleInputChange(setCardDetails)} language={language} placeholder="MM/YY" />
              <InputField id="cardCVV" name="cvv" label="CVV" type="password" value={cardDetails.cvv} onChange={handleInputChange(setCardDetails)} language={language} placeholder="***" />
            </div>
            <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="form-checkbox h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary"/>
              <span>{language === 'ar' ? 'حفظ البطاقة للاستخدام المستقبلي' : 'Save card for future use'}</span>
            </label>
          </motion.div>
        )}

        {selectedPaymentMethod === 'wallet' && (
          <motion.div 
            key="wallet-details"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="border-t pt-6 mt-6 text-center space-y-3"
          >
             <h3 className="text-lg font-semibold text-gray-700 mb-3">{language === 'ar' ? 'الدفع عبر محفظة الجوال' : 'Pay with Mobile Wallet'}</h3>
             <Button variant="outline" className="w-full sm:w-auto sm:mx-1" onClick={() => alert('Apple Pay selected (mock)')}>
                <img src="https://img-wrapper.vercel.app/image?url=https://placehold.co/20x20/000000/FFFFFF?text=A" alt="Apple Pay" className="w-5 h-5 mr-2 rtl:ml-2"/> Apple Pay
             </Button>
             <Button variant="outline" className="w-full sm:w-auto sm:mx-1" onClick={() => alert('Google Pay selected (mock)')}>
                <img src="https://img-wrapper.vercel.app/image?url=https://placehold.co/20x20/4285F4/FFFFFF?text=G" alt="Google Pay" className="w-5 h-5 mr-2 rtl:ml-2"/> Google Pay
             </Button>
             {/* Add other wallet options here */}
          </motion.div>
        )}
        
        {selectedPaymentMethod === 'insurance' && (
          <motion.div 
            key="insurance-details"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="space-y-4 border-t pt-6 mt-6"
          >
            <h3 className="text-lg font-semibold text-gray-700">{language === 'ar' ? 'تفاصيل مطالبة التأمين' : 'Insurance Claim Details'}</h3>
            <InputField id="insurerName" name="insurer" label={language === 'ar' ? 'اسم شركة التأمين' : 'Insurer Name'} value={insuranceDetails.insurer} onChange={handleInputChange(setInsuranceDetails)} language={language} />
            <InputField id="policyNumber" name="policyNo" label={language === 'ar' ? 'رقم البوليصة' : 'Policy Number'} value={insuranceDetails.policyNo} onChange={handleInputChange(setInsuranceDetails)} language={language} />
            <p className="text-xs text-gray-500 flex items-start"><Info size={14} className="mr-1 rtl:ml-1 mt-0.5 flex-shrink-0"/>{language === 'ar' ? 'قد يتطلب الأمر موافقة إضافية. سيتم الاتصال بك.' : 'Additional approval may be required. You will be contacted.'}</p>
          </motion.div>
        )}
        </AnimatePresence>

        <div className="mt-8 pt-6 border-t">
          <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-700 cursor-pointer mb-6">
            <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="form-checkbox h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary"/>
            <span>{language === 'ar' ? 'أوافق على ' : 'I agree to the '}<Link to="/terms" className="text-medical-accent hover:underline">{language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</Link></span>
          </label>

          <Button 
            onClick={handlePlaceOrder} 
            disabled={!termsAccepted}
            className="w-full py-3 text-base"
            icon={<ArrowRight className={language === 'ar' ? 'transform rotate-180 order-first' : 'order-last'} size={20}/>}
          >
            {language === 'ar' ? 'إتمام الطلب' : 'Place Order'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSelectionPage;
