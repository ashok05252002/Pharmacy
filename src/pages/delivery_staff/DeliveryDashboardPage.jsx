import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardCard from '../../components/admin/DashboardCard';
import Button from '../../components/Button';
import { Truck, CheckCircle, Map, PackagePlus, Phone, Eye, Navigation, AlertTriangle, XCircle, Package } from 'lucide-react'; // Added Package
import { mockOrders, DELIVERY_STATUSES } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const DeliveryDashboardPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();
  const [isOnline, setIsOnline] = useState(true);
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [newAssignments, setNewAssignments] = useState([]);

  useEffect(() => {
    // Simulate fetching orders for delivery staff
    const staffOrders = mockOrders.filter(order => 
      order.deliveryStatusKey === DELIVERY_STATUSES.PENDING_ASSIGNMENT.en || 
      order.deliveryStatusKey === DELIVERY_STATUSES.PENDING_PICKUP.en || 
      order.deliveryStatusKey === DELIVERY_STATUSES.EN_ROUTE.en
    );
    
    setNewAssignments(staffOrders.filter(o => o.isNewAssignment));
    setActiveDeliveries(staffOrders.filter(o => !o.isNewAssignment && (o.deliveryStatusKey === DELIVERY_STATUSES.PENDING_PICKUP.en || o.deliveryStatusKey === DELIVERY_STATUSES.EN_ROUTE.en)));
  }, []);

  const handleToggleOnline = () => setIsOnline(!isOnline);

  const handleAcceptOrder = (orderId) => {
    const acceptedOrder = newAssignments.find(o => o.id === orderId);
    if (acceptedOrder) {
      setNewAssignments(prev => prev.filter(o => o.id !== orderId));
      setActiveDeliveries(prev => [{ ...acceptedOrder, deliveryStatusKey: DELIVERY_STATUSES.PENDING_PICKUP.en, deliveryStatus: language === 'ar' ? DELIVERY_STATUSES.PENDING_PICKUP.ar : DELIVERY_STATUSES.PENDING_PICKUP.en, isNewAssignment: false }, ...prev]);
    }
  };

  const handleRejectOrder = (orderId) => {
    setNewAssignments(prev => prev.filter(o => o.id !== orderId));
    // In a real app, notify backend about rejection
  };

  const getStatusInfo = (statusKey) => {
    const status = Object.values(DELIVERY_STATUSES).find(s => s.en === statusKey); // Assuming statusKey is English
    if (status) return { text: language === 'ar' ? status.ar : status.en, color: status.color, icon: status.icon };
    return { text: statusKey, color: 'text-gray-500', icon: 'Package' }; // Fallback
  };
  
  const IconMap = { Package, Navigation, CheckCircle2: CheckCircle, AlertTriangle, XCircle, UserPlus: PackagePlus, PackagePlus };


  const quickStats = [
    { title: 'Today\'s Deliveries', titleAr: 'توصيلات اليوم', value: activeDeliveries.filter(o => new Date(o.eta).toDateString() === new Date().toDateString()).length, icon: Truck, color: 'medical-primary' },
    { title: 'Pending Pickups', titleAr: 'بانتظار الاستلام', value: activeDeliveries.filter(o => o.deliveryStatusKey === DELIVERY_STATUSES.PENDING_PICKUP.en).length, icon: PackagePlus, color: 'yellow' },
  ];

  return (
    <div className="container mx-auto py-4 sm:py-6 px-2 sm:px-4">
      {/* Online/Offline Toggle */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          {language === 'ar' ? 'لوحة التحكم' : 'My Dashboard'}
        </h1>
        <button
          onClick={handleToggleOnline}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium flex items-center transition-colors
            ${isOnline ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
        >
          <div className={`w-2 h-2 rounded-full mr-2 rtl:ml-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
          {isOnline ? (language === 'ar' ? 'متصل' : 'Online') : (language === 'ar' ? 'غير متصل' : 'Offline')}
        </button>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {quickStats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            titleAr={stat.titleAr}
            value={stat.value.toString()}
            icon={stat.icon}
            color={stat.color}
            // No link or linkText for these simple stat cards
          />
        ))}
      </div>

      {/* New Assignments */}
      <AnimatePresence>
      {newAssignments.length > 0 && isOnline && (
        <motion.section 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, y: -10 }}
            className="mb-4 sm:mb-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-3">{language === 'ar' ? 'مهام جديدة' : 'New Assignments'} ({newAssignments.length})</h2>
          <div className="space-y-3">
            {newAssignments.map(order => (
              <motion.div 
                key={order.id} 
                layout
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, transition: { duration: 0.2 }}}
                className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-yellow-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{language === 'ar' ? 'طلب رقم:' : 'Order ID:'} {order.id}</p>
                    <p className="text-xs text-gray-600">{order.deliveryAddress.address}</p>
                    <p className="text-xs text-yellow-600">{language === 'ar' ? 'وقت الوصول المتوقع:' : 'ETA:'} {new Date(order.eta).toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button size="sm" onClick={() => handleAcceptOrder(order.id)} className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1">
                      {language === 'ar' ? 'قبول' : 'Accept'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleRejectOrder(order.id)} className="text-red-500 border-red-300 hover:bg-red-50 text-xs px-2 py-1">
                      {language === 'ar' ? 'رفض' : 'Reject'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
      </AnimatePresence>

      {/* Active Deliveries */}
      <section>
        <div className="flex justify-between items-center mb-2 sm:mb-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">{language === 'ar' ? 'التوصيلات النشطة' : 'Active Deliveries'}</h2>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => alert('Map view toggled (mock)')} icon={<Map size={16}/>}>
                {language === 'ar' ? 'عرض الخريطة' : 'Map View'}
            </Button>
        </div>
        {activeDeliveries.length > 0 && isOnline ? (
          <div className="space-y-3">
            {activeDeliveries.map(order => {
              const statusInfo = getStatusInfo(order.deliveryStatusKey);
              const StatusIcon = IconMap[statusInfo.icon] || Truck;
              return (
              <motion.div 
                key={order.id} 
                layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white p-3 sm:p-4 rounded-lg shadow-md"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between sm:justify-start mb-1">
                        <p className="text-sm font-semibold text-gray-800">{language === 'ar' ? 'طلب رقم:' : 'Order ID:'} {order.id}</p>
                        <span className={`ml-2 rtl:mr-2 px-1.5 py-0.5 text-[10px] sm:text-xs font-medium rounded-full flex items-center ${statusInfo.color.replace('text-', 'bg-')}/10 ${statusInfo.color}`}>
                            <StatusIcon size={12} className="mr-1 rtl:ml-1"/> {statusInfo.text}
                        </span>
                    </div>
                    <p className="text-xs text-gray-600">{language === 'ar' ? 'العميل:' : 'Customer:'} {order.deliveryAddress.name}</p>
                    <p className="text-xs text-gray-500 truncate max-w-xs sm:max-w-sm">{order.deliveryAddress.address}</p>
                    <p className="text-xs text-medical-primary font-medium">{language === 'ar' ? 'وقت الوصول المتوقع:' : 'ETA:'} {new Date(order.eta).toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                  </div>
                  <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-0 self-start sm:self-center">
                    <Button as={Link} to={`tel:${order.deliveryAddress.phone}`} variant="outline" size="sm" className="p-1.5 h-8 w-8 sm:h-9 sm:w-9" aria-label={language==='ar'?'اتصال':'Call'}>
                      <Phone size={14} />
                    </Button>
                     <Button variant="outline" size="sm" className="p-1.5 h-8 w-8 sm:h-9 sm:w-9" onClick={() => alert('Open map for ' + order.id)} aria-label={language==='ar'?'خريطة':'Map'}>
                      <Navigation size={14} />
                    </Button>
                    <Button as={Link} to={`/delivery/order-detail/${order.id}`} variant="primary" size="sm" className="text-xs px-2 py-1 h-8 sm:h-9">
                      {language === 'ar' ? 'تفاصيل' : 'Details'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )})}
          </div>
        ) : (
          <div className="text-center py-6 bg-white rounded-lg shadow-md">
            <Truck size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">
              {isOnline ? (language === 'ar' ? 'لا توجد توصيلات نشطة حاليًا.' : 'No active deliveries right now.') : (language === 'ar' ? 'أنت غير متصل. قم بالاتصال لتلقي المهام.' : 'You are offline. Go online to receive tasks.')}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DeliveryDashboardPage;
