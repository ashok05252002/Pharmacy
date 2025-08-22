import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FileText, CheckCircle, XCircle, Eye, Filter, RefreshCw, AlertTriangle, Clock } from 'lucide-react';
import Button from '../../components/Button';
import { mockUserPrescriptions, PRESCRIPTION_STATUS } from '../../data/mockData'; // Assuming this exists

const AdminPrescriptionApprovalPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();
  const [prescriptions, setPrescriptions] = useState(mockUserPrescriptions.map(p => ({...p, currentStatusKey: Object.keys(PRESCRIPTION_STATUS).find(key => PRESCRIPTION_STATUS[key].en === p.status.en)}))); // Add currentStatusKey

  const handleStatusChange = (id, newStatusKey) => {
    setPrescriptions(prev => prev.map(p => p.id === id ? {...p, status: PRESCRIPTION_STATUS[newStatusKey], currentStatusKey: newStatusKey } : p));
    alert(`Prescription ${id} status changed to ${PRESCRIPTION_STATUS[newStatusKey].en}`);
  };

  const getStatusIcon = (statusKey) => {
    switch (statusKey) {
      case 'PENDING': return <RefreshCw size={16} className="animate-spin" />;
      case 'APPROVED': return <CheckCircle size={16} />;
      case 'REJECTED': return <AlertTriangle size={16} />;
      case 'EXPIRED': return <Clock size={16} />;
      default: return <FileText size={16} />;
    }
  };


  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <FileText size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'مراجعة الوصفات الطبية' : 'Prescription Approval Workflow'}
            </h1>
        </div>
        {/* Add any primary action button if needed */}
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <input 
                type="text" 
                placeholder={language === 'ar' ? 'ابحث بالرقم أو اسم المريض...' : 'Search by ID, patient name...'}
                className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary"
            />
            <select className="w-full sm:w-auto p-2 border border-gray-300 rounded-md text-sm focus:ring-medical-primary focus:border-medical-primary">
                <option value="">{language === 'ar' ? 'كل الحالات' : 'All Statuses'}</option>
                {Object.entries(PRESCRIPTION_STATUS).map(([key, status]) => (
                    <option key={key} value={key}>{language === 'ar' ? status.ar : status.en}</option>
                ))}
            </select>
            <Button variant="outline" icon={<Filter size={16}/>}>
                {language === 'ar' ? 'تصفية' : 'Filter'}
            </Button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'المعرف' : 'ID'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'اسم الملف' : 'File Name'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'تاريخ الرفع' : 'Upload Date'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="px-4 py-3 text-left rtl:text-right font-medium text-gray-500 tracking-wider">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptions.map((rx) => (
                <tr key={rx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{rx.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">{rx.fileName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{new Date(rx.uploadDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-CA')}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${rx.status.bgColor} ${rx.status.color}`}>
                      {getStatusIcon(rx.currentStatusKey)}
                      {language === 'ar' ? rx.status.ar : rx.status.en}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Button variant="outline" size="sm" className="p-1.5 h-7 w-7" onClick={() => window.open(rx.fileUrl, '_blank')} aria-label="View">
                        <Eye size={14} />
                      </Button>
                      {rx.currentStatusKey === 'PENDING' && (
                        <>
                        <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 text-green-500 hover:bg-green-50" onClick={() => handleStatusChange(rx.id, 'APPROVED')} aria-label="Approve">
                            <CheckCircle size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 text-red-500 hover:bg-red-50" onClick={() => handleStatusChange(rx.id, 'REJECTED')} aria-label="Reject">
                            <XCircle size={14} />
                        </Button>
                        </>
                      )}
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

export default AdminPrescriptionApprovalPage;
