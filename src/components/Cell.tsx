import React from 'react';

interface CellProps {
  value: number | null;
  isInitial: boolean;
  isSelected: boolean;
  isValid: boolean;
  onClick: () => void;
  position: [number, number];
}

const Cell: React.FC<CellProps> = ({ value, isInitial, isSelected, isValid, onClick, position }) => {
  const [row, col] = position;
  const isThickBorderRight = (col + 1) % 3 === 0 && col !== 8;
  const isThickBorderBottom = (row + 1) % 3 === 0 && row !== 8;

  return (
    <button
      onClick={onClick}
      className={`
        w-full aspect-square flex items-center justify-center
        text-lg font-semibold
        transition-all duration-200 ease-in-out
        relative
        ${isThickBorderRight ? 'border-r-2 border-r-indigo-300' : 'border-r border-r-indigo-200'}
        ${isThickBorderBottom ? 'border-b-2 border-b-indigo-300' : 'border-b border-b-indigo-200'}
        ${isInitial ? 'text-gray-800 font-bold' : 'text-indigo-600'}
        ${isSelected 
          ? 'bg-indigo-100 shadow-inner' 
          : 'hover:bg-indigo-50 bg-white'}
        ${!isValid && value ? 'text-red-500' : ''}
      `}
    >
      {value || ''}
    </button>
  );
};

export default Cell;