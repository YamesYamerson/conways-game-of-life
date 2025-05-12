import { useState, useRef } from 'react'
import TopBar from './components/TopBar'
import { GameOfLife } from './components/GameOfLife'
import ControlBar from './components/ControlBar'
import PatternBar from './components/PatternBar'

const INITIAL_SPEED = 300;

const patterns = [
  {
    name: 'Glider',
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
    name: 'Blinker',
    matrix: [
      [0,0,0],
      [1,1,1],
      [0,0,0],
    ],
    pattern: [
      [0, -1], [0, 0], [0, 1],
    ] as [number, number][],
    offset: null, // will be centered
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
    offset: null, // will be centered
  },
  {
    name: 'LWSS',
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
    offset: null, // will be centered
  },
  {
    name: 'Toad',
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
    offset: null, // will be centered
  },
  {
    name: 'Beacon',
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
    offset: null, // will be centered
  },
  {
    name: 'Diehard',
    matrix: [
      [0,0,0,0,0,0,1],
      [1,1,0,0,0,0,0],
      [0,1,0,0,0,1,1],
    ],
    pattern: [
      [0,6],
      [1,0],[1,1],
      [2,1],[2,5],[2,6],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Acorn',
    matrix: [
      [0,1,0,0,0,0,0],
      [0,0,0,1,0,0,0],
      [1,1,0,0,1,1,1],
    ],
    pattern: [
      [0,1],
      [1,3],
      [2,0],[2,1],[2,4],[2,5],[2,6],
    ] as [number, number][],
    offset: null,
  },
  {
    name: 'Pentadecathlon',
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
    name: 'R-pentomino',
    matrix: [
      [0,1,1],
      [1,1,0],
      [0,1,0],
    ],
    pattern: [
      [0,1],[0,2],
      [1,0],[1,1],
      [2,1],
    ] as [number, number][],
    offset: null,
  },
];

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [shouldClear, setShouldClear] = useState(false);
  const [shouldRandomize, setShouldRandomize] = useState(false);
  const [shouldSymmetricRandom, setShouldSymmetricRandom] = useState(false);
  const [shouldRadialSymmetricRandom, setShouldRadialSymmetricRandom] = useState(false);
  const patternRef = useRef<{ name: string; pattern: [number, number][]; offset: any } | null>(null);
  const [patternTrigger, setPatternTrigger] = useState(0);

  const handlePatternSelect = (patternName: string) => {
    const pattern = patterns.find(p => p.name === patternName);
    if (pattern) {
      patternRef.current = pattern;
      setPatternTrigger(x => x + 1); // trigger effect in GameOfLife
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    console.log('Speed changing to:', newSpeed);
    setSpeed(newSpeed);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <ControlBar
        isRunning={isRunning}
        onStartStop={() => setIsRunning(!isRunning)}
        onClear={() => {
          setIsRunning(false);
          setShouldClear(true);
        }}
        onRandomize={() => {
          setShouldRandomize(true);
        }}
        onSymmetricRandom={() => {
          setShouldSymmetricRandom(true);
        }}
        onRadialSymmetricRandom={() => {
          setShouldRadialSymmetricRandom(true);
        }}
        speed={speed}
        onSpeedChange={handleSpeedChange}
      />
      <PatternBar patterns={patterns} onPatternSelect={handlePatternSelect} />
      <main className="max-w-7xl mx-auto">
        <GameOfLife
          isRunning={isRunning}
          speed={speed}
          onClear={() => {
            setIsRunning(false);
            setShouldClear(false);
          }}
          shouldClear={shouldClear}
          shouldRandomize={shouldRandomize}
          shouldSymmetricRandom={shouldSymmetricRandom}
          shouldRadialSymmetricRandom={shouldRadialSymmetricRandom}
          onRandomizeComplete={() => setShouldRandomize(false)}
          onSymmetricRandomComplete={() => setShouldSymmetricRandom(false)}
          onRadialSymmetricRandomComplete={() => setShouldRadialSymmetricRandom(false)}
          patternToApply={patternRef.current}
          patternTrigger={patternTrigger}
        />
      </main>
    </div>
  )
}

export default App
