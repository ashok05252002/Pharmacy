import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { mockOrders, DELIVERY_STATUSES } from '../../data/mockData';
import { Archive, Calendar, Filter, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import Button from '../../components/Button';
import { motion } from 'framer-motion';

const DeliveryHistoryPage = () => {
  const { language } = useLanguage();
  const [history, setHistory] = useState([]);
  const [filterDate, setFilterDate] = useState('all_time'); // 'all_time', 'today', 'last_7_days'

  useEffect(() => {
    // Simulate fetching completed/cancelled/issue orders for the staff
    const staffHistory = mockOrders.filter(order => 
      order.deliveryStatusKey === DELIVERY_STATUSES.DELIVERED.en || 
      order.deliveryStatusKey === DELIVERY_STATUSES.CANCELLED.en ||
      order.deliveryStatusKey === DELIVERY_STATUSES.ISSUE_REPORTED.en
    ).sort((a,b) => new Date(b.date) - new Date(a.date)); // Sort by most recent
    setHistory(staffHistory);
  }, []);
  
  const IconMap = { CheckCircle2, XCircle, AlertTriangle };


  const filteredHistory = history.filter(order => {
    if (filterDate === 'all_time') return true;
    const orderDate = new Date(order.date);
    const today = new Date();
    if (filterDate === 'today') return orderDate.toDateString() === today.toDateString();
    if (filterDate === 'last_7_days') {
        const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
        return orderDate >= sevenDaysAgo;
    }
    return true;
  });

  return (
    <div className="container mx-auto py-4 sm:py-6 px-2 sm:px-4">
      <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} transition={{ duration:0.5 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div className="flex items-center">
            <Archive size={24} sm={28} className="text-medical-primary mr-2 rtl:ml-2" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {language === 'ar' ? 'سجل التوصيل' : 'Delivery History'}
            </h1>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={16} className="text-gray-500"/>
            <select 
              value={filterDate} 
              onChange={(e) => setFilterDate(e.target.value)}
              className="text-xs sm:text-sm border-gray-300 rounded-md p-2 focus:ring-medical-primary focus:border-medical-primary bg-white shadow-sm appearance-none flex-grow sm:flex-grow-0"
            >
              <option value="all_time">{language === 'ar' ? 'كل الأوقات' : 'All Time'}</option>
              <option value="today">{language === 'ar' ? 'اليوم' : 'Today'}</option>
              <option value="last_7_days">{language === 'ar' ? 'آخر 7 أيام' : 'Last 7 Days'}</option>
            </select>
          </div>
        </div>

        {filteredHistory.length > 0 ? (
          <div className="space-y-3">
            {filteredHistory.map(order => {
              const statusInfo = DELIVERY_STATUSES[order.deliveryStatusKey] || { text: order.deliveryStatusKey, color: 'text-gray-500', icon: 'Package' };
              const StatusIcon = IconMap[statusInfo.icon] || Archive;
              return (
              <div key={order.id} className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    <Link to={`/delivery/order-detail/${order.id}`} className="text-sm font-semibold text-medical-primary hover:underline">
                      {language === 'ar' ? 'طلب رقم:' : 'Order ID:'} {order.id}
                    </Link>
                    <p className="text-xs text-gray-600">{language === 'ar' ? 'العميل:' : 'Customer:'} {order.deliveryAddress.name}</p>
                  </div>
                  <div className={`flex items-center text-xs font-medium py-1 px-2 rounded-full ${statusInfo.color.replace('text-','bg-')}/10 ${statusInfo.color}`}>
                    <StatusIcon size={14} className="mr-1 rtl:ml-1"/>
                    {language === 'ar' ? statusInfo.ar : statusInfo.en}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{language === 'ar' ? 'إلى:' : 'To:'} {order.deliveryAddress.address}</p>
              </div>
            )})}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <Archive size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">
              {language === 'ar' ? 'لا توجد توصيلات في السجل تطابق الفلتر.' : 'No deliveries in history matching this filter.'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DeliveryHistoryPage;
