import React from 'react';

interface ErrorFallbackProps {
  error?: Error;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const [errorType, displayMessage] = React.useMemo(() => {
    if (error?.message?.includes('|')) {
      const parts = error.message.split('|');
      return [parts[0], parts[1]];
    }
    return [null, error?.message || 'We encountered an unexpected error.'];
  }, [error]);

  const isServiceUnavailable = errorType === 'SERVICE_UNAVAILABLE';

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-white rounded-lg shadow-sm border border-border-light">
      <div
        className={`w-16 h-16 ${isServiceUnavailable ? 'bg-amber-100' : 'bg-red-100'} rounded-full flex items-center justify-center mb-6`}
      >
        <svg
          className={`w-10 h-10 ${isServiceUnavailable ? 'text-amber-600' : 'text-red-600'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isServiceUnavailable
                ? 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                : 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            }
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-text-dark mb-2">
        {isServiceUnavailable
          ? 'Temporarily Unavailable'
          : 'Oops! Something went wrong'}
      </h2>
      <p className="text-text-medium mb-6 max-w-md mx-auto">
        {isServiceUnavailable
          ? 'Our systems are undergoing brief maintenance to improve your experience. Please try again in a few minutes.'
          : 'We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.'}
      </p>
      {error && (
        <pre className="bg-bg-light p-4 rounded text-xs text-left overflow-auto max-w-full mb-6 border border-border-light text-red-800">
          <code>{displayMessage}</code>
        </pre>
      )}
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          {isServiceUnavailable ? 'Try Again' : 'Refresh Page'}
        </button>
        <a
          href="/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};
