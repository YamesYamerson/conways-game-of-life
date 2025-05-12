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
}) => {
  const [grid, setGrid] = useState<Grid>(() => {
    const initial = createEmptyGrid(GRID_SIZE, GRID_SIZE);
    console.log('Initial grid:', initial);
    return initial;
  });

  // PatternPreview component for mini-grid
  const PatternPreview = ({ matrix }: { matrix: number[][] }) => (
    <div className="flex flex-col items-center mt-1 mb-2">
      {matrix.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div
              key={j}
              className={`w-3 h-3 m-0.5 rounded-sm border border-gray-300 ${cell ? 'bg-green-500' : 'bg-white'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );

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

  // Pattern definitions: [name, previewMatrix, setPatternFn]
  const patterns = [
    {
      name: 'Glider',
      matrix: [
        [0,1,0],
        [0,0,1],
        [1,1,1],
      ],
      set: () => {
        const pattern: Pattern = [
          [1, 2],
          [2, 3],
          [3, 1], [3, 2], [3, 3],
        ];
        applyPattern(pattern, 0, 0);
      }
    },
    {
      name: 'Blinker',
      matrix: [
        [0,0,0],
        [1,1,1],
        [0,0,0],
      ],
      set: () => {
        const mid = Math.floor(GRID_SIZE / 2);
        const pattern: Pattern = [
          [0, -1], [0, 0], [0, 1],
        ];
        applyPattern(pattern, mid, mid);
      }
    },
    {
      name: 'Pulsar',
      matrix: [
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
      ],
      set: () => {
        const mid = Math.floor(GRID_SIZE / 2) - 6;
        const pattern: Pattern = [
          [2, 4], [2, 5], [2, 6], [2, 10], [2, 11], [2, 12],
          [4, 2], [4, 7], [4, 9], [4, 14],
          [5, 2], [5, 7], [5, 9], [5, 14],
          [6, 2], [6, 7], [6, 9], [6, 14],
          [7, 4], [7, 5], [7, 6], [7, 10], [7, 11], [7, 12],
          [9, 4], [9, 5], [9, 6], [9, 10], [9, 11], [9, 12],
          [10, 2], [10, 7], [10, 9], [10, 14],
          [11, 2], [11, 7], [11, 9], [11, 14],
          [12, 2], [12, 7], [12, 9], [12, 14],
          [14, 4], [14, 5], [14, 6], [14, 10], [14, 11], [14, 12],
        ];
        applyPattern(pattern, mid, mid);
      }
    },
    {
      name: 'LWSS',
      matrix: [
        [0,1,1,1,1],
        [1,0,0,0,1],
        [0,0,0,0,1],
        [1,0,0,1,0],
      ],
      set: () => {
        const mid = Math.floor(GRID_SIZE / 2) - 2;
        const pattern: Pattern = [
          [0,1],[0,2],[0,3],[0,4],
          [1,0],[1,4],
          [2,4],
          [3,0],[3,3],
        ];
        applyPattern(pattern, mid, mid);
      }
    },
    {
      name: 'Toad',
      matrix: [
        [0,0,0,0],
        [0,1,1,1],
        [1,1,1,0],
        [0,0,0,0],
      ],
      set: () => {
        const mid = Math.floor(GRID_SIZE / 2) - 1;
        const pattern: Pattern = [
          [1,1],[1,2],[1,3],
          [2,0],[2,1],[2,2],
        ];
        applyPattern(pattern, mid, mid);
      }
    },
    {
      name: 'Beacon',
      matrix: [
        [1,1,0,0],
        [1,1,0,0],
        [0,0,1,1],
        [0,0,1,1],
      ],
      set: () => {
        const mid = Math.floor(GRID_SIZE / 2) - 1;
        const pattern: Pattern = [
          [0,0],[0,1],[1,0],[1,1],
          [2,2],[2,3],[3,2],[3,3],
        ];
        applyPattern(pattern, mid, mid);
      }
    },
  ];

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
      <div className="flex gap-2 mb-4">
        {patterns.map((p) => (
          <div key={p.name} className="flex flex-col items-center ml-2">
            <button onClick={p.set} className="px-3 py-1 mb-1 bg-indigo-500 text-white rounded hover:bg-indigo-600">{p.name}</button>
            <PatternPreview matrix={p.matrix} />
          </div>
        ))}
      </div>
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