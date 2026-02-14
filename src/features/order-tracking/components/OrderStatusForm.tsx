import React from 'react';
import { ServiceStatusAlert } from './ServiceStatusAlert';

export interface OrderStatusFormProps {
  invoiceNumber: string;
  onInvoiceChange(invoice: string): void;
  onSubmit(): void;
  loading: boolean;
  error?: string;
}

export const OrderStatusForm: React.FC<OrderStatusFormProps> = ({
  invoiceNumber,
  onInvoiceChange,
  onSubmit,
  loading,
  error,
}) => {
  const renderError = () => {
    if (!error) return null;

    if (error.startsWith('SERVICE_UNAVAILABLE|')) {
      return (
        <ServiceStatusAlert message={error.split('|')[1]} type="unavailable" />
      );
    }

    if (error.startsWith('SERVER_ERROR|')) {
      return <ServiceStatusAlert message={error.split('|')[1]} type="error" />;
    }

    return (
      <p className="mt-4 text-red-600 font-medium bg-red-50 p-3 rounded border border-red-200">
        {error}
      </p>
    );
  };

  return (
    <section className="border border-[#ddd] rounded-md p-4 mb-5 bg-white shadow-sm">
      <h3 className="text-primary m-0 text-lg font-bold">
        Check Delivery Status
      </h3>
      <div className="my-3">
        <label htmlFor="invoice" className="font-medium text-gray-700">
          Invoice Number:{' '}
        </label>
        <input
          id="invoice"
          type="text"
          value={invoiceNumber}
          onChange={(event) => onInvoiceChange(event.target.value)}
          placeholder="000001"
          className="ml-1.5 p-1.5 border border-[#ccc] rounded text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary w-40"
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className={`bg-primary text-white border-none py-2 px-3.5 rounded cursor-pointer font-medium transition-opacity ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-hover'}`}
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check Status'}
      </button>
      {renderError()}
    </section>
  );
};
