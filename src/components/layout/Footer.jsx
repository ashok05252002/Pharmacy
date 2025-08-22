import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Logo from '../common/Logo';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-medical-dark text-medical-light/80 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo & About */}
          <div className="space-y-4">
            <Logo className="text-white hover:text-medical-primary" />
            <p className="text-sm">
              {language === 'ar' 
                ? 'صيدلية طيبة، منصتك الموثوقة لجميع احتياجاتك من المستلزمات الطبية والصيدلانية.' 
                : 'Taiba Pharmacy, your trusted platform for all medical and pharmaceutical supply needs.'} {/* Updated Text */}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h5>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-medical-primary transition-colors">{language === 'ar' ? 'عنا' : 'About Us'}</a></li>
              <li><a href="/contact" className="hover:text-medical-primary transition-colors">{language === 'ar' ? 'اتصل بنا' : 'Contact Us'}</a></li>
              <li><a href="/faq" className="hover:text-medical-primary transition-colors">{language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}</a></li>
              <li><a href="/terms" className="hover:text-medical-primary transition-colors">{language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</a></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">
              {language === 'ar' ? 'الفئات' : 'Categories'}
            </h5>
            <ul className="space-y-2 text-sm">
              <li><a href="/products/cosmetics" className="hover:text-medical-primary transition-colors">{language === 'ar' ? 'مستحضرات تجميل' : 'Cosmetics'}</a></li>
              <li><a href="/products/general-medicines" className="hover:text-medical-primary transition-colors">{language === 'ar' ? 'أدوية عامة' : 'General Medicines'}</a></li>
              <li><a href="/products/prescription-medicines" className="hover:text-medical-primary transition-colors">{language === 'ar' ? 'أدوية بوصفة' : 'Prescription Drugs'}</a></li>
              <li><a href="/products/vitamins" className="hover:text-medical-primary transition-colors">{language === 'ar' ? 'فيتامينات' : 'Vitamins'}</a></li>
            </ul>
          </div>
          
          {/* Column 4: Contact & Social */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">
              {language === 'ar' ? 'تواصل معنا' : 'Connect'}
            </h5>
            <p className="text-sm mb-3">support@taibapharmacy.com</p> {/* Updated Email */}
            <p className="text-sm mb-4">+968 24 123 456</p> {/* Example Omani Number */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-medical-light/80 hover:text-medical-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-medical-light/80 hover:text-medical-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-medical-light/80 hover:text-medical-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-medical-light/80 hover:text-medical-primary transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-medical-light/20 pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} {language === 'ar' ? 'صيدلية طيبة. جميع الحقوق محفوظة.' : 'Taiba Pharmacy. All rights reserved.'} {/* Updated Copyright */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
