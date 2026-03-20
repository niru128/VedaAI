import React from "react";
const menu = [
  {name : "Home" , icon : ""},
  {name : "My Groups", icon : ""},
  {name : "Assignments", icon : ""},
  {name : "AI Teacher's Tookkit" , icon : ""},
  {name : "My Library" , icon : ""}
]

export default function Sidebar() {
  return (
    <div className="flex flex-col h-189 w-76 justify-between p-6 bg-[#FFFFFF] ">
      <div className="w-62.75 h-120.25 gap-56 flex flex-col">
        <div className="flex flex-row gap-2 h-10 w-full">
          <h1 className="font-bricolage font-bold text-[28px]">VedaAI</h1>
        </div>

        <button className="flex h-10.5 w-62.75 justify-center cursor-pointer items-center gap-2 px-10.75 py-2 rounded-full bg-[#2A2A2A] text-white">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zm6 10l.75 2.25L21 15l-2.25.75L18 18l-.75-2.25L15 15l2.25-.75L18 12zM6 12l.75 2.25L9 15l-2.25.75L6 18l-.75-2.25L3 15l2.25-.75L6 12z" />
          </svg>

          {/* Text */}
          <span className="font-inter font-medium text-[16px] leading-7 tracking-[-0.04em]">
            Create Assignment
          </span>
        </button>

        <div className="flex flex-col w-full h-56 gap-2">
          {
            menu.map((item , i)=>(
              <div key={i} className="h-10 w-full rounded-lg px-3 py-2.25 gap-2 cursor-pointer">

                  <span className="w-[5.83px] h-[5.83px] border-2">{item.icon}</span>
                  <span className="font-bricolage font-normal text-[16px] leading-[1.4] tracking-[-0.04em]">{item.name}</span>
                
              </div>>
            ))
          }

        </div>
      </div>
    </div>
  );
}
