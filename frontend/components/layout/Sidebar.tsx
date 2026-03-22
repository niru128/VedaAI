"use client";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutGrid,
  Image,
  FileText,
  Square,
  PieChart,
  Settings,
} from "lucide-react";

const menu = [
  { name: "Home", icon: LayoutGrid, path: "/" },
  { name: "My Groups", icon: Image },
  { name: "Assignments", icon: FileText, path: "/assignment" },
  { name: "AI Teacher's Toolkit", icon: Square },
  { name: "My Library", icon: PieChart },
];

export default function Sidebar() {
  const pathName = usePathname();
  const router = useRouter();

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    
    <div className="hidden md:flex flex-col min-h-screen lg: h-186 w-76 justify-between p-6 rounded-2xl bg-white">
      <div className="w-62.75 h-120.25 space-y-14 flex flex-col">
        <div className="flex flex-row justify-start h-20 ">
          <img
            src="/images/image.png"
            alt="VedaAI"
            className="h-20 w-20 rounded-xl object-cover"
          />

          <h1 className="font-bricolage font-bold text-[28px]">VedaAI</h1>
        </div>

        <button
          className="flex h-10.5 w-62.75 justify-center cursor-pointer items-center gap-2 px-10.75 py-2 rounded-full bg-[#2A2A2A] text-white"
          onClick={() => router.push("/create")}
        >
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
          {menu.map((item, i) => {
            const IconComponent = item.icon;
            const isActive =
              (item.path === "/" && pathName === "/") ||
              (item.path === "/assignment" &&
                pathName.startsWith("/assignment"));
            return (
              <div
                key={i}
                onClick={() => item.path && handleMenuClick(item.path)}
                className={`flex items-center h-10 w-full rounded-lg px-3 py-2.25 gap-2 cursor-pointer 
                  ${
                    isActive
                      ? "bg-gray-100 text-black shadow-sm"
                      : "bg-white hover:bg-gray-100"
                  }
                `}
              >
                <IconComponent size={24} />
                <div className="font-bricolage font-normal text-[16px] leading-[1.4] tracking-[-0.04em]">
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-31.5 flex flex-col space-y-1 justify-start">
        <div className="h-9.5 py-2 px-3 flex space-x-2 items-center">
          <Settings size={20} />
          <p className="font-bricolage text-[16px] leading-[1.4] tracking-[-0.04em]">
            Settings
          </p>
        </div>

        <div className="h-20 rounded-2xl  gap-4  p-3 flex space-x-2 items-center bg-[#F5F5F5]">
          <img
            alt="profile"
            className="border-2 rounded-full h-14 w-14 object-cover"
          />

          <div className="flex flex-col justify-center">
            <p className="font-bricolage text-[16px] leading-[1.4] tracking-[-0.04em]">
              Delhi Public School
            </p>
            <p className="font-bricolage text-[14px] text-gray-500">
              Bokaro Steel City
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
