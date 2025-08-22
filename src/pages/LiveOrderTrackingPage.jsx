import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { mockLiveTrackingData, getOrderById, ORDER_STATUSES } from '../data/mockData';
import OrderStepper from '../components/common/OrderStepper';
import Button from '../components/Button';
import { MapPin, Phone, MessageSquare, PackageCheck, Archive, Truck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = { PackageCheck, Archive, Truck, CheckCircle };

const LiveOrderTrackingPage = () => {
  const { orderId } = useParams();
  const { language } = useLanguage();
  const [trackingData, setTrackingData] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = mockLiveTrackingData(orderId);
    const fetchedOrder = getOrderById(orderId);
    setTrackingData(data);
    setOrder(fetchedOrder);
  }, [orderId]);

  if (!order) {
    return <div className="container mx-auto py-8 text-center">{language === 'ar' ? 'جارٍ تحميل تفاصيل الطلب...' : 'Loading order details...'}</div>;
  }
  
  if (!trackingData && order.statusKey !== ORDER_STATUSES.OUT_FOR_DELIVERY.en) { // Check English key as it's the base
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">{language === 'ar' ? `طلب رقم ${orderId}` : `Order ${orderId}`}</h1>
        <p className="text-gray-600">
          {language === 'ar' ? 'التتبع المباشر غير متاح لهذا الطلب حاليًا. حالة الطلب:' : 'Live tracking is not currently available for this order. Order status:'} {order.status}
        </p>
        <Link to={`/order-detail/${orderId}`} className="mt-4 inline-block text-medical-primary hover:underline">
          {language === 'ar' ? 'عرض تفاصيل الطلب' : 'View Order Details'}
        </Link>
      </div>
    );
  }
  
  if (!trackingData && order.statusKey === ORDER_STATUSES.OUT_FOR_DELIVERY.en) {
     return <div className="container mx-auto py-8 text-center">{language === 'ar' ? 'جارٍ تحميل بيانات التتبع...' : 'Loading tracking data...'}</div>;
  }


  const orderStatusSteps = [
    { key: 'CONFIRMED', name: 'Confirmed', nameAr: 'تم التأكيد', icon: PackageCheck, orderStatuses: ORDER_STATUSES},
    { key: 'PACKED', name: 'Packed', nameAr: 'تم التجهيز', icon: Archive, orderStatuses: ORDER_STATUSES},
    { key: 'OUT_FOR_DELIVERY', name: 'Out for Delivery', nameAr: 'قيد التوصيل', icon: Truck, orderStatuses: ORDER_STATUSES},
    { key: 'DELIVERED', name: 'Delivered', nameAr: 'تم التوصيل', icon: CheckCircle, orderStatuses: ORDER_STATUSES},
  ];
  
  const etaDate = trackingData ? new Date(trackingData.eta) : new Date();


  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">
          {language === 'ar' ? 'تتبع طلبك المباشر' : 'Live Order Tracking'}
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          {language === 'ar' ? `طلب رقم: ${orderId}` : `Order ID: ${orderId}`}
        </p>

        <div className="mb-8">
          <OrderStepper steps={orderStatusSteps} currentStatusKey={order.statusKey} language={language} />
        </div>

        {/* Map Placeholder */}
        <div className="aspect-video bg-gray-200 rounded-lg mb-8 flex items-center justify-center overflow-hidden relative">
          <img src={trackingData.mapImage} alt={language === 'ar' ? 'خريطة التتبع' : 'Tracking Map'} className="w-full h-full object-cover"/>
          {/* You can overlay a marker icon here if needed */}
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
             <MapPin size={32} className="text-red-500 drop-shadow-lg" fill="currentColor"/>
           </div>
        </div>

        {/* ETA and Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-sm">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-1">{language === 'ar' ? 'وقت الوصول المتوقع' : 'Estimated Time of Arrival'}</h3>
            <p className="text-medical-primary font-bold text-lg">
              {etaDate.toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: 'numeric', minute: '2-digit' })}
            </p>
            <p className="text-xs text-gray-500">{etaDate.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-1">{language === 'ar' ? 'عنوان التوصيل' : 'Delivery Address'}</h3>
            <p className="text-gray-600">{trackingData.deliveryAddress}</p>
          </div>
        </div>

        {/* Driver Details */}
        <div className="bg-white p-4 rounded-lg shadow-md border mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">{language === 'ar' ? 'مندوب التوصيل' : 'Delivery Agent'}</h3>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <img src={trackingData.driverImage} alt={trackingData.driverName} className="w-16 h-16 rounded-full object-cover shadow-sm"/>
            <div>
              <p className="font-semibold text-gray-800">{trackingData.driverName}</p>
              <p className="text-sm text-gray-500">{trackingData.driverPhone}</p>
            </div>
            <div className="flex-grow flex justify-end space-x-2 rtl:space-x-reverse">
                <Button variant="outline" size="sm" className="p-2 h-9 w-9" aria-label={language === 'ar' ? 'اتصل بالمندوب' : 'Call Agent'}>
                    <Phone size={16}/>
                </Button>
                <Button variant="outline" size="sm" className="p-2 h-9 w-9" aria-label={language === 'ar' ? 'راسل المندوب' : 'Message Agent'}>
                    <MessageSquare size={16}/>
                </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center">
            <Link to={`/order-detail/${orderId}`} className="text-medical-primary hover:underline text-sm">
                {language === 'ar' ? 'عرض تفاصيل الطلب الكاملة' : 'View Full Order Details'}
            </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default LiveOrderTrackingPage;
