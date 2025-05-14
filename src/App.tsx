import { useState, useRef } from 'react'
import TopBar from './components/TopBar'
import { GameOfLife } from './components/GameOfLife'
import ControlBar from './components/ControlBar'
import PatternBar from './components/PatternBar'
import { patterns } from './patterns/presets'

const INITIAL_SPEED = 300;

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [shouldClear, setShouldClear] = useState(false);
  const [shouldRandomize, setShouldRandomize] = useState(false);
  const [shouldSymmetricRandom, setShouldSymmetricRandom] = useState(false);
  const [shouldRadialSymmetricRandom, setShouldRadialSymmetricRandom] = useState(false);
  const [ruleSet, setRuleSet] = useState<'conway' | 'seeds' | 'highlife'>('conway');
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

  const handleRandomize = () => {
    setRuleSet('conway');
    setShouldRandomize(true);
  };
  const handleSymmetricRandom = () => {
    setRuleSet('conway');
    setShouldSymmetricRandom(true);
  };
  const handleRadialSymmetricRandom = () => {
    setRuleSet('conway');
    setShouldRadialSymmetricRandom(true);
  };
  const handleMazeRandom = () => {
    setRuleSet('conway'); // Maze is a random pattern, not a ruleset
    setShouldRandomize(true); // You can implement a maze generator if desired
  };
  const handleHighLifeRandom = () => {
    setRuleSet('highlife');
    setShouldRandomize(true);
  };
  const handleSeedsRandom = () => {
    setRuleSet('seeds');
    setShouldRandomize(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />
      <div className="w-full bg-gray-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch gap-2 px-4 py-3">
          <div className="flex-1 flex items-center justify-center md:justify-start mb-2 md:mb-0">
            <ControlBar
              isRunning={isRunning}
              onStartStop={() => setIsRunning(!isRunning)}
              onClear={() => {
                setIsRunning(false);
                setShouldClear(true);
              }}
              onRandomize={handleRandomize}
              onSymmetricRandom={handleSymmetricRandom}
              onRadialSymmetricRandom={handleRadialSymmetricRandom}
              onMazeRandom={handleMazeRandom}
              onHighLifeRandom={handleHighLifeRandom}
              onSeedsRandom={handleSeedsRandom}
              speed={speed}
              onSpeedChange={handleSpeedChange}
            />
          </div>
          <div className="flex-1 flex items-center justify-center md:justify-end">
            <PatternBar patterns={patterns} onPatternSelect={handlePatternSelect} />
          </div>
        </div>
      </div>
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
          ruleSet={ruleSet}
        />
      </main>
    </div>
  )
}

export default App
