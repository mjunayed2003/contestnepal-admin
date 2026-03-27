"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Trophy,
  FileStack,
  Activity,
  BarChart3,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/users", label: "Users", icon: Users },
      { href: "/organizers", label: "Organizers", icon: Building2 },
      { href: "/contests", label: "Contests", icon: Trophy },
      { href: "/submissions", label: "Submissions", icon: FileStack },
      { href: "/monitoring", label: "Monitoring", icon: Activity },
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Other",
    items: [
      { href: "/report", label: "Report", icon: FileText },
      { href: "/setting", label: "Setting", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[210px] flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-[72px] items-center justify-center border-b border-gray-200 px-5">
        <Image src="/images/logo.svg" alt="Logo" width={80} height={24} />
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-5">
        {menuItems.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-[#9B1C1C] text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-white" : "text-gray-500"}`}
                      />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 px-3 py-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#9B1C1C] transition-all duration-150 hover:bg-red-50">
          <LogOut className="h-[18px] w-[18px]" />
          Log Out
        </button>
      </div>
    </aside>
  );
}