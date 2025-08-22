import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminLayout = ({ userRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { language } = useLanguage();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex h-screen bg-gray-100 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userRole={userRole} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} userRole={userRole} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
          <Outlet context={{ userRole }} /> {/* Pass userRole to nested routes */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
