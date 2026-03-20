"use client";

export default function QuestionRow({ row, index, updateRow, removeRow }: any) {
  return (
    <div className="flex gap-3 items-center mt-3">
      
      {/* Type */}
      <select
        value={row.type}
        onChange={(e) =>
          updateRow(index, { ...row, type: e.target.value })
        }
        className="border p-2 rounded w-1/2"
      >
        <option>MCQ</option>
        <option>Short Answer</option>
        <option>Diagram</option>
        <option>Numerical</option>
      </select>

      {/* Count */}
      <input
        type="number"
        value={row.count}
        onChange={(e) =>
          updateRow(index, { ...row, count: Number(e.target.value) })
        }
        className="border p-2 w-20 rounded"
      />

      {/* Marks */}
      <input
        type="number"
        value={row.marks}
        onChange={(e) =>
          updateRow(index, { ...row, marks: Number(e.target.value) })
        }
        className="border p-2 w-20 rounded"
      />

      {/* Delete */}
      <button onClick={() => removeRow(index)} className="text-red-500">
        ✕
      </button>
    </div>
  );
}