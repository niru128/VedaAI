"use client";

import { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";
import { api } from "@/lib/app";
import { useRouter } from "next/navigation";

interface Assignment {
  _id: string;
  title?: string;
  dueDate?: string;
  createdAt?: string;
}

export default function AssignmentsView() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const filteredAssignments = assignments.filter((a) =>
    a.title?.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await api.get("/assignment");
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4 md:px-6">
      <div className="mb-6">
        <p className="text-xl font-semibold">Assignments</p>
        <p className="text-gray-500 text-sm">
          Manage and create assignments for your classes
        </p>
      </div>

      <div className="flex justify-between items-center mb-6 px-4 h-15 rounded-xl bg-white">
        <p className="text-gray-500 text-sm">Filter By</p>

        <input
          placeholder="Search Assignment"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-full bg-transparent outline-none"
        />
      </div>

      { filteredAssignments.length==0 && assignments.length === 0 ? (
        
            <p className="text-center text-gray-500">
              No matching assignments found
            </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {filteredAssignments.map((a) => (
            <AssignmentCard key={a._id} assignment={a} />
          ))}
        </div>
      )}
      <div className="fixed bottom-6 left-0 md:left-64 right-0 flex justify-center z-50 pointer-events-none">
        <button
          onClick={() => router.push("/create")}
          className="pointer-events-auto bg-black text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-900 transition"
        >
          + Create Assignment
        </button>
      </div>
    </div>
  );
}
