"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Settings
} from 'lucide-react';

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    color: "text-sky-500",
    icon: LayoutDashboard
  },
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-violet-500",
    icon: MessageSquare
  },
  {
    label: "Image Generation",
    href: "/image",
    color: "text-pink-700",
    icon: ImageIcon
  },
  {
    label: "Video Generation",
    href: "/video",
    color: "text-orange-700",
    icon: VideoIcon
  },
  {
    label: "Music Generation",
    href: "/music",
    color: "text-emerald-500",
    icon: Music
  },
  {
    label: "Code Generation",
    href: "/code",
    color: "text-green-700",
    icon: Code
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    bottom: true
  }
]

export default function Sidebar() {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full
    bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link 
          className="flex itrems-center pl-3 mb-14"
          href="/dashboard">
            <div className="relative w-8 h-8 mr-4">
              <Image 
                fill
                alt="Logo"
                src="/logo.png"
              />
            </div>
            <h1 className={cn("text-2xl font-bold", font.className)}>
              UBigAI
            </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link 
              href={route.href} 
              key={route.href}
              className="text-sm group flex p-3 w-full
              justify-start font-medium hover:text-white
              hover:bg-white/10 rounded-lg transition"  
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-6 h-6 mr-4", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) 
}