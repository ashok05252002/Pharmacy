import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardCard from '../../components/admin/DashboardCard';
import { 
  Users, Archive, Truck, FileText, Tag, BarChart2, Settings, ShieldCheck, ShoppingBag, Layers, Edit, Building, MessageCircle, 
  CheckCircle, Map, BookOpen // Added CheckCircle, Map, BookOpen
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { userRole } = useOutletContext(); // Get userRole from AdminLayout
  const { language } = useLanguage();

  const adminCards = [
    { title: 'Total Users', titleAr: 'إجمالي المستخدمين', value: '1,250', icon: Users, link: '#', linkText: 'Manage Users', linkTextAr: 'إدارة المستخدمين', color: 'medical-primary' },
    { title: 'Pending Prescriptions', titleAr: 'الوصفات المعلقة', value: '25', icon: FileText, link: '/admin/prescriptions', linkText: 'Review Prescriptions', linkTextAr: 'مراجعة الوصفات', color: 'yellow' },
    { title: 'Total Products', titleAr: 'إجمالي المنتجات', value: '5,678', icon: Archive, link: '/admin/products', linkText: 'Manage Products', linkTextAr: 'إدارة المنتجات', color: 'medical-secondary' },
    { title: 'Active Campaigns', titleAr: 'الحملات النشطة', value: '12', icon: Tag, link: '/admin/campaigns', linkText: 'Manage Campaigns', linkTextAr: 'إدارة الحملات', color: 'green' },
    { title: 'Clusters Managed', titleAr: 'المجموعات المدارة', value: '5', icon: Layers, link: '/admin/cluster-management', linkText: 'Manage Clusters', linkTextAr: 'إدارة المجموعات', color: 'medical-accent' },
    { title: 'Sales Overview', titleAr: 'نظرة عامة على المبيعات', value: 'AED 1.2M', icon: BarChart2, link: '/admin/reports', linkText: 'View Reports', linkTextAr: 'عرض التقارير', color: 'medical-primary' },
  ];

  const storeOwnerCards = [
    { title: 'Pending Orders', titleAr: 'الطلبات المعلقة', value: '15', icon: ShoppingBag, link: '/store-owner/orders', linkText: 'View Orders', linkTextAr: 'عرض الطلبات', color: 'yellow' },
    { title: 'Store Inventory Items', titleAr: 'عناصر مخزون المتجر', value: '850', icon: Archive, link: '/store-owner/inventory', linkText: 'Manage Inventory', linkTextAr: 'إدارة المخزون', color: 'medical-secondary' },
    { title: 'Active Delivery Staff', titleAr: 'موظفو التوصيل النشطون', value: '5', icon: Truck, link: '/store-owner/delivery-staff', linkText: 'Manage Staff', linkTextAr: 'إدارة الموظفين', color: 'green' },
    { title: 'Open Support Tickets', titleAr: 'تذاكر الدعم المفتوحة', value: '3', icon: MessageCircle, link: '/store-owner/support-tickets', linkText: 'View Tickets', linkTextAr: 'عرض التذاكر', color: 'medical-accent' },
    { title: 'Store Sales (Month)', titleAr: 'مبيعات المتجر (شهري)', value: 'AED 45K', icon: BarChart2, link: '/store-owner/reports', linkText: 'View Reports', linkTextAr: 'عرض التقارير', color: 'medical-primary' },
    { title: 'Store Profile', titleAr: 'ملف المتجر', value: '', icon: Building, link: '/store-owner/profile', linkText: 'Update Profile', linkTextAr: 'تحديث الملف', description: 'Manage store hours, contact, and zones.', descriptionAr: 'إدارة ساعات عمل المتجر، معلومات الاتصال، والمناطق.', color: 'medical-secondary' },
  ];
  
  const deliveryStaffCards = [
    { title: 'Active Deliveries', titleAr: 'التوصيلات النشطة', value: '3', icon: Truck, link: '/delivery/active-deliveries', linkText: 'View Deliveries', linkTextAr: 'عرض التوصيلات', color: 'green' },
    { title: 'Completed Today', titleAr: 'أكملت اليوم', value: '12', icon: CheckCircle, link: '/delivery/history', linkText: 'View History', linkTextAr: 'عرض السجل', color: 'medical-primary' },
    { title: 'Navigation Map', titleAr: 'خريطة الملاحة', value: '', icon: Map, link: '#', linkText: 'Open Map', linkTextAr: 'فتح الخريطة', description: 'Access live navigation for current delivery.', descriptionAr: 'الوصول إلى الملاحة المباشرة للتوصيل الحالي.', color: 'medical-secondary' },
  ];

  const pharmacistCards = [
    { title: 'Prescriptions to Review', titleAr: 'وصفات للمراجعة', value: '18', icon: FileText, link: '/pharmacist/review-prescriptions', linkText: 'Start Review', linkTextAr: 'بدء المراجعة', color: 'yellow' },
    { title: 'Approved Today', titleAr: 'تمت الموافقة عليها اليوم', value: '35', icon: CheckCircle, link: '/pharmacist/logs', linkText: 'View Logs', linkTextAr: 'عرض السجلات', color: 'green' },
    { title: 'Review Guidelines', titleAr: 'إرشادات المراجعة', value: '', icon: BookOpen, link: '#', linkText: 'Open Guidelines', linkTextAr: 'فتح الإرشادات', description: 'Access prescription review protocols and guidelines.', descriptionAr: 'الوصول إلى بروتوكولات وإرشادات مراجعة الوصفات.', color: 'medical-secondary' },
  ];


  let cardsToShow = [];
  let welcomeTitle = '';

  if (userRole === 'admin') {
    cardsToShow = adminCards;
    welcomeTitle = language === 'ar' ? 'لوحة تحكم المسؤول' : 'Admin Dashboard';
  } else if (userRole === 'store_owner') {
    cardsToShow = storeOwnerCards;
    welcomeTitle = language === 'ar' ? 'لوحة تحكم صاحب المتجر' : 'Store Owner Dashboard';
  } else if (userRole === 'delivery_staff') {
    cardsToShow = deliveryStaffCards;
    welcomeTitle = language === 'ar' ? 'لوحة تحكم موظف التوصيل' : 'Delivery Staff Dashboard';
  } else if (userRole === 'pharmacist') {
    cardsToShow = pharmacistCards;
    welcomeTitle = language === 'ar' ? 'لوحة تحكم الصيدلي' : 'Pharmacist Dashboard';
  }


  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">{welcomeTitle}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {cardsToShow.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            titleAr={card.titleAr}
            value={card.value}
            icon={card.icon}
            link={card.link}
            linkText={card.linkText}
            linkTextAr={card.linkTextAr}
            color={card.color}
            description={card.description}
            descriptionAr={card.descriptionAr}
          />
        ))}
      </div>
      {/* Placeholder for more detailed charts or recent activity feeds */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{language === 'ar' ? 'نظرة عامة على النشاط' : 'Activity Overview'}</h2>
        <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
          <p className="text-gray-400">{language === 'ar' ? 'الرسوم البيانية والمؤشرات الرئيسية ستعرض هنا' : 'Charts and key metrics will be displayed here.'}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
