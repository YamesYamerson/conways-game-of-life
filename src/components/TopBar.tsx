import { useState } from 'react';

const TopBar = () => {
  const [showRules, setShowRules] = useState(false);
  return (
    <>
      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[2px]" onClick={() => setShowRules(false)}>
          <div
            className="bg-white/95 rounded-lg shadow-xl p-8 max-w-2xl w-full relative mx-4 backdrop-blur-sm"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold transition-colors"
              onClick={() => setShowRules(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Conway's Game of Life Rules</h2>
            <ol className="list-decimal list-inside text-left text-gray-700 space-y-3 text-lg">
              <li>Any live cell with 2 or 3 live neighbors survives.</li>
              <li>Any dead cell with exactly 3 live neighbors becomes a live cell.</li>
              <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
            </ol>
          </div>
        </div>
      )}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Conway's Game of Life</h1>
          <button
            onClick={() => setShowRules(true)}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 shadow-md transition-colors"
          >
            Rules
          </button>
        </div>
      </div>
    </>
  );
};

export default TopBar; 