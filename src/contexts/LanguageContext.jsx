import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // 'en' or 'ar'

  useEffect(() => {
    // Attempt to load saved language preference
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('appLanguage', language); // Save preference
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
