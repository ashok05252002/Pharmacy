import React from 'react';
import Header from './Header';
import MobileBottomNav from './MobileBottomNav';
import Footer from './Footer';
import Chatbot from '../common/Chatbot'; // Added Chatbot
import { useLanguage } from '../../contexts/LanguageContext';

const MainLayout = ({ children }) => {
  const { language } = useLanguage();

  return (
    <div className={`flex flex-col min-h-screen font-sans ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header />
      <main className="flex-grow bg-medical-light/30 pt-16 sm:pt-20 pb-16 sm:pb-4"> 
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {children}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
      <Chatbot /> {/* Added Chatbot here to be persistent */}
    </div>
  );
};

export default MainLayout;
