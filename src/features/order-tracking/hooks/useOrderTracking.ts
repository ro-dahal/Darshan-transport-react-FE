import { useCallback, useEffect, useMemo, useState } from 'react';
import type { DeliveryRecord } from '../types/DeliveryRecord';
import { useOrderTrackingService } from '../services/OrderTrackingServiceContext';

export interface OrderTrackingViewModelState {
  seriesList: string[];
  selectedSeries: string;
  invoiceNumber: string;
  deliveryRecord: DeliveryRecord | null;
  error: string;
  isLoading: boolean;
  isReady: boolean;
}

export interface OrderTrackingViewModel {
  state: OrderTrackingViewModelState;
  actions: {
    selectSeries(series: string): void;
    updateInvoiceNumber(invoice: string): void;
    submit(): Promise<void>;
    clearError(): void;
  };
}

export function useOrderTracking(): OrderTrackingViewModel {
  const service = useOrderTrackingService();

  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [deliveryRecord, setDeliveryRecord] = useState<DeliveryRecord | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    service
      .loadSeries()
      .then((series) => {
        if (!isMounted) return;
        setSeriesList(series);
        setSelectedSeries((current) => (current || series[0] || ''));
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        setSeriesList([]);
        setError(err instanceof Error ? err.message : 'Failed to load series list');
      })
      .finally(() => {
        if (isMounted) {
          setIsReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [service]);

  const submit = useCallback(async () => {
    if (!selectedSeries) {
      setError('Please select a location series.');
      return;
    }
    if (!invoiceNumber.trim()) {
      setError('Please enter a valid invoice number.');
      setDeliveryRecord(null);
      return;
    }

    setError('');
    setIsLoading(true);
    setDeliveryRecord(null);

    try {
      const record = await service.loadDeliveryStatus(selectedSeries, invoiceNumber.trim());
      setDeliveryRecord(record);
    } catch (err: unknown) {
      setDeliveryRecord(null);
      setError(err instanceof Error ? err.message : 'Failed to fetch delivery status.');
    } finally {
      setIsLoading(false);
    }
  }, [invoiceNumber, selectedSeries, service]);

  const state = useMemo<OrderTrackingViewModelState>(
    () => ({
      seriesList,
      selectedSeries,
      invoiceNumber,
      deliveryRecord,
      error,
      isLoading,
      isReady,
    }),
    [deliveryRecord, error, invoiceNumber, isLoading, isReady, selectedSeries, seriesList]
  );

  return {
    state,
    actions: {
      selectSeries: setSelectedSeries,
      updateInvoiceNumber: setInvoiceNumber,
      submit,
      clearError: () => setError(''),
    },
  };
}
