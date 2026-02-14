import { useCallback, useEffect, useMemo, useState } from 'react';
import type { DeliveryRecord } from '../types/DeliveryRecord';
import { useOrderTrackingService } from '../services/OrderTrackingServiceContext';

/**
 * State representation for the Order Tracking view model.
 */
export interface OrderTrackingViewModelState {
  /** List of available location series (e.g., 'KTM', 'PKR') */
  seriesList: string[];
  /** The currently selected location series */
  selectedSeries: string;
  /** The invoice number entered by the user */
  invoiceNumber: string;
  /** The fetched delivery record, if available */
  deliveryRecord: DeliveryRecord | null;
  /** Error message from the service layer */
  error: string;
  /** Set to true when an API call is in progress */
  isLoading: boolean;
  /** Set to true once the initial series list has been loaded */
  isReady: boolean;
}

/**
 * Public interface for the Order Tracking view model actions and state.
 */
export interface OrderTrackingViewModel {
  state: OrderTrackingViewModelState;
  actions: {
    /** Sets the active location series */
    selectSeries(series: string): void;
    /** Updates the invoice number state */
    updateInvoiceNumber(invoice: string): void;
    /** Triggers the delivery status search */
    submit(): Promise<void>;
    /** Clears any active error messages */
    clearError(): void;
  };
}

/**
 * Custom hook that manages the business logic for the Order Tracking feature.
 * orchestrates state transitions, API calls via the OrderTrackingService,
 * and user interactions.
 *
 * @returns {OrderTrackingViewModel} The decomposed state and action handlers.
 */
export function useOrderTracking(): OrderTrackingViewModel {
  const service = useOrderTrackingService();

  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [deliveryRecord, setDeliveryRecord] = useState<DeliveryRecord | null>(
    null
  );
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
        setSelectedSeries((current) => current || series[0] || '');
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        setSeriesList([]);
        setError(
          err instanceof Error ? err.message : 'Failed to load series list'
        );
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
      const record = await service.loadDeliveryStatus(
        selectedSeries,
        invoiceNumber.trim()
      );
      setDeliveryRecord(record);
    } catch (err: unknown) {
      setDeliveryRecord(null);
      setError(
        err instanceof Error ? err.message : 'Failed to fetch delivery status.'
      );
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
    [
      deliveryRecord,
      error,
      invoiceNumber,
      isLoading,
      isReady,
      selectedSeries,
      seriesList,
    ]
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
