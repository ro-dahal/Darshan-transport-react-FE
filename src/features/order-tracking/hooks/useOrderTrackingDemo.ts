import { useState, useEffect } from 'react';
import { DEMO_SCENARIOS, type DemoScenario } from '../data/demoData';
import type { DeliveryRecord } from '../types/DeliveryRecord';

interface UseOrderTrackingDemoProps {
  selectedSeries: string;
  invoiceNumber: string;
  selectSeries: (series: string) => void;
  updateInvoiceNumber: (invoice: string) => void;
}

interface UseOrderTrackingDemoReturn {
  debugRecord: DeliveryRecord | null;
  isManualDemoMode: boolean;
  handleDebugSelect: (scenario: DemoScenario | null) => void;
  handleManualToggle: (enabled: boolean) => void;
  setDebugRecord: (record: DeliveryRecord | null) => void;
  isDevelopment: boolean;
}

/**
 * Hook to manage demo and debug state for Order Tracking.
 * Strictly disabled in production for security and hygiene.
 */
export function useOrderTrackingDemo({
  selectedSeries,
  invoiceNumber,
  selectSeries,
  updateInvoiceNumber,
}: UseOrderTrackingDemoProps): UseOrderTrackingDemoReturn {
  const isDevelopment = import.meta.env.DEV;

  const [debugRecord, setDebugRecord] = useState<DeliveryRecord | null>(null);
  const [isManualDemoMode, setIsManualDemoMode] = useState(false);

  // Magic Input: Watch for manual entry of demo credentials
  // ONLY active in development
  useEffect(() => {
    if (!isDevelopment || isManualDemoMode) return;

    const matchedScenario = DEMO_SCENARIOS.find(
      (s) =>
        s.series === selectedSeries &&
        s.invoice.toUpperCase() === invoiceNumber.toUpperCase()
    );

    if (matchedScenario) {
      setDebugRecord(matchedScenario.record);
    } else if (debugRecord && !selectedSeries.startsWith('DEMO')) {
      const isscenario = DEMO_SCENARIOS.some((s) => s.record === debugRecord);
      if (isscenario) {
        setDebugRecord(null);
      }
    }
  }, [
    selectedSeries,
    invoiceNumber,
    isManualDemoMode,
    debugRecord,
    isDevelopment,
  ]);

  const handleDebugSelect = (scenario: DemoScenario | null) => {
    if (!isDevelopment) return;

    if (scenario) {
      setDebugRecord(scenario.record);
      selectSeries(scenario.series);
      updateInvoiceNumber(scenario.invoice);
    } else {
      setDebugRecord(null);
      updateInvoiceNumber('');
    }
  };

  const handleManualToggle = (enabled: boolean) => {
    if (!isDevelopment) return;

    setIsManualDemoMode(enabled);
    if (!enabled) {
      setDebugRecord(null);
    } else {
      setDebugRecord(null);
    }
  };

  // If not in development, force all demo states to null/false
  if (!isDevelopment) {
    return {
      debugRecord: null,
      isManualDemoMode: false,
      handleDebugSelect: () => {},
      handleManualToggle: () => {},
      setDebugRecord: () => {},
      isDevelopment: false,
    };
  }

  return {
    debugRecord,
    isManualDemoMode,
    handleDebugSelect,
    handleManualToggle,
    setDebugRecord,
    isDevelopment: true,
  };
}
