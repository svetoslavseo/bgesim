import React from 'react';

interface ContentSkeletonProps {
  lines?: number;
  showImage?: boolean;
  className?: string;
}

const ContentSkeleton: React.FC<ContentSkeletonProps> = ({ 
  lines = 3, 
  showImage = false, 
  className = '' 
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {showImage && (
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            {index === lines - 1 && (
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentSkeleton;