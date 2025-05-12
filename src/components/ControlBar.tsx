import React from 'react';

interface ControlBarProps {
  isRunning: boolean;
  onStartStop: () => void;
  onClear: () => void;
  onRandomize: () => void;
  onSymmetricRandom: () => void;
  onRadialSymmetricRandom: () => void;
  speed: number;
  onSpeedChange: (value: number) => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
  isRunning,
  onStartStop,
  onClear,
  onRandomize,
  onSymmetricRandom,
  onRadialSymmetricRandom,
  speed,
  onSpeedChange,
}) => (
  <div className="w-full bg-gray-50 shadow-sm">
    <div className="max-w-7xl mx-auto py-3 px-4 flex flex-wrap items-center gap-4 justify-center">
      <button
        onClick={onStartStop}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform duration-150 active:scale-95 shadow-md"
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={onClear}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-transform duration-150 active:scale-95 shadow-md"
      >
        Clear
      </button>
      <button
        onClick={onRandomize}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-transform duration-150 active:scale-95 shadow-md"
      >
        Randomize
      </button>
      <button
        onClick={onSymmetricRandom}
        className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-transform duration-150 active:scale-95 shadow-md"
      >
        Symmetric Random
      </button>
      <button
        onClick={onRadialSymmetricRandom}
        className="px-4 py-2 bg-fuchsia-500 text-white rounded hover:bg-fuchsia-600 transition-transform duration-150 active:scale-95 shadow-md"
      >
        Radial Symmetric Random
      </button>
      <div className="flex items-center gap-2">
        <label htmlFor="speed">Speed:</label>
        <input
          id="speed"
          type="range"
          min="200"
          max="1000"
          step="100"
          value={1100 - speed}
          onChange={e => onSpeedChange(1100 - Number(e.target.value))}
          className="w-32"
        />
      </div>
    </div>
  </div>
);

export default ControlBar; 