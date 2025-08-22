import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MessageSquare, Send } from 'lucide-react';
import Button from '../../components/Button';
import { motion } from 'framer-motion';

const DeliveryChatPage = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'admin', text: language === 'ar' ? 'مرحباً، كيف يمكننا المساعدة؟' : 'Hello, how can we assist you?', timestamp: new Date(Date.now() - 60000 * 5).toISOString() },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const newMsg = {
      id: Date.now(),
      sender: 'delivery_staff',
      text: newMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    // Mock admin reply
    setTimeout(() => {
        setMessages(prev => [...prev, {id: Date.now()+1, sender: 'admin', text: language === 'ar' ? 'تم استلام رسالتك، سنرد قريباً.' : 'Message received, we will reply soon.', timestamp: new Date().toISOString()}])
    }, 1500);
  };

  return (
    <div className="container mx-auto py-4 sm:py-6 px-2 sm:px-4 flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)]"> {/* Adjust height based on header */}
      <motion.div 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration:0.5 }}
        className="flex-grow flex flex-col bg-white shadow-lg rounded-xl overflow-hidden"
      >
        <div className="p-3 sm:p-4 border-b flex items-center bg-gray-50">
          <MessageSquare size={20} sm={22} className="text-medical-primary mr-2 rtl:ml-2" />
          <h1 className="text-base sm:text-lg font-bold text-gray-800">
            {language === 'ar' ? 'دردشة الدعم' : 'Support Chat'}
          </h1>
        </div>

        <div className="flex-grow p-3 sm:p-4 space-y-3 overflow-y-auto custom-scrollbar">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'delivery_staff' ? (language === 'ar' ? 'justify-start' : 'justify-end') : (language === 'ar' ? 'justify-end' : 'justify-start')}`}>
              <div className={`max-w-[80%] p-2 sm:p-2.5 rounded-lg text-xs sm:text-sm shadow-sm ${
                msg.sender === 'delivery_staff' 
                  ? 'bg-medical-primary text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-lg' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-lg'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 opacity-70 ${msg.sender === 'delivery_staff' ? 'text-right rtl:text-left' : 'text-left rtl:text-right'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', {hour:'2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-100 p-2 sm:p-3 border-t">
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
            className="flex-grow p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-medical-primary focus:border-medical-primary outline-none text-sm"
          />
          <Button type="submit" icon={<Send size={16} sm={18} />} className="h-full px-3 sm:px-4 py-2 sm:py-2.5">
            {language === 'ar' ? 'إرسال' : 'Send'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default DeliveryChatPage;
