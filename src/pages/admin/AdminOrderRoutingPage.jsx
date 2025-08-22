import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShoppingBag, Truck, MapPin, Clock, Filter, Eye } from 'lucide-react';
import Button from '../../components/Button';
import { mockOrders } from '../../data/mockData'; // Assuming this exists

const AdminOrderRoutingPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();

  // Filter for orders that might need routing (e.g., Confirmed, Processing)
  const ordersToRoute = mockOrders.filter(order => ['CONFIRMED', 'PROCESSING'].includes(order.statusKey)).slice(0,5);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <Truck size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'توجيه الطلبات وإدارة التوصيل' : 'Order Routing & Delivery Management'}
            </h1>
        </div>
        {/* Add any primary action button if needed */}
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <input 
                type="text" 
                placeholder={language === 'ar' ? 'ابحث بالطلب، العميل، المنطقة...' : 'Search by order, customer, zone...'}
                className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary"
            />
            <select className="w-full sm:w-auto p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary">
                <option value="">{language === 'ar' ? 'كل الحالات' : 'All Statuses'}</option>
                <option value="pending_routing">{language === 'ar' ? 'بانتظار التوجيه' : 'Pending Routing'}</option>
                <option value="routing_assigned">{language === 'ar' ? 'تم تعيين التوجيه' : 'Routing Assigned'}</option>
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
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'العنوان' : 'Address'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'المتجر المقترح' : 'Suggested Store'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordersToRoute.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{order.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">{order.deliveryAddress.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600 truncate max-w-xs">{order.deliveryAddress.address}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{order.storeName}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1" onClick={() => alert(`Route order ${order.id}`)}>
                            {language === 'ar' ? 'توجيه/تعيين' : 'Route/Assign'}
                        </Button>
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
        <div className="mt-4 text-xs text-gray-500">
          <p>{language === 'ar' ? 'هنا تظهر الطلبات التي تحتاج إلى توجيه يدوي أو تأكيد. يمكن أيضًا عرض تتبع السائقين المباشر.' : 'Orders needing manual routing or confirmation appear here. Live driver tracking could also be displayed.'}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderRoutingPage;
