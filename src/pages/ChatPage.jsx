import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MessageSquare, Send } from 'lucide-react';
import Button from '../components/Button';

const ChatPage = () => {
  const { language } = useLanguage();

  // This is a stub page. A real chat would involve more complex state management, WebSocket, etc.
  const mockMessages = [
    { id: 1, sender: 'support', text: language === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك اليوم؟' : 'Hello! How can I help you today?', textAr: 'مرحباً! كيف يمكنني مساعدتك اليوم؟' },
    { id: 2, sender: 'user', text: language === 'ar' ? 'لدي سؤال بخصوص طلبي الأخير.' : 'I have a question about my recent order.', textAr: 'لدي سؤال بخصوص طلبي الأخير.' },
    { id: 3, sender: 'support', text: language === 'ar' ? 'بالتأكيد، ما هو رقم طلبك؟' : 'Sure, what is your order number?', textAr: 'بالتأكيد، ما هو رقم طلبك؟' },
  ];

  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    // Add message to a list, send to backend, etc.
    console.log("New message:", newMessage);
    alert(language === 'ar' ? `تم إرسال الرسالة: ${newMessage}` : `Message sent: ${newMessage}`);
    setNewMessage('');
  };

  return (
    <div className="container mx-auto py-8 flex flex-col h-[calc(100vh-10rem)] sm:h-[calc(100vh-12rem)]"> {/* Adjust height based on header/footer */}
      <div className="flex items-center mb-6">
        <MessageSquare size={32} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {language === 'ar' ? 'دعم الدردشة' : 'Chat Support'}
        </h1>
      </div>

      <div className="flex-grow bg-white shadow-lg rounded-xl p-4 sm:p-6 overflow-y-auto mb-4 space-y-4">
        {mockMessages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? (language === 'ar' ? 'justify-start' : 'justify-end') : (language === 'ar' ? 'justify-end' : 'justify-start')}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${
              msg.sender === 'user' 
                ? 'bg-medical-primary text-white rounded-br-none rtl:rounded-bl-none rtl:rounded-br-lg' 
                : 'bg-gray-200 text-gray-800 rounded-bl-none rtl:rounded-br-none rtl:rounded-bl-lg'
            }`}>
              <p className="text-sm">{language === 'ar' ? msg.textAr : msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-top">
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent outline-none text-sm"
        />
        <Button type="submit" icon={<Send size={18} />} className="h-full px-4 sm:px-6">
          {language === 'ar' ? 'إرسال' : 'Send'}
        </Button>
      </form>
    </div>
  );
};

export default ChatPage;
