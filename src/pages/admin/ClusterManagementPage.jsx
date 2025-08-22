import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Layers, PlusCircle, MapPin, Clock, Edit3, Trash2 } from 'lucide-react';
import Button from '../../components/Button';

const mockClusters = [
  { id: 'c1', name: 'North Zone Cluster', nameAr: 'مجموعة المنطقة الشمالية', storeCount: 5, deliveryZones: ['Zone A', 'Zone B'], operatingHours: '9 AM - 10 PM' },
  { id: 'c2', name: 'Central Business District', nameAr: 'مجموعة منطقة الأعمال المركزية', storeCount: 8, deliveryZones: ['CBD Core', 'Downtown East'], operatingHours: '8 AM - 11 PM' },
  { id: 'c3', name: 'Coastal Region', nameAr: 'مجموعة المنطقة الساحلية', storeCount: 3, deliveryZones: ['Beachside', 'Marina Area'], operatingHours: '10 AM - 9 PM' },
];

const ClusterManagementPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <Layers size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'إدارة المجموعات والمتاجر' : 'Cluster & Store Management'}
            </h1>
        </div>
        <Button icon={<PlusCircle size={18}/>} onClick={() => alert(language === 'ar' ? 'إضافة مجموعة جديدة' : 'Add New Cluster')}>
            {language === 'ar' ? 'إضافة مجموعة جديدة' : 'Add New Cluster'}
        </Button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="mb-4">
          {/* Placeholder for Search and Filters */}
          <input 
            type="text" 
            placeholder={language === 'ar' ? 'ابحث عن مجموعة...' : 'Search clusters...'}
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary"
          />
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'اسم المجموعة' : 'Cluster Name'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'عدد المتاجر' : 'Stores'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'مناطق التوصيل' : 'Delivery Zones'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'ساعات العمل' : 'Operating Hours'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockClusters.map((cluster) => (
                <tr key={cluster.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">{language === 'ar' ? cluster.nameAr : cluster.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{cluster.storeCount}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    <div className="flex items-center">
                        <MapPin size={14} className="text-gray-400 mr-1 rtl:ml-1"/>
                        {cluster.deliveryZones.join(', ')}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    <div className="flex items-center">
                        <Clock size={14} className="text-gray-400 mr-1 rtl:ml-1"/>
                        {cluster.operatingHours}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="p-1.5 h-7 w-7" onClick={() => alert(`Edit ${cluster.name}`)} aria-label="Edit">
                        <Edit3 size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 text-red-500 hover:bg-red-50" onClick={() => alert(`Delete ${cluster.name}`)} aria-label="Delete">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Placeholder for Pagination */}
        <div className="mt-4 text-center text-xs text-gray-500">
          {language === 'ar' ? 'عناصر التحكم في ترقيم الصفحات ستكون هنا' : 'Pagination controls will be here.'}
        </div>
      </div>
    </div>
  );
};

export default ClusterManagementPage;
