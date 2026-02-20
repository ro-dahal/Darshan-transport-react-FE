import React, { useState } from 'react';
import { DEMO_SCENARIOS, type DemoScenario } from '../data/demoData';

interface DebugPanelProps {
  onSelect: (scenario: DemoScenario | null) => void;
  manualMode: boolean;
  onToggleManualMode: (enabled: boolean) => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  onSelect,
  manualMode,
  onToggleManualMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      {isOpen && (
        <div className="flex flex-col gap-2 rounded-lg border border-gray-300 bg-white p-3 shadow-lg animate-slide-up">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Debug Scenarios
          </h4>
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-1">
            <input
              type="checkbox"
              id="manual-mode"
              checked={manualMode}
              onChange={(e) => onToggleManualMode(e.target.checked)}
              className="h-4 w-4 cursor-pointer"
            />
            <label
              htmlFor="manual-mode"
              className="text-xs font-medium cursor-pointer"
            >
              Manual Entry Mode
            </label>
          </div>
          <div className="flex flex-col gap-1">
            {DEMO_SCENARIOS.map((scenario: DemoScenario) => (
              <button
                key={scenario.key}
                onClick={() => onSelect(scenario)}
                className="rounded px-3 py-1.5 text-left text-sm hover:bg-gray-100 transition-colors"
              >
                {scenario.label}
              </button>
            ))}
            <button
              onClick={() => onSelect(null)}
              className="mt-1 border-t border-gray-100 pt-1 rounded px-3 py-1.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Clear / Reset
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-full bg-gray-800 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-black transition-transform hover:scale-105"
      >
        {isOpen ? '✕ DEBUG' : '🛠 DEBUG'}
      </button>
    </div>
  );
};
