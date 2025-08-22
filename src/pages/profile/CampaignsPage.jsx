import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { mockCampaigns } from '../../data/mockData';
import { Tag, Percent, Gift, Calendar, ShoppingCart, ArrowRight } from 'lucide-react';
import Button from '../../components/Button';
import { motion } from 'framer-motion';

const CampaignsPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleApplyCode = (code) => {
    alert(language === 'ar' ? `تم تطبيق الرمز ${code} (محاكاة)` : `Code ${code} applied (mock).`);
    navigate('/cart'); 
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center mb-8">
          <Tag size={32} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {language === 'ar' ? 'العروض والقسائم الخاصة بي' : 'My Campaigns & Coupons'}
          </h1>
        </div>

        {mockCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-5 rounded-xl shadow-lg border-l-4 rtl:border-r-4 rtl:border-l-0 flex flex-col justify-between h-full
                  ${campaign.type === 'discount' ? 'bg-green-50 border-green-500' : 'bg-blue-50 border-blue-500'}`}
              >
                <div>
                  <div className="flex items-center mb-2">
                    {campaign.type === 'discount' ? <Percent size={20} className="text-green-600 mr-2 rtl:ml-2" /> : <Gift size={20} className="text-blue-600 mr-2 rtl:ml-2" />}
                    <h2 className="text-lg font-semibold text-gray-800">{language === 'ar' ? campaign.titleAr : campaign.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{language === 'ar' ? campaign.descriptionAr : campaign.description}</p>
                  
                  {campaign.code && (
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {language === 'ar' ? 'الرمز:' : 'Code:'} <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-mono text-xs">{campaign.code}</span>
                    </p>
                  )}
                  
                  <div className="text-xs text-gray-500 space-y-0.5">
                    <div className="flex items-center">
                        <Calendar size={14} className="mr-1.5 rtl:ml-1.5"/> 
                        {language === 'ar' ? 'تنتهي في:' : 'Expires on:'} {new Date(campaign.expiryDate).toLocaleDateString(language === 'ar' ? 'ar-OM' : 'en-CA')} {/* Updated Locale */}
                    </div>
                    {campaign.minValue && (
                        <div className="flex items-center">
                            <ShoppingCart size={14} className="mr-1.5 rtl:ml-1.5"/> 
                            {language === 'ar' ? `الحد الأدنى للطلب: ${campaign.minValue} ر.ع.` : `Min. order: OMR ${campaign.minValue}`} {/* Updated Currency */}
                        </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-right rtl:text-left">
                  {campaign.type === 'discount' && campaign.code && (
                    <Button onClick={() => handleApplyCode(campaign.code)} size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      {language === 'ar' ? 'تطبيق الرمز' : 'Apply Code'}
                    </Button>
                  )}
                  {campaign.type === 'bundle' && campaign.link && (
                    <Button as={Link} to={campaign.link} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" icon={<ArrowRight className={language === 'ar' ? 'transform rotate-180 order-first' : 'order-last'} size={16}/>}>
                      {language === 'ar' ? 'عرض الباقة' : 'View Bundle'}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Tag size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {language === 'ar' ? 'لا توجد عروض أو قسائم متاحة حاليًا' : 'No Campaigns or Coupons Available Currently'}
            </h3>
            <p className="text-gray-500">
              {language === 'ar' ? 'يرجى التحقق مرة أخرى لاحقًا للحصول على عروض جديدة.' : 'Please check back later for new offers.'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CampaignsPage;
