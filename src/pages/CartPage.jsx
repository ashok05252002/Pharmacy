import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, Info, UploadCloud, Tag } from 'lucide-react';
import Button from '../components/Button';
import { mockProducts, mockUser } from '../data/mockData'; 
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(
    mockProducts.slice(0, 3).map(p => ({ ...p, quantity: Math.floor(Math.random() * 2) + 1 }))
  );
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [loyaltyPointsToRedeem, setLoyaltyPointsToRedeem] = useState(''); // Initialize as string for input
  const [pointsRedeemed, setPointsRedeemed] = useState(0);

  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.offerPrice || item.price) * item.quantity, 0);
  const shippingEstimate = cartItems.length > 0 ? 1.500 : 0; // Example shipping in OMR
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0; 
  const loyaltyDiscount = pointsRedeemed / 10; // Assuming 10 points = 1 OMR
  
  const total = subtotal + shippingEstimate - promoDiscount - loyaltyDiscount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'SAVE10') { 
      setPromoApplied(true);
      alert(language === 'ar' ? 'تم تطبيق الرمز الترويجي بنجاح!' : 'Promo code applied successfully!');
    } else {
      alert(language === 'ar' ? 'رمز ترويجي غير صالح.' : 'Invalid promo code.');
    }
  };
  
  const handleRedeemPoints = () => {
    const points = parseInt(loyaltyPointsToRedeem, 10);
    if (points > 0 && points <= (mockUser.loyaltyPoints - pointsRedeemed) && points <= subtotal * 10) { 
      setPointsRedeemed(prev => prev + points); // Accumulate redeemed points
      setLoyaltyPointsToRedeem(''); // Clear input
      alert(language === 'ar' ? `تم استبدال ${points} نقطة بنجاح!` : `${points} points redeemed successfully!`);
    } else {
      alert(language === 'ar' ? 'عدد نقاط غير صالح للاستبدال.' : 'Invalid points to redeem.');
    }
  };
  
  const itemsRequiringPrescription = cartItems.filter(item => item.prescriptionRequired);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{duration:0.5}}>
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          {language === 'ar' ? 'سلة التسوق الخاصة بك فارغة' : 'Your Shopping Cart is Empty'}
        </h1>
        <p className="text-gray-500 mb-6">
          {language === 'ar' ? 'يبدو أنك لم تقم بإضافة أي منتجات إلى سلتك بعد.' : "Looks like you haven't added any products to your cart yet."}
        </p>
        <Button onClick={() => navigate('/products')} icon={<ArrowRight className={language === 'ar' ? 'transform rotate-180 order-first' : 'order-last'} size={18}/>}>
          {language === 'ar' ? 'العودة للتسوق' : 'Continue Shopping'}
        </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {language === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          layout 
          className="lg:col-span-2 space-y-6"
        >
          <AnimatePresence>
            {cartItems.map(item => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: language === 'ar' ? 20 : -20, transition: { duration: 0.2 }}}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img src={item.thumbnail} alt={language === 'ar' ? item.nameAr : item.name} className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md" />
                </Link>
                <div className="flex-grow">
                  <Link to={`/product/${item.id}`} className="hover:text-medical-primary">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">{language === 'ar' ? item.nameAr : item.name}</h2>
                  </Link>
                  <p className="text-xs text-gray-500">{language === 'ar' ? item.brandAr : item.brand}</p>
                  {item.prescriptionRequired && (
                    <span className="mt-1 inline-flex items-center text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
                      <Info size={12} className="mr-1 rtl:ml-1" /> {language === 'ar' ? 'يتطلب وصفة' : 'Rx Required'}
                    </span>
                  )}
                  <p className="text-sm font-bold text-medical-primary mt-1">
                    {language === 'ar' ? 'ر.ع.' : 'OMR'} {(item.offerPrice || item.price).toFixed(3)}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                    <span className="px-3 text-sm w-8 text-center">{item.quantity}</span>
                    <Button variant="ghost" size="sm" className="p-1.5 h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-gray-700 w-24 text-center sm:text-right rtl:sm:text-left">
                    {language === 'ar' ? 'ر.ع.' : 'OMR'} {((item.offerPrice || item.price) * item.quantity).toFixed(3)}
                  </p>
                  <Button variant="ghost" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 p-1.5 h-8 w-8">
                    <Trash2 size={18} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
           {itemsRequiringPrescription.length > 0 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center">
                    <Info size={20} className="text-yellow-600 mr-2 rtl:ml-2" />
                    <p className="text-sm text-yellow-700">
                    {language === 'ar' ? 'بعض المنتجات في سلتك تتطلب وصفة طبية.' : 'Some items in your cart require a prescription.'}
                    </p>
                </div>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/upload-prescription')}
                    icon={<UploadCloud size={16}/>}
                    className="border-yellow-400 text-yellow-700 hover:bg-yellow-100 w-full sm:w-auto"
                >
                    {language === 'ar' ? 'تحميل الوصفات الآن' : 'Upload Prescriptions'}
                </Button>
            </div>
          )}
        </motion.div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">
              {language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span className="font-medium text-gray-800">{language === 'ar' ? 'ر.ع.' : 'OMR'} {subtotal.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'ar' ? 'الشحن المقدر' : 'Estimated Shipping'}</span>
                <span className="font-medium text-gray-800">{language === 'ar' ? 'ر.ع.' : 'OMR'} {shippingEstimate.toFixed(3)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{language === 'ar' ? 'خصم ترويجي' : 'Promo Discount'}</span>
                  <span>-{language === 'ar' ? 'ر.ع.' : 'OMR'} {promoDiscount.toFixed(3)}</span>
                </div>
              )}
              {loyaltyDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{language === 'ar' ? 'خصم الولاء' : 'Loyalty Discount'}</span>
                  <span>-{language === 'ar' ? 'ر.ع.' : 'OMR'} {loyaltyDiscount.toFixed(3)}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t">
              <label htmlFor="cartPromo" className="block text-sm font-medium text-gray-700 mb-1">{language === 'ar' ? 'رمز ترويجي' : 'Promo Code'}</label>
              <div className="flex">
                  <input 
                    type="text" 
                    id="cartPromo" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={language === 'ar' ? 'أدخل الرمز' : 'Enter code'} 
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-medical-primary focus:border-medical-primary text-sm"
                    disabled={promoApplied}
                  />
                  <Button variant="outline" onClick={handleApplyPromo} className="rounded-l-none rtl:rounded-r-none rtl:rounded-l-md border-l-0 rtl:border-r-0 rtl:border-l text-sm px-3" disabled={promoApplied}>
                      {promoApplied ? (language === 'ar' ? 'تم التطبيق' : 'Applied') : (language === 'ar' ? 'تطبيق' : 'Apply')}
                  </Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
                <label htmlFor="loyaltyPoints" className="block text-sm font-medium text-gray-700 mb-1">{language === 'ar' ? 'استبدال نقاط الولاء' : 'Redeem Loyalty Points'}</label>
                <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? `النقاط المتاحة: ${mockUser.loyaltyPoints - pointsRedeemed}` : `Available Points: ${mockUser.loyaltyPoints - pointsRedeemed}`}</p>
                <div className="flex">
                    <input 
                        type="number" 
                        id="loyaltyPoints" 
                        value={loyaltyPointsToRedeem}
                        onChange={(e) => setLoyaltyPointsToRedeem(e.target.value)}
                        placeholder={language === 'ar' ? 'أدخل النقاط' : 'Enter points'}
                        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-medical-primary focus:border-medical-primary text-sm"
                        max={mockUser.loyaltyPoints - pointsRedeemed}
                        min="0"
                    />
                    <Button variant="outline" onClick={handleRedeemPoints} className="rounded-l-none rtl:rounded-r-none rtl:rounded-l-md border-l-0 rtl:border-r-0 rtl:border-l text-sm px-3">
                        {language === 'ar' ? 'استبدال' : 'Redeem'}
                    </Button>
                </div>
            </div>

            <div className="border-t mt-6 pt-6">
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-semibold text-gray-800">{language === 'ar' ? 'المجموع الكلي' : 'Total'}</span>
                <span className="text-2xl font-bold text-medical-primary">{language === 'ar' ? 'ر.ع.' : 'OMR'} {Math.max(0, total).toFixed(3)}</span>
              </div>
              <Button 
                className="w-full mt-6 py-3 text-base" 
                icon={<ArrowRight className={language === 'ar' ? 'transform rotate-180 order-first' : 'order-last'} size={20}/>}
                onClick={() => navigate('/checkout/address')}
              >
                {language === 'ar' ? 'المتابعة إلى الدفع' : 'Proceed to Checkout'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
