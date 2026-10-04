import React, { useState } from 'react';

export const SessionsPage = () => {
  const [selectedDate, setSelectedDate] = useState('დღეს');

  const dates = ['დღეს', 'ხვალ', '6 ოქტომბერი', '7 ოქტომბერი', '8 ოქტომბერი'];
  
  const sessions = [
    { id: 1, movie: 'ინტარსტელარი', time: '14:00', hall: 'დარბაზი 1', price: '15₾' },
    { id: 2, movie: 'ოპენჰაიმერი', time: '17:30', hall: 'VIP დარბაზი', price: '25₾' },
    { id: 3, movie: 'ბეტმენი', time: '21:00', hall: 'დარბაზი 2', price: '18₾' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold uppercase tracking-wider">სესიების განრიგი</h1>

        {/* თარიღების ფილტრი */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedDate === date 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                  : 'bg-[#121212] border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {date}
            </button>
          ))}
        </div>

   
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="bg-[#121212] border border-white/10 p-5 rounded-2xl flex items-center justify-between transition hover:border-white/20">
              <div className="space-y-1">
                <span className="text-xs text-red-500 font-bold tracking-wider">{session.hall}</span>
                <h3 className="text-base font-bold text-white">{session.movie}</h3>
                <p className="text-xs text-gray-400">სეანსი: <span className="text-white">{session.time}</span></p>
              </div>
              <div className="text-right space-y-2">
                <span className="block text-sm font-bold text-white">{session.price}</span>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-red-600/20">
                  არჩევა
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};