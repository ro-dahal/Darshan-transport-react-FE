import React, { useState } from 'react';
import { DEMO_SCENARIOS, type DemoScenario } from '../data/demoData';

interface DebugPanelProps {
  onSelect: (scenario: DemoScenario | null) => void;
  manualMode: boolean;
  onToggleManualMode: (enabled: boolean) => void;
  debugError: string;
  setDebugError: (error: string) => void;
  setDebugRecord: (record: null) => void;
  isErrorHidden: boolean;
  setIsErrorHidden: (hidden: boolean) => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  onSelect,
  manualMode,
  onToggleManualMode,
  debugError,
  setDebugError,
  setDebugRecord,
  isErrorHidden,
  setIsErrorHidden,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isServiceDown = debugError.startsWith('SERVICE_UNAVAILABLE');
  const isServerError = debugError.startsWith('SERVER_ERROR');

  const toggleServiceDown = () => {
    if (isServiceDown) {
      setDebugError('');
    } else {
      setDebugRecord(null);
      setDebugError('SERVICE_UNAVAILABLE|Service is temporarily down for maintenance.');
    }
  };

  const toggleServerError = () => {
    if (isServerError) {
      setDebugError('');
    } else {
      setDebugRecord(null);
      setDebugError('SERVER_ERROR|Internal server error occurred.');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      {isOpen && (
        <div className="flex flex-col gap-2 rounded-lg border border-gray-300 bg-white p-3 shadow-lg animate-slide-up sm:min-w-[200px]">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-1 mb-1">
            Debug Tools
          </h4>
          
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="manual-mode"
                checked={manualMode}
                onChange={(e) => onToggleManualMode(e.target.checked)}
                className="h-4 w-4 cursor-pointer"
              />
              <label htmlFor="manual-mode" className="text-xs font-medium cursor-pointer">
                Manual Entry Mode
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hide-errors"
                checked={isErrorHidden}
                onChange={(e) => setIsErrorHidden(e.target.checked)}
                className="h-4 w-4 cursor-pointer"
              />
              <label htmlFor="hide-errors" className="text-xs font-medium cursor-pointer text-blue-600">
                Hide All Errors
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="service-down"
                checked={isServiceDown}
                onChange={toggleServiceDown}
                className="h-4 w-4 cursor-pointer"
              />
              <label htmlFor="service-down" className="text-xs font-medium cursor-pointer text-orange-600">
                Service Down (503)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="server-error"
                checked={isServerError}
                onChange={toggleServerError}
                className="h-4 w-4 cursor-pointer"
              />
              <label htmlFor="server-error" className="text-xs font-medium cursor-pointer text-red-600">
                Server Error (500)
              </label>
            </div>
          </div>

          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-1 mb-1">
            Presets
          </h4>
          <div className="flex flex-col gap-1">
            {DEMO_SCENARIOS.map((scenario: DemoScenario) => (
              <button
                key={scenario.key}
                onClick={() => onSelect(scenario)}
                className="rounded px-3 py-1.5 text-left text-sm hover:bg-gray-100 transition-colors"
                disabled={isServiceDown || isServerError}
              >
                {scenario.label}
              </button>
            ))}
            <button
              onClick={() => {
                onSelect(null);
                setDebugError('');
              }}
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
