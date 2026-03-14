// src/components/SkeletonLoader.jsx
import React from "react";

/**
 * Reusable Skeleton Loader component.
 * @param {string} type - 'text', 'line', 'rect', 'circle', 'card', 'sidebar'
 */
const SkeletonLoader = ({ type = "text", count = 1, className = "" }) => {
  const baseClass = "bg-gray-200 animate-pulse rounded";

  const renderSkeleton = (index) => {
    switch (type) {
      case "line":
        return <div key={index} className={`${baseClass} h-4 w-full ${className}`} />;
      case "rect":
        return <div key={index} className={`${baseClass} h-20 w-full ${className}`} />;
      case "circle":
        return <div key={index} className={`${baseClass} h-10 w-10 !rounded-full ${className}`} />;
      case "sidebar":
        return (
          <div key={index} className="space-y-4">
            <div className={`${baseClass} h-10 w-full mb-6`} />
            <div className="grid grid-cols-5 gap-2">
              {[...Array(25)].map((_, i) => (
                <div key={i} className={`${baseClass} h-10 w-full`} />
              ))}
            </div>
          </div>
        );
      case "card":
        return (
          <div key={index} className={`${baseClass} h-64 w-full rounded-xl ${className}`} />
        );
      default:
        return <div key={index} className={`${baseClass} h-4 w-3/4 ${className}`} />;
    }
  };

  return (
    <div className="space-y-3 w-full">
      {[...Array(count)].map((_, i) => renderSkeleton(i))}
    </div>
  );
};

export default SkeletonLoader;
