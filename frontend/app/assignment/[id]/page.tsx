"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { api } from "@/lib/app";
import AssignmentPaper from "@/components/assignment/AssignmentPaper";
import { useParams } from "next/navigation";

export default function AssignmentPage() {
  const [assignment, setAssignment] = useState<any>(null);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
  if (!params?.id) return;

  const interval = setInterval(async () => {
    try {
      const res = await api.get(`/assignment/${params.id}`);
      console.log("API RESPONSE:", res.data);

      if (res.data?.status === "completed") {
        setAssignment(res.data);
        clearInterval(interval); // ✅ stop polling
      }
    } catch (err) {
      console.log(err);
    }
  }, 2000); // every 2 seconds

  return () => clearInterval(interval);
}, [params.id]);
  return (
    <div className="p-6 bg-gray-100">
      {/* Banner */}
      <div className="bg-black text-white p-4 rounded-xl mb-6 flex flex-col space-y-2 h-25">
        <p>Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:</p>
        <button className="bg-white text-black px-3 py-1 rounded-full w-50">
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
