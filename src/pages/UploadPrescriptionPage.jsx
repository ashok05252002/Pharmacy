import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Image as ImageIcon, FileSymlink, Camera, X, Trash2, Edit2 } from 'lucide-react';
import Button from '../components/Button';
import { motion } from 'framer-motion';

const UploadPrescriptionPage = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { productId, productName } = location.state || {};

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [notes, setNotes] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'pending', 'approved', 'rejected'
  const [rejectionReason, setRejectionReason] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    processFiles(selectedFiles);
  };
  
  const processFiles = (newFiles) => {
    if (newFiles.length + files.length > 3) {
      setErrorMsg(language === 'ar' ? 'يمكنك تحميل 3 ملفات كحد أقصى.' : 'You can upload a maximum of 3 files.');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const validNewFiles = [];
    const newPreviews = [];

    for (const file of newFiles) {
      if (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrorMsg(language === 'ar' ? `ملف '${file.name}' غير صالح أو كبير جداً.` : `File '${file.name}' is invalid or too large.`);
        continue; // Skip this file
      }
      validNewFiles.push(file);
      if (file.type.startsWith('image/')) {
        newPreviews.push({ name: file.name, url: URL.createObjectURL(file), type: file.type });
      } else if (file.type === 'application/pdf') {
        newPreviews.push({ name: file.name, url: null, type: file.type }); // No direct preview for PDF, just icon
      }
    }

    setFiles(prevFiles => [...prevFiles, ...validNewFiles]);
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    if (validNewFiles.length > 0) setErrorMsg(''); // Clear error if at least one file was valid
  };


  const handleRemoveFile = (fileName) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    setPreviews(prevPreviews => prevPreviews.filter(preview => preview.name !== fileName));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (files.length === 0) {
      setErrorMsg(language === 'ar' ? 'الرجاء تحديد ملف واحد على الأقل.' : 'Please select at least one file.');
      return;
    }
    // Simulate submission and status update
    setSubmissionStatus('pending');
    setErrorMsg('');
    console.log("Prescription submitted:", { files, notes, productId });

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    const randomStatus = Math.random();
    if (randomStatus < 0.6) { // 60% chance of approval
        setSubmissionStatus('approved');
        setTimeout(() => navigate(productId ? `/product/${productId}` : '/orders'), 2000);
    } else if (randomStatus < 0.9) { // 30% chance of rejection
        setSubmissionStatus('rejected');
        setRejectionReason(language === 'ar' ? 'الصورة غير واضحة، يرجى إعادة الرفع.' : 'Image unclear, please re-upload.');
    } else { // 10% chance of pending (for demo)
        setSubmissionStatus('pending'); // Stays pending
    }
  };

  const handleResubmit = () => {
    setFiles([]);
    setPreviews([]);
    setNotes('');
    setSubmissionStatus(null);
    setRejectionReason('');
    setErrorMsg('');
  };
  
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <ImageIcon size={20} className="text-medical-primary"/>;
    if (fileType === 'application/pdf') return <FileSymlink size={20} className="text-red-500"/>;
    return <FileText size={20} className="text-gray-500"/>;
  };

  if (submissionStatus === 'approved') {
    return (
      <div className="container mx-auto py-8 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">
            {language === 'ar' ? 'تم إرسال الوصفة بنجاح!' : 'Prescription Submitted Successfully!'}
          </h1>
          <p className="text-gray-500 mb-6">
            {language === 'ar' ? 'يقوم فريقنا بمراجعتها الآن. سيتم إعلامك بالتحديثات.' : 'Our team is reviewing it. You will be notified of updates.'}
          </p>
        </motion.div>
      </div>
    );
  }

  if (submissionStatus === 'rejected') {
    return (
      <div className="container mx-auto py-8 text-center">
         <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <AlertCircle size={64} className="mx-auto text-red-500 mb-6" />
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
                {language === 'ar' ? 'تم رفض الوصفة' : 'Prescription Rejected'}
            </h1>
            <p className="text-gray-600 mb-1">{language === 'ar' ? 'السبب:' : 'Reason:'} {rejectionReason}</p>
            <p className="text-gray-500 mb-6">
                {language === 'ar' ? 'يرجى مراجعة السبب وإعادة إرسال وصفة صالحة.' : 'Please review the reason and resubmit a valid prescription.'}
            </p>
            <Button onClick={handleResubmit} icon={<UploadCloud size={18}/>}>
                {language === 'ar' ? 'إعادة إرسال الوصفة' : 'Resubmit Prescription'}
            </Button>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="container mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y:0 }}
        transition={{ duration:0.5 }}
        className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl"
      >
        <div className="flex items-center mb-6">
          <UploadCloud size={32} className="text-medical-primary mr-3 rtl:ml-3 rtl:mr-0" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {language === 'ar' ? 'تحميل الوصفة الطبية' : 'Upload Prescription'}
          </h1>
        </div>

        {productName && (
          <p className="text-sm text-gray-600 mb-4">
            {language === 'ar' ? 'أنت تقوم بتحميل وصفة لـ: ' : 'You are uploading a prescription for: '} 
            <strong className="text-medical-dark">{productName}</strong>.
          </p>
        )}
        
        {submissionStatus === 'pending' && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-300 rounded-md text-sm text-blue-700">
                {language === 'ar' ? 'حالة الوصفة: قيد المراجعة. سيتم إعلامك قريباً.' : 'Prescription Status: Pending Review. You will be notified soon.'}
            </div>
        )}


        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Input Area */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">{language === 'ar' ? 'ملفات الوصفة الطبية' : 'Prescription Files'}</label>
            <div 
              className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              onDrop={(e) => { e.preventDefault(); processFiles(Array.from(e.dataTransfer.files)); }}
              onDragOver={(e) => e.preventDefault()}
            >
              <UploadCloud size={36} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold">{language === 'ar' ? 'انقر أو اسحب وأفلت الملفات هنا' : 'Click or drag & drop files here'}</span>
              </p>
              <p className="text-xs text-gray-500">{language === 'ar' ? 'PNG, JPG أو PDF (الحد الأقصى 5 ميجابايت، 3 ملفات)' : 'PNG, JPG or PDF (MAX 5MB, 3 files)'}</p>
            </div>
            <input ref={fileInputRef} id="prescriptionUpload" type="file" className="hidden" onChange={handleFileChange} multiple accept=".png,.jpg,.jpeg,.pdf"/>
            
            <div className="flex gap-2 mt-2">
                <Button type="button" variant="outline" size="sm" icon={<Camera size={16}/>} onClick={() => alert(language === 'ar' ? 'ميزة الكاميرا قيد التطوير' : 'Camera feature under development')}>
                    {language === 'ar' ? 'استخدام الكاميرا' : 'Use Camera'}
                </Button>
                <Button type="button" variant="outline" size="sm" icon={<ImageIcon size={16}/>} onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                    {language === 'ar' ? 'من المعرض' : 'From Gallery'}
                </Button>
            </div>
          </div>
          
          {errorMsg && (
            <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
              {errorMsg}
            </div>
          )}

          {/* File Previews */}
          {previews.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">{language === 'ar' ? 'الملفات المرفوعة:' : 'Uploaded Files:'}</h3>
              {previews.map(preview => (
                <div key={preview.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border text-sm shadow-sm">
                  <div className="flex items-center gap-3 truncate">
                    {preview.url && preview.type.startsWith('image/') ? (
                      <img src={preview.url} alt={preview.name} className="w-12 h-12 object-cover rounded-md"/>
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md">
                        {getFileIcon(preview.type)}
                      </div>
                    )}
                    <span className="truncate text-gray-700" title={preview.name}>{preview.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(preview.name)} className="text-red-500 hover:text-red-700 p-1" aria-label={language === 'ar' ? 'إزالة الملف' : 'Remove file'}>
                    <Trash2 size={16}/>
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Notes Field */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? 'ملاحظات إضافية للصيدلي (اختياري)' : 'Additional Notes for Pharmacist (Optional)'}
            </label>
            <textarea
              id="notes"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل أي تعليمات خاصة أو معلومات هنا...' : 'Enter any special instructions or information here...'}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-medical-primary focus:border-medical-primary text-sm"
            ></textarea>
          </div>
          
          <Button 
            type="submit" 
            className="w-full py-3 text-base"
            disabled={files.length === 0 || submissionStatus === 'pending'}
            icon={submissionStatus === 'pending' ? <UploadCloud size={20} className="animate-pulse" /> : <CheckCircle size={20}/>}
          >
            {submissionStatus === 'pending' 
              ? (language === 'ar' ? 'قيد المراجعة...' : 'Submitting & Reviewing...')
              : (language === 'ar' ? 'تأكيد وإرسال الوصفة' : 'Confirm & Submit Prescription')}
          </Button>
        </form>

        <div className="mt-8 text-xs text-gray-500 text-center">
          <p>{language === 'ar' ? 'سيتم مراجعة وصفتك من قبل فريقنا. قد نتصل بك إذا كانت هناك حاجة لمزيد من المعلومات.' : 'Your prescription will be reviewed by our team. We may contact you if further information is needed.'}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadPrescriptionPage;
