"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { contestsData, Contest, ContestStatus, ContestType } from "./ContestData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const typeStyles: Record<ContestType, string> = {
  "Submission + Voting": "bg-blue-50   text-blue-700   ring-1 ring-blue-200",
  "Giveaway":            "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  "Poll":                "bg-teal-50   text-teal-700   ring-1 ring-teal-200",
};

const statusDot: Record<ContestStatus, string> = {
  "Active":          "bg-emerald-400",
  "Draft":           "bg-gray-400",
  "Closed":          "bg-amber-400",
  "Winner Declared": "bg-blue-400",
};

const statusText: Record<ContestStatus, string> = {
  "Active":          "text-emerald-700",
  "Draft":           "text-gray-600",
  "Closed":          "text-amber-600",
  "Winner Declared": "text-blue-700",
};

const statusBg: Record<ContestStatus, string> = {
  "Active":          "bg-emerald-50 ring-1 ring-emerald-200",
  "Draft":           "bg-gray-100   ring-1 ring-gray-200",
  "Closed":          "bg-amber-50   ring-1 ring-amber-200",
  "Winner Declared": "bg-blue-50    ring-1 ring-blue-200",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ContestsTable() {
  const router = useRouter();
  const [rows]            = useState<Contest[]>(contestsData);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter]     = useState<ContestType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<ContestStatus | "All">("All");

  const filtered = rows.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.organizer.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter   === "All" || c.type   === typeFilter;
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const total           = rows.length;
  const activeCount     = rows.filter((c) => c.status === "Active").length;
  const draftCount      = rows.filter((c) => c.status === "Draft").length;
  const closedCount     = rows.filter((c) => c.status === "Closed" || c.status === "Winner Declared").length;

  return (
    <div className="space-y-5">

      {/* ── Top bar: search + filters + New Contest ── */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contests..."
            className="h-10 w-64 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40"
          />
        </div>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as ContestType | "All")}
          className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40"
        >
          <option value="All">All Types</option>
          <option value="Submission + Voting">Submission + Voting</option>
          <option value="Giveaway">Giveaway</option>
          <option value="Poll">Poll</option>
        </select>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ContestStatus | "All")}
          className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Closed">Closed</option>
          <option value="Winner Declared">Winner Declared</option>
        </select>

        {/* Spacer */}
        <div className="flex-1" />

        {/* New Contest */}
        <button className="flex h-10 items-center gap-2 rounded-lg bg-[#9B1C1C] px-4 text-sm font-semibold text-white hover:bg-[#7f1515] transition-colors">
          <Plus className="h-4 w-4" />
          New Contest
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Contests",  value: total,        color: "text-gray-700",    ring: "ring-gray-200",    bg: "bg-gray-100"    },
          { label: "Active Contests", value: activeCount,  color: "text-emerald-700", ring: "ring-emerald-200", bg: "bg-emerald-50"  },
          { label: "Draft Contests",  value: draftCount,   color: "text-gray-600",    ring: "ring-gray-200",    bg: "bg-gray-100"    },
          { label: "Closed Contests", value: closedCount,  color: "text-amber-600",   ring: "ring-amber-200",   bg: "bg-amber-50"    },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ring-2 ${s.bg} ${s.ring}`}>
              <span className={`text-lg font-bold ${s.color}`}>{s.value}</span>
            </div>
            <span className="text-sm text-gray-600">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="px-6 py-4">
          <h2 className="text-base font-semibold text-gray-800">Contests ({filtered.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-gray-100 bg-gray-50/60">
                {["Title","Type","Organizer","Start Date","End Date","Status","Entries","Votes","Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="py-12 text-center text-sm text-gray-400">No contests found.</td></tr>
              ) : filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 font-medium text-gray-800 max-w-[180px] truncate">{c.title}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeStyles[c.type]}`}>
                      {c.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{c.organizer}</td>
                  <td className="px-5 py-3.5 text-gray-500">{c.startDate}</td>
                  <td className="px-5 py-3.5 text-gray-500">{c.endDate}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBg[c.status]}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${statusDot[c.status]}`} />
                      <span className={statusText[c.status]}>{c.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">{c.entries.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-gray-700">{c.votes.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => router.push(`/contests/${c.id}`)}
                      className="flex items-center gap-1.5 rounded-lg bg-[#9B1C1C] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#7f1515] transition-colors"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}