import React from 'react';

interface NumpadProps {
  onNumberSelect: (num: number | null) => void;
}

const Numpad: React.FC<NumpadProps> = ({ onNumberSelect }) => {
  return (
    <div className="grid grid-cols-5 gap-3 w-full max-w-md mx-auto mt-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, null].map((num, index) => (
        <button
          key={index}
          onClick={() => onNumberSelect(num)}
          className={`
            aspect-square rounded-xl shadow-sm 
            font-semibold text-xl transition-all duration-200
            flex items-center justify-center
            ${num === null 
              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
              : 'bg-white text-indigo-600 hover:bg-indigo-50'}
            hover:scale-105 active:scale-95
          `}
        >
          {num === null ? '⌫' : num}
        </button>
      ))}
    </div>
  );
};

export default Numpad;