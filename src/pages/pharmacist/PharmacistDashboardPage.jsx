import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import DashboardCard from '../../components/admin/DashboardCard'; // Reusing DashboardCard
import { FileText, CheckCircle, BookOpen } from 'lucide-react';

const PharmacistDashboardPage = () => {
  const { userRole } = useOutletContext(); // Should be 'pharmacist'
  const { language } = useLanguage();

  const pharmacistCards = [
    { title: 'Prescriptions to Review', titleAr: 'وصفات للمراجعة', value: '18', icon: FileText, link: '/pharmacist/review-prescriptions', linkText: 'Start Review', linkTextAr: 'بدء المراجعة', color: 'yellow' },
    { title: 'Approved Today', titleAr: 'تمت الموافقة عليها اليوم', value: '35', icon: CheckCircle, link: '/pharmacist/logs', linkText: 'View Logs', linkTextAr: 'عرض السجلات', color: 'green' },
    { title: 'Review Guidelines', titleAr: 'إرشادات المراجعة', value: '', icon: BookOpen, link: '#', linkText: 'Open Guidelines', linkTextAr: 'فتح الإرشادات', description: 'Access prescription review protocols and guidelines.', descriptionAr: 'الوصول إلى بروتوكولات وإرشادات مراجعة الوصفات.', color: 'medical-secondary' },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        {language === 'ar' ? 'لوحة تحكم الصيدلي' : 'Pharmacist Dashboard'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {pharmacistCards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            titleAr={card.titleAr}
            value={card.value}
            icon={card.icon}
            link={card.link}
            linkText={card.linkText}
            linkTextAr={card.linkTextAr}
            color={card.color}
            description={card.description}
            descriptionAr={card.descriptionAr}
          />
        ))}
      </div>
      {/* Placeholder for recent activity or important alerts */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{language === 'ar' ? 'تنبيهات مهمة' : 'Important Alerts'}</h2>
        <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
          <p className="text-gray-400">{language === 'ar' ? 'سيتم عرض التنبيهات أو الوصفات ذات الأولوية هنا' : 'Alerts or high-priority prescriptions will be shown here.'}</p>
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboardPage;
