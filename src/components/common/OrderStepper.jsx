import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Check } from 'lucide-react'; // Using Check for completed steps
import { motion } from 'framer-motion';

const OrderStepper = ({ steps, currentStatusKey, language }) => {
  // Example steps: [{ key: 'CONFIRMED', name: 'Confirmed', nameAr: 'تم التأكيد', icon: PackageCheck }, ...]
  // currentStatusKey should match one of the keys in ORDER_STATUSES from mockData

  const getStepState = (stepKey, currentKey, orderStatuses) => {
    const stepOrder = orderStatuses[stepKey]?.step || 0;
    const currentOrder = orderStatuses[currentKey]?.step || 0;

    if (stepOrder === 0) return 'neutral'; // For cancelled/rejected if they were part of steps
    if (stepOrder < currentOrder) return 'complete';
    if (stepOrder === currentOrder) return 'current';
    return 'upcoming';
  };

  return (
    <nav aria-label="Order Progress">
      <ol role="list" className="flex items-center justify-between">
        {steps.map((step, stepIdx) => {
          const state = getStepState(step.key, currentStatusKey, step.orderStatuses); // Pass orderStatuses
          const IconComponent = step.icon;

          return (
            <li key={step.name} className={`relative flex-1 ${stepIdx !== steps.length - 1 ? (language === 'ar' ? 'pl-4 sm:pl-6' : 'pr-4 sm:pr-6') : ''}`}>
              {stepIdx < steps.length - 1 && (
                <div className={`absolute inset-0 top-1/2 -translate-y-1/2 ${language === 'ar' ? 'right-0' : 'left-0'} flex items-center`} aria-hidden="true">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: state === 'complete' || state === 'current' ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: stepIdx * 0.2 }}
                    className={`h-0.5 w-full ${state === 'complete' || state === 'current' ? 'bg-medical-primary' : 'bg-gray-200'}`} 
                  />
                </div>
              )}
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: stepIdx * 0.15 }}
                className="relative flex flex-col items-center"
              >
                <div
                  className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full transition-colors duration-300
                    ${state === 'complete' ? 'bg-medical-primary' : ''}
                    ${state === 'current' ? 'bg-medical-primary ring-4 ring-medical-primary/30' : ''}
                    ${state === 'upcoming' ? 'border-2 border-gray-300 bg-white' : ''}
                    ${state === 'neutral' ? 'border-2 border-gray-300 bg-gray-100' : ''}
                  `}
                >
                  {state === 'complete' ? (
                    <Check className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                  ) : (
                    <IconComponent 
                      className={`h-5 w-5 sm:h-6 sm:w-6 
                        ${state === 'current' ? 'text-white' : ''}
                        ${state === 'upcoming' ? 'text-gray-400' : ''}
                        ${state === 'neutral' ? 'text-gray-500' : ''}
                      `} 
                      aria-hidden="true" 
                    />
                  )}
                </div>
                <p className={`mt-2 text-xs sm:text-sm font-medium text-center whitespace-nowrap
                  ${state === 'complete' || state === 'current' ? 'text-medical-primary' : 'text-gray-500'}
                `}>
                  {language === 'ar' ? step.nameAr : step.name}
                </p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default OrderStepper;
