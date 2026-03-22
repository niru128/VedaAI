import { ArrowLeft, ArrowRight } from "lucide-react";

interface BottomNavProps {
  onNext?: () => void;
}

export default function BottomNav({ onNext }: BottomNavProps) {
  return (
    <div className="mt-8 flex items-center justify-between">

      {/* Previous */}
      <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
        <ArrowLeft className="h-4 w-4" />
        Previous
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white hover:bg-gray-900 transition"
      >
        Next
        <ArrowRight className="h-4 w-4" />
      </button>

    </div>
  );
}