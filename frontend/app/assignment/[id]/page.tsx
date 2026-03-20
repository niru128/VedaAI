"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { api } from "@/lib/app";
import AssignmentPaper from "@/components/assignment/AssignmentPaper";

export default function AssignmentPage({ params }: any) {
  const [assignment, setAssignment] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleReady = async (data: any) => {
      if (data.assignmentId === params.id) {
        const res = await api.get(`/assignment/${params.id}`);
        setAssignment(res.data);
      }
    };

    const handleFail = () => {
      setError(true);
    };

    socket.on("assignment-ready", handleReady);
    socket.on("assignment-failed", handleFail);

    return () => {
      socket.off("assignment-ready", handleReady);
      socket.off("assignment-failed", handleFail);
    };
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Banner */}
      <div className="bg-black text-white p-4 rounded-lg mb-6 flex justify-between">
        <p>AI has generated your question paper successfully.</p>
        <button className="bg-white text-black px-3 py-1 rounded">
          Download PDF
        </button>
      </div>

      {/* Loader */}
      {error ? (
        <p className="text-red-500 text-center">
          Failed to generate assignment. Try again.
        </p>
      ) : !assignment ? (
        <p className="text-center">Generating...</p>
      ) : (
        <AssignmentPaper assignment={assignment} />
      )}
    </div>
  );
}
