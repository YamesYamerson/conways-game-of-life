import { useState, useEffect } from 'react';
import { createEmptyGrid, createRandomGrid, getNextGeneration } from '../utils/gameLogic';
import type { Grid } from '../types/game';

const GRID_SIZE = 50;
const CELL_SIZE = 15;

interface GameOfLifeProps {
  isRunning: boolean;
  speed: number;
  onClear: () => void;
  shouldClear: boolean;
  shouldRandomize: boolean;
  shouldSymmetricRandom: boolean;
  shouldRadialSymmetricRandom: boolean;
  onRandomizeComplete: () => void;
  onSymmetricRandomComplete: () => void;
  onRadialSymmetricRandomComplete: () => void;
  patternToApply?: { name: string; pattern: [number, number][]; offset: any } | null;
  patternTrigger?: number;
}

type Pattern = [number, number][];

export const GameOfLife: React.FC<GameOfLifeProps> = ({
  isRunning,
  speed,
  onClear,
  shouldClear,
  shouldRandomize,
  shouldSymmetricRandom,
  shouldRadialSymmetricRandom,
  onRandomizeComplete,
  onSymmetricRandomComplete,
  onRadialSymmetricRandomComplete,
  patternToApply,
  patternTrigger,
}) => {
  const [grid, setGrid] = useState<Grid>(() => {
    const initial = createEmptyGrid(GRID_SIZE, GRID_SIZE);
    console.log('Initial grid:', initial);
    return initial;
  });

  const applyPattern = (pattern: Pattern, offsetRow: number, offsetCol: number) => {
    setGrid(prev => {
      const newGrid = createEmptyGrid(GRID_SIZE, GRID_SIZE);
      pattern.forEach(([r, c]) => {
        const row = offsetRow + r;
        const col = offsetCol + c;
        if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
          const cell = newGrid[row];
          if (cell) {
            const targetCell = cell[col];
            if (targetCell) {
              targetCell.isAlive = true;
            }
          }
        }
      });
      return newGrid;
    });
  };

  const toggleCell = (row: number, col: number) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map((rowArray, rowIndex) =>
        rowArray.map((cell, colIndex) =>
          rowIndex === row && colIndex === col
            ? { ...cell, isAlive: !cell.isAlive }
            : cell
        )
      );
      console.log('Toggled cell:', row, col, newGrid[row]?.[col]);
      return newGrid;
    });
  };

  const clearGrid = () => {
    setGrid(createEmptyGrid(GRID_SIZE, GRID_SIZE));
    onClear();
  };

  const randomizeGrid = () => {
    const newGrid = createRandomGrid(GRID_SIZE, GRID_SIZE);
    console.log('Randomized grid:', newGrid);
    setGrid(newGrid);
  };

  // Symmetric random pattern generator
  const setRandomSymmetric = () => {
    setGrid(() => {
      const newGrid = createEmptyGrid(GRID_SIZE, GRID_SIZE);
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < Math.ceil(GRID_SIZE / 2); col++) {
          const alive = Math.random() > 0.7;
          if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
            const cell = newGrid[row];
            if (cell) {
              const targetCell = cell[col];
              const mirrorCell = cell[GRID_SIZE - 1 - col];
              if (targetCell && mirrorCell) {
                targetCell.isAlive = alive;
                mirrorCell.isAlive = alive;
              }
            }
          }
        }
      }
      return newGrid;
    });
  };

  // Radial symmetric random pattern generator
  const setRandomRadialSymmetric = () => {
    setGrid(() => {
      const newGrid = createEmptyGrid(GRID_SIZE, GRID_SIZE);
      const half = Math.ceil(GRID_SIZE / 2);
      for (let row = 0; row < half; row++) {
        for (let col = 0; col < half; col++) {
          const alive = Math.random() > 0.7;
          if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
            const topRow = newGrid[row];
            const bottomRow = newGrid[GRID_SIZE - 1 - row];
            if (topRow && bottomRow) {
              const topLeft = topRow[col];
              const topRight = topRow[GRID_SIZE - 1 - col];
              const bottomLeft = bottomRow[col];
              const bottomRight = bottomRow[GRID_SIZE - 1 - col];
              if (topLeft && topRight && bottomLeft && bottomRight) {
                topLeft.isAlive = alive;
                topRight.isAlive = alive;
                bottomLeft.isAlive = alive;
                bottomRight.isAlive = alive;
              }
            }
          }
        }
      }
      return newGrid;
    });
  };

  useEffect(() => {
    if (shouldClear) {
      clearGrid();
    }
  }, [shouldClear]);

  useEffect(() => {
    if (shouldRandomize) {
      randomizeGrid();
      onRandomizeComplete();
    }
  }, [shouldRandomize, onRandomizeComplete]);

  useEffect(() => {
    if (shouldSymmetricRandom) {
      setRandomSymmetric();
      onSymmetricRandomComplete();
    }
  }, [shouldSymmetricRandom, onSymmetricRandomComplete]);

  useEffect(() => {
    if (shouldRadialSymmetricRandom) {
      setRandomRadialSymmetric();
      onRadialSymmetricRandomComplete();
    }
  }, [shouldRadialSymmetricRandom, onRadialSymmetricRandomComplete]);

  useEffect(() => {
    if (patternToApply && patternTrigger !== undefined) {
      // Center if offset is null
      let offsetRow = 0;
      let offsetCol = 0;
      if (patternToApply.offset && typeof patternToApply.offset.row === 'number' && typeof patternToApply.offset.col === 'number') {
        offsetRow = patternToApply.offset.row;
        offsetCol = patternToApply.offset.col;
      } else {
        // Center pattern
        const rows = grid.length;
        const cols = grid[0]?.length ?? 0;
        offsetRow = Math.floor(rows / 2);
        offsetCol = Math.floor(cols / 2);
      }
      setGrid(prev => {
        const newGrid = createEmptyGrid(GRID_SIZE, GRID_SIZE);
        patternToApply.pattern.forEach(([r, c]) => {
          const row = offsetRow + r;
          const col = offsetCol + c;
          if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
            const cell = newGrid[row];
            if (cell) {
              const targetCell = cell[col];
              if (targetCell) {
                targetCell.isAlive = true;
              }
            }
          }
        });
        return newGrid;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patternTrigger]);

  useEffect(() => {
    if (!isRunning) return;
    console.log('Setting up game loop with speed:', speed);
    const intervalId = window.setInterval(() => {
      setGrid(currentGrid => getNextGeneration(currentGrid));
    }, speed);
    return () => {
      console.log('Cleaning up game loop');
      clearInterval(intervalId);
    };
  }, [isRunning, speed]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gap: '2px',
          backgroundColor: '#d1d5db',
          padding: '8px',
          borderRadius: '12px',
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
        }}
        className="transition-all duration-300"
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const className = `transition-all duration-300 shadow-sm cursor-pointer
              ${cell.isAlive ? 'bg-green-500' : 'bg-white'}
              hover:ring-2 hover:ring-blue-400 hover:z-10
            `;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => {
                  console.log('Before toggle:', { row: rowIndex, col: colIndex, isAlive: cell.isAlive, className });
                  toggleCell(rowIndex, colIndex);
                  setTimeout(() => {
                    const updatedCell = grid[rowIndex]?.[colIndex];
                    console.log('After toggle:', { row: rowIndex, col: colIndex, isAlive: updatedCell?.isAlive, className });
                  }, 0);
                }}
                className={className}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  display: 'inline-block',
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}; 