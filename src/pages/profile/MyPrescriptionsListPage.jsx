import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { mockUserPrescriptions, PRESCRIPTION_STATUS } from '../../data/mockData';
import { FileText, UploadCloud, PlusCircle, Eye, Download, AlertTriangle, CheckCircle, RefreshCw, Clock } from 'lucide-react';
import Button from '../../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const MyPrescriptionsListPage = () => {
  const { language } = useLanguage();
  const [prescriptions, setPrescriptions] = useState(mockUserPrescriptions);

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
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <FileText size={32} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {language === 'ar' ? 'وصفاتي الطبية' : 'My Prescriptions'}
            </h1>
          </div>
          <Button as={Link} to="/upload-prescription" icon={<UploadCloud size={18}/>}>
            {language === 'ar' ? 'تحميل وصفة جديدة' : 'Upload New Prescription'}
          </Button>
        </div>

        {prescriptions.length > 0 ? (
          <div className="space-y-4">
            <AnimatePresence>
              {prescriptions.map((rx, index) => (
                <motion.div
                  key={rx.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white p-4 sm:p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center mb-1">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full mr-2 rtl:ml-2 ${rx.status.bgColor} ${rx.status.color} flex items-center gap-1`}>
                          {getStatusIcon(Object.keys(PRESCRIPTION_STATUS).find(key => PRESCRIPTION_STATUS[key].en === rx.status.en))} {/* Find key by English status name */}
                          {language === 'ar' ? rx.status.ar : rx.status.en}
                        </span>
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate" title={rx.title(language)}>
                          {rx.title(language)}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500">
                        {language === 'ar' ? 'تم الرفع:' : 'Uploaded:'} {new Date(rx.uploadDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-CA')} | {' '}
                        {language === 'ar' ? 'صالح حتى:' : 'Valid until:'} {new Date(rx.validityDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-CA')}
                      </p>
                      {rx.orderId && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {language === 'ar' ? 'مرتبطة بالطلب:' : 'Associated Order:'} <Link to={`/order-detail/${rx.orderId}`} className="text-medical-accent hover:underline">{rx.orderId}</Link>
                        </p>
                      )}
                       {rx.status.en === 'Rejected' && ( // Show reason if rejected
                        <p className="text-xs text-red-600 mt-1">{language === 'ar' ? 'السبب: صورة غير واضحة.' : 'Reason: Image unclear.'}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-shrink-0">
                      <Button variant="outline" size="sm" className="text-xs p-1.5 h-8 w-8" as="a" href={rx.fileUrl} target="_blank" rel="noopener noreferrer" aria-label={language === 'ar' ? 'عرض الملف' : 'View File'}>
                        <Eye size={16}/>
                      </Button>
                      {rx.status.en === 'Rejected' && (
                         <Button variant="primary" size="sm" className="text-xs px-2 py-1.5 h-8" icon={<UploadCloud size={14}/>} as={Link} to="/upload-prescription" state={{ resubmittingRxId: rx.id }}>
                            {language === 'ar' ? 'إعادة الرفع' : 'Re-upload'}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {language === 'ar' ? 'لا توجد وصفات طبية مرفوعة' : 'No Prescriptions Uploaded'}
            </h3>
            <p className="text-gray-500">
              {language === 'ar' ? 'يمكنك تحميل وصفاتك الطبية هنا لإدارة طلباتك بسهولة.' : 'Upload your prescriptions here to easily manage your orders.'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyPrescriptionsListPage;
