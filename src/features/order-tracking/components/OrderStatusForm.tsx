import React from "react";
import { ServiceStatusAlert } from "./ServiceStatusAlert";

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

    if (error.startsWith("SERVICE_UNAVAILABLE|")) {
      return (
        <ServiceStatusAlert message={error.split("|")[1]} type="unavailable" />
      );
    }

    if (error.startsWith("SERVER_ERROR|")) {
      return <ServiceStatusAlert message={error.split("|")[1]} type="error" />;
    }

    return <p style={{ marginTop: 15, color: "red" }}>{error}</p>;
  };

  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: 16,
        marginBottom: 20,
        background: "#fff",
      }}
    >
      <h3 style={{ color: "#fcaf17", margin: 0 }}>Check Delivery Status</h3>
      <div style={{ margin: "12px 0" }}>
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
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        style={{
          backgroundColor: "#fcaf17",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: 4,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Status"}
      </button>
      {renderError()}
    </section>
  );
};
