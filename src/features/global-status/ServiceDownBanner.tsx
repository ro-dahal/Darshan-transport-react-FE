import React from "react";
import { useGlobalStatus } from "./useGlobalStatus";

export const ServiceDownBanner: React.FC = () => {
  const { siteHealthy, lastChecked, checkNow } = useGlobalStatus();

  if (siteHealthy) return null;

  return (
    <div
      style={{
        background: "#fff9eb",
        borderBottom: "1px solid #ffcc00",
        color: "#856404",
        padding: "10px 16px",
        textAlign: "center",
        position: "sticky",
        top: 0,
        zIndex: 2000,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            style={{ flexShrink: 0 }}
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div>
            <strong>Service temporarily unavailable</strong>
            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>
              The API is currently under maintenance. We&rsquo;re working to
              restore service.
              {lastChecked && (
                <span style={{ marginLeft: 8 }}>
                  (checked {lastChecked.toLocaleTimeString()})
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => checkNow()}
            style={{
              background: "#fff",
              border: "1px solid #ffcc00",
              color: "#856404",
              padding: "6px 10px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};
