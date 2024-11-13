// Sudoku generator and solver utilities
export type Board = (number | null)[][];
export type Difficulty = 'easy' | 'medium' | 'hard';

const isValid = (board: Board, row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
};

const solveSudoku = (board: Board): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const generateSolvedBoard = (): Board => {
  const board: Board = Array(9).fill(null).map(() => Array(9).fill(null));
  solveSudoku(board);
  return board;
};

const removeCells = (board: Board, difficulty: Difficulty): void => {
  const cellsToRemove = {
    easy: 35,
    medium: 45,
    hard: 55
  }[difficulty];

  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== null) {
      board[row][col] = null;
      removed++;
    }
  }
};

export const generateBoard = (difficulty: Difficulty): Board => {
  const board = generateSolvedBoard();
  const puzzle = JSON.parse(JSON.stringify(board)) as Board;
  removeCells(puzzle, difficulty);
  return puzzle;
};

export const solve = (board: Board): Board | null => {
  const solution = JSON.parse(JSON.stringify(board)) as Board;
  return solveSudoku(solution) ? solution : null;
};

export const validateMove = (board: Board, row: number, col: number, value: number): boolean => {
  const tempBoard = JSON.parse(JSON.stringify(board)) as Board;
  tempBoard[row][col] = null;
  return isValid(tempBoard, row, col, value);
};

export const isBoardComplete = (board: Board): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

export const createEmptyBoard = (): Board => {
  return Array(9).fill(null).map(() => Array(9).fill(null));
};