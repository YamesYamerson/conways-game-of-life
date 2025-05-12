import type { Grid, Position } from '../types/game';

export const createEmptyGrid = (rows: number, cols: number): Grid => {
  return Array(rows).fill(null).map(() =>
    Array(cols).fill(null).map(() => ({ isAlive: false }))
  );
};

export const createRandomGrid = (rows: number, cols: number): Grid => {
  return Array(rows).fill(null).map(() =>
    Array(cols).fill(null).map(() => ({
      isAlive: Math.random() > 0.7
    }))
  );
};

export const getNeighbors = (grid: Grid, position: Position): number => {
  const { row, col } = position;
  let count = 0;
  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      
      const newRow = row + i;
      const newCol = col + j;
      
      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < (grid[newRow]?.length ?? 0) &&
        grid[newRow]?.[newCol]?.isAlive
      ) {
        count++;
      }
    }
  }
  
  return count;
};

export const getNextGeneration = (grid: Grid): Grid => {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const newGrid = createEmptyGrid(rows, cols);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const neighbors = getNeighbors(grid, { row, col });
      const cell = grid[row]?.[col];
      
      // Apply Conway's Game of Life rules
      if (cell && cell.isAlive && newGrid[row]?.[col]) {
        newGrid[row][col]!.isAlive = neighbors === 2 || neighbors === 3;
      } else if (cell && newGrid[row]?.[col]) {
        newGrid[row][col]!.isAlive = neighbors === 3;
      }
    }
  }
  
  return newGrid;
}; 