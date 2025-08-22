import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Info } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Badge from './Badge'; 
import Button from '../Button'; 
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { language } = useLanguage();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const name = language === 'ar' ? product.nameAr : product.name;
  const price = product.offerPrice || product.price;
  const originalPrice = product.offerPrice ? product.price : null;

  const handleWishlistToggle = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist: ${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added to cart: ${product.id}`);
    alert(`${name} ${language === 'ar' ? 'أضيف إلى السلة!' : 'added to cart!'}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)"}}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.thumbnail} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badges && product.badges.length > 0 && (
            <div className={`absolute top-2 ${language === 'ar' ? 'left-2' : 'right-2'} flex flex-col space-y-1 items-end`}>
              {product.badges.map(badgeText => (
                <Badge key={badgeText} text={badgeText} language={language} />
              ))}
            </div>
          )}
           <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 ${language === 'ar' ? 'right-2' : 'left-2'} p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors text-gray-600 hover:text-red-500 z-10`}
            aria-label={language === 'ar' ? (isWishlisted ? 'إزالة من المفضلة' : 'إضافة للمفضلة') : (isWishlisted ? 'Remove from wishlist' : 'Add to wishlist')}
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'text-red-500' : ''} />
          </button>
        </div>
      </Link>

      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block mb-1">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-medical-primary transition-colors truncate" title={name}>
            {name}
          </h3>
        </Link>
        {product.brand && (
          <p className="text-xs text-gray-500 mb-2 truncate">{language === 'ar' ? product.brandAr : product.brand}</p>
        )}

        <div className="mt-auto"> 
          <div className="flex items-baseline mb-2">
            <p className="text-base sm:text-lg font-bold text-medical-primary">
              {language === 'ar' ? 'ر.ع.' : 'OMR'} {price.toFixed(2)} {/* Updated Currency */}
            </p>
            {originalPrice && (
              <p className="text-xs text-gray-400 line-through ml-2 rtl:mr-2 rtl:ml-0">
                {language === 'ar' ? 'ر.ع.' : 'OMR'} {originalPrice.toFixed(2)} {/* Updated Currency */}
              </p>
            )}
          </div>
          
          {product.rating && (
            <div className="flex items-center text-xs text-gray-500 mb-3">
              <Star size={14} className="text-yellow-400 fill-current mr-1 rtl:ml-1 rtl:mr-0" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="mx-1">|</span>
              <span>{product.reviewsCount} {language === 'ar' ? 'تقييمات' : 'reviews'}</span>
            </div>
          )}

          {product.prescriptionRequired ? (
             <Button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert(language === 'ar' ? 'هذا المنتج يتطلب وصفة طبية. يرجى الذهاب لصفحة المنتج للرفع.' : 'This product requires a prescription. Please go to product page to upload.')}}
                variant="outline" 
                className="w-full text-xs py-2" 
                icon={<Info size={16} />}
            >
                {language === 'ar' ? 'يتطلب وصفة' : 'Prescription Needed'}
            </Button>
          ) : (
            <Button 
                onClick={handleAddToCart} 
                variant="primary" 
                className="w-full text-xs py-2" 
                icon={<ShoppingCart size={16} />}
            >
                {language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
