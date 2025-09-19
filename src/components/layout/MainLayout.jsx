import React from 'react';
import Header from './Header';
import SubHeader from './SubHeader'; // Import the new component
import MobileBottomNav from './MobileBottomNav';
import Footer from './Footer';
import Chatbot from '../common/Chatbot';
import { useLanguage } from '../../contexts/LanguageContext';

const MainLayout = ({ children }) => {
  const { language } = useLanguage();

  return (
    <div className={`flex flex-col min-h-screen font-sans ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header />
      <SubHeader /> {/* Add the SubHeader here */}
      <main className="flex-grow bg-medical-light/30 pt-28 sm:pt-32 pb-16 sm:pb-4"> {/* Adjust top padding */}
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {children}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
      <Chatbot />
    </div>
  );
};

export default MainLayout;
