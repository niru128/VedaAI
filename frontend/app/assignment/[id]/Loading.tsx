export default function Loading() {
  return (
    <div className="p-6 animate-pulse">
      
      {/* Banner skeleton */}
      <div className="h-16 bg-gray-300 rounded mb-6"></div>

      {/* Paper skeleton */}
      <div className="bg-white p-6 rounded-lg space-y-4">
        <div className="h-6 bg-gray-300 w-1/2 mx-auto"></div>
        <div className="h-4 bg-gray-200 w-1/3 mx-auto"></div>

        <div className="mt-6 space-y-3">
          <div className="h-4 bg-gray-200 w-full"></div>
          <div className="h-4 bg-gray-200 w-5/6"></div>
          <div className="h-4 bg-gray-200 w-4/6"></div>
        </div>
      </div>

    </div>
  );
}