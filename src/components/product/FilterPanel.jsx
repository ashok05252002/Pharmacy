import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../Button'; // Assuming Button component exists

const FilterPanel = ({ filters, setFilters, allProducts, onApplyFilters }) => {
    const { language } = useLanguage();
    
    // Ensure allProducts is an array before mapping
    const safeAllProducts = Array.isArray(allProducts) ? allProducts : [];

    const brands = [...new Set(safeAllProducts.map(p => language === 'ar' ? p.brandAr : p.brand))];
    const prices = safeAllProducts.map(p => p.offerPrice || p.price);
    
    // Calculate minPrice and maxPrice safely
    const minPrice = prices.length > 0 ? Math.floor(Math.min(0, ...prices)) : 0;
    const maxPrice = prices.length > 0 ? Math.ceil(Math.max(100, ...prices)) : 1000;


    const handleBrandChange = (brandName) => {
        setFilters(prev => ({
            ...prev,
            brand: prev.brand.includes(brandName)
                ? prev.brand.filter(b => b !== brandName)
                : [...prev.brand, brandName]
        }));
    };
    
    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
            setFilters(prev => ({
                ...prev,
                priceRange: { ...prev.priceRange, [name]: parsedValue }
            }));
        } else if (value === '') { // Allow clearing the input
             setFilters(prev => ({
                ...prev,
                priceRange: { ...prev.priceRange, [name]: name === 'min' ? 0 : maxPrice } // Reset to default or an appropriate value
            }));
        }
    };

    const handleResetFilters = () => {
        setFilters({
            brand: [],
            priceRange: { min: minPrice, max: maxPrice },
            prescriptionRequired: null,
            offersOnly: false,
            sortBy: filters.sortBy, // Keep current sort
        });
    };


    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">{language === 'ar' ? 'تصفية النتائج' : 'Filter Results'}</h3>
                <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-xs text-medical-accent">
                    {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                </Button>
            </div>
            <div>
                <h4 className="font-semibold mb-2 text-gray-600">{language === 'ar' ? 'الماركة' : 'Brand'}</h4>
                <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                    {brands.map(b => (
                        <label key={b} className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer p-1 hover:bg-gray-50 rounded">
                            <input 
                                type="checkbox" 
                                checked={filters.brand.includes(b)} 
                                onChange={() => handleBrandChange(b)}
                                className="form-checkbox h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary focus:ring-offset-0"
                            />
                            <span className="text-sm text-gray-700">{b}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-2 text-gray-600">{language === 'ar' ? 'نطاق السعر' : 'Price Range'}</h4>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <input 
                        type="number" 
                        name="min" 
                        value={filters.priceRange.min} 
                        onChange={handlePriceChange}
                        placeholder={language === 'ar' ? 'الحد الأدنى' : 'Min'}
                        className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-medical-primary focus:border-medical-primary"
                        min="0"
                    />
                    <span className="text-gray-500">-</span>
                     <input 
                        type="number" 
                        name="max" 
                        value={filters.priceRange.max} 
                        onChange={handlePriceChange}
                        placeholder={language === 'ar' ? 'الحد الأقصى' : 'Max'}
                        className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-medical-primary focus:border-medical-primary"
                        max={maxPrice > 0 ? maxPrice : 10000} 
                    />
                </div>
                {/* TODO: Implement a proper slider component here */}
                <p className="text-xs text-gray-500 mt-1">{language === 'ar' ? `من ${minPrice} إلى ${maxPrice}` : `Default range: ${minPrice} to ${maxPrice}`}</p>
            </div>
            
            <div>
                <h4 className="font-semibold mb-2 text-gray-600">{language === 'ar' ? 'يتطلب وصفة طبية' : 'Prescription Required'}</h4>
                <select 
                    value={filters.prescriptionRequired === null ? '' : String(filters.prescriptionRequired)}
                    onChange={(e) => setFilters(prev => ({...prev, prescriptionRequired: e.target.value === '' ? null : e.target.value === 'true'}))}
                    className="w-full text-sm border-gray-300 rounded-md p-2 focus:ring-medical-primary focus:border-medical-primary bg-white"
                >
                    <option value="">{language === 'ar' ? 'الكل' : 'All'}</option>
                    <option value="true">{language === 'ar' ? 'نعم' : 'Yes'}</option>
                    <option value="false">{language === 'ar' ? 'لا' : 'No'}</option>
                </select>
            </div>

            <div>
                <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer p-1 hover:bg-gray-50 rounded">
                    <input 
                        type="checkbox" 
                        checked={filters.offersOnly} 
                        onChange={(e) => setFilters(prev => ({...prev, offersOnly: e.target.checked}))}
                        className="form-checkbox h-4 w-4 text-medical-primary rounded border-gray-300 focus:ring-medical-primary focus:ring-offset-0"
                    />
                    <span className="text-sm font-semibold text-gray-700">{language === 'ar' ? 'العروض فقط' : 'Offers Only'}</span>
                </label>
            </div>
            {onApplyFilters && (
                <Button onClick={onApplyFilters} className="w-full mt-4">
                    {language === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
                </Button>
            )}
        </div>
    );
};

export default FilterPanel;
