import React from "react";

interface ServiceStatusAlertProps {
  message: string;
  type?: "unavailable" | "error";
}

export const ServiceStatusAlert: React.FC<ServiceStatusAlertProps> = ({
  message,
  type = "unavailable",
}) => {
  const isUnavailable = type === "unavailable";

  return (
    <div className={`service-status-alert ${type}`}>
      <div className="alert-icon">
        {isUnavailable ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
      </div>
      <div className="alert-content">
        <h4>
          {isUnavailable ? "Service Currently Unavailable" : "System Error"}
        </h4>
        <p>{message}</p>
      </div>

      <style>{`
        .service-status-alert {
          display: flex;
          align-items: center;
          padding: 16px;
          border-radius: 8px;
          margin: 20px 0;
          border: 1px solid;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .service-status-alert.unavailable {
          background-color: #fff9eb;
          border-color: #ffcc00;
          color: #856404;
        }

        .service-status-alert.error {
          background-color: #fff5f5;
          border-color: #feb2b2;
          color: #c53030;
        }

        .alert-icon {
          width: 40px;
          height: 40px;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .alert-icon svg {
          width: 100%;
          height: 100%;
        }

        .alert-content h4 {
          margin: 0 0 4px 0;
          font-size: 1.1rem;
          color: inherit;
        }

        .alert-content p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.4;
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};
