"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/app";

export default function AssignmentCard({ assignment }: any) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
  try {
    await api.delete(`/assignment/${assignment._id}`);
    
    // Option 1 (quick)
    window.location.reload();

    // Option 2 (better)
    // call parent refresh function (we can improve later)

  } catch (error) {
    alert("Failed to delete");
  }
};

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 relative">
      
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">
          {assignment.title || "Quiz on Electricity"}
        </h3>

        {/* 3 dots */}
        <button onClick={() => setOpen(!open)}>⋮</button>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-4 top-10 bg-white shadow-md rounded-lg p-2 w-36 z-10">
          <p
            onClick={() => router.push(`/assignment/${assignment._id}`)}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            View Assignment
          </p>
          <p className="cursor-pointer text-red-500 hover:bg-gray-100 p-2 rounded" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}

      {/* Dates */}
      <div className="text-sm text-gray-500 mt-4 flex justify-between">
        <p>Assigned on: {assignment.createdAt?.slice(0, 10)}</p>
        <p>Due: {assignment.dueDate || "21-06-2025"}</p>
      </div>
    </div>
  );
}