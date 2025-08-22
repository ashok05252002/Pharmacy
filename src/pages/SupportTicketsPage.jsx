import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockSupportTickets, TICKET_STATUSES } from '../data/mockData';
import { LifeBuoy, PlusCircle, MessageSquare, Paperclip, Send, Filter, ChevronDown } from 'lucide-react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { motion, AnimatePresence } from 'framer-motion';

const SupportTicketsPage = () => {
  const { language } = useLanguage();
  const [tickets, setTickets] = useState(mockSupportTickets);
  const [showCreateTicketForm, setShowCreateTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', category: 'Order Issue', description: '', files: [] });
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedTicketId, setExpandedTicketId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewTicket(prev => ({ ...prev, files: [...prev.files, ...Array.from(e.target.files)] }));
  };
  
  const removeFile = (fileName) => {
    setNewTicket(prev => ({ ...prev, files: prev.files.filter(f => f.name !== fileName) }));
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const createdTicket = {
      id: `TKT-${Date.now().toString().slice(-6)}`,
      subject: newTicket.subject,
      subjectAr: newTicket.subject, // Assuming same for mock
      status: TICKET_STATUSES.OPEN,
      lastUpdated: new Date().toISOString(),
      messages: [{ sender: 'user', text: newTicket.description, timestamp: new Date().toISOString() }],
      category: newTicket.category,
      files: newTicket.files.map(f => f.name) // Store file names for mock
    };
    setTickets(prev => [createdTicket, ...prev]);
    setShowCreateTicketForm(false);
    setNewTicket({ subject: '', category: 'Order Issue', description: '', files: [] });
    alert(language === 'ar' ? 'تم إنشاء التذكرة بنجاح!' : 'Ticket created successfully!');
  };

  const filteredTickets = tickets.filter(ticket => 
    filterStatus === 'all' || ticket.status.en.toLowerCase().replace(' ', '_') === filterStatus // Using English key for filtering
  );
  
  const ticketCategories = ['Order Issue', 'Payment Query', 'Product Question', 'Technical Support', 'Other'];

  return (
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <LifeBuoy size={32} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {language === 'ar' ? 'تذاكر الدعم' : 'Support Tickets'}
            </h1>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={() => setShowCreateTicketForm(true)} icon={<PlusCircle size={18}/>} className="flex-1 sm:flex-none">
              {language === 'ar' ? 'إنشاء تذكرة جديدة' : 'Create New Ticket'}
            </Button>
            <div className="relative flex-1 sm:flex-none">
                <Filter size={16} className={`absolute top-1/2 transform -translate-y-1/2 ${language === 'ar' ? 'right-3' : 'left-3'} text-gray-400 pointer-events-none`}/>
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`w-full text-sm border-gray-300 rounded-md p-2.5 focus:ring-medical-primary focus:border-medical-primary bg-white shadow-sm appearance-none ${language === 'ar' ? 'pr-10' : 'pl-10'}`}
                >
                    <option value="all">{language === 'ar' ? 'كل الحالات' : 'All Statuses'}</option>
                    {Object.entries(TICKET_STATUSES).map(([key, val]) => (
                        <option key={key} value={key.toLowerCase().replace(' ', '_')}>{language === 'ar' ? val.ar : val.en}</option>
                    ))}
                </select>
            </div>
          </div>
        </div>

        {/* Create Ticket Form Modal/Section */}
        <AnimatePresence>
        {showCreateTicketForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-6 rounded-xl shadow-xl mb-8 overflow-hidden"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">{language === 'ar' ? 'إنشاء تذكرة جديدة' : 'Create New Ticket'}</h2>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <InputField id="subject" name="subject" label={language === 'ar' ? 'الموضوع' : 'Subject'} value={newTicket.subject} onChange={handleInputChange} language={language} required />
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">{language === 'ar' ? 'الفئة' : 'Category'}</label>
                <select id="category" name="category" value={newTicket.category} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-medical-primary focus:border-medical-primary text-sm">
                  {ticketCategories.map(cat => <option key={cat} value={cat}>{language === 'ar' ? (cat === 'Order Issue' ? 'مشكلة في الطلب' : cat === 'Payment Query' ? 'استفسار دفع' : cat === 'Product Question' ? 'سؤال عن منتج' : cat === 'Technical Support' ? 'دعم فني' : 'أخرى') : cat}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">{language === 'ar' ? 'الوصف' : 'Description'}</label>
                <textarea id="description" name="description" rows="4" value={newTicket.description} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-medical-primary focus:border-medical-primary text-sm" required></textarea>
              </div>
              <div>
                <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-1">{language === 'ar' ? 'إرفاق ملفات (اختياري)' : 'Attach Files (Optional)'}</label>
                <input type="file" id="files" multiple onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-medical-primary/10 file:text-medical-primary hover:file:bg-medical-primary/20"/>
                {newTicket.files.length > 0 && (
                    <div className="mt-2 space-y-1 text-xs">
                        {newTicket.files.map(f => <div key={f.name} className="flex items-center justify-between p-1 bg-gray-100 rounded"><span>{f.name}</span><button type="button" onClick={() => removeFile(f.name)} className="text-red-500">&times;</button></div>)}
                    </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button type="submit" icon={<Send size={18}/>}>{language === 'ar' ? 'إرسال التذكرة' : 'Submit Ticket'}</Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateTicketForm(false)}>{language === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
              </div>
            </form>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Tickets List */}
        {filteredTickets.length > 0 ? (
          <div className="space-y-4">
            {filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <button 
                    className="w-full p-4 sm:p-5 text-left rtl:text-right flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedTicketId(expandedTicketId === ticket.id ? null : ticket.id)}
                >
                    <div>
                        <div className="flex items-center mb-1">
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full mr-2 rtl:ml-2 ${ticket.status.bgColor} ${ticket.status.color}`}>
                            {language === 'ar' ? ticket.status.ar : ticket.status.en}
                            </span>
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{language === 'ar' ? ticket.subjectAr : ticket.subject}</h3>
                        </div>
                        <p className="text-xs text-gray-500">
                            {ticket.id} &bull; {language === 'ar' ? 'آخر تحديث:' : 'Last updated:'} {new Date(ticket.lastUpdated).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {day:'numeric', month:'short', year:'numeric'})}
                        </p>
                    </div>
                    <ChevronDown size={20} className={`text-gray-400 transition-transform ${expandedTicketId === ticket.id ? 'rotate-180' : ''}`}/>
                </button>
                <AnimatePresence>
                {expandedTicketId === ticket.id && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t"
                    >
                        <div className="p-4 sm:p-5 space-y-3">
                            <p className="text-xs text-gray-600"><strong>{language === 'ar' ? 'الفئة:' : 'Category:'}</strong> {ticket.category}</p>
                            {/* Mock messages display */}
                            <div className="max-h-40 overflow-y-auto custom-scrollbar space-y-2 bg-gray-50 p-3 rounded-md">
                                {ticket.messages.map((msg, msgIdx) => (
                                    <div key={msgIdx} className={`text-xs p-1.5 rounded-md ${msg.sender === 'user' ? 'bg-blue-100 text-blue-800 text-right rtl:text-left' : 'bg-green-100 text-green-800'}`}>
                                        {msg.text.substring(0,100)}{msg.text.length > 100 && '...'}
                                    </div>
                                ))}
                            </div>
                            {ticket.files && ticket.files.length > 0 && (
                                <div>
                                    <p className="text-xs font-medium text-gray-600 mb-1">{language === 'ar' ? 'الملفات المرفقة:' : 'Attachments:'}</p>
                                    <div className="flex flex-wrap gap-1">
                                    {ticket.files.map(file => (
                                        <span key={file} className="text-xs bg-gray-200 px-1.5 py-0.5 rounded">{file}</span>
                                    ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-2 pt-2">
                                <Button size="sm" variant="outline" icon={<MessageSquare size={14}/>}>{language === 'ar' ? 'إضافة رد' : 'Add Reply'}</Button>
                                {ticket.status.en !== 'Resolved' && ticket.status.en !== 'Closed' &&
                                    <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => alert('Escalate action')}>
                                        {language === 'ar' ? 'تصعيد التذكرة' : 'Escalate Ticket'}
                                    </Button>
                                }
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <LifeBuoy size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {language === 'ar' ? 'لا توجد تذاكر دعم' : 'No Support Tickets Found'}
            </h3>
            <p className="text-gray-500">
              {filterStatus === 'all' ? (language === 'ar' ? 'ليس لديك أي تذاكر دعم حاليًا.' : 'You currently have no support tickets.') : (language === 'ar' ? 'لا توجد تذاكر تطابق الفلتر الحالي.' : 'No tickets match the current filter.')}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SupportTicketsPage;
