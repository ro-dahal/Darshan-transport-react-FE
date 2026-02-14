import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  /** The canonical URL of the page to prevent duplicate content issues. */
  canonical?: string;
  /** Whether to tell search engines NOT to index this page (e.g. for error pages). */
  noindex?: boolean;
  /** Optional JSON-LD structured data for rich search results. */
  structuredData?: object;
}

/**
 * MetaTags Component
 * Standardizes SEO metadata (OpenGraph, Twitter, Meta Description) across the application.
 * Integrates with react-helmet-async to manage the document head.
 */
export const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'Darshan Transport | Fast & Reliable Logistics in Nepal',
  description = 'Moving your products anywhere in Nepal with speed and reliability. Tracking, logistics, and supply chain solutions.',
  image = '/LogoTab.png',
  url = window.location.href,
  type = 'website',
  canonical,
  noindex = false,
  structuredData,
}) => {
  const fullTitle = title.includes('Darshan') ? title : `${title} | Darshan Transport`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};
