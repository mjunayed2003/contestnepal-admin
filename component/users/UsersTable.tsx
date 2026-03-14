"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Eye, Ban, Trash2,
  Mail, Calendar, FileText, ThumbsUp, X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ParticipantStatus = "Active" | "Suspended";
type ParticipantFilter = "All" | "Active" | "Suspended";

export interface Participant {
  id: number; initials: string; name: string; email: string;
  registered: string; submissions: number; votes: number;
  status: ParticipantStatus; color: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const initialParticipants: Participant[] = [
  { id: 1,  initials: "SA", name: "Sophia Anderson",  email: "sophia@example.com",     registered: "2025-11-10", submissions: 14, votes: 342, status: "Active",    color: "bg-[#9B1C1C]"   },
  { id: 2,  initials: "LJ", name: "Liam Johnson",     email: "liam.j@example.com",     registered: "2025-11-22", submissions: 9,  votes: 210, status: "Active",    color: "bg-blue-600"    },
  { id: 3,  initials: "EW", name: "Emma Williams",    email: "emma.w@example.com",     registered: "2025-12-01", submissions: 22, votes: 558, status: "Active",    color: "bg-teal-600"    },
  { id: 4,  initials: "NB", name: "Noah Brown",       email: "noah.b@example.com",     registered: "2025-12-14", submissions: 3,  votes: 47,  status: "Suspended", color: "bg-violet-600"  },
  { id: 5,  initials: "OD", name: "Olivia Davis",     email: "olivia.d@example.com",   registered: "2026-01-05", submissions: 17, votes: 413, status: "Active",    color: "bg-amber-600"   },
  { id: 6,  initials: "WM", name: "William Martinez", email: "will.m@example.com",     registered: "2026-01-12", submissions: 6,  votes: 89,  status: "Active",    color: "bg-pink-600"    },
  { id: 7,  initials: "AG", name: "Ava Garcia",       email: "ava.g@example.com",      registered: "2026-01-19", submissions: 11, votes: 287, status: "Active",    color: "bg-cyan-600"    },
  { id: 8,  initials: "JR", name: "James Rodriguez",  email: "james.r@example.com",    registered: "2026-01-25", submissions: 2,  votes: 15,  status: "Suspended", color: "bg-orange-600"  },
  { id: 9,  initials: "IW", name: "Isabella Wilson",  email: "isabella.w@example.com", registered: "2026-02-02", submissions: 19, votes: 502, status: "Active",    color: "bg-indigo-600"  },
  { id: 10, initials: "ET", name: "Ethan Taylor",     email: "ethan.t@example.com",    registered: "2026-02-08", submissions: 8,  votes: 133, status: "Active",    color: "bg-rose-600"    },
  { id: 11, initials: "ML", name: "Mia Lee",          email: "mia.l@example.com",      registered: "2026-02-15", submissions: 5,  votes: 76,  status: "Active",    color: "bg-emerald-600" },
  { id: 12, initials: "LW", name: "Lucas White",      email: "lucas.w@example.com",    registered: "2026-03-01", submissions: 1,  votes: 9,   status: "Suspended", color: "bg-slate-600"   },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ParticipantStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${
      status === "Active"
        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
        : "bg-red-50 text-red-600 ring-1 ring-red-200"
    }`}>
      {status}
    </span>
  );
}

function Avatar({ initials, color, size = "sm" }: { initials: string; color: string; size?: "sm" | "lg" }) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${color} ${
      size === "lg" ? "h-16 w-16 text-xl" : "h-8 w-8 text-[11px]"
    }`}>
      {initials}
    </div>
  );
}

// ─── Participant Drawer ───────────────────────────────────────────────────────

function ParticipantDrawer({
  user,
  onClose,
  onToggleSuspend,
}: {
  user: Participant;
  onClose: () => void;
  onToggleSuspend: (id: number) => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-[380px] flex-col border-l border-gray-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-800">Participant Details</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <Avatar initials={user.initials} color={user.color} size="lg" />
            <div>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <div className="mt-1"><StatusBadge status={user.status} /></div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-gray-500">Email</span>
              <span className="ml-auto font-medium text-gray-700">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-gray-500">Registered</span>
              <span className="ml-auto font-medium text-gray-700">{user.registered}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
              <FileText className="mx-auto mb-1 h-5 w-5 text-[#9B1C1C]" />
              <p className="text-2xl font-bold text-gray-900">{user.submissions}</p>
              <p className="text-xs text-gray-500">Submissions</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
              <ThumbsUp className="mx-auto mb-1 h-5 w-5 text-[#9B1C1C]" />
              <p className="text-2xl font-bold text-gray-900">{user.votes}</p>
              <p className="text-xs text-gray-500">Votes</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 px-6 py-4">
          <button
            onClick={() => { onToggleSuspend(user.id); onClose(); }}
            className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              user.status === "Active"
                ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            <Ban className="h-4 w-4" />
            {user.status === "Active" ? "Suspend User" : "Unsuspend User"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main UsersTable (Participants only) ──────────────────────────────────────

export function UsersTable() {
  const router = useRouter();
  const [rows, setRows]       = useState<Participant[]>(initialParticipants);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState<ParticipantFilter>("All");
  const [viewing, setViewing] = useState<Participant | null>(null);

  const filtered = rows.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (filter === "All" || u.status === filter);
  });

  function toggleSuspend(id: number) {
    setRows((prev) =>
      prev.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u)
    );
  }

  function deleteUser(id: number) {
    setRows((prev) => prev.filter((u) => u.id !== id));
    setViewing(null);
  }

  const viewingLive = viewing ? rows.find((r) => r.id === viewing.id) ?? null : null;

  return (
    <>
      {viewingLive && (
        <ParticipantDrawer
          user={viewingLive}
          onClose={() => setViewing(null)}
          onToggleSuspend={toggleSuspend}
        />
      )}

      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-2">
          <button className="rounded-md px-5 py-2 text-sm font-semibold bg-[#9B1C1C] text-white">
            Participants
          </button>
          <button
            onClick={() => router.push("/organizers")}
            className="rounded-md px-5 py-2 text-sm font-semibold border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Organizers
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text" value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search participants..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            {(["All", "Active", "Suspended"] as ParticipantFilter[]).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  filter === f ? "bg-[#9B1C1C] text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="px-6 py-4">
            <h2 className="text-base font-semibold text-gray-800">Participants ({filtered.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-gray-100 bg-gray-50/60">
                  {["Name","Email","Registered","Submissions","Votes","Status","Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="py-12 text-center text-sm text-gray-400">No participants found.</td></tr>
                ) : filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar initials={user.initials} color={user.color} />
                        <span className="font-medium text-gray-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-500">{user.email}</td>
                    <td className="px-6 py-3.5 text-gray-500">{user.registered}</td>
                    <td className="px-6 py-3.5 text-gray-700">{user.submissions}</td>
                    <td className="px-6 py-3.5 text-gray-700">{user.votes}</td>
                    <td className="px-6 py-3.5"><StatusBadge status={user.status} /></td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <button title="View" onClick={() => setViewing(user)}
                          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button title={user.status === "Active" ? "Suspend" : "Unsuspend"} onClick={() => toggleSuspend(user.id)}
                          className={`rounded p-1 transition-colors ${
                            user.status === "Active"
                              ? "text-amber-400 hover:bg-amber-50 hover:text-amber-600"
                              : "text-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
                          }`}>
                          <Ban className="h-4 w-4" />
                        </button>
                        <button title="Delete" onClick={() => deleteUser(user.id)}
                          className="rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}