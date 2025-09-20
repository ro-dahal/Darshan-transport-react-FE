import React, { useState, useEffect } from "react";
import { fetchSeriesList, fetchDeliveryStatus } from "../api";
import type { DeliveryData } from "../api";
import {
  FaClipboardCheck,
  FaShippingFast,
  FaTruck,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

// DeliveryData type now imported from api.ts

const STATUS_STEPS = [
  { key: "waiting", label: "Waiting", icon: <FaClipboardCheck /> },
  { key: "ongoing", label: "Ongoing", icon: <FaShippingFast /> },
  { key: "delivered", label: "Delivered", icon: <FaTruck /> },
  { key: "arrived", label: "Arrived", icon: <FaHome /> },
  { key: "successful", label: "Successful", icon: <FaClipboardCheck /> },
  { key: "error", label: "Error", icon: <FaClipboardCheck /> },
];

// Timeline component
const OrderTimeline: React.FC<{ status: DeliveryData["status"] }> = ({
  status,
}) => {
  const currentStep = STATUS_STEPS.findIndex((step) => step.key === status);

  return (
    <div className="timeline-container">
      {STATUS_STEPS.map((step, idx) => {
        let circleClass = "timeline-circle";
        if (idx < currentStep) circleClass += " done";
        else if (idx === currentStep) circleClass += " active";

        let lineClass = "timeline-line";
        if (idx < currentStep) lineClass += " done";

        return (
          <div className="timeline-step" key={step.key}>
            <div className={circleClass}>{step.icon}</div>
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

const Order: React.FC = () => {
  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [deliveryData, setDeliveryData] = useState<DeliveryData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchSeriesList()
      .then((fetchedSeries) => {
        setSeriesList(fetchedSeries);
        setSelectedSeries(fetchedSeries[0] || "");
      })
      .catch(() => {
        setSeriesList([]);
        setError("Failed to load series list.");
      });
  }, []);

  const checkStatus = async () => {
    if (!invoiceNumber.trim()) {
      setError("Please enter a valid invoice number.");
      setDeliveryData(null);
      return;
    }
    setError("");
    setLoading(true);
    setDeliveryData(null);
    try {
      const data = await fetchDeliveryStatus(selectedSeries, invoiceNumber);
      setDeliveryData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch delivery status.");
      } else {
        setError(String(err) || "Failed to fetch delivery status.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        id="about-us-header"
        style={{
          textAlign: "center",
          padding: "40px 20px 10px 20px",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Order Tracker</h1>
      </section>

      <section id="pageNotReadyBanner1">
        <div
          style={{
            maxWidth: 1000,
            margin: "30px auto 20px auto",
            fontFamily: "Montserrat, Arial, sans-serif",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "20px",
          }}
        >
          {/* Contact Box */}
<div
  style={{
    background: "#fcaf17",
    color: "#fff",
    borderRadius: 6,
    padding: "35px 20px",
    textAlign: "center",
  }}
>
  <h2 style={{ margin: "0 0 12px", fontSize: "1.8rem", fontWeight: "bold" }}>
    Get in touch!
  </h2>
  <p style={{ margin: "0 0 25px", fontSize: "1rem" }}>
    We’d love to hear from you.
  </p>

  {/* Email */}
  <div style={{ marginBottom: 22 }}>
    <FaEnvelope style={{ fontSize: "1.3rem", marginBottom: 6 }} />
    <div>Inquiry</div>
    <div style={{ fontWeight: 500 }}>info@darshan.com.np</div>
  </div>

  {/* Phone */}
  <div style={{ marginBottom: 22 }}>
    <FaPhone style={{ fontSize: "1.3rem", marginBottom: 6 }} />
    <div>Customer Care</div>
    <div style={{ fontWeight: 500 }}>01 4469203</div>
  </div>

  {/* Address */}
  <div style={{ marginBottom: 30 }}>
    <FaMapMarkerAlt style={{ fontSize: "1.3rem", marginBottom: 6 }} />
    <div>Address</div>
    <div style={{ fontWeight: 500 }}>Kapan, Kathmandu, Nepal</div>
  </div>

  {/* Social Media Icons */}
  <div
    style={{
      marginTop: 24,
      fontSize: "1.3rem",
      display: "flex",
      justifyContent: "center",
      gap: "30px",
    }}
  >
    <FaFacebook style={{ cursor: "pointer" }} />
    <FaLinkedin style={{ cursor: "pointer" }} />
    <FaInstagram style={{ cursor: "pointer" }} />
    <FaYoutube style={{ cursor: "pointer" }} />
  </div>
</div>

          {/* Right Column */}
          <div>
            {/* Location Section */}
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 6,
                padding: 16,
                marginBottom: 20,
                background: "#fff",
              }}
            >
              <h3 style={{ color: "#fcaf17", margin: 0 }}>Location</h3>
              <div style={{ marginTop: 10 }}>
                <label htmlFor="series">Select Location: </label>
                <select
                  id="series"
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  style={{
                    padding: 6,
                    marginLeft: 5,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                  }}
                >
                  {seriesList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Delivery Status Section */}
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 6,
                padding: 16,
                marginBottom: 20,
                background: "#fff",
              }}
            >
              <h3 style={{ color: "#fcaf17", margin: 0 }}>
                Check Delivery Status
              </h3>
              <div style={{ margin: "12px 0" }}>
                <label>Invoice Number: </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
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
                onClick={checkStatus}
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
              {error && <p style={{ marginTop: 15, color: "red" }}>{error}</p>}
            </div>

            {/* Timeline + Delivery Info */}
            {deliveryData && (
              <div style={{ marginBottom: 20 }}>
                <div className="timeline-box">
                  <OrderTimeline status={deliveryData.status} />
                </div>
                <div className="delivery-info-box">
                  <span className="delivery-title">Delivery Information:</span>
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
              </div>
            )}
          </div>
        </div>

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
            padding: 18px 16px;
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
            margin: 0 auto;
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
          .timeline-circle.active,
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
      </section>
    </>
  );
};

export default Order;
