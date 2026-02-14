import type { DeliveryRecord } from '../types/DeliveryRecord';

/**
 * Interface for order tracking data operations.
 * Decouples the UI from the specific data fetching implementation (HTTP/Local/Mock).
 */
export interface OrderTrackingService {
  /**
   * Loads the list of available invoice series from the backend.
   * @returns {Promise<string[]>} A list of series codes (e.g., ['KTM', 'PKR']).
   */
  loadSeries(): Promise<string[]>;

  /**
   * Fetches the delivery status record for a specific invoice.
   * @param {string} series - The location series code.
   * @param {string} invoiceNumber - The unique invoice identifier.
   * @returns {Promise<DeliveryRecord>} The detailed delivery record.
   */
  loadDeliveryStatus(
    series: string,
    invoiceNumber: string
  ): Promise<DeliveryRecord>;
}
