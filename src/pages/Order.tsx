import React, { useState, useEffect } from "react";
import {
  FaClipboardCheck,
  FaShippingFast,
  FaTruck,
  FaHome,
} from "react-icons/fa";

interface DeliveryData {
  status: "confirmed" | "shipped" | "out_for_delivery" | "delivered";
  consigner: string;
  consignee: string;
  from: string;
  to: string;
}

const STATUS_STEPS = [
  {
    key: "confirmed",
    label: "Order Confirmed",
    icon: <FaClipboardCheck />,
  },
  {
    key: "shipped",
    label: "Order Shipped",
    icon: <FaShippingFast />,
  },
  {
    key: "out_for_delivery",
    label: "Out for Delivery",
    icon: <FaTruck />,
  },
  {
    key: "delivered",
    label: "Order Delivered",
    icon: <FaHome />,
  },
];

const Order: React.FC = () => {
  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [deliveryData, setDeliveryData] = useState<DeliveryData | null>(null);
  const [error, setError] = useState<string>("");

  // API base (Vite environment variable) - falls back to same origin
  // Set VITE_API_URL to e.g. 'http://backend-host:3000' or 'https://api.example.com'
  const API_BASE = (import.meta.env as any).VITE_API_URL || window.location.origin;

  // Helper: try multiple candidate URLs in order until one returns OK
  const fetchFirstOk = async (candidates: string[]) => {
    let lastErr: any = null;
    for (const url of candidates) {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          lastErr = new Error(`HTTP ${res.status} from ${url}`);
          continue;
        }
        const json = await res.json().catch(() => null);
        return { url, json };
      } catch (err) {
        lastErr = err;
        continue;
      }
    }
    throw lastErr || new Error('No candidate succeeded');
  };

  // Fetch series from backend
  const fetchSeries = async () => {
    try {
      const candidates = [
        // prefer the documented API path
        `${API_BASE}/api/series`,
        `${API_BASE}/api/v1/series`,
        // legacy mounts
        `${API_BASE}/api/delivery/series`,
        `${API_BASE}/delivery/series`,
        // direct legacy endpoint
        `${API_BASE}/api/series`
      ];
      const { json } = await fetchFirstOk(candidates);
      const fetchedSeries = json?.data || json || [];
      if (!Array.isArray(fetchedSeries) || fetchedSeries.length === 0) {
        const defaults = ["KTM", "PKR", "BKT"];
        setSeriesList(defaults);
        setSelectedSeries(defaults[0]);
      } else {
        setSeriesList(fetchedSeries);
        setSelectedSeries(fetchedSeries[0]);
      }
    } catch (err) {
      console.error('fetchSeries error', err);
      const defaults = ["KTM", "PKR", "BKT"];
      setSeriesList(defaults);
      setSelectedSeries(defaults[0]);
    }
  };

  useEffect(() => {
    fetchSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkStatus = () => {
    if (!invoiceNumber.trim()) {
      setError("Please enter a valid invoice number.");
      setDeliveryData(null);
      return;
    }
    (async () => {
      setError("");
      try {
        const statusCandidates = [
          `${API_BASE}/api/delivery-status/${encodeURIComponent(selectedSeries)}/${encodeURIComponent(invoiceNumber)}`,
          `${API_BASE}/api/v1/delivery-status/${encodeURIComponent(selectedSeries)}/${encodeURIComponent(invoiceNumber)}`,
          `${API_BASE}/api/delivery/status/${encodeURIComponent(selectedSeries)}/${encodeURIComponent(invoiceNumber)}`,
          `${API_BASE}/delivery/status/${encodeURIComponent(selectedSeries)}/${encodeURIComponent(invoiceNumber)}`,
          // legacy path
          `${API_BASE}/api/delivery/status/${encodeURIComponent(selectedSeries)}/${encodeURIComponent(invoiceNumber)}`
        ];
        const { json } = await fetchFirstOk(statusCandidates);
        const data = json?.data || json;
        if (!data) throw new Error('No data in response');
        setDeliveryData(data as DeliveryData);
      } catch (err: any) {
        console.error('checkStatus error', err);
        setDeliveryData(null);
        setError(err?.message || 'Failed to fetch delivery status.');
      }
    })();
  };

  return (
    <section id="pageNotReadyBanner">
      <div style={{ maxWidth: 650, margin: "20px auto", fontFamily: "Montserrat, Arial, sans-serif" }}>
        {/* Fetch Series Section */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <span className="delivery-title"><h3>Location</h3></span>
          {/* <button
            onClick={fetchSeries}
            style={{
              backgroundColor: "#fcaf17",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Fetch Available Series
          </button> */}
          <div style={{ marginTop: 10 }}>
            <label htmlFor="series">Select Location: </label>
            <select
              id="series"
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              style={{ padding: 6, marginLeft: 5 }}
            >
              {seriesList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Check Delivery Status Section */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <span className="delivery-title"><h3>Check Delivery Status</h3></span><br></br>
          <div style={{ marginBottom: 10 }}>
            <label>Location: </label>
            <input
              type="text"
              value={selectedSeries}
              readOnly
              style={{ marginLeft: 5, padding: 6 }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Invoice Number: </label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="000001"
              style={{ marginLeft: 5, padding: 6 }}
            />
          </div>
          <button
            onClick={checkStatus}
            style={{
              backgroundColor: "#fcaf17",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Check Status
          </button>
          {error && (
            <p style={{ marginTop: 15, color: "red" }}>{error}</p>
          )}
        </div>

        {/* Timeline and Delivery Info in separate boxes */}
        {deliveryData && (
          <div style={{ marginBottom: 20 }}>
            {/* Timeline Box */}
            <div className="timeline-box">
              <OrderTimeline status={deliveryData.status} />
            </div>
            {/* Delivery Info Box */}
            <div className="delivery-info-box">
              <span className="delivery-title">Delivery Information:</span>
              <div>
                <b>Series:</b> {selectedSeries}
              </div>
              <div>
                <b>Invoice Number:</b> {invoiceNumber}
              </div>
              <div>
                <b>Status:</b> {deliveryData.status.replace(/_/g, " ")}
              </div>
              <div>
                <b>Consigner:</b> {deliveryData.consigner}
              </div>
              <div>
                <b>Consignee:</b> {deliveryData.consignee}
              </div>
              <div>
                <b>From:</b> {deliveryData.from}
              </div>
              <div>
                <b>To:</b> {deliveryData.to}
              </div>
            </div>
            {/* Styles */}
            <style>
              {`
              .timeline-box {
                border: 1px solid #fcaf17;
                border-radius: 6px;
                padding: 22px 10px 18px 10px;
                background: #fff;
                margin-bottom: 18px;
              }
              .delivery-info-box {
                border: 1px solid #fcaf17;
                border-radius: 6px;
                padding: 18px 16px 18px 16px;
                background: #fff;
                font-size: 1.08rem;
              }
              .delivery-title {
                color: #fcaf17;
                font-size: 1.25rem;
                font-weight: bold;
                margin-bottom: 8px;
                display: block;
              }
              .timeline-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                max-width: 600px;
                margin: 0 auto 0 auto;
                user-select: none;
              }
              .timeline-step {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                flex: 1;
                min-width: 100px;
              }
              .timeline-circle {
                width: 48px;
                height: 48px;
                background: #ccc;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
                position: relative;
                z-index: 2;
                box-shadow: 0 2px 5px rgba(0,0,0,0.07);
                transition: background 0.3s;
              }
              .timeline-circle.active {
                background: #fcaf17;
                color: #fff;
              }
              .timeline-circle.done {
                background: #fcaf17;
                color: #fff;
              }
              .timeline-label {
                margin-top: 8px;
                font-size: 15px;
                color: #333;
                font-weight: 500;
                text-align: center;
                min-height: 34px;
              }
              .timeline-line {
                position: absolute;
                top: 24px;
                left: 100%;
                width: calc(100% - 48px);
                height: 6px;
                background: #ccc;
                z-index: 1;
                border-radius: 3px;
                transition: background 0.3s;
              }
              .timeline-line.done {
                background: #fcaf17;
              }
              `}
            </style>
          </div>
        )}
      </div>
    </section>
  );
};

// Timeline visual component
const OrderTimeline: React.FC<{ status: DeliveryData["status"] }> = ({ status }) => {
  const currentStep = STATUS_STEPS.findIndex((step) => step.key === status);

  return (
    <div className="timeline-container">
      {STATUS_STEPS.map((step, idx) => {
        let circleClass = "timeline-circle";
        if (idx < currentStep) circleClass += " done";
        else if (idx === currentStep) circleClass += " active";
        // Line color logic
        let lineClass = "timeline-line";
        if (idx < currentStep) lineClass += " done";
        return (
          <div className="timeline-step" key={step.key}>
            <div className={circleClass}>
              {step.icon}
            </div>
            {idx < STATUS_STEPS.length - 1 && (
              <span className={lineClass}></span>
            )}
            <span className="timeline-label">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Order;