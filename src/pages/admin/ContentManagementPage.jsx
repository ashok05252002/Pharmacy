import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Edit, Image, FileText as FileTextIcon, MessageSquare, Tag as TagIcon, PlusCircle } from 'lucide-react';
import Button from '../../components/Button';

const cmsSections = [
    { id: 'banners', name: 'Homepage Banners', nameAr: 'لافتات الصفحة الرئيسية', icon: Image },
    { id: 'blog', name: 'Blog Posts', nameAr: 'منشورات المدونة', icon: FileTextIcon },
    { id: 'faqs', name: 'FAQs', nameAr: 'الأسئلة الشائعة', icon: MessageSquare },
    { id: 'seo', name: 'Meta Tags & SEO', nameAr: 'العلامات الوصفية وتحسين محركات البحث', icon: TagIcon },
];

const ContentManagementPage = () => {
  const { userRole } = useOutletContext();
  const { language } = useLanguage();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
            <Edit size={28} className="text-medical-primary mr-3 rtl:ml-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'إدارة المحتوى و CMS' : 'Content & CMS Management'}
            </h1>
        </div>
        <Button icon={<PlusCircle size={18}/>} onClick={() => alert(language === 'ar' ? 'إضافة محتوى جديد' : 'Add New Content')}>
            {language === 'ar' ? 'إضافة محتوى' : 'Add Content'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cmsSections.map(section => {
            const Icon = section.icon;
            return (
                <div key={section.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-3">
                        <Icon size={22} className="text-medical-accent mr-3 rtl:ml-3"/>
                        <h2 className="text-lg font-semibold text-gray-700">{language === 'ar' ? section.nameAr : section.name}</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                        {language === 'ar' ? `إدارة وتحديث ${section.nameAr.toLowerCase()}.` : `Manage and update ${section.name.toLowerCase()}.`}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => alert(`Manage ${section.name}`)}>
                        {language === 'ar' ? 'إدارة' : 'Manage'} {language === 'ar' ? section.nameAr : section.name}
                    </Button>
                </div>
            );
        })}
      </div>
      <p className="mt-8 text-sm text-gray-600">
        {language === 'ar' ? 'واجهة لإدارة محتوى الموقع مثل لافتات الصفحة الرئيسية، منشورات المدونة، الأسئلة الشائعة، والعلامات الوصفية لتحسين محركات البحث.' : 'Interface to manage website content like homepage banners, blog posts, FAQs, and meta tags for SEO.'}
      </p>
    </div>
  );
};

export default ContentManagementPage;
