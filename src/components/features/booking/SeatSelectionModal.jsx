import React, { useState } from 'react';

export const SeatSelectionModal = ({ isOpen, onClose, session, onSelectSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!isOpen) return null;

  
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider">აირჩიე ადგილი</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">✕</button>
        </div>

     
        <div className="w-full h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs text-gray-400 mb-8 tracking-widest uppercase">
          ეკრანი (SCREEN)
        </div>

       
        <div className="space-y-3 mb-8 flex flex-col items-center">
          {rows.map(row => (
            <div key={row} className="flex items-center space-x-2">
              <span className="w-6 text-xs text-gray-500 font-bold">{row}</span>
              <div className="flex space-x-2">
                {cols.map(col => {
                  const seatId = `${row}${col}`;
                  const isSelected = selectedSeats.includes(seatId);
                  return (
                    <button
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                        isSelected 
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/40' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {col}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <span className="text-xs text-gray-400">არჩეულია: </span>
            <span className="font-bold text-white">{selectedSeats.length} ადგილი</span>
          </div>
          <button 
            disabled={selectedSeats.length === 0}
            onClick={() => {
              onSelectSeats(selectedSeats);
              onClose();
            }}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl transition text-sm"
          >
            გაგრძელება
          </button>
        </div>
      </div>
    </div>
  );
};