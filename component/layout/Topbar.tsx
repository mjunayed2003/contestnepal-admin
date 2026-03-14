"use client";

import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const pageTitles: Record<string, string> = {
  "/":            "Dashboard",
  "/users":       "User Management",
  "/organizers":  "Organizers",
  "/contests":    "Contests",
  "/submissions": "Submissions",
  "/monitoring":  "Monitoring",
  "/analytics":   "Analytics",
  "/support":     "Support",
  "/report":      "Report",
  "/setting":     "Setting",
};

function getTitle(pathname: string): string {
  // exact match first
  if (pageTitles[pathname]) return pageTitles[pathname];
  // match by prefix (e.g. /users/123 → "User Management")
  const matched = Object.keys(pageTitles)
    .filter((key) => key !== "/" && pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];
  return matched ? pageTitles[matched] : "Dashboard";
}

export function Topbar() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="fixed left-[210px] right-0 top-0 z-20 flex h-[72px] items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left: Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">Welcome back, Admin</p>
      </div>

      {/* Right: Search + Notifications + User */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search..."
            className="h-9 w-[260px] rounded-full border-gray-200 bg-gray-50 pl-9 text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#9B1C1C]/40"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#9B1C1C] p-0 text-[10px] font-bold text-white">
            2
          </Badge>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 transition-all hover:bg-gray-50 focus:outline-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9B1C1C] text-xs font-bold text-white">
                AD
              </div>
              <p className="text-[13px] font-semibold text-gray-800">Admin User</p>
              <ChevronDown className="ml-1 h-3.5 w-3.5 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs text-gray-500">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}