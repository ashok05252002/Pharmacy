import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MapPin, CreditCard, CheckCircle } from 'lucide-react';

const CheckoutStepper = ({ currentStep }) => {
  const { language } = useLanguage();

  const steps = [
    { id: 'address', name: language === 'ar' ? 'العنوان' : 'Address', icon: MapPin },
    { id: 'payment', name: language === 'ar' ? 'الدفع' : 'Payment', icon: CreditCard },
    { id: 'confirm', name: language === 'ar' ? 'التأكيد' : 'Confirmation', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative flex-1 ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20 rtl:pl-8 rtl:sm:pl-20 rtl:pr-0' : ''}`}>
            {stepIdx <= currentStepIndex ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className={`h-0.5 w-full ${stepIdx < currentStepIndex ? 'bg-medical-primary' : 'bg-gray-200'}`} />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-medical-primary hover:bg-medical-dark"
                >
                  <step.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <p className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium text-medical-primary">{step.name}</p>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                >
                  <step.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                 <p className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-500">{step.name}</p>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutStepper;
