"use client";

import { useEffect, useState } from "react";
import AssignmentCard from "@/components/assignment/AssignmentCard";
import { api } from "@/lib/app";
import { useRouter } from "next/navigation";

export default function Home() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Title + Search */}
      {/* 🔹 Empty State */}
      {assignments.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[65vh] text-center px-4">

          <div className="">
            <img src="/images/image2.png" className="h-75 w-75" />
          </div>

          <h3 className="text-xl font-semibold mb-2">
            No assignments yet
          </h3>

          <p className="text-gray-500 mb-4 max-w-md">
            Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
          </p>

          <button
            onClick={() => router.push("/create")}
            className="bg-black text-white px-6 py-2 rounded-full shadow cursor-pointer "
          >
            + Create Your First Assignment
          </button>

        </div>
      ) : (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((a) => (
            <AssignmentCard key={a._id} assignment={a} />
          ))}
        </div>
      )}

      <button
      onClick={() => router.push("/create")}
      className="fixed bottom-24 right-6 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center md:hidden z-50"
    >
      +
    </button>
    </div>
  );
}