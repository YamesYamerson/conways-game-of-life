export const patterns = [
  // Still Lifes
  {
    name: 'Block',
    type: 'Still Life',
    matrix: [
      [1,1],
      [1,1],
    ],
    pattern: [
      [0,0],[0,1],
      [1,0],[1,1],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Boat',
    type: 'Still Life',
    matrix: [
      [1,1,0],
      [1,0,1],
      [0,1,0],
    ],
    pattern: [
      [0,0],[0,1],
      [1,0],[1,2],
      [2,1],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Tub',
    type: 'Still Life',
    matrix: [
      [0,1,0],
      [1,0,1],
      [0,1,0],
    ],
    pattern: [
      [0,1],
      [1,0],[1,2],
      [2,1],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Loaf',
    type: 'Still Life',
    matrix: [
      [0,1,1,0],
      [1,0,0,1],
      [0,1,0,1],
      [0,0,1,0],
    ],
    pattern: [
      [0,1],[0,2],
      [1,0],[1,3],
      [2,1],[2,3],
      [3,2],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Boat-Tie',
    type: 'Still Life',
    matrix: [
      [1,1,0,0,0],
      [1,0,1,0,0],
      [0,1,0,1,1],
      [0,0,1,0,1],
      [0,0,0,1,1],
    ],
    pattern: [
      [0,0],[0,1],
      [1,0],[1,2],
      [2,1],[2,3],[2,4],
      [3,2],[3,4],
      [4,3],[4,4],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Honey Farm',
    type: 'Still Life',
    matrix: [
      [0,1,1,0],
      [1,0,0,1],
      [0,1,1,0],
    ],
    pattern: [
      [0,1],[0,2],
      [1,0],[1,3],
      [2,1],[2,2],
    ] as [number, number][],
    offset: null,
  },
  // Oscillators
  {
    name: 'Blinker',
    type: 'Oscillator',
    matrix: [
      [0,0,0],
      [1,1,1],
      [0,0,0],
    ],
    pattern: [
      [0, -1], [0, 0], [0, 1],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Toad',
    type: 'Oscillator',
    matrix: [
      [0,0,0,0],
      [0,1,1,1],
      [1,1,1,0],
      [0,0,0,0],
    ],
    pattern: [
      [1,1],[1,2],[1,3],
      [2,0],[2,1],[2,2],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Beacon',
    type: 'Oscillator',
    matrix: [
      [1,1,0,0],
      [1,1,0,0],
      [0,0,1,1],
      [0,0,1,1],
    ],
    pattern: [
      [0,0],[0,1],[1,0],[1,1],
      [2,2],[2,3],[3,2],[3,3],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Pulsar',
    type: 'Oscillator',
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
    pattern: [
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
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Pentadecathlon',
    type: 'Oscillator',
    matrix: [
      [0,1,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1,1,1],
      [0,1,0,0,0,0,0,0,0,0],
    ],
    pattern: [
      [0,1],
      [1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],
      [2,1],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Clock',
    type: 'Oscillator',
    matrix: [
      [0,1,1,0],
      [1,0,0,1],
      [0,1,1,0],
      [1,0,0,1],
    ],
    pattern: [
      [0,1],[0,2],
      [1,0],[1,3],
      [2,1],[2,2],
      [3,0],[3,3],
    ] as [number, number][],
    offset: null,
  },
  // Spaceships
  {
    name: 'Glider',
    type: 'Spaceship',
    matrix: [
      [0,1,0],
      [0,0,1],
      [1,1,1],
    ],
    pattern: [
      [1, 2],
      [2, 3],
      [3, 1], [3, 2], [3, 3],
    ] as [number, number][],
    offset: { row: 0, col: 0 },
  },
  {
    name: 'LWSS',
    type: 'Spaceship',
    matrix: [
      [0,1,1,1,1],
      [1,0,0,0,1],
      [0,0,0,0,1],
      [1,0,0,1,0],
    ],
    pattern: [
      [0,1],[0,2],[0,3],[0,4],
      [1,0],[1,4],
      [2,4],
      [3,0],[3,3],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'MWSS',
    type: 'Spaceship',
    matrix: [
      [0,1,1,1,1,1,0,0],
      [1,0,0,0,0,0,1,0],
      [0,0,0,0,0,0,0,1],
      [1,0,0,0,0,1,1,1],
    ],
    pattern: [
      [0,1],[0,2],[0,3],[0,4],[0,5],
      [1,0],[1,6],
      [2,7],
      [3,0],[3,5],[3,6],[3,7],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'HWSS',
    type: 'Spaceship',
    matrix: [
      [0,1,1,1,1,1,0,0,0],
      [1,0,0,0,0,0,1,0,0],
      [0,0,0,0,0,0,0,1,0],
      [1,0,0,0,0,1,1,1,1],
    ],
    pattern: [
      [0,1],[0,2],[0,3],[0,4],[0,5],
      [1,0],[1,6],
      [2,7],
      [3,0],[3,5],[3,6],[3,7],[3,8],
    ] as [number, number][],
    offset: null,
  },
  // Add the rest of your unique patterns here, each with a unique name
  // ...
]; 