// import React from 'react'
import { ArrowLeft, LayoutGrid, Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <div className='fixed w-275 h-14.5 rounded-2xl pr-3 pl-6  flex items-center justify-center space-x-2.5 bg-white/75'>
        <div className="h-10 w-10 gap-3">
            <ArrowLeft className="h-6 w-6" />
        </div>

        <div className="w-200.25 h-5 flex flex-row gap-2 ">
            <LayoutGrid className="h-5 w-5 " />
            <p className="font-bricolage font-semibold text-base leading-none tracking-[-0.04em] text-[#A9A9A9] background: rgba(169, 169, 169, 1);">Assignment</p>
        </div>
        <div className="h-12 w-12 rounded-[100px] gap-2.5 bg-white/20">
            <Bell size={24} />
        </div>

        <div className="h-11 w-39.25 rounded-xl py-2.5 px-3 gap-2 flex flex-row">
            <img />
            <div className="flex flex-row">
                <p className="h-4.75 w-16.25 font-bricolage font-semibold text-base leading-none tracking-[-0.04em] text-[#303030]">John Doe</p>
                <ChevronDown className="h-6 w-6" />
            </div>
        </div>
    </div>
  )
}
