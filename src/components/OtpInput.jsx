import React, { useState, useRef, useEffect } from 'react';

const OtpInput = ({ length, onChange, language }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
    // Auto-focus the first input on mount if it's empty
    if (inputRefs.current[0] && otp.every(val => val === "")) {
        inputRefs.current[0].focus();
    }
  }, [length, otp]); // Re-run if length changes or otp is reset

  const handleChange = (element, index) => {
    const value = element.value;
    // Allow only single digit numbers
    if (!/^[0-9]$/.test(value) && value !== "") return false; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if current is filled and not the last input
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default backspace behavior (like navigating back)
      const newOtp = [...otp];
      if (otp[index] !== "") { // If current input has a value, clear it
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) { // If current is empty and not the first input, clear previous and focus it
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length).replace(/[^0-9]/g, '');
    if (pastedData) {
        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            if (i < length) {
                newOtp[i] = pastedData[i];
            }
        }
        setOtp(newOtp);
        const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
        if (inputRefs.current[lastFilledIndex]) {
            inputRefs.current[lastFilledIndex].focus();
        }
    }
  };

  useEffect(() => {
    onChange(otp.join(""));
  }, [otp, onChange]);

  return (
    <div className={`flex justify-center space-x-2 ${language === 'ar' ? 'space-x-reverse flex-row-reverse' : ''}`}>
      {otp.map((data, index) => {
        return (
          <input
            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-primary focus:border-transparent outline-none transition-colors"
            type="tel" // Use tel for numeric keyboard on mobile
            inputMode="numeric" // Hint for numeric keyboard
            autoComplete="one-time-code" // For OTP autofill
            name="otp"
            maxLength="1"
            key={index}
            value={data}
            onChange={e => handleChange(e.target, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onFocus={e => e.target.select()}
            onPaste={index === 0 ? handlePaste : undefined} // Only allow paste on the first input
            ref={el => inputRefs.current[index] = el}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
