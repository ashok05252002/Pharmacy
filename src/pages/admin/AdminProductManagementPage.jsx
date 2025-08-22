import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Archive, PlusCircle, Edit3, Trash2, Upload, Filter, FileText } from 'lucide-react';
import Button from '../../components/Button';
import { mockProducts } from '../../data/mockData'; // Assuming this exists

const AdminProductManagementPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <Archive size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'إدارة المنتجات والمخزون' : 'Product & Inventory Management'}
            </h1>
        </div>
        <div className="flex gap-2">
            <Button icon={<PlusCircle size={18}/>} onClick={() => alert(language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product')}>
                {language === 'ar' ? 'إضافة منتج' : 'Add Product'}
            </Button>
            <Button variant="outline" icon={<Upload size={18}/>} onClick={() => alert(language === 'ar' ? 'تحميل CSV للمخزون' : 'Bulk CSV Upload for Inventory')}>
                {language === 'ar' ? 'تحميل CSV' : 'Upload CSV'}
            </Button>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <input 
                type="text" 
                placeholder={language === 'ar' ? 'ابحث بالاسم، SKU...' : 'Search by name, SKU...'}
                className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary"
            />
            {/* Add category/brand filters if needed */}
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
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'السعر' : 'Price'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'المخزون' : 'Stock'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'يتطلب وصفة' : 'Rx Req.'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockProducts.slice(0, 10).map((product) => ( // Display first 10 for demo
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        <img src={product.thumbnail} alt={language === 'ar' ? product.nameAr : product.name} className="w-10 h-10 rounded-md object-cover"/>
                        <span className="font-medium text-gray-700 truncate max-w-xs">{language === 'ar' ? product.nameAr : product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{product.sku}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">AED {(product.offerPrice || product.price).toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{Math.floor(Math.random() * 100)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {product.prescriptionRequired ? 
                        <FileText size={16} className="text-yellow-500" title={language === 'ar' ? 'نعم' : 'Yes'} /> : 
                        <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="p-1.5 h-7 w-7" onClick={() => alert(`Edit ${product.name}`)} aria-label="Edit">
                        <Edit3 size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 text-red-500 hover:bg-red-50" onClick={() => alert(`Delete ${product.name}`)} aria-label="Delete">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          {language === 'ar' ? 'عناصر التحكم في ترقيم الصفحات ستكون هنا' : 'Pagination controls will be here.'}
        </div>
      </div>
    </div>
  );
};

export default AdminProductManagementPage;
