import { LayoutGrid, FileText, PieChart, Square } from "lucide-react";

export default function MobileNav() {
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-black text-white rounded-2xl flex justify-around py-3 md:hidden z-50">
      
      <div className="flex flex-col items-center text-xs">
        <LayoutGrid size={18} />
        Home
      </div>

      <div className="flex flex-col items-center text-xs">
        <FileText size={18} />
        Assignments
      </div>

      <div className="flex flex-col items-center text-xs">
        <PieChart size={18} />
        Library
      </div>

      <div className="flex flex-col items-center text-xs">
        <Square size={18} />
        AI Toolkit
      </div>

    </div>
  );
}