"use client";

import { useState } from "react";
import QuestionRow from "./QuestionRow";
import FileUpload from "./FileUpload";
import { api } from "@/lib/app";
import { useRouter } from "next/navigation";
import { CalendarDays, Mic } from "lucide-react";
import BottomNav from "../ui/Button";

export default function AssignmentForm() {
  const router = useRouter();

  const [rows, setRows] = useState([{ type: "MCQ", count: 2, marks: 1 }]);
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);

      const res = await api.post("/assignment/create", {
        questionTypes: rows,
        instructions,
        dueDate,
      });

      router.push(`/assignment/${res.data.assignmentId}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full justify-start px-4 md:px-8">
      <div className="flex gap-3 items-center mb-4">
  <div className="w-3 h-3 rounded-full bg-green-500"></div>

  <div className="flex flex-col">
    <p className="font-semibold text-lg md:text-xl">
      Create Assignment
    </p>
    <p className="text-gray-500 text-sm">
      Set up a new assignment for your students
    </p>
  </div>
</div>
      <div className="bg-white/80 rounded-2xl mt-8 border border-gray-200">
        <div className="w-full max-w-4xl mx-auto flex flex-col p-8 space-y-4">
          <div className="h-12.5 w-70 flex flex-col space-y-1">
            <p className="font-bricolage font-semibold text-[16px] leading-[1.4] tracking-[-0.04em]">
              Assignment Details
            </p>
            <p className="font-bricolage text-[16px] leading-[1.4] tracking-[-0.04em]">
              Basic information about your assignment
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-2">
            <FileUpload />
            <div className="font-bricolage text-[16px] leading-[1.4] tracking-[-0.04em]">
              Upload image of your preferred documents/images
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <p className="font-semibold text-[16px]">Due Date</p>

            <div className="mt-2 flex items-center justify-between border border-gray-300 bg-gray-50 rounded-xl px-4 h-12">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-700 appearance-none"
              />

              <CalendarDays className="h-5 w-5 text-gray-500" />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Header Row */}
            <div className="grid grid-cols-12 text-sm font-medium text-black px-2">
              <p className="col-span-6 font-semibold">Question Type</p>
              <p className="col-span-3 text-center font-semibold">
                No. of Questions
              </p>
              <p className="col-span-3 text-center font-semibold">Marks</p>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <QuestionRow
                key={i}
                row={row}
                index={i}
                updateRow={updateRow}
                removeRow={removeRow}
              />
            ))}

            {/* Add Button */}
            <button
              onClick={addRow}
              className="flex items-center gap-2 mt-4 text-gray-700 hover:text-black font-semibold"
            >
              <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center">
                +
              </div>
              Add Question Type
            </button>

            {/* Totals */}
            <div className="flex justify-end text-sm text-gray-600 mt-4">
              <div className="text-right font-bold">
                <p>Total Questions: {totalQuestions}</p>
                <p>Total Marks: {totalMarks}</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-6">
            <p className="font-semibold text-[16px] mb-2">
              Additional Information (For better output)
            </p>

            <div className="flex items-end justify-between bg-gray-100 rounded-2xl px-4 py-4">
              <textarea
                placeholder="e.g Generate a question paper for 3 hour exam duration..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full bg-transparent outline-none resize-none text-gray-700 placeholder:text-gray-400"
                rows={3}
              />

              {/* Mic Icon */}
              <button className="ml-3 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-200 transition">
                <Mic className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 bg-white pt-4 pb-2 w-full sm: mb-2">
        <BottomNav onNext={handleSubmit} />
      </div>
    </div>
  );
}
