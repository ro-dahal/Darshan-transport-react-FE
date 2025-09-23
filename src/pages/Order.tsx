import React, { useState, useEffect } from "react";
import { fetchSeriesList, fetchDeliveryStatus } from "../api";
import type { DeliveryData } from "../api";
import {
  FaClipboardCheck,
  FaShippingFast,
  FaTruck,
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
];

// Timeline component
const OrderTimeline: React.FC<{ status: DeliveryData["status"] }> = ({ status }) => {
  const rawIndex = STATUS_STEPS.findIndex((step) => step.key === status);
  const clampedIndex = Math.max(0, Math.min(rawIndex, STATUS_STEPS.length - 1));
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateTrack = () => {
      const circles = el.querySelectorAll<HTMLElement>('.timeline-circle');
      if (circles.length === 0) return;
      const contRect = el.getBoundingClientRect();
      const firstRect = circles[0].getBoundingClientRect();
      const lastRect = circles[circles.length - 1].getBoundingClientRect();

      const firstCenterX = firstRect.left - contRect.left + firstRect.width / 2;
      const lastCenterX = lastRect.left - contRect.left + lastRect.width / 2;
      const centerY = firstRect.top - contRect.top + firstRect.height / 2;

      const trackHeight = 6; // match CSS
      const left = Math.max(0, firstCenterX);
      const right = Math.max(0, contRect.width - lastCenterX);
      const top = Math.max(0, centerY - trackHeight / 2);

      let progressWidth = 0;
      if (clampedIndex >= 0 && clampedIndex < circles.length) {
        const currentRect = circles[clampedIndex].getBoundingClientRect();
        const currentCenterX = currentRect.left - contRect.left + currentRect.width / 2;
        progressWidth = Math.max(0, currentCenterX - firstCenterX);
      }

      el.style.setProperty('--track-left', `${left}px`);
      el.style.setProperty('--track-right', `${right}px`);
      el.style.setProperty('--track-top', `${top}px`);
      el.style.setProperty('--track-progress', `${progressWidth}px`);
    };

    const rafUpdate = () => requestAnimationFrame(updateTrack);
    rafUpdate();

    let resizeRaf: number | null = null;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(updateTrack);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
    };
  }, [clampedIndex]);

  return (
    <div className="timeline-container" ref={containerRef}>
      {/* Desktop track and progress bar */}
      <div className="timeline-track" aria-hidden="true"></div>
      <div className="timeline-progress" aria-hidden="true"></div>

      {STATUS_STEPS.map((step, idx) => {
        let circleClass = "timeline-circle";
        if (idx < clampedIndex) circleClass += " done";
        else if (idx === clampedIndex) circleClass += " active";

        let lineClass = "timeline-line";
        if (idx < clampedIndex) lineClass += " done";

        return (
          <div className="timeline-step" key={step.key}>
            <div className={circleClass} aria-current={idx === clampedIndex ? "step" : undefined}>
              {step.icon}
            </div>
            {idx < STATUS_STEPS.length - 1 && <span className={lineClass}></span>}
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
        <div className="order-layout">
          {/* Contact Box */}
<div className="order-contact-box">
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
          <div className="order-right">
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
          :root { --accent: #fcaf17; --muted: #e6e6e6; }

          /* Layout */
          .order-layout {
            max-width: 1000px;
            margin: 30px auto 20px auto;
            padding: 0 16px;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 20px;
          }

          .order-contact-box {
            background: #fcaf17;
            color: #fff;
            border-radius: 6px;
            padding: 28px 20px;
            text-align: center;
          }

          /* Boxes */
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
            max-width: 720px;
            margin: 0 auto;
            user-select: none;
            position: relative;
            padding: 22px 10px 0;
          }
          .timeline-track {
            position: absolute;
            top: var(--track-top, 38px);
            left: var(--track-left, 28px);
            right: var(--track-right, 28px);
            height: 6px; /* keep in sync with JS */
            background: var(--muted);
            border-radius: 3px;
            z-index: 0;
            display: block;
          }
          .timeline-progress {
            position: absolute;
            top: var(--track-top, 38px);
            left: var(--track-left, 28px);
            height: 6px; /* keep in sync with JS */
            background: linear-gradient(90deg, #f3b33a, var(--accent));
            border-radius: 3px;
            z-index: 1;
            width: var(--track-progress, 0px);
            transition: width 0.25s ease;
          }
          .timeline-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            flex: 1;
            min-width: 110px;
            z-index: 2; /* above tracks */
          }
          .timeline-circle {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            color: #333;
            background: #fff;
            border: 3px solid var(--muted);
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease, transform 0.2s ease;
          }
          .timeline-circle.active,
          .timeline-circle.done {
            border-color: var(--accent);
            background: var(--accent);
            color: #fff;
          }
          .timeline-circle.active { transform: scale(1.03); }
          .timeline-label {
            margin-top: 8px;
            font-size: 14px;
            color: #222;
            font-weight: 600;
            text-align: center;
            min-height: 34px;
          }
          /* Per-step connector line: hidden on desktop in favor of track */
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
            display: none;
          }
          .timeline-line.done {
            background: var(--accent);
          }

          /* Responsive */
          @media (max-width: 900px) {
            .order-layout {
              grid-template-columns: 1fr;
              gap: 16px;
            }
            .order-contact-box {
              padding: 22px 16px;
              text-align: center;
            }
            .timeline-box {
              padding: 16px 8px;
            }
            .timeline-container {
              justify-content: flex-start;
              gap: 24px;
              overflow-x: auto;
              padding: 10px 6px 8px;
              scroll-snap-type: x mandatory;
            }
            /* Hide desktop track in mobile; rely on per-step connectors */
            .timeline-track, .timeline-progress { display: none; }
            .timeline-step {
              flex: 0 0 100px;
              min-width: 100px;
              scroll-snap-align: start;
            }
            .timeline-circle {
              width: 36px;
              height: 36px;
              font-size: 18px;
            }
            .timeline-line {
              display: block;
              top: 18px;
              height: 4px;
              width: calc(100% - 36px);
            }
            .timeline-label {
              font-size: 13px;
              min-height: 28px;
            }
          }
          `}
        </style>
      </section>
    </>
  );
};

export default Order;
