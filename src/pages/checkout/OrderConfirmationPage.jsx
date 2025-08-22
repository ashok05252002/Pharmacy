import React, { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Download, MessageCircle, ShoppingBag } from 'lucide-react'; 
import Button from '../../components/Button';
import ProductCard from '../../components/product/ProductCard'; 
import { mockProducts } from '../../data/mockData';
import Slider from "react-slick";
import { motion } from 'framer-motion';

const OrderConfirmationPage = () => {
  const { language } = useLanguage();
  const { orderId } = useParams();

  useEffect(() => {
    console.log("Order confirmed for ID:", orderId);
  }, [orderId]);

  const suggestedProducts = mockProducts.sort(() => 0.5 - Math.random()).slice(0, 8); 
  const productSliderSettings = {
    dots: false,
    infinite: suggestedProducts.length > 3,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: language === 'ar',
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1.5 } },
    ]
  };

  return (
    <div className="container mx-auto py-8 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay:0.2 }}
        className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-xl"
      >
        <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          {language === 'ar' ? 'تم تأكيد طلبك بنجاح!' : 'Your Order is Confirmed!'}
        </h1>
        <p className="text-gray-600 mb-4">
          {language === 'ar' ? 'شكراً لك على التسوق معنا. رقم طلبك هو:' : 'Thank you for shopping with us. Your Order ID is:'} <strong className="text-medical-dark">{orderId}</strong>
        </p>
        <p className="text-sm text-gray-500 mb-8">
          {language === 'ar' ? 'ستتلقى رسالة تأكيد بالبريد الإلكتروني قريباً مع تفاصيل طلبك وحالة الشحن.' : 'You will receive an email confirmation shortly with your order details and shipping status.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <Button 
            as={Link} 
            to={`/orders`} 
            variant="primary" 
            className="w-full py-2.5"
            icon={<Package size={18}/>}
          >
            {language === 'ar' ? 'تتبع طلبي' : 'Track My Order'}
          </Button>
          <Button 
            variant="outline" 
            className="w-full py-2.5"
            icon={<Download size={18}/>}
            onClick={() => alert(language === 'ar' ? 'ميزة تحميل الفاتورة قيد التطوير' : 'Invoice download feature under development')}
          >
            {language === 'ar' ? 'تحميل الفاتورة (PDF)' : 'Download Invoice (PDF)'}
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-sm mb-8">
            <Button variant="ghost" className="text-green-600 hover:bg-green-50" icon={<MessageCircle size={18}/>} onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`My order ID is ${orderId}`)}`, '_blank')}>
                {language === 'ar' ? 'تأكيد عبر واتساب' : 'Confirm via WhatsApp'}
            </Button>
            <Button variant="ghost" className="text-blue-600 hover:bg-blue-50" icon={<Download size={18}/>} onClick={() => alert('Email confirmation mock sent')}>
                {language === 'ar' ? 'إرسال تأكيد بالبريد' : 'Send Email Confirmation'}
            </Button>
        </div>

        <Button as={Link} to="/home" className="text-medical-accent hover:underline text-sm">
          {language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Homepage'}
        </Button>
      </motion.div>

      {suggestedProducts.length > 0 && (
        <div className="mt-12 sm:mt-16 pt-8 border-t">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            {language === 'ar' ? 'قد تعجبك أيضاً هذه المنتجات' : 'You Might Also Like'}
          </h3>
          <Slider {...productSliderSettings} className="-mx-2">
            {suggestedProducts.map(prod => (
              <div key={prod.id} className="px-2">
                <ProductCard product={prod} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
