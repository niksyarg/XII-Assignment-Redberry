import React from 'react';

export const Input = ({ label, error, ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">{label}</label>}
      <input 
        className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition text-sm"
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};