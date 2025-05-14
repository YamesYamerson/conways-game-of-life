import React, { useState } from 'react';

interface Pattern {
  name: string;
  type: string;
  matrix: number[][];
}

interface PatternBarProps {
  patterns: Pattern[];
  onPatternSelect: (patternName: string) => void;
}

const PatternBar: React.FC<PatternBarProps> = ({ patterns, onPatternSelect }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Group patterns by type
  const grouped = patterns.reduce<Record<string, Pattern[]>>((acc, pattern) => {
    if (!acc[pattern.type]) acc[pattern.type] = [];
    acc[pattern.type].push(pattern);
    return acc;
  }, {});

  return (
    <div className="w-full bg-gray-50 shadow-sm">
      <div className="max-w-7xl mx-auto py-3 px-4 flex flex-row items-center gap-6 justify-center">
        {Object.entries(grouped).map(([type, patternsInType]) => (
          <div
            key={type}
            className="relative group"
            onMouseEnter={() => setOpenDropdown(type)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors font-semibold shadow-md"
              onClick={() => setOpenDropdown(openDropdown === type ? null : type)}
              type="button"
            >
              {type}
            </button>
            {/* Dropdown */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-1 z-20 min-w-max bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ${openDropdown === type ? 'block' : 'hidden'} group-hover:block`}
              onMouseEnter={() => setOpenDropdown(type)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="flex flex-row flex-wrap gap-2 p-3">
                {patternsInType && patternsInType.map((pattern) => (
                  <div key={pattern.name} className="relative flex flex-col items-center">
                    <button
                      onClick={() => onPatternSelect(pattern.name)}
                      onMouseEnter={() => setHovered(pattern.name)}
                      onMouseLeave={() => setHovered(null)}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors text-sm font-medium shadow-sm"
                    >
                      {pattern.name}
                    </button>
                    {/* Mini-grid preview tooltip */}
                    {hovered === pattern.name && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30 bg-white p-2 rounded shadow-lg border border-gray-200">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternBar; 