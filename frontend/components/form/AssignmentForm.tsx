"use client";

import { useState } from "react";
import QuestionRow from "./QuestionRow";
import FileUpload from "./FileUpload";
import { api } from "@/lib/app";
import { useRouter } from "next/navigation";

export default function AssignmentForm() {
  const router = useRouter();

  const [rows, setRows] = useState([{ type: "MCQ", count: 2, marks: 1 }]);
  const [loading , setLoading] = useState(false);

  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Add Row
  const addRow = () => {
    setRows([...rows, { type: "MCQ", count: 1, marks: 1 }]);
  };

  // Update Row
  const updateRow = (index: number, newRow: any) => {
    const updated = [...rows];
    updated[index] = newRow;
    setRows(updated);
  };

  // Remove Row
  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // Totals
  const totalQuestions = rows.reduce((sum, r) => sum + r.count, 0);
  const totalMarks = rows.reduce((sum, r) => sum + r.count * r.marks, 0);

  // Submit
  const handleSubmit = async () => {
    setLoading(true);
    if (rows.length === 0) {
      alert("Add at least one question type");
      return;
    }

    for (let r of rows) {
      if (r.count <= 0 || r.marks <= 0) {
        alert("Invalid question values");
        return;
      }
    }

    if (!dueDate) {
      alert("Please select due date");
      return;
    }

    const res = await api.post("/assignment/create", {
      questionTypes: rows,
      instructions,
      dueDate,
    });

    router.push(`/assignment/${res.data.assignmentId}`);
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Assignment Details</h2>

      {/* File Upload */}
      <FileUpload />

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 mt-4 w-full rounded"
      />

      {/* Question Rows */}
      <div className="mt-4">
        <h3 className="font-medium">Question Types</h3>

        {rows.map((row, i) => (
          <QuestionRow
            key={i}
            row={row}
            index={i}
            updateRow={updateRow}
            removeRow={removeRow}
          />
        ))}

        <button onClick={addRow} className="mt-3 text-blue-500">
          + Add Question Type
        </button>
      </div>

      {/* Totals */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Total Questions: {totalQuestions}</p>
        <p>Total Marks: {totalMarks}</p>
      </div>

      {/* Instructions */}
      <textarea
        placeholder="Additional instructions..."
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="border p-2 mt-4 w-full rounded"
      />

      {/* Submit */}
      <button
        disabled={loading}
        className="mt-6 bg-black text-white px-6 py-2 rounded flex items-center gap-2"
      >
        {loading && (
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        {loading ? "Generating..." : "Generate Assignment"}
      </button>
    </div>
  );
}
