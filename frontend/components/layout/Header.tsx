// import React from 'react'
import { ArrowLeft, LayoutGrid, Bell, ChevronDown, Menu } from "lucide-react";

export default function Header({onToggleSidebar} : any) {
  return (
    <div className="sticky top-0 z-50 h-14 px-4 md:px-6 flex items-center justify-between bg-white/75 backdrop-blur-md rounded-xl">
      {/* LEFT */}
      <div className="flex items-center gap-4">

        <Menu
          className="h-6 w-6 md:hidden cursor-pointer"
          onClick={onToggleSidebar}
        />
        <ArrowLeft className="h-6 w-6" />

        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5" />
          <p className="font-semibold text-gray-500">Assignment</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <Bell className="h-5 w-5" />

        <div className="flex items-center gap-2">
          <img className="h-8 w-8 rounded-full border-2" />

          {/* Hide name on mobile */}
          <p className="hidden md:block font-semibold">John Doe</p>

          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
