import React, { useEffect } from 'react';

export const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-green-600/90 border-green-500',
    error: 'bg-red-600/90 border-red-500',
    info: 'bg-blue-600/90 border-blue-500'
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl border text-white shadow-2xl backdrop-blur-md text-sm font-medium flex items-center space-x-3 animate-slideUp ${bgColors[type] || bgColors.success}`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-white/80 hover:text-white">✕</button>
      )}
    </div>
  );
};