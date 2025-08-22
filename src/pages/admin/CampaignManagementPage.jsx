import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Tag, PlusCircle, Edit3, Trash2, Calendar, Percent } from 'lucide-react';
import Button from '../../components/Button';
import { mockCampaigns } from '../../data/mockData'; // Assuming this exists

const CampaignManagementPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <Tag size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'إدارة الحملات والعروض' : 'Campaign & Promo Management'}
            </h1>
        </div>
        <Button icon={<PlusCircle size={18}/>} onClick={() => alert(language === 'ar' ? 'إنشاء حملة جديدة' : 'Create New Campaign')}>
            {language === 'ar' ? 'إنشاء حملة' : 'Create Campaign'}
        </Button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder={language === 'ar' ? 'ابحث عن حملة أو رمز...' : 'Search campaign or code...'}
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary"
          />
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'اسم الحملة' : 'Campaign Name'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'الرمز' : 'Code'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'النوع' : 'Type'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">{language === 'ar' ? campaign.titleAr : campaign.title}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{campaign.code || '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${campaign.type === 'discount' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {language === 'ar' ? (campaign.type === 'discount' ? 'خصم' : 'باقة') : campaign.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{new Date(campaign.expiryDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-CA')}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="p-1.5 h-7 w-7" onClick={() => alert(`Edit ${campaign.title}`)} aria-label="Edit">
                        <Edit3 size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 text-red-500 hover:bg-red-50" onClick={() => alert(`Delete ${campaign.title}`)} aria-label="Delete">
                        <Trash2 size={14} />
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

export default CampaignManagementPage;
