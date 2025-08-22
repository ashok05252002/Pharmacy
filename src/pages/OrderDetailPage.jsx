import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getOrderById, ORDER_STATUSES } from '../data/mockData';
import Button from '../components/Button';
import OrderStepper from '../components/common/OrderStepper';
import { Package, CreditCard, MapPin, FileText, MessageSquare, RefreshCw, Download, HelpCircle, Truck, PackageCheck, Archive, CheckCircle, XCircle, ShieldX } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = { RefreshCw, Truck, PackageCheck, Archive, CheckCircle, XCircle, ShieldX };


const OrderDetailPage = () => {
  const { orderId } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchedOrder = getOrderById(orderId);
    setOrder(fetchedOrder);
    if (!fetchedOrder) {
        // navigate('/orders');
    }
  }, [orderId, navigate]);

  if (!order) {
    return <div className="container mx-auto py-8 text-center">{language === 'ar' ? 'جارٍ تحميل تفاصيل الطلب...' : 'Loading order details...'}</div>;
  }

  const { 
    date, totalAmount, status, statusKey, items, subtotal, discount, shipping, 
    paymentMethod, deliveryAddress, storeName, prescriptionUrl 
  } = order;
  
  const StatusIcon = iconMap[ORDER_STATUSES[statusKey]?.icon || 'Package'];
  const statusColor = ORDER_STATUSES[statusKey]?.color || 'text-gray-500';

  const orderStatusSteps = [
    { key: 'CONFIRMED', name: 'Confirmed', nameAr: 'تم التأكيد', icon: PackageCheck, orderStatuses: ORDER_STATUSES },
    { key: 'PACKED', name: 'Packed', nameAr: 'تم التجهيز', icon: Archive, orderStatuses: ORDER_STATUSES },
    { key: 'OUT_FOR_DELIVERY', name: 'Out for Delivery', nameAr: 'قيد التوصيل', icon: Truck, orderStatuses: ORDER_STATUSES },
    { key: 'DELIVERED', name: 'Delivered', nameAr: 'تم التوصيل', icon: CheckCircle, orderStatuses: ORDER_STATUSES },
  ].filter(step => ORDER_STATUSES[step.key]?.step > 0); 

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {language === 'ar' ? 'تفاصيل الطلب' : 'Order Details'}
            </h1>
            <p className="text-sm text-gray-500">
              {language === 'ar' ? `رقم الطلب: ${orderId}` : `Order ID: ${orderId}`} | {language === 'ar' ? 'بتاريخ:' : 'Placed on:'} {new Date(date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-CA')}
            </p>
          </div>
          <div className={`flex items-center text-sm font-medium py-1.5 px-3 rounded-full ${statusColor.replace('text-', 'bg-')}/10 ${statusColor}`}>
            <StatusIcon size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
            {status}
          </div>
        </div>

        {ORDER_STATUSES[statusKey]?.step > 0 && (
          <div className="mb-8 p-4 bg-white rounded-xl shadow-md">
            <OrderStepper steps={orderStatusSteps} currentStatusKey={statusKey} language={language} />
          </div>
        )}
        
        {statusKey === 'OUT_FOR_DELIVERY' && (
            <div className="mb-6">
                <Button as={Link} to={`/live-order-tracking/${orderId}`} variant="primary" className="w-full sm:w-auto" icon={<Truck size={18}/>}>
                    {language === 'ar' ? 'تتبع الطلب مباشرة' : 'Track Live Order'}
                </Button>
            </div>
        )}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{language === 'ar' ? 'المنتجات المطلوبة' : 'Items Ordered'} ({items.length})</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                  <img src={item.thumbnail} alt={language === 'ar' ? item.nameAr : item.name} className="w-20 h-20 object-cover rounded-md border"/>
                  <div className="flex-grow">
                    <Link to={`/product/${item.id}`} className="font-medium text-gray-800 hover:text-medical-primary text-sm">{language === 'ar' ? item.nameAr : item.name}</Link>
                    <p className="text-xs text-gray-500">{language === 'ar' ? 'الكمية:' : 'Qty:'} {item.quantity}</p>
                    {item.prescriptionRequired && <span className="text-xs text-yellow-600">({language === 'ar' ? 'يتطلب وصفة' : 'Rx'})</span>}
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{language === 'ar' ? 'ر.ع.' : 'OMR'} {(item.priceAtPurchase * item.quantity).toFixed(3)}</p> {/* Updated Currency */}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">{language === 'ar' ? 'ملخص الدفع' : 'Payment Summary'}</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">{language === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'}</span> <span className="font-medium text-gray-800">{language === 'ar' ? 'ر.ع.' : 'OMR'} {parseFloat(subtotal).toFixed(3)}</span></div> {/* Updated Currency */}
                {parseFloat(discount) > 0 && <div className="flex justify-between"><span className="text-gray-600">{language === 'ar' ? 'الخصم:' : 'Discount:'}</span> <span className="font-medium text-red-500">- {language === 'ar' ? 'ر.ع.' : 'OMR'} {parseFloat(discount).toFixed(3)}</span></div>} {/* Updated Currency */}
                <div className="flex justify-between"><span className="text-gray-600">{language === 'ar' ? 'الشحن:' : 'Shipping:'}</span> <span className="font-medium text-gray-800">{language === 'ar' ? 'ر.ع.' : 'OMR'} {parseFloat(shipping).toFixed(3)}</span></div> {/* Updated Currency */}
                <div className="flex justify-between text-base font-bold pt-2 border-t mt-2"><span className="text-gray-800">{language === 'ar' ? 'المجموع الكلي:' : 'Total:'}</span> <span className="text-medical-primary">{language === 'ar' ? 'ر.ع.' : 'OMR'} {parseFloat(totalAmount).toFixed(3)}</span></div> {/* Updated Currency */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-600">{language === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'}</span>
                  <div className="flex items-center font-medium text-gray-800">
                    <CreditCard size={16} className="text-gray-500 mr-1.5 rtl:ml-1.5 rtl:mr-0"/> {paymentMethod}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">{language === 'ar' ? 'معلومات التوصيل' : 'Delivery Information'}</h2>
              <div className="space-y-1 text-sm">
                <p className="font-medium text-gray-800">{deliveryAddress.name}</p>
                <p className="text-gray-600">{deliveryAddress.address}</p>
                <p className="text-gray-600">{deliveryAddress.phone}</p>
                <p className="text-gray-600 mt-1">{language === 'ar' ? 'تم الشحن من:' : 'Dispatched from:'} <span className="font-medium">{storeName}</span></p>
              </div>
            </div>

            {prescriptionUrl && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">{language === 'ar' ? 'الوصفة المرفقة' : 'Attached Prescription'}</h2>
                <Button as="a" href={prescriptionUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" icon={<FileText size={16}/>}>
                  {language === 'ar' ? 'عرض الوصفة' : 'View Prescription'}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-wrap gap-3 justify-center sm:justify-start">
          <Button variant="outline" icon={<Download size={16}/>} onClick={() => alert(language === 'ar' ? 'تحميل الفاتورة...' : 'Downloading invoice...')}>
            {language === 'ar' ? 'تحميل الفاتورة' : 'Download Invoice'}
          </Button>
          {order.statusKey === 'DELIVERED' && (
            <Button variant="primary" icon={<RefreshCw size={16}/>} onClick={() => alert(language === 'ar' ? 'إعادة طلب المنتجات...' : 'Reordering items...')}>
              {language === 'ar' ? 'إعادة الطلب' : 'Reorder Items'}
            </Button>
          )}
          <Button variant="outline" icon={<HelpCircle size={16}/>} onClick={() => navigate('/support-tickets', { state: { orderId: order.id } })}>
            {language === 'ar' ? 'الإبلاغ عن مشكلة' : 'Raise an Issue'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetailPage;
