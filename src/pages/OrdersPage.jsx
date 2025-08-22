import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, Truck, CheckCircle, XCircle, RefreshCw, Filter, Calendar, Hash, PackageCheck, Archive, ShieldX } from 'lucide-react';
import { generateMockOrders, ORDER_STATUSES } from '../data/mockData'; 
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = { RefreshCw, Truck, PackageCheck, Archive, CheckCircle, XCircle, ShieldX };


const OrdersPage = () => {
  const { language } = useLanguage();
  const allMockOrders = useMemo(() => generateMockOrders(10, language), [language]); 
  const [orders, setOrders] = useState(allMockOrders);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState(''); 

  React.useEffect(() => {
    let filtered = allMockOrders;
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.statusKey === filterStatus);
    }
    setOrders(filtered);
  }, [filterStatus, filterDate, allMockOrders]);


  if (allMockOrders.length === 0) { 
    return (
      <div className="container mx-auto py-8 text-center">
        <Package size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          {language === 'ar' ? 'لا توجد طلبات بعد' : 'No Orders Yet'}
        </h1>
        <p className="text-gray-500 mb-6">
          {language === 'ar' ? 'لم تقم بإجراء أي طلبات. ابدأ التسوق الآن!' : "You haven't placed any orders yet. Start shopping now!"}
        </p>
        <Button as={Link} to="/products">
          {language === 'ar' ? 'تسوق المنتجات' : 'Shop Products'}
        </Button>
      </div>
    );
  }

  const statusOptions = [
    { value: 'all', label: language === 'ar' ? 'الكل' : 'All Statuses' },
    ...Object.keys(ORDER_STATUSES).map(key => ({
      value: key,
      label: language === 'ar' ? ORDER_STATUSES[key].ar : ORDER_STATUSES[key].en
    }))
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center">
            <ShoppingBag size={32} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {language === 'ar' ? 'طلباتي' : 'My Orders'}
            </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
                <Filter size={16} className={`absolute top-1/2 transform -translate-y-1/2 ${language === 'ar' ? 'right-3' : 'left-3'} text-gray-400 pointer-events-none`}/>
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`w-full sm:w-auto text-sm border-gray-300 rounded-md p-2 focus:ring-medical-primary focus:border-medical-primary bg-white shadow-sm appearance-none ${language === 'ar' ? 'pr-10' : 'pl-10'}`}
                >
                    {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
            </div>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          <AnimatePresence>
          {orders.map((order, index) => {
            const StatusIcon = iconMap[ORDER_STATUSES[order.statusKey]?.icon || 'Package'];
            const statusColor = ORDER_STATUSES[order.statusKey]?.color || 'text-gray-500';
            return (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                      {language === 'ar' ? 'طلب رقم:' : 'Order ID:'} {order.id}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {language === 'ar' ? 'بتاريخ:' : 'Placed on:'} {new Date(order.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-CA')}
                    </p>
                  </div>
                  <div className={`flex items-center text-xs sm:text-sm font-medium py-1 px-2.5 rounded-full ${statusColor.replace('text-', 'bg-')}/10 ${statusColor}`}>
                    <StatusIcon size={16} className="mr-1.5 rtl:ml-1.5 rtl:mr-0" />
                    {order.status}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center -space-x-2 rtl:space-x-reverse">
                      {order.itemsPreview.map((imgUrl, idx) => (
                          <img key={idx} src={imgUrl} alt={`item ${idx+1}`} className="w-10 h-10 rounded-full border-2 border-white shadow"/>
                      ))}
                      {order.itemCount > 3 && (
                          <div className="w-10 h-10 rounded-full border-2 border-white shadow bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                              +{order.itemCount - 3}
                          </div>
                      )}
                  </div>

                  <div className="text-left sm:text-right rtl:sm:text-left rtl:text-right">
                      <p className="text-xs text-gray-500">{language === 'ar' ? 'المجموع:' : 'Total:'}</p>
                      <p className="text-sm sm:text-base font-semibold text-medical-primary">
                      {language === 'ar' ? 'ر.ع.' : 'OMR'} {parseFloat(order.totalAmount).toFixed(3)} {/* Updated Currency */}
                      </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-2">
                  <Button as={Link} to={`/order-detail/${order.id}`} variant="outline" size="sm" className="text-xs">
                    {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </Button>
                  {order.statusKey === 'DELIVERED' && (
                    <Button variant="primary" size="sm" className="text-xs" icon={<RefreshCw size={14}/>} onClick={() => alert('Reorder action for ' + order.id)}>
                      {language === 'ar' ? 'إعادة الطلب' : 'Reorder'}
                    </Button>
                  )}
                   {order.statusKey !== 'CANCELLED' && order.statusKey !== 'DELIVERED' && order.statusKey !== 'REJECTED' && (
                    <Button variant="outline" size="sm" className="text-xs text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400" onClick={() => alert('Cancel action for ' + order.id)}>
                      {language === 'ar' ? 'إلغاء الطلب' : 'Cancel Order'}
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>
      ) : (
         <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {language === 'ar' ? 'لا توجد طلبات تطابق الفلتر' : 'No Orders Match Filters'}
            </h3>
            <p className="text-gray-500">
              {language === 'ar' ? 'حاول تعديل معايير التصفية.' : 'Try adjusting your filter criteria.'}
            </p>
          </div>
      )}
    </div>
  );
};

export default OrdersPage;
