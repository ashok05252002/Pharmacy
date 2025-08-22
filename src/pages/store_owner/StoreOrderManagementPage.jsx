import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShoppingBag, Filter, Truck, CheckCircle, Eye } from 'lucide-react';
import Button from '../../components/Button';
import { mockOrders } from '../../data/mockData'; // Assuming this exists

const StoreOrderManagementPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();

  // Filter for orders relevant to a store owner (e.g., Confirmed, Packed, Out for Delivery)
  const storeOrders = mockOrders.filter(order => ['CONFIRMED', 'PACKED', 'OUT_FOR_DELIVERY'].includes(order.statusKey)).slice(0,5);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <ShoppingBag size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'إدارة طلبات المتجر' : 'Store Order Management'}
            </h1>
        </div>
        {/* Add any primary action button if needed */}
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <input 
                type="text" 
                placeholder={language === 'ar' ? 'ابحث بالطلب أو العميل...' : 'Search by order, customer...'}
                className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary"
            />
            <select className="w-full sm:w-auto p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary">
                <option value="">{language === 'ar' ? 'كل الحالات' : 'All Statuses'}</option>
                <option value="confirmed">{language === 'ar' ? 'مؤكدة' : 'Confirmed'}</option>
                <option value="packed">{language === 'ar' ? 'تم التجهيز' : 'Packed'}</option>
                <option value="out_for_delivery">{language === 'ar' ? 'قيد التوصيل' : 'Out for Delivery'}</option>
            </select>
            <Button variant="outline" icon={<Filter size={16}/>}>
                {language === 'ar' ? 'تصفية' : 'Filter'}
            </Button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'رقم الطلب' : 'Order ID'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'العميل' : 'Customer'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'المجموع' : 'Total'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {storeOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{order.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">{order.deliveryAddress.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.statusColor.replace('text-','bg-')}/10 ${order.statusColor}`}>
                        {order.status}
                     </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">AED {order.totalAmount}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        {order.statusKey === 'CONFIRMED' && 
                            <Button variant="outline" size="sm" className="text-xs px-2 py-1" onClick={() => alert(`Mark ${order.id} as Packed`)}>
                                {language === 'ar' ? 'وضع علامة كـ "تم التجهيز"' : 'Mark as Packed'}
                            </Button>}
                        {order.statusKey === 'PACKED' && 
                            <Button variant="outline" size="sm" className="text-xs px-2 py-1" onClick={() => alert(`Assign driver for ${order.id}`)}>
                                {language === 'ar' ? 'تعيين سائق' : 'Assign Driver'}
                            </Button>}
                        <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7" onClick={() => alert(`View order ${order.id}`)} aria-label="View Order">
                            <Eye size={14} />
                        </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          {language === 'ar' ? 'قائمة بالطلبات الواردة مع خيارات لتحديث الحالة وتعيين التوصيل.' : 'List of incoming orders with options to update status and assign delivery.'}
        </div>
      </div>
    </div>
  );
};

export default StoreOrderManagementPage;
