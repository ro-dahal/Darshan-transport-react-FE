import React from 'react';

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
}) => (
  <section
    style={{
      border: '1px solid #ddd',
      borderRadius: 6,
      padding: 16,
      marginBottom: 20,
      background: '#fff',
    }}
  >
    <h3 style={{ color: '#fcaf17', margin: 0 }}>Check Delivery Status</h3>
    <div style={{ margin: '12px 0' }}>
      <label htmlFor="invoice">Invoice Number: </label>
      <input
        id="invoice"
        type="text"
        value={invoiceNumber}
        onChange={(event) => onInvoiceChange(event.target.value)}
        placeholder="000001"
        style={{
          marginLeft: 5,
          padding: 6,
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      />
    </div>
    <button
      type="button"
      onClick={onSubmit}
      style={{
        backgroundColor: '#fcaf17',
        color: 'white',
        border: 'none',
        padding: '8px 14px',
        borderRadius: 4,
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
      }}
      disabled={loading}
    >
      {loading ? 'Checking...' : 'Check Status'}
    </button>
    {error && <p style={{ marginTop: 15, color: 'red' }}>{error}</p>}
  </section>
);
