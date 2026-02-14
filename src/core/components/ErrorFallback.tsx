import React from 'react';

interface ErrorFallbackProps {
  error?: Error;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-white rounded-lg shadow-sm border border-border-light">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-text-dark mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-text-medium mb-6 max-w-md mx-auto">
        We encountered an unexpected error. Please try refreshing the page or
        contact support if the problem persists.
      </p>
      {error && (
        <pre className="bg-bg-light p-4 rounded text-xs text-left overflow-auto max-w-full mb-6 border border-border-light text-red-800">
          <code>{error.message}</code>
        </pre>
      )}
      <button
        onClick={() => window.location.reload()}
        className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
      >
        Refresh Page
      </button>
    </div>
  );
};
