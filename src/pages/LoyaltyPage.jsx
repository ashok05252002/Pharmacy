import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockUser, mockLoyaltyTransactions } from '../data/mockData'; 
import { Award, Gift, Star, TrendingUp, ShoppingBag, ArrowUpCircle, ArrowDownCircle, Clock } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoyaltyPage = () => {
  const { language } = useLanguage();

  const tierDetails = {
    Silver: {
      name: language === 'ar' ? 'فضي' : 'Silver',
      pointsNeeded: 0,
      benefits: [
        language === 'ar' ? 'خصم 5% على الطلبات المختارة' : '5% off on selected orders',
        language === 'ar' ? 'نقاط إضافية في عيد ميلادك' : 'Birthday bonus points',
      ],
      color: "bg-slate-500",
      textColor: "text-slate-500",
      nextTier: "Gold",
      nextTierPoints: 1000,
    },
    Gold: {
      name: language === 'ar' ? 'ذهبي' : 'Gold',
      pointsNeeded: 1000,
      benefits: [
        language === 'ar' ? 'خصم 10% على الطلبات المختارة' : '10% off on selected orders',
        language === 'ar' ? 'نقاط إضافية في عيد ميلادك' : 'Birthday bonus points',
        language === 'ar' ? 'شحن مجاني للطلبات فوق 10 ر.ع.' : 'Free shipping on orders over OMR 10', // Updated Currency
        language === 'ar' ? 'وصول مبكر للعروض' : 'Early access to sales',
      ],
      color: "bg-yellow-400", 
      textColor: "text-yellow-500",
      nextTier: "Platinum",
      nextTierPoints: 5000,
    },
    Platinum: {
      name: language === 'ar' ? 'بلاتيني' : 'Platinum',
      pointsNeeded: 5000,
      benefits: [
        language === 'ar' ? 'خصم 15% على جميع الطلبات' : '15% off on all orders',
        language === 'ar' ? 'نقاط إضافية مضاعفة في عيد ميلادك' : 'Double birthday bonus points',
        language === 'ar' ? 'شحن مجاني لجميع الطلبات' : 'Free shipping on all orders',
        language === 'ar' ? 'وصول حصري للمنتجات الجديدة' : 'Exclusive access to new products',
        language === 'ar' ? 'مدير حساب شخصي' : 'Dedicated account manager',
      ],
      color: "bg-sky-500",
      textColor: "text-sky-500",
      nextTier: null,
    }
  };

  const currentTierData = tierDetails[mockUser.loyaltyTier];
  const progressToNextTier = currentTierData.nextTier 
    ? Math.min(100, (mockUser.loyaltyPoints / currentTierData.nextTierPoints) * 100) 
    : 100;

  return (
    <div className="container mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration:0.5 }}
      >
        <div className="flex items-center mb-8">
          <Award size={32} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {language === 'ar' ? 'برنامج الولاء' : 'Loyalty Program'}
          </h1>
        </div>

        <div className={`p-6 sm:p-8 rounded-xl shadow-xl text-white ${currentTierData.color} mb-8 relative overflow-hidden`}>
            <div className="absolute -top-8 -right-8 rtl:-left-8 rtl:-right-auto w-32 h-32 opacity-20">
                <Award size={128} className="transform rotate-12"/>
            </div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                <p className="text-sm opacity-80">{language === 'ar' ? 'مستواك الحالي' : 'Your Current Tier'}</p>
                <p className="text-3xl sm:text-4xl font-bold">{currentTierData.name}</p>
                </div>
                <div className="text-center sm:text-right rtl:sm:text-left">
                <p className="text-sm opacity-80">{language === 'ar' ? 'رصيد نقاطك' : 'Your Points Balance'}</p>
                <p className="text-3xl sm:text-4xl font-bold">{mockUser.loyaltyPoints.toLocaleString(language === 'ar' ? 'ar-OM' : 'en-US')}</p> {/* Updated Locale for OMR */}
                </div>
            </div>
            {currentTierData.nextTier && (
                <div className="mt-6">
                <div className="flex justify-between text-xs opacity-90 mb-1">
                    <span>{language === 'ar' ? `نقاط للوصول إلى ${tierDetails[currentTierData.nextTier].name}` : `Points to ${tierDetails[currentTierData.nextTier].name}`}</span>
                    <span>{Math.max(0, currentTierData.nextTierPoints - mockUser.loyaltyPoints).toLocaleString(language === 'ar' ? 'ar-OM' : 'en-US')}</span> {/* Updated Locale */}
                </div>
                <div className="w-full bg-white/30 rounded-full h-2.5">
                    <div className="bg-white h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressToNextTier}%` }}></div>
                </div>
                </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className={`text-xl font-semibold ${currentTierData.textColor} mb-4 flex items-center`}>
            <Star size={22} className="mr-2 rtl:ml-2 rtl:mr-0" />
            {language === 'ar' ? `مزايا مستوى ${currentTierData.name}` : `${currentTierData.name} Tier Benefits`}
          </h2>
          <ul className="space-y-2 list-inside">
            {currentTierData.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <CheckCircle size={16} className="text-green-500 mr-2 rtl:ml-2 rtl:mr-0 mt-0.5 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
           <div className="mt-6 text-center">
                <Button as={Link} to="/cart" variant="outline" className={`border-current ${currentTierData.textColor} hover:bg-opacity-10`} icon={<Gift size={18}/>}>
                    {language === 'ar' ? 'استبدل نقاطك الآن' : 'Redeem Your Points Now'}
                </Button>
            </div>
        </div>
        
         <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <TrendingUp size={22} className="text-medical-accent mr-2 rtl:ml-2 rtl:mr-0" />
            {language === 'ar' ? 'كيف تكسب النقاط؟' : 'How to Earn Points?'}
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start"><ShoppingBag size={16} className="text-gray-400 mr-2 rtl:ml-2 rtl:mr-0 mt-0.5"/>{language === 'ar' ? 'اربح 1 نقطة مقابل كل 0.1 ر.ع. تنفقه.' : 'Earn 1 point for every OMR 0.100 spent.'}</li> {/* Updated Currency */}
            <li className="flex items-start"><Star size={16} className="text-gray-400 mr-2 rtl:ml-2 rtl:mr-0 mt-0.5"/>{language === 'ar' ? 'اربح نقاطًا إضافية عند كتابة مراجعات للمنتجات.' : 'Earn bonus points for writing product reviews.'}</li>
            <li className="flex items-start"><Gift size={16} className="text-gray-400 mr-2 rtl:ml-2 rtl:mr-0 mt-0.5"/>{language === 'ar' ? 'عروض نقاط خاصة خلال فترات العروض الترويجية.' : 'Special point offers during promotional periods.'}</li>
          </ul>
           <div className="mt-6 text-center">
            <Button as={Link} to="/products" icon={<ShoppingBag size={18}/>}>
                {language === 'ar' ? 'ابدأ التسوق واكسب النقاط' : 'Start Shopping & Earn'}
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {language === 'ar' ? 'سجل معاملات النقاط' : 'Points Transaction History'}
          </h2>
          {mockLoyaltyTransactions.length > 0 ? (
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
                <ul className="divide-y divide-gray-100">
                {mockLoyaltyTransactions.map((transaction) => {
                    const isEarned = transaction.points.startsWith('+');
                    const isExpired = transaction.description.toLowerCase().includes('expired') || transaction.descriptionAr.toLowerCase().includes('منتهية');
                    let Icon = isEarned ? ArrowUpCircle : ArrowDownCircle;
                    let colorClass = isEarned ? 'text-green-600' : 'text-red-600';
                    if (isExpired) {
                        Icon = Clock;
                        colorClass = 'text-gray-500';
                    }
                    // Updated transaction description for OMR
                    let desc = language === 'ar' ? transaction.descriptionAr : transaction.description;
                    if (desc.includes('AED 20 Voucher')) {
                        desc = language === 'ar' ? 'مستبدلة بقسيمة 2 ر.ع.' : 'Redeemed for OMR 2 Voucher';
                    }


                    return (
                    <li key={transaction.id} className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                        <Icon size={20} className={`${colorClass} mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0`} />
                        <div>
                            <p className="text-sm text-gray-700">{desc}</p>
                            <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString(language === 'ar' ? 'ar-OM' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p> {/* Updated Locale */}
                        </div>
                        </div>
                        <span className={`text-sm font-semibold ${colorClass}`}>
                        {transaction.points}
                        </span>
                    </li>
                    );
                })}
                </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500">{language === 'ar' ? 'لا توجد معاملات نقاط لعرضها.' : 'No point transactions to display.'}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoyaltyPage;
