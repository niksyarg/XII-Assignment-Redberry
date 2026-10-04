import React from 'react';

export const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '' 
}) => {
  const baseStyles = "px-6 py-3 font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center";
  
  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white shadow-red-600/30",
    secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10",
    outline: "bg-transparent hover:bg-white/10 text-white border border-white/20"
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
};