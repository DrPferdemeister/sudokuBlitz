import React, { useState, useEffect, useCallback } from 'react';
import Cell from './components/Cell';
import Controls from './components/Controls';
import Numpad from './components/Numpad';
import {
  Board,
  Difficulty,
  generateBoard,
  validateMove,
  solve,
  isBoardComplete,
  createEmptyBoard,
} from './utils/sudoku';
import { Trophy } from 'lucide-react';

function App() {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [initialBoard, setInitialBoard] = useState<Board>(createEmptyBoard());
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const startNewGame = useCallback((diff: Difficulty) => {
    const newBoard = generateBoard(diff);
    setBoard(newBoard);
    setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
    setDifficulty(diff);
    setSelectedCell(null);
    setTime(0);
    setIsPaused(false);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    startNewGame('easy');
  }, [startNewGame]);

  useEffect(() => {
    let interval: number;
    if (!isPaused && !isComplete) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, isComplete]);

  const handleCellClick = (row: number, col: number) => {
    if (!isPaused && initialBoard[row][col] === null) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberSelect = (num: number | null) => {
    if (selectedCell && !isPaused) {
      const [row, col] = selectedCell;
      const newBoard = [...board];
      newBoard[row][col] = num;
      setBoard(newBoard);

      if (isBoardComplete(newBoard)) {
        setIsComplete(true);
        setIsPaused(true);
      }
    }
  };

  const handleSolve = () => {
    const solution = solve(initialBoard);
    if (solution) {
      setBoard(solution);
      setIsComplete(true);
      setIsPaused(true);
    }
  };

  const handleReset = () => {
    setBoard(JSON.parse(JSON.stringify(initialBoard)));
    setSelectedCell(null);
    setTime(0);
    setIsPaused(false);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Sudoku Challenge
        </h1>

        <Controls
          onNewGame={startNewGame}
          onSolve={handleSolve}
          onReset={handleReset}
          difficulty={difficulty}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused(!isPaused)}
          time={time}
        />

        {isComplete && (
          <div className="text-center mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl 
                         shadow-lg transform transition-all duration-500 scale-100 animate-fade-in
                         flex items-center justify-center space-x-3">
            <Trophy className="text-emerald-600 h-6 w-6" />
            <span className="text-emerald-700 font-semibold text-lg">
              Congratulations! You've mastered this puzzle!
            </span>
          </div>
        )}

        <div className={`relative ${isPaused && !isComplete ? 'filter blur-sm' : ''}`}>
          <div className="grid grid-cols-9 gap-px bg-indigo-100 border-2 border-indigo-300 rounded-xl overflow-hidden shadow-xl">
            {board.map((row, i) =>
              row.map((cell, j) => (
                <Cell
                  key={`${i}-${j}`}
                  value={cell}
                  isInitial={initialBoard[i][j] !== null}
                  isSelected={selectedCell?.[0] === i && selectedCell?.[1] === j}
                  isValid={!cell || validateMove(board, i, j, cell)}
                  onClick={() => handleCellClick(i, j)}
                  position={[i, j]}
                />
              ))
            )}
          </div>
        </div>

        <Numpad onNumberSelect={handleNumberSelect} />
      </div>
    </div>
  );
}

export default App;