import { useState } from 'react'
import TopBar from './components/TopBar'
import { GameOfLife } from './components/GameOfLife'
import ControlBar from './components/ControlBar'

const INITIAL_SPEED = 300;

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [shouldClear, setShouldClear] = useState(false);
  const [shouldRandomize, setShouldRandomize] = useState(false);
  const [shouldSymmetricRandom, setShouldSymmetricRandom] = useState(false);
  const [shouldRadialSymmetricRandom, setShouldRadialSymmetricRandom] = useState(false);

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
        />
      </main>
    </div>
  )
}

export default App
