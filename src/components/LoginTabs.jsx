import React from 'react';
import { motion } from 'framer-motion';

const LoginTabs = ({ tabs, activeTab, setActiveTab, language }) => {
  return (
    <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 p-1 rounded-lg overflow-x-auto custom-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${
            activeTab === tab.id ? 'text-medical-primary' : 'text-medical-gray hover:bg-gray-200/50 hover:text-medical-dark'
          } flex-1 min-w-[100px] sm:flex-none flex items-center justify-center space-x-2 rtl:space-x-reverse px-3 py-2.5 text-sm font-medium rounded-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-medical-primary focus-visible:ring-opacity-50 whitespace-nowrap relative`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activePillLoginScreen"
              className="absolute inset-0 bg-white rounded-md shadow-md z-0"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.icon}</span>
          <span className="relative z-10">{language === 'ar' ? tab.nameAr : tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LoginTabs;
