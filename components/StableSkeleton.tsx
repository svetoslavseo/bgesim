import React from 'react';

interface StableSkeletonProps {
  type: 'hero' | 'card' | 'text' | 'image' | 'grid' | 'table';
  count?: number;
  className?: string;
}

const StableSkeleton: React.FC<StableSkeletonProps> = ({ type, count = 1, className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="relative bg-black py-20 md:py-32">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left space-y-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-12 bg-gray-700 rounded w-4/5"></div>
                  <div className="h-12 bg-gray-700 rounded w-3/5"></div>
                  <div className="h-6 bg-gray-600 rounded w-5/6"></div>
                  <div className="h-6 bg-gray-600 rounded w-4/6"></div>
                  <div className="h-12 bg-gray-600 rounded w-96 max-w-full"></div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="animate-pulse h-64 bg-gray-700 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        );

      case 'card':
        return Array.from({ length: count }).map((_, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 animate-pulse">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ));

      case 'text':
        return Array.from({ length: count }).map((_, index) => (
          <div key={index} className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
          </div>
        ));

      case 'image':
        return (
          <div className="animate-pulse bg-gray-200 rounded-lg aspect-video w-full"></div>
        );

      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'table':
        return (
          <div className="animate-pulse">
            {/* Table header */}
            <div className="grid grid-cols-4 gap-4 p-4 border-b">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
            {/* Table rows */}
            {Array.from({ length: count }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-4 p-4 border-b">
                {Array.from({ length: 4 }).map((_, colIndex) => (
                  <div key={colIndex} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            ))}
          </div>
        );

      default:
        return <div className="animate-pulse h-4 bg-gray-200 rounded"></div>;
    }
  };

  return <div className={className}>{renderSkeleton()}</div>;
};

export default StableSkeleton;