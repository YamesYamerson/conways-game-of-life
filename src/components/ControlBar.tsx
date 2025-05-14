import React, { useRef, useEffect, useState } from 'react';

interface ControlBarProps {
  isRunning: boolean;
  onStartStop: () => void;
  onClear: () => void;
  onRandomize: () => void;
  onSymmetricRandom: () => void;
  onRadialSymmetricRandom: () => void;
  speed: number;
  onSpeedChange: (value: number) => void;
  onMazeRandom?: () => void;
  onHighLifeRandom?: () => void;
  onSeedsRandom?: () => void;
}

const randomTypeStyles: Record<string, string> = {
  'True Random': 'bg-green-500 hover:bg-green-600',
  'Symmetric Random': 'bg-cyan-500 hover:bg-cyan-600',
  'Radial Symmetric Random': 'bg-fuchsia-500 hover:bg-fuchsia-600',
  'Maze': 'bg-yellow-500 hover:bg-yellow-600',
  'HighLife': 'bg-pink-500 hover:bg-pink-600',
  'Seeds': 'bg-blue-500 hover:bg-blue-600',
};

const ControlBar: React.FC<ControlBarProps> = ({
  isRunning,
  onStartStop,
  onClear,
  onRandomize,
  onSymmetricRandom,
  onRadialSymmetricRandom,
  speed,
  onSpeedChange,
  onMazeRandom,
  onHighLifeRandom,
  onSeedsRandom,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedRandom, setSelectedRandom] = useState('True Random');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return;
    function handleClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openDropdown]);

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    if (!openDropdown) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenDropdown(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [openDropdown]);

  const handleSelect = (type: string, fn?: () => void) => {
    setSelectedRandom(type);
    if (fn) fn();
    setOpenDropdown(false);
  };

  const dropdownBtnColor = randomTypeStyles[selectedRandom] || randomTypeStyles['True Random'];

  return (
    <div className="w-full bg-gray-50 shadow-sm">
      <div className="max-w-7xl mx-auto py-3 px-4 flex flex-wrap items-center gap-4 justify-center">
        {/* Play/Stop Button */}
        <button
          onClick={onStartStop}
          className={`px-4 py-2 text-white rounded transition-transform duration-150 active:scale-95 shadow-md bg-blue-500 hover:bg-blue-600 flex items-center gap-2`}
        >
          {isRunning ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><rect x="5" y="5" width="10" height="10" rx="2" /></svg>
              Stop
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><polygon points="6,4 16,10 6,16" /></svg>
              Start
            </>
          )}
        </button>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-transform duration-150 active:scale-95 shadow-md"
        >
          Clear
        </button>
        {/* Randomize Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown((v) => !v)}
            className={`px-4 py-2 text-white rounded transition-colors font-semibold shadow-md ${dropdownBtnColor}`}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={openDropdown}
            aria-controls="randomize-dropdown-menu"
          >
            {selectedRandom}
            <svg className="inline ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div
            id="randomize-dropdown-menu"
            className={`absolute left-1/2 -translate-x-1/2 mt-1 z-20 min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ${openDropdown ? 'block' : 'hidden'}`}
            role="listbox"
            tabIndex={-1}
          >
            <div className="flex flex-col gap-2 p-3">
              <button
                onClick={() => handleSelect('True Random', onRandomize)}
                className="px-3 py-1 min-w-[140px] text-left bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-sm font-medium shadow-sm"
                role="option"
              >
                True Random
              </button>
              <button
                onClick={() => handleSelect('Symmetric Random', onSymmetricRandom)}
                className="px-3 py-1 min-w-[140px] text-left bg-cyan-100 text-cyan-700 rounded hover:bg-cyan-200 transition-colors text-sm font-medium shadow-sm"
                role="option"
              >
                Symmetric Random
              </button>
              <button
                onClick={() => handleSelect('Radial Symmetric Random', onRadialSymmetricRandom)}
                className="px-3 py-1 min-w-[140px] text-left bg-fuchsia-100 text-fuchsia-700 rounded hover:bg-fuchsia-200 transition-colors text-sm font-medium shadow-sm"
                role="option"
              >
                Radial Symmetric Random
              </button>
              <button
                onClick={() => handleSelect('Maze', onMazeRandom)}
                className="px-3 py-1 min-w-[140px] text-left bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors text-sm font-medium shadow-sm"
                role="option"
              >
                Maze
              </button>
              <button
                onClick={() => handleSelect('HighLife', onHighLifeRandom)}
                className="px-3 py-1 min-w-[140px] text-left bg-pink-100 text-pink-700 rounded hover:bg-pink-200 transition-colors text-sm font-medium shadow-sm"
                role="option"
              >
                HighLife
              </button>
              <button
                onClick={() => handleSelect('Seeds', onSeedsRandom)}
                className="px-3 py-1 min-w-[140px] text-left bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-medium shadow-sm"
                role="option"
              >
                Seeds
              </button>
            </div>
          </div>
        </div>
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
};

export default ControlBar; 