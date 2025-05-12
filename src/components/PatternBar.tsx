import React, { useState } from 'react';

interface Pattern {
  name: string;
  matrix: number[][];
}

interface PatternBarProps {
  patterns: Pattern[];
  onPatternSelect: (patternName: string) => void;
}

const PatternBar: React.FC<PatternBarProps> = ({ patterns, onPatternSelect }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full bg-gray-50 shadow-sm">
      <div className="max-w-7xl mx-auto py-3 px-4 flex flex-wrap items-center gap-4 justify-center">
        {patterns.map((pattern) => (
          <div key={pattern.name} className="relative flex flex-col items-center">
            <button
              onClick={() => onPatternSelect(pattern.name)}
              onMouseEnter={() => setHovered(pattern.name)}
              onMouseLeave={() => setHovered(null)}
              className="px-3 py-1 mb-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
            >
              {pattern.name}
            </button>
            {hovered === pattern.name && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-10 bg-white p-2 rounded shadow-lg border border-gray-200">
                <div className="flex flex-col items-center">
                  {pattern.matrix.map((row, i) => (
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternBar; 