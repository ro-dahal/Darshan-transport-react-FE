import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '../../../../core/components/MetaTags';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <MetaTags
        title="Page Not Found"
        description="The page you are looking for does not exist."
        noindex={true}
      />
      <h1 className="text-[4rem] text-primary mb-4 font-bold">404</h1>
      <h2 className="text-[2rem] mb-4 font-bold text-gray-800">
        Page Not Found
      </h2>
      <p className="mb-8 text-gray-600 text-lg">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-md transition-colors hover:bg-primary-hover decoration-none"
      >
        Back to Home
      </Link>
    </div>
  );
};
