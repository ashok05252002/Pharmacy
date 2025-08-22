import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockNotifications, NOTIFICATION_TYPES } from '../../data/mockData';
import { Bell, X, Trash2, CheckCircle, Percent, Package, MessageCircle, Award, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button';

const iconMap = { Percent, Package, MessageCircle, Award, AlertTriangle };

const NotificationsPanel = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'offers', 'orders', 'support'

  const tabs = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'All' },
    { id: 'OFFER', label: language === 'ar' ? 'العروض' : 'Offers', typeKey: 'OFFER' },
    { id: 'ORDER_UPDATE', label: language === 'ar' ? 'الطلبات' : 'Orders', typeKey: 'ORDER_UPDATE' },
    { id: 'SUPPORT_UPDATE', label: language === 'ar' ? 'الدعم' : 'Support', typeKey: 'SUPPORT_UPDATE' },
  ];

  const filteredNotifications = notifications.filter(n => 
    activeTab === 'all' || n.type === tabs.find(t => t.id === activeTab)?.typeKey
  );

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const clearAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.isRead));
  };
  
  const clearAll = () => {
    setNotifications([]);
  };

  const panelVariants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[100]`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside panel
        >
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Bell size={20} className="mr-2 rtl:ml-2 text-medical-primary"/> 
              {language === 'ar' ? 'الإشعارات' : 'Notifications'}
              {unreadCount > 0 && <span className="ml-2 rtl:mr-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
            </h3>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b px-2 pt-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 text-sm font-medium rounded-t-md transition-colors
                  ${activeTab === tab.id 
                    ? 'border-b-2 border-medical-primary text-medical-primary' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          {filteredNotifications.length > 0 ? (
            <div className="max-h-80 overflow-y-auto custom-scrollbar divide-y">
              {filteredNotifications.map(notification => {
                const IconComponent = iconMap[notification.typeInfo.icon] || Bell;
                const itemContent = (
                  <div 
                    className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.isRead ? 'bg-medical-light/50' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 p-1.5 rounded-full ${notification.typeInfo.color.replace('text-', 'bg-')}/10`}>
                        <IconComponent size={18} className={notification.typeInfo.color} />
                      </div>
                      <div className="flex-grow">
                        <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-800' : 'text-gray-700'}`}>
                          {language === 'ar' ? notification.titleAr : notification.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {language === 'ar' ? notification.messageAr : notification.message}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {new Date(notification.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { day:'numeric', month:'short', hour:'numeric', minute:'2-digit'})}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-medical-primary rounded-full mt-1.5 flex-shrink-0" title={language === 'ar' ? 'غير مقروء' : 'Unread'}></div>
                      )}
                    </div>
                  </div>
                );
                return notification.link ? (
                    <Link key={notification.id} to={notification.link} onClick={onClose}>
                        {itemContent}
                    </Link>
                ) : (
                    <div key={notification.id}>
                        {itemContent}
                    </div>
                );
              })}
            </div>
          ) : (
            <p className="p-6 text-sm text-gray-500 text-center">
              {language === 'ar' ? 'لا توجد إشعارات لعرضها.' : 'No notifications to display.'}
            </p>
          )}
          
          {/* Footer Actions */}
          {notifications.length > 0 && (
            <div className="p-2 border-t flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={clearAllRead} className="text-xs text-gray-600 hover:bg-gray-100">
                    {language === 'ar' ? 'مسح المقروءة' : 'Clear Read'}
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-red-500 hover:bg-red-50">
                    <Trash2 size={14} className="mr-1 rtl:ml-1"/> {language === 'ar' ? 'مسح الكل' : 'Clear All'}
                </Button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
