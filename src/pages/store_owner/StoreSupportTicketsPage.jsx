import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { MessageCircle, Filter, Eye } from 'lucide-react';
import Button from '../../components/Button';
import { mockSupportTickets } from '../../data/mockData'; // Assuming this exists

const StoreSupportTicketsPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();

  // Filter for tickets that might be relevant to a store owner
  const storeTickets = mockSupportTickets.filter(ticket => ticket.category.includes('Order') || ticket.category.includes('Product')).slice(0,5);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <MessageCircle size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'تذاكر دعم العملاء' : 'Customer Support Tickets'}
            </h1>
        </div>
        {/* Add any primary action button if needed */}
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <input 
                type="text" 
                placeholder={language === 'ar' ? 'ابحث بالرقم أو الموضوع...' : 'Search by ID, subject...'}
                className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary"
            />
            <select className="w-full sm:w-auto p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary">
                <option value="">{language === 'ar' ? 'كل الحالات' : 'All Statuses'}</option>
                <option value="open">{language === 'ar' ? 'مفتوحة' : 'Open'}</option>
                <option value="in_progress">{language === 'ar' ? 'قيد المعالجة' : 'In Progress'}</option>
                <option value="resolved">{language === 'ar' ? 'تم الحل' : 'Resolved'}</option>
            </select>
            <Button variant="outline" icon={<Filter size={16}/>}>
                {language === 'ar' ? 'تصفية' : 'Filter'}
            </Button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'رقم التذكرة' : 'Ticket ID'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'الموضوع' : 'Subject'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'آخر تحديث' : 'Last Updated'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {storeTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{ticket.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium truncate max-w-md">{language === 'ar' ? ticket.subjectAr : ticket.subject}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${ticket.status.bgColor} ${ticket.status.color}`}>
                      {language === 'ar' ? ticket.status.ar : ticket.status.en}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{new Date(ticket.lastUpdated).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-CA')}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1" icon={<Eye size={14}/>} onClick={() => alert(`View ticket ${ticket.id}`)}>
                        {language === 'ar' ? 'عرض/رد' : 'View/Reply'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          {language === 'ar' ? 'عرض تذاكر الدعم والرد على استفسارات العملاء.' : 'View support tickets and respond to customer queries.'}
        </div>
      </div>
    </div>
  );
};

export default StoreSupportTicketsPage;
