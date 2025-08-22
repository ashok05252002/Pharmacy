import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  onClick, 
  icon, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false, 
  type = 'button', 
  as = 'button', // 'button', 'a', or 'link'
  to = null,     // Path for 'link' or href for 'a'
  ...props 
}) => {
  const baseStyles = "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-150 ease-in-out flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-medical-primary text-white hover:bg-medical-dark focus:ring-medical-primary';
      break;
    case 'secondary':
      variantStyles = 'bg-medical-secondary text-white hover:bg-sky-600 focus:ring-medical-secondary';
      break;
    case 'outline':
      variantStyles = 'border border-medical-primary text-medical-primary hover:bg-medical-primary/10 focus:ring-medical-primary';
      break;
    case 'ghost':
      variantStyles = 'text-medical-gray hover:bg-gray-100 hover:text-medical-dark focus:ring-medical-primary';
      break;
    default:
      variantStyles = 'bg-medical-primary text-white hover:bg-medical-dark focus:ring-medical-primary';
  }

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-xs';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3 text-base';
      break;
    case 'md':
    default:
      sizeStyles = 'px-4 py-2.5 text-sm';
      break;
  }

  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.03 },
    whileTap: { scale: disabled ? 1 : 0.98 }
  };

  const commonProps = {
    className: `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`,
    disabled,
    ...props // Spread any additional props like aria-label, etc.
  };

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (as === 'link' && to) {
    const MotionLink = motion(Link); // Create a motion-wrapped Link component
    return (
      <MotionLink
        to={to}
        onClick={onClick} // Pass onClick if provided, Link can have onClick
        {...commonProps}
        {...motionProps}
      >
        {content}
      </MotionLink>
    );
  }
  
  if (as === 'a') {
    return (
      <motion.a
        href={to || '#'} // Use 'to' prop as href for anchor tags
        onClick={onClick}
        {...commonProps}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  // Default to button
  return (
    <motion.button
      type={type}
      onClick={onClick}
      {...commonProps}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
};

export default Button;
