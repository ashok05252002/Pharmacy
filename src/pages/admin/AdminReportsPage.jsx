import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { BarChart2, TrendingUp, ShoppingBag, Users, Download } from 'lucide-react';
import Button from '../../components/Button';

const AdminReportsPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();

  const reportCards = [
    { title: 'Sales Trends', titleAr: 'اتجاهات المبيعات', icon: TrendingUp, color: 'medical-primary' },
    { title: 'Stock Alerts', titleAr: 'تنبيهات المخزون', icon: ShoppingBag, color: 'yellow' },
    { title: 'Order Behavior', titleAr: 'سلوك الطلبات', icon: ShoppingBag, color: 'medical-secondary' },
    { title: 'User Demographics', titleAr: 'التركيبة السكانية للمستخدمين', icon: Users, color: 'medical-accent' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <BarChart2 size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'التقارير والتحليلات' : 'Reports & Analytics'}
            </h1>
        </div>
        <Button variant="outline" icon={<Download size={16}/>}>
            {language === 'ar' ? 'تصدير الكل' : 'Export All Reports'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {reportCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className={`p-6 bg-white rounded-xl shadow-lg border-l-4 rtl:border-r-4 rtl:border-l-0 border-${card.color}`}>
              <div className="flex items-center justify-between mb-3">
                <h2 className={`text-lg font-semibold text-gray-700`}>{language === 'ar' ? card.titleAr : card.title}</h2>
                <Icon size={24} className={`text-${card.color}`} />
              </div>
              <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center mb-3">
                <p className="text-gray-400 text-sm">{language === 'ar' ? 'مخطط البيانات هنا' : 'Data chart placeholder'}</p>
              </div>
              <Button variant="outline" size="sm" className={`text-xs border-${card.color} text-${card.color} hover:bg-${card.color}/10`}>
                {language === 'ar' ? 'عرض التقرير' : 'View Report'}
              </Button>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-gray-600">
        {language === 'ar' ? 'لوحة تحكم شاملة مع رؤى حول اتجاهات المبيعات، تنبيهات المخزون، سلوك الطلبات، والمزيد.' : 'Comprehensive dashboard with insights on sales trends, stock alerts, order behavior, and more.'}
      </p>
    </div>
  );
};

export default AdminReportsPage;
