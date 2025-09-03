import React from 'react';

/**
 * A generic page skeleton shown while a lazily-loaded page component is being fetched on the client.
 * Keeps layout stable to minimise CLS by matching typical page structure: title, subtitle, body blocks.
 */
const PageSkeleton: React.FC = () => (
  <div role="status" aria-busy="true" className="animate-pulse space-y-6 p-4">
    {/* Title placeholder */}
    <div className="h-8 bg-gray-200 rounded w-3/4" />

    {/* Subtitle placeholder */}
    <div className="h-6 bg-gray-200 rounded w-1/2" />

    {/* Body blocks */}
    {Array.from({ length: 5 }).map((_, idx) => (
      <div key={idx} className="h-4 bg-gray-200 rounded w-full" />
    ))}

    {/* Image / card grid placeholder */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="h-32 bg-gray-200 rounded" />
      ))}
    </div>
  </div>
);

export default PageSkeleton; 