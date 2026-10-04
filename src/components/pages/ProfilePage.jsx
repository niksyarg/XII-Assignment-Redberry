import React, { useState, useEffect } from 'react';

export const ProfilePage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* პროფილის სათაური */}
        <div className="flex items-center space-x-4 bg-[#121212] border border-white/10 p-6 rounded-2xl">
          <div className="w-16 h-16 bg-red-600/20 border border-red-600 rounded-full flex items-center justify-center text-red-500 text-2xl font-bold">
            👤
          </div>
          <div>
            <h1 className="text-xl font-bold">მომხმარებლის პროფილი</h1>
            <p className="text-xs text-gray-400">მოგესალმები შენს პირად სივრცეში</p>
          </div>
        </div>

   
        <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold border-b border-white/10 pb-3">ჩემი ბილეთები</h2>
          {orders.length === 0 ? (
            <p className="text-xs text-gray-500 py-4">შენ ჯერ არ გაქვს შეძენილი ბილეთები.</p>
          ) : (
            <div className="space-y-3">
              {orders.map((order, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-sm text-white">{order.movieTitle}</p>
                    <p className="text-gray-400">ადგილები: {order.seats.join(', ')}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-600/20 text-green-400 border border-green-500/30 rounded-full font-semibold">
                    აქტიური
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};