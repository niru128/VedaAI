import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

const QUESTION_TYPES = [
  "Multiple Choice Questions",
  "Diagram or Graph based Questions",
  "Short Answer",
  "Numerical Problems",
  "Long Answer",
];

interface QuestionRowData {
  type: string;
  count: number;
  marks: number;
}

interface QuestionRowProps {
  row: QuestionRowData;
  index: number;
  updateRow: (index: number, row: QuestionRowData) => void;
  removeRow: (index: number) => void;
}

export default function QuestionRow({
  row,
  index,
  updateRow,
  removeRow,
}: QuestionRowProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof QuestionRowData, value: number) => {
    updateRow(index, { ...row, [field]: value });
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      
      {/* Question Type */}
      <div className="md:col-span-6 col-span-1 relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-full px-5 h-12 cursor-pointer"
        >
          <span className="text-gray-700 font-semibold">{row.type}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>

        {open && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-md rounded-xl border z-20 overflow-hidden">
            {QUESTION_TYPES.map((type) => (
              <div
                key={type}
                onClick={() => {
                  updateRow(index, { ...row, type });
                  setOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Count */}
      <div className="md:col-span-2 col-span-1">
        <div className="flex items-center justify-between bg-gray-100 rounded-full px-4 h-12 gap-3">
          <button
            onClick={() => update("count", Math.max(1, row.count - 1))}
            className="text-gray-500 hover:text-black text-lg"
          >
            −
          </button>

          <span className="font-semibold text-gray-800">{row.count}</span>

          <button
            onClick={() => update("count", row.count + 1)}
            className="text-gray-500 hover:text-black text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Marks */}
      <div className="md:col-span-2 col-span-1">
        <div className="flex items-center justify-between bg-gray-100 rounded-full px-4 h-12">
          <button
            onClick={() => update("marks", Math.max(1, row.marks - 1))}
            className="text-gray-500 hover:text-black text-lg"
          >
            −
          </button>

          <span className="font-semibold text-gray-800">{row.marks}</span>

          <button
            onClick={() => update("marks", row.marks + 1)}
            className="text-gray-500 hover:text-black text-lg"
          >
            +
          </button>
        </div>
      </div>

      <div className="md:col-span-2 col-span-1 flex justify-center">
        <button
          onClick={() => removeRow(index)}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}