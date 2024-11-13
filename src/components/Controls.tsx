import React from 'react';
import { Difficulty } from '../utils/sudoku';
import { Play, Pause, RotateCcw, Lightbulb } from 'lucide-react';

interface ControlsProps {
  onNewGame: (difficulty: Difficulty) => void;
  onSolve: () => void;
  onReset: () => void;
  difficulty: Difficulty;
  isPaused: boolean;
  onTogglePause: () => void;
  time: number;
}

const Controls: React.FC<ControlsProps> = ({
  onNewGame,
  onSolve,
  onReset,
  difficulty,
  isPaused,
  onTogglePause,
  time,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mb-6 backdrop-blur-sm bg-white/90">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onTogglePause}
            className="p-2.5 rounded-lg hover:bg-indigo-50 text-indigo-600
                     transition-all duration-200 hover:scale-105"
          >
            {isPaused ? <Play size={22} /> : <Pause size={22} />}
          </button>
          <span className="text-2xl font-mono text-indigo-600 font-semibold">
            {formatTime(time)}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={difficulty}
            onChange={(e) => onNewGame(e.target.value as Difficulty)}
            className="px-4 py-2 rounded-lg border border-indigo-200 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     text-indigo-600 font-medium
                     transition-all duration-200"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={onReset}
            className="p-2.5 rounded-lg hover:bg-indigo-50 text-indigo-600
                     transition-all duration-200 hover:scale-105"
            title="Reset"
          >
            <RotateCcw size={22} />
          </button>
          <button
            onClick={onSolve}
            className="p-2.5 rounded-lg hover:bg-indigo-50 text-indigo-600
                     transition-all duration-200 hover:scale-105"
            title="Solve"
          >
            <Lightbulb size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;