import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DollarSign, BarChart2, Gift, CheckCircle, Calendar } from 'lucide-react';
import { mockDeliveryEarnings } from '../../data/mockData';
import { motion } from 'framer-motion';

const DeliveryEarningsPage = () => {
  const { language } = useLanguage();
  const earnings = mockDeliveryEarnings;

  return (
    <div className="container mx-auto py-4 sm:py-6 px-2 sm:px-4">
      <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} transition={{ duration:0.5 }}>
        <div className="flex items-center mb-4 sm:mb-6">
          <DollarSign size={24} sm={28} className="text-medical-primary mr-2 rtl:ml-2" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {language === 'ar' ? 'ملخص الأرباح' : 'Earnings Summary'}
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <StatCard 
            title={language === 'ar' ? 'إجمالي هذا الأسبوع' : "This Week's Total"} 
            value={`${language === 'ar' ? 'ر.ع.' : 'OMR'} ${earnings.currentWeekTotal.toFixed(3)}`} 
            icon={DollarSign} 
            color="text-green-500"
          />
          <StatCard 
            title={language === 'ar' ? 'توصيلات هذا الأسبوع' : "Deliveries This Week"} 
            value={earnings.totalDeliveriesThisWeek.toString()} 
            icon={CheckCircle} 
            color="text-blue-500"
          />
          <StatCard 
            title={language === 'ar' ? 'مكافأة هذا الأسبوع' : "Bonus This Week"} 
            value={`${language === 'ar' ? 'ر.ع.' : 'OMR'} ${earnings.bonusThisWeek.toFixed(3)}`} 
            icon={Gift} 
            color="text-yellow-500"
          />
          <StatCard 
            title={language === 'ar' ? 'نقاط الولاء المكتسبة' : "Loyalty Points Earned"} 
            value={earnings.loyaltyPointsEarned.toString()} 
            icon={BarChart2} 
            color="text-purple-500"
          />
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 flex items-center">
            <Calendar size={18} className="text-medical-accent mr-2 rtl:ml-2"/> {language === 'ar' ? 'الأرباح الأسبوعية' : 'Weekly Earnings Breakdown'}
          </h2>
          <div className="h-48 sm:h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-400 text-sm">{language === 'ar' ? 'مخطط الأرباح الأسبوعية هنا' : 'Weekly earnings chart placeholder'}</p>
          </div>
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-7 gap-1 text-center text-xs text-gray-500">
            {earnings.weekly.map(day => (
                <div key={day.day} className="p-1 bg-gray-50 rounded">
                    <div>{language === 'ar' ? day.dayAr : day.day}</div>
                    <div className="font-medium text-gray-700">{language === 'ar' ? 'ر.ع.' : 'OMR'} {day.earnings.toFixed(3)}</div> {/* Updated Currency */}
                </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          {language === 'ar' ? 'يتم تحديث الأرباح يوميًا. قد تخضع المكافآت للتغيير.' : 'Earnings are updated daily. Bonuses may be subject to change.'}
        </p>
      </motion.div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-3 sm:p-4 rounded-lg shadow text-center">
    <Icon size={20} sm={24} className={`${color} mx-auto mb-1 sm:mb-2`} />
    <p className="text-xs sm:text-sm text-gray-600">{title}</p>
    <p className="text-sm sm:text-base font-bold text-gray-800">{value}</p>
  </div>
);

export default DeliveryEarningsPage;
