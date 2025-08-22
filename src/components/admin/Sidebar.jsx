import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Users, Archive, Truck, FileText as PrescriptionIcon, Tag, BarChart2, Settings, ShieldCheck, ShoppingBag, Layers, Edit, MessageCircle, X, Building, DollarSign, HelpCircle } from 'lucide-react'; 
import Logo from '../common/Logo';
import { useLanguage } from '../../contexts/LanguageContext';

const Sidebar = ({ isOpen, toggleSidebar, userRole }) => {
  const { language } = useLanguage();

  const commonLinks = [
  ];

  const adminNavLinks = [
    { name: 'Dashboard', nameAr: 'لوحة التحكم', icon: Home, path: '/admin/dashboard' },
    { name: 'Clusters', nameAr: 'المجموعات', icon: Layers, path: '/admin/cluster-management' },
    { name: 'Prescriptions', nameAr: 'الوصفات', icon: PrescriptionIcon, path: '/admin/prescriptions' },
    { name: 'Products', nameAr: 'المنتجات', icon: Archive, path: '/admin/products' },
    { name: 'Orders', nameAr: 'الطلبات', icon: ShoppingBag, path: '/admin/orders' },
    { name: 'Campaigns', nameAr: 'الحملات', icon: Tag, path: '/admin/campaigns' },
    { name: 'Reports', nameAr: 'التقارير', icon: BarChart2, path: '/admin/reports' },
    { name: 'CMS', nameAr: 'إدارة المحتوى', icon: Edit, path: '/admin/cms' },
    ...commonLinks
  ];

  const storeOwnerNavLinks = [
    { name: 'Dashboard', nameAr: 'لوحة التحكم', icon: Home, path: '/store-owner/dashboard' },
    { name: 'Store Profile', nameAr: 'ملف المتجر', icon: Building, path: '/store-owner/profile' },
    { name: 'Orders', nameAr: 'الطلبات', icon: ShoppingBag, path: '/store-owner/orders' },
    { name: 'Inventory', nameAr: 'المخزون', icon: Archive, path: '/store-owner/inventory' },
    { name: 'Delivery Staff', nameAr: 'موظفو التوصيل', icon: Truck, path: '/store-owner/delivery-staff' },
    { name: 'Support', nameAr: 'الدعم', icon: MessageCircle, path: '/store-owner/support-tickets' },
    { name: 'Reports', nameAr: 'التقارير', icon: BarChart2, path: '/store-owner/reports' },
    ...commonLinks
  ];
  
  const deliveryStaffNavLinks = [
    { name: 'Dashboard', nameAr: 'لوحة التحكم', icon: Home, path: '/delivery/dashboard' },
    { name: 'Delivery History', nameAr: 'سجل التوصيل', icon: Archive, path: '/delivery/history' },
    { name: 'Earnings', nameAr: 'الأرباح', icon: DollarSign, path: '/delivery/earnings' },
    { name: 'Support Chat', nameAr: 'دردشة الدعم', icon: HelpCircle, path: '/delivery/chat' },
  ];

  const pharmacistNavLinks = [
     { name: 'Dashboard', nameAr: 'لوحة التحكم', icon: Home, path: '/pharmacist/dashboard' },
     { name: 'Review Prescriptions', nameAr: 'مراجعة الوصفات', icon: PrescriptionIcon, path: '/pharmacist/review-prescriptions' }, 
     { name: 'Approval Logs', nameAr: 'سجلات الموافقة', icon: Archive, path: '/pharmacist/logs' }, 
  ];


  let navLinks = [];
  if (userRole === 'admin') navLinks = adminNavLinks;
  else if (userRole === 'store_owner') navLinks = storeOwnerNavLinks;
  else if (userRole === 'delivery_staff') navLinks = deliveryStaffNavLinks;
  else if (userRole === 'pharmacist') navLinks = pharmacistNavLinks;


  const baseLinkClasses = "flex items-center space-x-3 rtl:space-x-reverse px-3 py-2.5 rounded-lg transition-colors duration-150";
  const activeLinkClasses = "bg-medical-primary/10 text-medical-primary font-semibold shadow-sm";
  const inactiveLinkClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  return (
    <>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 ${language === 'ar' ? 'right-0 border-l' : 'left-0 border-r'} z-40 flex flex-col w-64 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
                  ${isOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')}
                `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Logo />
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => {if (window.innerWidth < 1024) toggleSidebar()}} 
                className={({ isActive }) => 
                  `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
              >
                <Icon size={20} />
                <span>{language === 'ar' ? link.nameAr : link.name}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <p className="text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Taiba Pharmacy Platform {/* Updated Name */}
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
