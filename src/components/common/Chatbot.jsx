import React, { useState } from 'react';
import { MessageSquare, X, Send, HelpCircle, ShoppingCart, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button';

const Chatbot = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', text: language === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك اليوم؟' : 'Hi there! How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const commonFAQs = [
    { id: 'faq1', text: language === 'ar' ? 'أين طلبي؟' : 'Where is my order?', icon: ShoppingCart, action: () => handleFAQAction('track_order') },
    { id: 'faq2', text: language === 'ar' ? 'أحتاج إلى استرداد' : 'I need a refund', icon: HelpCircle, action: () => handleFAQAction('refund_request') },
    { id: 'faq3', text: language === 'ar' ? 'كيف أرفع وصفتي؟' : 'How to upload prescription?', icon: FileText, action: () => handleFAQAction('upload_prescription_info') },
  ];

  const handleToggle = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSendMessage = (text) => {
    const userMessage = text || inputValue;
    if (userMessage.trim() === '') return;

    setMessages(prev => [...prev, { id: Date.now().toString(), text: userMessage, sender: 'user' }]);
    setInputValue('');

    // Mock bot response
    setTimeout(() => {
      let botResponseText = language === 'ar' ? 'شكراً لرسالتك. يقوم وكيل بالرد قريباً.' : "Thanks for your message. An agent will respond shortly.";
      if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('مرحباً')) {
        botResponseText = language === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك؟' : 'Hello! How can I assist you?';
      }
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: botResponseText, sender: 'bot' }]);
    }, 1000);
  };
  
  const handleFAQAction = (actionType) => {
    let responseText = '';
    switch(actionType) {
        case 'track_order':
            responseText = language === 'ar' ? 'يمكنك تتبع طلبك من خلال صفحة "طلباتي".' : 'You can track your order from the "My Orders" page.';
            break;
        case 'refund_request':
            responseText = language === 'ar' ? 'لطلب استرداد، يرجى الاتصال بدعم العملاء مع ذكر رقم طلبك.' : 'For a refund, please contact customer support with your order number.';
            break;
        case 'upload_prescription_info':
            responseText = language === 'ar' ? 'يمكنك رفع وصفتك الطبية من صفحة المنتج أو من خلال قسم "رفع الوصفة" في حسابك.' : 'You can upload your prescription on the product page or via the "Upload Prescription" section in your account.';
            break;
        default:
            responseText = language === 'ar' ? 'لقد اخترت خيارًا. كيف يمكنني المساعدة أكثر؟' : 'You selected an option. How can I help further?';
    }
    setMessages(prev => [...prev, 
        { id: Date.now().toString(), text: commonFAQs.find(faq => faq.action.toString().includes(actionType))?.text || 'Selected FAQ', sender: 'user'},
        { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot'}
    ]);
  };

  const fabVariants = {
    closed: { scale: 1, rotate: 0 },
    open: { scale: 1.1, rotate: 180 }
  };

  const chatWindowVariants = {
    closed: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <>
      <motion.button
        variants={fabVariants}
        animate={isOpen ? "open" : "closed"}
        onClick={handleToggle}
        className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} bg-medical-primary text-white p-3.5 rounded-full shadow-xl hover:bg-medical-dark transition-colors z-[100]`}
        aria-label={language === 'ar' ? (isOpen ? 'إغلاق الدردشة' : 'فتح الدردشة') : (isOpen ? 'Close Chat' : 'Open Chat')}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatWindowVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`fixed bottom-20 ${language === 'ar' ? 'left-6' : 'right-6'} w-80 sm:w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-[99]`}
          >
            {/* Header */}
            <div className="bg-medical-primary text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">{language === 'ar' ? 'مساعدة ودعم' : 'Help & Support'}</h3>
              <button onClick={handleToggle} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 space-y-3 overflow-y-auto custom-scrollbar">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? (language === 'ar' ? 'justify-start' : 'justify-end') : (language === 'ar' ? 'justify-end' : 'justify-start')}`}>
                  <div className={`max-w-[80%] p-2.5 rounded-lg text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-medical-accent text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-lg' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-lg'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            {/* FAQs / Input */}
            <div className="border-t p-3 bg-gray-50">
                <div className="mb-2 flex flex-wrap gap-1.5">
                    {commonFAQs.map(faq => {
                        const Icon = faq.icon;
                        return (
                        <Button key={faq.id} onClick={faq.action} variant="outline" size="sm" className="text-xs py-1 px-2 border-gray-300 hover:bg-gray-200">
                           {Icon && <Icon size={14} className="mr-1 rtl:ml-1"/>} {faq.text}
                        </Button>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2">
                    <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                    className="flex-grow p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-medical-primary focus:border-medical-primary outline-none text-sm"
                    />
                    <Button onClick={() => handleSendMessage()} className="p-2.5 h-full" aria-label={language === 'ar' ? 'إرسال' : 'Send'}>
                        <Send size={18} />
                    </Button>
                </div>
                 <button className="text-xs text-medical-accent hover:underline mt-2 w-full text-center" onClick={() => alert(language === 'ar' ? 'جاري توصيلك بوكيل مباشر...' : 'Connecting to live agent...')}>
                    {language === 'ar' ? 'التحدث مع وكيل مباشر' : 'Talk to a Live Agent'}
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
