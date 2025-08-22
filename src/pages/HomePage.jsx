import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { mockUser, mockPromotionalBanners, mockQuickAccessItems, mockCategories, mockProducts } from '../data/mockData';
import { ChevronRight, Sparkles, Pill, FileText, Activity, Baby, Thermometer, UploadCloud, Package, MessageSquare, Award } from 'lucide-react';
import Slider from "react-slick"; // For banners and featured products
import ProductCard from '../components/product/ProductCard'; // We will create this

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';

const iconMap = {
  Sparkles, Pill, FileText, Activity, Baby, Thermometer, UploadCloud, Package, MessageSquare, Award
};

const HomePage = () => {
  const { language } = useLanguage();

  const welcomeMessage = language === 'ar' ? `مرحباً بك، ${mockUser.name}!` : `Welcome back, ${mockUser.name}!`;

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: language === 'ar',
    appendDots: dots => (
      <div> <ul style={{ margin: "0px", bottom: "15px" }}> {dots} </ul> </div>
    ),
    customPaging: i => (
      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/50 rounded-full transition-all duration-300 active:bg-medical-primary focus:bg-medical-primary"></div>
    )
  };

  const productSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    rtl: language === 'ar',
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3.5 } },
      { breakpoint: 1024, settings: { slidesToShow: 2.5 } },
      { breakpoint: 640, settings: { slidesToShow: 1.5 } },
    ]
  };

  const featuredProducts = mockProducts.filter(p => p.rating > 4.5).slice(0, 8);
  const trendingItems = mockProducts.sort((a,b) => b.reviewsCount - a.reviewsCount).slice(0, 8);
  const bundleDeals = mockProducts.filter(p => p.name.toLowerCase().includes('bundle') || p.name.toLowerCase().includes('pack')).slice(0,8);
   if(bundleDeals.length < 3) { // ensure some bundles if not found by name
      bundleDeals.push(...mockProducts.slice(10,13));
   }


  const Section = ({ title, titleAr, children, viewAllLink }) => (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="mb-8 sm:mb-12"
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {language === 'ar' ? titleAr : title}
        </h2>
        {viewAllLink && (
          <Link to={viewAllLink} className="text-sm font-medium text-medical-primary hover:text-medical-dark flex items-center">
            {language === 'ar' ? 'عرض الكل' : 'View All'}
            {language === 'ar' ? <ChevronRight size={18} className="transform rotate-180 ml-1" /> : <ChevronRight size={18} className="ml-1" />}
          </Link>
        )}
      </div>
      {children}
    </motion.section>
  );

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-medical-dark mb-2">{welcomeMessage}</h1>
        <p className="text-medical-gray text-sm sm:text-base">
          {language === 'ar' ? 'ما الذي تبحث عنه اليوم؟' : "What are you looking for today?"}
        </p>
      </motion.div>

      {/* Promotional Banners */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        <Slider {...bannerSettings}>
          {mockPromotionalBanners.map(banner => (
            <div key={banner.id}>
              <Link to={banner.link}>
                <img src={banner.imageUrl} alt={language === 'ar' ? banner.altTextAr : banner.altText} className="w-full h-auto object-cover" />
              </Link>
            </div>
          ))}
        </Slider>
      </motion.div>

      {/* Quick Access Icons */}
      <Section title="Quick Access" titleAr="وصول سريع">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {mockQuickAccessItems(language).map(item => {
            const IconComponent = iconMap[item.icon];
            return (
              <Link 
                key={item.id} 
                to={item.link} 
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center space-y-2 group"
              >
                {IconComponent && <IconComponent size={28} className="text-medical-primary group-hover:scale-110 transition-transform" />}
                <span className="text-sm font-medium text-gray-700 group-hover:text-medical-dark">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Highlighted Categories */}
      <Section title="Shop by Category" titleAr="تسوق حسب الفئة" viewAllLink="/categories">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {mockCategories.slice(0,6).map(category => {
             const IconComponent = iconMap[category.icon];
             return (
              <Link 
                key={category.id} 
                to={`/products/${category.id}`} 
                className="bg-white rounded-lg shadow hover:shadow-md transition-all overflow-hidden group aspect-[3/2.5] flex flex-col"
              >
                <div className="flex-grow overflow-hidden">
                    <img src={category.image} alt={language === 'ar' ? category.nameAr : category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <div className="p-2 sm:p-3 text-center bg-white">
                  {/* IconComponent && <IconComponent size={20} className="mx-auto mb-1 text-medical-accent group-hover:text-medical-primary transition-colors" /> */}
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-medical-primary transition-colors truncate">
                    {language === 'ar' ? category.nameAr : category.name}
                  </h3>
                </div>
              </Link>
             );
          })}
        </div>
      </Section>
      
      {/* Loyalty Tier & Points */}
      <Section title="Your Loyalty Status" titleAr="حالة ولائك">
        <div className="bg-gradient-to-r from-medical-secondary to-medical-primary p-6 rounded-xl shadow-lg text-white flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div>
            <p className="text-sm opacity-80">{language === 'ar' ? 'مستواك الحالي' : 'Your Current Tier'}</p>
            <p className="text-2xl sm:text-3xl font-bold">{language === 'ar' ? mockUser.loyaltyTier === 'Silver' ? 'فضي' : mockUser.loyaltyTier === 'Gold' ? 'ذهبي' : 'بلاتيني' : mockUser.loyaltyTier}</p>
          </div>
          <div className="text-center sm:text-right rtl:sm:text-left">
            <p className="text-sm opacity-80">{language === 'ar' ? 'رصيد نقاطك' : 'Your Points Balance'}</p>
            <p className="text-2xl sm:text-3xl font-bold">{mockUser.loyaltyPoints.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}</p>
          </div>
          <Link to="/loyalty" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base">
            {language === 'ar' ? 'عرض تفاصيل الولاء' : 'View Loyalty Details'}
          </Link>
        </div>
      </Section>

      {/* Featured Products */}
      <Section title="Featured Products" titleAr="منتجات مميزة" viewAllLink="/products?filter=featured">
        <Slider {...productSliderSettings} className="-mx-2">
          {featuredProducts.map(product => (
            <div key={product.id} className="px-2">
              <ProductCard product={product} language={language} />
            </div>
          ))}
        </Slider>
      </Section>

      {/* Trending Items */}
      <Section title="Trending Items" titleAr="الأكثر رواجاً" viewAllLink="/products?sort=popular">
         <Slider {...productSliderSettings} className="-mx-2">
          {trendingItems.map(product => (
            <div key={product.id} className="px-2">
              <ProductCard product={product} language={language} />
            </div>
          ))}
        </Slider>
      </Section>

      {/* Bundle Deals */}
      <Section title="Bundle Deals" titleAr="عروض الباقات" viewAllLink="/products?category=bundles">
         <Slider {...productSliderSettings} className="-mx-2">
          {bundleDeals.map(product => (
            <div key={product.id} className="px-2">
              <ProductCard product={product} language={language} />
            </div>
          ))}
        </Slider>
      </Section>

    </div>
  );
};

export default HomePage;
