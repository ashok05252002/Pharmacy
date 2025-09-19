import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { mockProducts, mockCategories } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import FilterPanel from '../components/product/FilterPanel';
import SortingDropdown from '../components/product/SortingDropdown';
import { Filter, List, Grid, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';

const PRODUCTS_PER_PAGE = 12;

const ProductListPage = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const { categorySlug } = useParams();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const initialMinPrice = Array.isArray(mockProducts) && mockProducts.length > 0 ? Math.floor(Math.min(0, ...mockProducts.map(p => p.offerPrice || p.price))) : 0;
  const initialMaxPrice = Array.isArray(mockProducts) && mockProducts.length > 0 ? Math.ceil(Math.max(100, ...mockProducts.map(p => p.offerPrice || p.price))) : 1000;


  const [filters, setFilters] = useState({
    brand: [],
    priceRange: { min: initialMinPrice, max: initialMaxPrice },
    prescriptionRequired: null, // null, true, false
    offersOnly: false,
    sortBy: 'popular', // popular, price_asc, price_desc, newest
  });

  // Parse search query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search') || '';
    const categoryFilter = queryParams.get('category') || categorySlug;
    const brandQueryParam = queryParams.get('brand');
    const offers = queryParams.get('filter') === 'offers';

    setSearchTerm(search);
    if (categoryFilter) {
        const foundCategory = mockCategories.find(c => c.id === categoryFilter);
        setActiveCategory(foundCategory);
    } else {
        setActiveCategory(null);
    }
    
    setFilters(prev => ({
        ...prev,
        brand: brandQueryParam ? [brandQueryParam] : [], // Initialize brand filter from URL
        offersOnly: offers,
        // Reset price range to initial defaults if not specified or if they change based on products
        priceRange: {min: initialMinPrice, max: initialMaxPrice}
    }));

  }, [location.search, categorySlug, initialMinPrice, initialMaxPrice]);


  // Initial product load and filtering logic
  useEffect(() => {
    let currentProducts = [...mockProducts];

    // Filter by search term
    if (searchTerm) {
      currentProducts = currentProducts.filter(p =>
        (language === 'ar' ? p.nameAr : p.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (language === 'ar' ? p.brandAr : p.brand).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by active category
    if (activeCategory) {
      currentProducts = currentProducts.filter(p => p.category === activeCategory.id);
    }

    // Apply other filters from `filters` state
    if (filters.brand.length > 0) {
      currentProducts = currentProducts.filter(p => filters.brand.includes(language === 'ar' ? p.brandAr : p.brand));
    }

    if (filters.priceRange) {
        currentProducts = currentProducts.filter(p => {
            const price = p.offerPrice || p.price;
            // Ensure min and max are numbers, provide defaults if not
            const minVal = typeof filters.priceRange.min === 'number' ? filters.priceRange.min : initialMinPrice;
            const maxVal = typeof filters.priceRange.max === 'number' ? filters.priceRange.max : initialMaxPrice;
            return price >= minVal && price <= maxVal;
        });
    }
    
    if (filters.prescriptionRequired !== null) {
        currentProducts = currentProducts.filter(p => p.prescriptionRequired === filters.prescriptionRequired);
    }

    if (filters.offersOnly) {
        currentProducts = currentProducts.filter(p => p.offerPrice !== null);
    }

    // Sorting
    switch (filters.sortBy) {
        case 'price_asc':
            currentProducts.sort((a,b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
            break;
        case 'price_desc':
            currentProducts.sort((a,b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
            break;
        case 'newest': 
            currentProducts.sort((a,b) => b.id.localeCompare(a.id)); 
            break;
        case 'popular': 
        default:
            currentProducts.sort((a,b) => b.reviewsCount - a.reviewsCount);
            break;
    }

    setProducts(currentProducts); 
    setFilteredProducts(currentProducts);
    setCurrentPage(1); 
  }, [searchTerm, activeCategory, filters, language, initialMinPrice, initialMaxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const pageTitle = activeCategory 
    ? (language === 'ar' ? activeCategory.nameAr : activeCategory.name)
    : (searchTerm ? `${language === 'ar' ? 'نتائج البحث عن: ' : 'Search Results for: '}"${searchTerm}"` 
    : (language === 'ar' ? 'جميع المنتجات' : 'All Products'));

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
      <aside className="lg:w-1/4 xl:w-1/5">
        <div className="lg:hidden mb-4">
            <Button 
                onClick={() => setIsFilterPanelOpen(true)} 
                variant="outline" 
                className="w-full"
                icon={<Filter size={18}/>}
            >
                {language === 'ar' ? 'تصفية النتائج' : 'Filter Results'}
            </Button>
        </div>
        <div className="hidden lg:block lg:sticky lg:top-24">
            <FilterPanel 
                filters={filters} 
                setFilters={setFilters} 
                allProducts={products}
            />
        </div>
      </aside>

      <main className="lg:w-3/4 xl:w-4/5">
        <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{pageTitle}</h1>
                <div className="flex items-center gap-2 sm:gap-4">
                    <SortingDropdown currentSort={filters.sortBy} onSortChange={(val) => setFilters(prev => ({...prev, sortBy: val}))} />
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                            onClick={() => setViewMode('grid')} 
                            className={`p-2 ${viewMode === 'grid' ? 'bg-medical-primary text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-l-md transition-colors`}
                            aria-label={language === 'ar' ? 'عرض شبكي' : 'Grid View'}
                        >
                            <Grid size={20} />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')} 
                            className={`p-2 ${viewMode === 'list' ? 'bg-medical-primary text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-r-md transition-colors`}
                            aria-label={language === 'ar' ? 'عرض قائمة' : 'List View'}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-600">
                {language === 'ar' 
                    ? `عرض ${paginatedProducts.length} من ${filteredProducts.length} منتجات` 
                    : `Showing ${paginatedProducts.length} of ${filteredProducts.length} products`}
            </p>
        </div>
        
        {paginatedProducts.length > 0 ? (
          <motion.div 
            layout 
            className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
          >
            <AnimatePresence>
              {paginatedProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale:0.95 }}
                  animate={{ opacity: 1, scale:1 }}
                  exit={{ opacity: 0, scale:0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <img src="https://images.unsplash.com/photo-1577741314755-325d41920c7a?q=80&w=300" alt={language === 'ar' ? 'لا توجد منتجات' : 'No Products Found'} className="mx-auto mb-6 w-40 h-40 opacity-70 rounded-lg"/>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {language === 'ar' ? 'لم يتم العثور على منتجات' : 'No Products Found'}
            </h3>
            <p className="text-gray-500">
              {language === 'ar' ? 'حاول تعديل الفلاتر أو البحث عن شيء آخر.' : 'Try adjusting your filters or searching for something else.'}
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 sm:mt-12 flex justify-center items-center space-x-2 rtl:space-x-reverse">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              className="px-3 py-1.5"
              icon={language === 'ar' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            >
              {language === 'ar' ? 'السابق' : 'Prev'}
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(pageNumber => 
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2) // Show more pages around current
                )
                .map((pageNumber, index, arr) => {
                    const isEllipsis = index > 0 && arr[index-1] !== pageNumber -1;
                    return (
                        <React.Fragment key={pageNumber}>
                            {isEllipsis && <span className="text-gray-500 px-1">...</span>}
                            <Button
                                onClick={() => handlePageChange(pageNumber)}
                                variant={currentPage === pageNumber ? 'primary' : 'outline'}
                                className="px-3 py-1.5 w-10 h-10"
                            >
                                {pageNumber}
                            </Button>
                        </React.Fragment>
                    );
            })}

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              className="px-3 py-1.5"
              icon={language === 'ar' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            >
              {language === 'ar' ? 'التالي' : 'Next'}
            </Button>
          </div>
        )}
      </main>

      <AnimatePresence>
      {isFilterPanelOpen && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
            onClick={() => setIsFilterPanelOpen(false)}
        >
            <motion.div
                initial={{ x: language === 'ar' ? '100%' : '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: language === 'ar' ? '100%' : '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full w-full max-w-xs bg-white shadow-xl p-6 overflow-y-auto custom-scrollbar`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">{language === 'ar' ? 'تصفية' : 'Filters'}</h3>
                    <Button onClick={() => setIsFilterPanelOpen(false)} variant="ghost" className="p-1">
                        <X size={22}/>
                    </Button>
                </div>
                <FilterPanel 
                    filters={filters} 
                    setFilters={setFilters} 
                    allProducts={products}
                    onApplyFilters={() => setIsFilterPanelOpen(false)}
                />
            </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListPage;
