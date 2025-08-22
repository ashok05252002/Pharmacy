import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getProductById, mockProducts } from '../data/mockData';
import { Star, Plus, Minus, ShoppingCart, Heart, UploadCloud, Share2, CheckCircle, Info, ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import Slider from "react-slick";
import ProductCard from '../components/product/ProductCard';
import Badge from '../components/product/Badge';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [showZoomModal, setShowZoomModal] = useState(false);

  useEffect(() => {
    const fetchedProduct = getProductById(productId);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setMainImage(fetchedProduct.thumbnail); 
    } else {
      navigate('/products'); 
    }
    window.scrollTo(0,0);
  }, [productId, navigate]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen"><p>{language === 'ar' ? 'جارٍ تحميل المنتج...' : 'Loading product...'}</p></div>;
  }

  const name = language === 'ar' ? product.nameAr : product.name;
  const description = language === 'ar' ? product.descriptionAr : product.description;
  const availability = language === 'ar' ? product.availabilityAr : product.availability;
  const price = product.offerPrice || product.price;
  const originalPrice = product.offerPrice ? product.price : null;

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart.`);
    alert(`${quantity} x ${name} ${language === 'ar' ? 'أضيفت إلى السلة!' : 'added to cart!'}`);
  };

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} of ${product.name} now.`);
    navigate('/cart');
  };
  
  const handleWishlistToggle = () => setIsWishlisted(!isWishlisted);

  const handleShare = async () => {
    const shareData = {
      title: name,
      text: `${name} - ${description.substring(0,100)}...`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(name + " - " + window.location.href)}`;
        window.open(whatsappLink, '_blank');
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };
  
  const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 8);
  const productSliderSettings = {
    dots: false,
    infinite: relatedProducts.length > 3,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: language === 'ar',
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1.5, centerMode: true, centerPadding: '20px' } },
    ]
  };

  const gallerySliderSettings = {
    dots: true,
    infinite: product.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: language === 'ar',
    arrows: product.images.length > 1,
    adaptiveHeight: true,
     appendDots: dots => (
      <div> <ul style={{ margin: "0px", bottom: "10px" }}> {dots} </ul> </div>
    ),
    customPaging: i => (
      <div className="w-2 h-2 bg-gray-400 rounded-full transition-all duration-300 active:bg-medical-primary focus:bg-medical-primary"></div>
    )
  };


  return (
    <div className="container mx-auto py-4 sm:py-8">
      <nav className="text-sm mb-4 sm:mb-6" aria-label="Breadcrumb">
        <ol className={`list-none p-0 inline-flex space-x-2 rtl:space-x-reverse items-center text-gray-500 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <li><Link to="/home" className="hover:text-medical-primary">{language === 'ar' ? 'الرئيسية' : 'Home'}</Link></li>
          <li><span className="mx-1">{language === 'ar' ? <ChevronLeft size={14}/> : <ChevronRight size={14}/>}</span></li>
          <li><Link to={`/products/${product.category}`} className="hover:text-medical-primary">{language === 'ar' ? product.categoryNameAr : product.categoryName}</Link></li>
          <li><span className="mx-1">{language === 'ar' ? <ChevronLeft size={14}/> : <ChevronRight size={14}/>}</span></li>
          <li className="text-gray-700 font-medium truncate max-w-[150px] sm:max-w-xs" aria-current="page">{name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        <motion.div initial={{opacity:0, x: language === 'ar' ? 50 : -50}} animate={{opacity:1, x:0}} transition={{duration:0.5}} className="relative">
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer" onClick={() => setShowZoomModal(true)}>
            <img src={mainImage} alt={name} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <ZoomIn size={48} className="text-white"/>
            </div>
          </div>
          {product.images && product.images.length > 0 && (
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2">
              {[product.thumbnail, ...product.images].slice(0,5).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${mainImage === img ? 'border-medical-primary shadow-md' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt={`${name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{opacity:0, x: language === 'ar' ? -50 : 50}} animate={{opacity:1, x:0}} transition={{duration:0.5, delay:0.1}} className="space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{name}</h1>
            {product.brand && <p className="text-sm text-gray-500">{language === 'ar' ? 'ماركة:' : 'Brand:'} <Link to={`/products?brand=${encodeURIComponent(language === 'ar' ? product.brandAr : product.brand)}`} className="text-medical-accent hover:underline">{language === 'ar' ? product.brandAr : product.brand}</Link></p>}
          </div>

          {product.badges && product.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.badges.map(badgeText => (
                <Badge key={badgeText} text={badgeText} language={language} />
              ))}
            </div>
          )}

          {product.rating && (
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={20} className={i < Math.round(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} />
              ))}
              <span className="text-sm text-gray-600 ml-2 rtl:mr-2">({product.rating.toFixed(1)}) - {product.reviewsCount} {language === 'ar' ? 'تقييمات' : 'reviews'}</span>
            </div>
          )}
          
          <div className="flex items-baseline space-x-3 rtl:space-x-reverse">
            <p className="text-3xl sm:text-4xl font-bold text-medical-primary">{language === 'ar' ? 'ر.ع.' : 'OMR'} {price.toFixed(3)}</p>
            {originalPrice && (
              <p className="text-lg text-gray-400 line-through">{language === 'ar' ? 'ر.ع.' : 'OMR'} {originalPrice.toFixed(3)}</p>
            )}
          </div>
          
          <p className={`text-sm font-semibold ${product.availability === 'In Stock' || product.availability === 'متوفر' ? 'text-green-600' : 'text-red-600'}`}>
            {availability}
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">{description.substring(0, 200)}{description.length > 200 && '...'}</p>

          {product.prescriptionRequired && (
            <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-md flex items-start space-x-3 rtl:space-x-reverse">
              <Info size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-700">
                  {language === 'ar' ? 'هذا المنتج يتطلب وصفة طبية' : 'This item requires a prescription.'}
                </p>
                <p className="text-xs text-yellow-600">
                  {language === 'ar' ? 'يرجى تحميل وصفتك الطبية للمتابعة.' : 'Please upload your prescription to proceed.'}
                </p>
                <Button 
                    icon={<UploadCloud size={16}/>} 
                    onClick={() => navigate('/upload-prescription', { state: { productId: product.id, productName: name }})}
                    variant="outline" 
                    className="mt-2 border-yellow-400 text-yellow-700 hover:bg-yellow-100 text-xs py-1.5 px-3"
                >
                    {language === 'ar' ? 'تحميل الوصفة الآن' : 'Upload Prescription Now'}
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-sm font-medium text-gray-700">{language === 'ar' ? 'الكمية:' : 'Quantity:'}</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button onClick={() => handleQuantityChange(-1)} variant="ghost" className="p-2 h-10 w-10" disabled={quantity <= 1} aria-label={language === 'ar' ? 'إنقاص الكمية' : 'Decrease quantity'}>
                <Minus size={16} />
              </Button>
              <span className="px-4 text-sm font-medium w-12 text-center">{quantity}</span>
              <Button onClick={() => handleQuantityChange(1)} variant="ghost" className="p-2 h-10 w-10" aria-label={language === 'ar' ? 'زيادة الكمية' : 'Increase quantity'}>
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Button 
                icon={<ShoppingCart size={20} />} 
                onClick={handleAddToCart}
                className="w-full py-3 text-base"
                disabled={product.availability !== 'In Stock' && product.availability !== 'متوفر'}
            >
                {language === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}
            </Button>
            <Button 
                variant="secondary" 
                onClick={handleBuyNow}
                className="w-full py-3 text-base"
                disabled={product.availability !== 'In Stock' && product.availability !== 'متوفر'}
            >
                {language === 'ar' ? 'اشترِ الآن' : 'Buy Now'}
            </Button>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={handleWishlistToggle} className="text-sm text-medical-gray hover:text-red-500">
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} className={`mr-2 rtl:ml-2 rtl:mr-0 ${isWishlisted ? 'text-red-500' : ''}`} />
                {isWishlisted ? (language === 'ar' ? 'في المفضلة' : 'Wishlisted') : (language === 'ar' ? 'أضف للمفضلة' : 'Add to Wishlist')}
            </Button>
            <Button variant="ghost" onClick={handleShare} className="text-sm text-medical-gray hover:text-medical-primary">
                <Share2 size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                {language === 'ar' ? 'مشاركة' : 'Share'}
            </Button>
          </div>

          {product.loyaltyPointsEarned > 0 && (
            <div className="flex items-center text-sm text-green-600 bg-green-50 p-3 rounded-md">
              <CheckCircle size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
              <span>
                {language === 'ar' ? `اكسب ${product.loyaltyPointsEarned} نقطة عند شراء هذا المنتج!` : `Earn ${product.loyaltyPointsEarned} points on this purchase!`}
              </span>
            </div>
          )}

          <div className="pt-2">
            <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">{language === 'ar' ? 'رمز ترويجي:' : 'Promo Code:'}</label>
            <div className="flex">
              <input type="text" id="promoCode" placeholder={language === 'ar' ? 'أدخل الرمز' : 'Enter code'} className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-medical-primary focus:border-medical-primary text-sm"/>
              <Button variant="outline" className="rounded-l-none rtl:rounded-r-none rtl:rounded-l-md border-l-0 rtl:border-r-0 rtl:border-l text-sm px-3">
                {language === 'ar' ? 'تطبيق' : 'Apply'}
              </Button>
            </div>
          </div>

        </motion.div>
      </div>

      <div className="mt-12 sm:mt-16 border-t pt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{language === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}</h3>
        <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }} />
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12 sm:mt-16 border-t pt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">{language === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}</h3>
          <Slider {...productSliderSettings} className="-mx-2">
            {relatedProducts.map(relatedProd => (
              <div key={relatedProd.id} className="px-2">
                <ProductCard product={relatedProd} />
              </div>
            ))}
          </Slider>
        </div>
      )}

      <AnimatePresence>
        {showZoomModal && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/75 z-[100] flex items-center justify-center p-4"
                onClick={() => setShowZoomModal(false)}
            >
                <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    className="relative bg-white p-2 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button 
                        variant="ghost" 
                        className="absolute top-2 right-2 rtl:left-2 rtl:right-auto z-10 bg-white/50 hover:bg-white p-1.5 rounded-full" 
                        onClick={() => setShowZoomModal(false)}
                        aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
                    >
                        <X size={24}/>
                    </Button>
                    <div className="w-full max-h-[calc(90vh-1rem)] overflow-hidden rounded">
                      <Slider {...gallerySliderSettings} initialSlide={product.images.indexOf(mainImage) !== -1 ? product.images.indexOf(mainImage) +1 : 0}>
                          {[product.thumbnail, ...product.images].map((img, idx) => (
                              <div key={idx} className="aspect-square flex items-center justify-center bg-gray-100">
                                  <img src={img} alt={`${name} - view ${idx+1}`} className="max-w-full max-h-[calc(90vh-4rem)] object-contain"/>
                              </div>
                          ))}
                      </Slider>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;
