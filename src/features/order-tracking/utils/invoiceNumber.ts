export const EMPTY_INVOICE_ERROR_MESSAGE = 'Enter an invoice number.';

const DEFAULT_INVOICE_LENGTH = 6;
const DIGITS_ONLY_PATTERN = /^\d+$/;

export function normalizeInvoiceNumberForSearch(
  invoiceNumber: string,
  minimumLength: number = DEFAULT_INVOICE_LENGTH
): string {
  if (!DIGITS_ONLY_PATTERN.test(invoiceNumber)) {
    return invoiceNumber;
  }

  return invoiceNumber.padStart(minimumLength, '0');
}
