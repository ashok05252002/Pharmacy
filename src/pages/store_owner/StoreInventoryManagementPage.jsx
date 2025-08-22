import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Archive, PlusCircle, Edit3, Filter, Search } from 'lucide-react';
import Button from '../../components/Button';
import { mockProducts } from '../../data/mockData';

const StoreInventoryManagementPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <Archive size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'إدارة مخزون المتجر' : 'Store Inventory Management'}
            </h1>
        </div>
        <Button icon={<PlusCircle size={18}/>} onClick={() => alert(language === 'ar' ? 'إضافة منتج للمخزون' : 'Add Product to Inventory')}>
            {language === 'ar' ? 'إضافة منتج' : 'Add Product'}
        </Button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-1/3">
                <Search size={16} className={`absolute top-1/2 transform -translate-y-1/2 ${language === 'ar' ? 'right-3' : 'left-3'} text-gray-400 pointer-events-none`}/>
                <input 
                    type="text" 
                    placeholder={language === 'ar' ? 'ابحث بالمنتج أو SKU...' : 'Search product or SKU...'}
                    className={`w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary ${language === 'ar' ? 'pr-10' : 'pl-10'}`}
                />
            </div>
            <Button variant="outline" icon={<Filter size={16}/>}>
                {language === 'ar' ? 'تصفية' : 'Filter'}
            </Button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'المنتج' : 'Product'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">SKU</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'الكمية الحالية' : 'Current Stock'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'آخر تحديث' : 'Last Updated'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockProducts.slice(0, 7).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        <img src={product.thumbnail} alt={language === 'ar' ? product.nameAr : product.name} className="w-10 h-10 rounded-md object-cover"/>
                        <span className="font-medium text-gray-700 truncate max-w-xs">{language === 'ar' ? product.nameAr : product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{product.sku}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{Math.floor(Math.random() * 50) + 10}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{new Date(Date.now() - Math.random() * 1000000000).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-CA')}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1" icon={<Edit3 size={14}/>} onClick={() => alert(`Update stock for ${product.name}`)}>
                        {language === 'ar' ? 'تحديث المخزون' : 'Update Stock'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          {language === 'ar' ? 'إدارة مستويات المخزون لمتجرك وتحديثها.' : 'Manage and update stock levels for your store.'}
        </div>
      </div>
    </div>
  );
};

export default StoreInventoryManagementPage;
