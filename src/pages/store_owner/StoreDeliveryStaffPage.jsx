import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Truck, UserPlus, Edit3, Trash2, MapPin, PhoneCall } from 'lucide-react';
import Button from '../../components/Button';

const mockDeliveryStaff = [
  { id: 'ds1', name: 'Ali Hassan', nameAr: 'علي حسن', phone: '+971 50 123 4567', status: 'Active', statusAr: 'نشط', currentDeliveries: 2, area: 'Downtown' },
  { id: 'ds2', name: 'Fatima Ahmed', nameAr: 'فاطمة أحمد', phone: '+971 55 987 6543', status: 'Offline', statusAr: 'غير متصل', currentDeliveries: 0, area: 'Jumeirah' },
  { id: 'ds3', name: 'Omar Khan', nameAr: 'عمر خان', phone: '+971 52 345 6789', status: 'On Delivery', statusAr: 'في التوصيل', currentDeliveries: 1, area: 'Marina' },
];

const StoreDeliveryStaffPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <Truck size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'إدارة موظفي التوصيل' : 'Delivery Staff Management'}
            </h1>
        </div>
        <Button icon={<UserPlus size={18}/>} onClick={() => alert(language === 'ar' ? 'إضافة موظف توصيل جديد' : 'Add New Delivery Staff')}>
            {language === 'ar' ? 'إضافة موظف' : 'Add Staff'}
        </Button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder={language === 'ar' ? 'ابحث بالاسم أو رقم الهاتف...' : 'Search by name, phone...'}
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary"
          />
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'الاسم' : 'Name'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'الهاتف' : 'Phone'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'التوصيلات الحالية' : 'Current Deliveries'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockDeliveryStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">{language === 'ar' ? staff.nameAr : staff.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{staff.phone}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${staff.status === 'Active' || staff.statusAr === 'نشط' ? 'bg-green-100 text-green-700' : staff.status === 'On Delivery' || staff.statusAr === 'في التوصيل' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {language === 'ar' ? staff.statusAr : staff.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{staff.currentDeliveries}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="p-1.5 h-7 w-7" onClick={() => alert(`Monitor ${staff.name}`)} aria-label="Monitor">
                        <MapPin size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="p-1.5 h-7 w-7" onClick={() => alert(`Call ${staff.name}`)} aria-label="Call">
                        <PhoneCall size={14} />
                      </Button>
                      <Button variant="outline" size="sm" className="p-1.5 h-7 w-7" onClick={() => alert(`Edit ${staff.name}`)} aria-label="Edit">
                        <Edit3 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoreDeliveryStaffPage;
