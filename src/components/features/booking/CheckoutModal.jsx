import React, { useState } from 'react';

export const CheckoutModal = ({ isOpen, onClose, selectedMovie, selectedSeats = [] }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold uppercase tracking-wider">გადახდა</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">✕</button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-600/20 border border-green-500 text-green-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-lg font-bold">ბილეთი წარმატებით გამოიწერა!</h3>
            <p className="text-xs text-gray-400">დეტალები გაიგზავნა შენს ელ-ფოსტაზე.</p>
            <button 
              onClick={onClose}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition text-sm"
            >
              დახურვა
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-xs">
              <p className="text-gray-400">ფილმი: <span className="text-white font-bold">{selectedMovie?.title || 'კინოჩვენება'}</span></p>
              <p className="text-gray-400">ადგილები: <span className="text-white font-bold">{selectedSeats.join(', ') || 'არ არის არჩეული'}</span></p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300 uppercase">ბარათის ნომერი</label>
              <input 
                required 
                placeholder="4000 0000 0000 0000" 
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-600 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-300 uppercase">მოქმედების ვადა</label>
                <input required placeholder="MM/YY" className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-600 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-300 uppercase">CVV</label>
                <input required type="password" placeholder="123" maxLength="3" className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-600 text-sm" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-lg shadow-red-600/30 text-sm mt-2"
            >
              {loading ? 'მუშავდება...' : 'გადახდა'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};