import React from "react";

const HeroSectionSkeleton = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center">
      {/* Background Skeleton */}
      <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>

      {/* Content Skeleton */}
      <div className="relative z-10 max-w-3xl px-6 flex flex-col items-center">
        {/* Title Skeleton */}
        <div className="h-10 w-3/4 bg-gray-400 animate-pulse rounded-md"></div>
        <div className="h-10 w-2/4 bg-gray-400 animate-pulse rounded-md mt-2"></div>

        {/* Subtitle Skeleton */}
        <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded-md mt-4"></div>
        <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded-md mt-2"></div>

        {/* Buttons Skeleton */}
        <div className="mt-6 flex gap-4">
          <div className="h-10 w-40 bg-gray-400 animate-pulse rounded-md"></div>
          <div className="h-10 w-40 bg-gray-400 animate-pulse rounded-md"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSkeleton;
