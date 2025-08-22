import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getOrderById, DELIVERY_STATUSES } from '../../data/mockData';
import Button from '../../components/Button';
import { Package, User, Phone, MessageSquare, MapPin, Truck, CheckCircle, XCircle, Camera, Edit, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const DeliveryOrderDetailPage = () => {
  const { orderId } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null); // Local state for status changes
  const [showConfirmationModal, setShowConfirmationModal] = useState(null); // 'otp', 'signature', 'photo'
  const [issueReason, setIssueReason] = useState('');

  useEffect(() => {
    const fetchedOrder = getOrderById(orderId);
    if (fetchedOrder) {
      setOrder(fetchedOrder);
      setCurrentStatus(fetchedOrder.deliveryStatusKey);
    } else {
      navigate('/delivery/dashboard'); // Or a 404 page
    }
  }, [orderId, navigate]);

  if (!order) {
    return <div className="container mx-auto py-8 text-center">{language === 'ar' ? 'جارٍ تحميل تفاصيل الطلب...' : 'Loading order details...'}</div>;
  }

  const handleStartDelivery = () => {
    setCurrentStatus(DELIVERY_STATUSES.EN_ROUTE.en); // Using English key for internal state
    alert(language === 'ar' ? 'بدء التوصيل! يتم عرض المسار...' : 'Delivery started! Showing route...');
    // Add actual navigation/map logic here
  };

  const handleConfirmDelivery = (method) => {
    console.log(`Delivery confirmed with ${method}`);
    setCurrentStatus(DELIVERY_STATUSES.DELIVERED.en);
    setShowConfirmationModal(null);
    alert(language === 'ar' ? 'تم تأكيد التوصيل بنجاح!' : 'Delivery confirmed successfully!');
    // Navigate back or update order on backend
  };
  
  const handleMarkIssue = () => {
    if (!issueReason) {
        alert(language === 'ar' ? 'يرجى تحديد سبب المشكلة.' : 'Please select an issue reason.');
        return;
    }
    setCurrentStatus(DELIVERY_STATUSES.ISSUE_REPORTED.en);
    alert(language === 'ar' ? `تم الإبلاغ عن مشكلة: ${issueReason}` : `Issue reported: ${issueReason}`);
    // Send issue to backend
  };

  const statusInfo = DELIVERY_STATUSES[currentStatus] || DELIVERY_STATUSES.PENDING_ASSIGNMENT;
  const isDeliverable = currentStatus === DELIVERY_STATUSES.EN_ROUTE.en || currentStatus === DELIVERY_STATUSES.PENDING_PICKUP.en;

  return (
    <div className="container mx-auto py-4 sm:py-6 px-2 sm:px-4">
      <motion.div 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration:0.5 }}
        className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 pb-4 border-b">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              {language === 'ar' ? 'تفاصيل الطلب' : 'Order Details'} - {order.id}
            </h1>
            <p className={`text-xs sm:text-sm font-medium mt-1 flex items-center ${statusInfo.color}`}>
              <Truck size={16} className="mr-1.5 rtl:ml-1.5"/> {language === 'ar' ? statusInfo.ar : statusInfo.en}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="mt-2 sm:mt-0">
            {language === 'ar' ? 'رجوع' : 'Back'}
          </Button>
        </div>

        {/* Customer & Address Info */}
        <div className="mb-4 sm:mb-6 p-3 bg-gray-50 rounded-lg">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <User size={18} className="text-medical-accent mr-2 rtl:ml-2"/> {language === 'ar' ? 'معلومات العميل' : 'Customer Information'}
          </h2>
          <p className="text-sm text-gray-600">{language === 'ar' ? 'الاسم:' : 'Name:'} {order.deliveryAddress.name}</p>
          <p className="text-sm text-gray-600">{language === 'ar' ? 'الهاتف:' : 'Phone:'} {order.deliveryAddress.phone}</p>
          <p className="text-sm text-gray-600 flex items-start">
            <MapPin size={14} className="text-gray-500 mr-1 rtl:ml-1 mt-0.5 flex-shrink-0"/> 
            {order.deliveryAddress.address}
          </p>
          <div className="mt-2 flex gap-2">
            <Button as="a" href={`tel:${order.deliveryAddress.phone}`} variant="outline" size="sm" icon={<Phone size={14}/>} className="text-xs">
              {language === 'ar' ? 'اتصال' : 'Call'}
            </Button>
            <Button as="a" href={`https://wa.me/${order.deliveryAddress.phone.replace(/\D/g,'')}`} target="_blank" variant="outline" size="sm" icon={<MessageSquare size={14}/>} className="text-xs">
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <Package size={18} className="text-medical-accent mr-2 rtl:ml-2"/> {language === 'ar' ? 'محتويات الطلب' : 'Order Items'}
          </h2>
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar border p-2 rounded-md">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center text-xs p-1.5 bg-gray-50 rounded">
                <div>
                  <span className="font-medium text-gray-700">{language === 'ar' ? item.nameAr : item.name}</span>
                  <span className="text-gray-500"> (x{item.quantity})</span>
                  {item.prescriptionRequired && <Info size={12} className="inline text-yellow-600 ml-1 rtl:mr-1" title={language==='ar'?'يتطلب وصفة':'Rx Required'}/>}
                </div>
                <span className="text-gray-600">{language === 'ar' ? 'د.إ' : 'AED'} {(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="text-sm font-bold text-gray-800 mt-2 text-right rtl:text-left">
            {language === 'ar' ? 'الإجمالي:' : 'Total:'} {language === 'ar' ? 'د.إ' : 'AED'} {order.totalAmount}
            {order.paymentMethod === 'Cash on Delivery' && <span className="text-xs text-orange-600 ml-1 rtl:mr-1">({language === 'ar' ? 'الدفع نقداً' : 'COD'})</span>}
          </p>
        </div>

        {/* Actions */}
        {isDeliverable && (
          <div className="space-y-3">
            {currentStatus === DELIVERY_STATUSES.PENDING_PICKUP.en && (
              <Button onClick={handleStartDelivery} className="w-full py-2.5" icon={<Truck size={18}/>}>
                {language === 'ar' ? 'بدء التوصيل' : 'Start Delivery'}
              </Button>
            )}
            {currentStatus === DELIVERY_STATUSES.EN_ROUTE.en && (
              <Button onClick={() => setShowConfirmationModal('options')} className="w-full py-2.5 bg-green-500 hover:bg-green-600" icon={<CheckCircle size={18}/>}>
                {language === 'ar' ? 'تأكيد التوصيل' : 'Confirm Delivery'}
              </Button>
            )}
            <Button variant="outline" onClick={() => setShowConfirmationModal('issue')} className="w-full py-2.5 text-red-600 border-red-300 hover:bg-red-50" icon={<AlertTriangle size={18}/>}>
              {language === 'ar' ? 'الإبلاغ عن مشكلة' : 'Mark Issue'}
            </Button>
          </div>
        )}
        
        {currentStatus === DELIVERY_STATUSES.DELIVERED.en && (
            <p className="text-center text-green-600 font-semibold p-3 bg-green-50 rounded-md">{language === 'ar' ? 'تم توصيل هذا الطلب بنجاح!' : 'This order has been successfully delivered!'}</p>
        )}
        {currentStatus === DELIVERY_STATUSES.ISSUE_REPORTED.en && (
            <p className="text-center text-red-600 font-semibold p-3 bg-red-50 rounded-md">{language === 'ar' ? `تم الإبلاغ عن مشكلة: ${issueReason}` : `Issue Reported: ${issueReason}`}</p>
        )}


        {/* Confirmation Modal Options */}
        <AnimatePresence>
        {showConfirmationModal === 'options' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowConfirmationModal(null)}>
                <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} exit={{scale:0.9, y:20}} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
                    <h3 className="text-lg font-semibold mb-4">{language === 'ar' ? 'اختر طريقة التأكيد' : 'Choose Confirmation Method'}</h3>
                    <div className="space-y-2">
                        <Button onClick={() => setShowConfirmationModal('otp')} className="w-full" variant="outline">{language === 'ar' ? 'OTP من العميل' : 'Customer OTP'}</Button>
                        <Button onClick={() => setShowConfirmationModal('signature')} className="w-full" variant="outline">{language === 'ar' ? 'توقيع رقمي' : 'Digital Signature'}</Button>
                        <Button onClick={() => setShowConfirmationModal('photo')} className="w-full" variant="outline">{language === 'ar' ? 'إثبات بالصورة' : 'Photo Proof'}</Button>
                    </div>
                    <Button variant="ghost" onClick={() => setShowConfirmationModal(null)} className="w-full mt-4 text-sm">{language === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
                </motion.div>
            </motion.div>
        )}
        {['otp', 'signature', 'photo'].includes(showConfirmationModal) && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowConfirmationModal(null)}>
                <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} exit={{scale:0.9, y:20}} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
                    <h3 className="text-lg font-semibold mb-4">
                        {showConfirmationModal === 'otp' && (language === 'ar' ? 'إدخال OTP العميل' : 'Enter Customer OTP')}
                        {showConfirmationModal === 'signature' && (language === 'ar' ? 'توقيع العميل الرقمي' : 'Customer Digital Signature')}
                        {showConfirmationModal === 'photo' && (language === 'ar' ? 'التقاط صورة كإثبات' : 'Capture Photo Proof')}
                    </h3>
                    {/* Placeholder for actual input method */}
                    <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm mb-4">
                        {language === 'ar' ? `واجهة ${showConfirmationModal} هنا` : `${showConfirmationModal.toUpperCase()} interface here`}
                    </div>
                    <Button onClick={() => handleConfirmDelivery(showConfirmationModal)} className="w-full mb-2">{language === 'ar' ? 'تأكيد' : 'Confirm'}</Button>
                    <Button variant="ghost" onClick={() => setShowConfirmationModal('options')} className="w-full text-sm">{language === 'ar' ? 'رجوع' : 'Back'}</Button>
                </motion.div>
            </motion.div>
        )}
        {showConfirmationModal === 'issue' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowConfirmationModal(null)}>
                <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} exit={{scale:0.9, y:20}} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
                    <h3 className="text-lg font-semibold mb-4">{language === 'ar' ? 'الإبلاغ عن مشكلة' : 'Report an Issue'}</h3>
                    <select value={issueReason} onChange={(e) => setIssueReason(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm">
                        <option value="">{language === 'ar' ? 'اختر السبب...' : 'Select reason...'}</option>
                        <option value="customer_not_available">{language === 'ar' ? 'العميل غير متوفر' : 'Customer not available'}</option>
                        <option value="address_incorrect">{language === 'ar' ? 'العنوان غير صحيح' : 'Address incorrect'}</option>
                        <option value="item_damaged">{language === 'ar' ? 'المنتج تالف' : 'Item damaged'}</option>
                        <option value="other">{language === 'ar' ? 'أخرى' : 'Other'}</option>
                    </select>
                    {issueReason === 'other' && <InputField id="other_reason" label={language === 'ar' ? 'تفاصيل أخرى' : 'Other details'} language={language} className="mb-4"/>}
                    <Button onClick={handleMarkIssue} className="w-full mb-2 bg-red-500 hover:bg-red-600">{language === 'ar' ? 'إبلاغ' : 'Report'}</Button>
                    <Button variant="ghost" onClick={() => setShowConfirmationModal(null)} className="w-full text-sm">{language === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
                </motion.div>
            </motion.div>
        )}
        </AnimatePresence>


      </motion.div>
    </div>
  );
};

export default DeliveryOrderDetailPage;
