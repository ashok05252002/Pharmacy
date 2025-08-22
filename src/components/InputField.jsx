import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ id, label, type, placeholder, icon, value, onChange, error, language, showPasswordToggle, required = false }) => {
  const fieldId = `${id}-${language}`; 
  return (
    <div className="mb-4">
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className={`absolute inset-y-0 ${language === 'ar' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
            {icon}
          </div>
        )}
        <input
          type={type}
          id={fieldId}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`block w-full px-3 py-2.5 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md 
            focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-medical-primary'} focus:border-transparent 
            transition-colors duration-150 ease-in-out
            ${icon ? (language === 'ar' ? 'pr-10' : 'pl-10') : ''}
            ${showPasswordToggle ? (language === 'ar' ? 'pl-10' : 'pr-10') : ''}
          `}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => showPasswordToggle.setShowPassword(!showPasswordToggle.showPassword)}
            className={`absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-medical-gray hover:text-medical-dark`}
            aria-label={showPasswordToggle.showPassword ? (language === 'ar' ? 'إخفاء كلمة المرور' : 'Hide password') : (language === 'ar' ? 'إظهار كلمة المرور' : 'Show password')}
          >
            {showPasswordToggle.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
