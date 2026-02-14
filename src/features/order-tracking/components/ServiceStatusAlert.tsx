import React from 'react';

interface ServiceStatusAlertProps {
  message: string;
  type?: 'unavailable' | 'error';
}

export const ServiceStatusAlert: React.FC<ServiceStatusAlertProps> = ({
  message,
  type = 'unavailable',
}) => {
  const isUnavailable = type === 'unavailable';

  return (
    <div
      className={`flex items-center p-4 rounded-lg my-5 border animate-[slideIn_0.3s_ease-out] ${
        isUnavailable
          ? 'bg-[#fff9eb] border-[#ffcc00] text-[#856404]'
          : 'bg-[#fff5f5] border-[#feb2b2] text-[#c53030]'
      }`}
    >
      <div className="w-10 h-10 mr-4 shrink-0">
        {isUnavailable ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-full h-full"
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
            className="w-full h-full"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
      </div>
      <div className="flex-1">
        <h4 className="m-[0_0_4px_0] text-[1.1rem] font-bold text-inherit">
          {isUnavailable ? 'Service Currently Unavailable' : 'System Error'}
        </h4>
        <p className="m-0 text-[0.95rem] leading-[1.4] opacity-90">{message}</p>
      </div>
    </div>
  );
};
