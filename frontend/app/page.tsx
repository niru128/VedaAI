"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import AssignmentCard from "@/components/assignment/AssignmentCard";
import { api } from "@/lib/app";
import { useRouter } from "next/navigation";

export default function Home() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await api.get("/assignment"); // you must create this API
    setAssignments(res.data);
  };

  return (
    <div className="h-full w-full bg-linear-to-b from-[#EEEEEE] to-[#DADADA] p-6">
      
      <Header />

      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Assignments</h2>

        {/* Search */}
        <input
          placeholder="Search Assignment"
          className="border px-4 py-2 rounded-full w-64"
        />
      </div>

      {/* Grid */}
      {assignments.length === 0 ? (
        <p>No assignments found</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {assignments.map((a) => (
            <AssignmentCard key={a._id} assignment={a} />
          ))}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => router.push("/create")}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg"
      >
        + Create Assignment
      </button>

    </div>
  );
}