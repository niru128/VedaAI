"use client";

import { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      
      {/* Upload Box */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition"
      >
        <UploadCloud className="h-8 w-8 text-gray-500 mb-3" />

        <p className="text-gray-700 font-medium">
          Choose a file or drag & drop it here
        </p>

        <p className="text-sm text-gray-400 mt-1">
          JPEG, PNG, upto 10MB
        </p>

        <button
          onClick={() => inputRef.current?.click()}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300"
        >
          Browse Files
        </button>

        <input
          type="file"
          ref={inputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFile(e.target.files?.[0] ?? null)
          }
          className="hidden"
        />
      </div>

      {/* File Preview */}
      {file && (
        <p className="mt-3 text-sm text-gray-600">
          Selected: {file.name}
        </p>
      )}
    </div>
  );
}