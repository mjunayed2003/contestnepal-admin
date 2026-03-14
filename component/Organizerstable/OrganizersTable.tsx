"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Eye, Check, X, Star,
  Mail, Calendar, Building2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type OrganizerStatus = "Approved" | "Pending" | "Rejected";
type OrganizerFilter = "All" | "Pending" | "Approved" | "Rejected";

interface Organizer {
  id: number; initials: string; name: string; email: string;
  joined: string; contestsCreated: number;
  status: OrganizerStatus; color: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const initialOrganizers: Organizer[] = [
  { id: 1, initials: "TB", name: "TechBrand Inc.",      email: "admin@techbrand.com",      joined: "2025-10-15", contestsCreated: 8,  status: "Approved", color: "bg-[#9B1C1C]"   },
  { id: 2, initials: "CS", name: "Creative Studio",     email: "hello@creativestudio.io",  joined: "2025-11-20", contestsCreated: 5,  status: "Approved", color: "bg-blue-600"    },
  { id: 3, initials: "SP", name: "SportsPro Events",    email: "events@sportspro.com",     joined: "2026-01-08", contestsCreated: 3,  status: "Pending",  color: "bg-violet-600"  },
  { id: 4, initials: "FW", name: "FoodieWorld",         email: "contests@foodieworld.net", joined: "2026-02-05", contestsCreated: 0,  status: "Pending",  color: "bg-amber-600"   },
  { id: 5, initials: "AC", name: "ArtisanCraft Co.",    email: "info@artisancraft.com",    joined: "2025-09-30", contestsCreated: 12, status: "Approved", color: "bg-teal-600"    },
  { id: 6, initials: "MV", name: "MediaVault Agency",   email: "team@mediavault.agency",   joined: "2026-01-22", contestsCreated: 0,  status: "Rejected", color: "bg-pink-600"    },
  { id: 7, initials: "EG", name: "EcoGreen Initiative", email: "hello@ecogreen.org",       joined: "2025-12-12", contestsCreated: 2,  status: "Approved", color: "bg-emerald-600" },
  { id: 8, initials: "PD", name: "PixelDreams Ltd.",    email: "contact@pixeldreams.com",  joined: "2026-02-16", contestsCreated: 0,  status: "Pending",  color: "bg-indigo-600"  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrganizerStatus }) {
  const styles: Record<OrganizerStatus, string> = {
    Approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    Pending:  "bg-amber-50   text-amber-600   ring-1 ring-amber-200",
    Rejected: "bg-red-50     text-red-600     ring-1 ring-red-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${styles[status]}`}>
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

// ─── Organizer Drawer ─────────────────────────────────────────────────────────

function OrganizerDrawer({
  org, onClose, onApprove, onReject, onRevoke,
}: {
  org: Organizer; onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onRevoke: (id: number) => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-[380px] flex-col border-l border-gray-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-800">Organizer Details</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <Avatar initials={org.initials} color={org.color} size="lg" />
            <div>
              <p className="text-lg font-semibold text-gray-900">{org.name}</p>
              <div className="mt-1"><StatusBadge status={org.status} /></div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-gray-500">Email</span>
              <span className="ml-auto font-medium text-gray-700 text-right">{org.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-gray-500">Joined</span>
              <span className="ml-auto font-medium text-gray-700">{org.joined}</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
            <Building2 className="mx-auto mb-1 h-5 w-5 text-[#9B1C1C]" />
            <p className="text-2xl font-bold text-gray-900">{org.contestsCreated}</p>
            <p className="text-xs text-gray-500">Contests Created</p>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-4 space-y-2">
          {org.status === "Pending" && (
            <>
              <button onClick={() => { onApprove(org.id); onClose(); }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-50 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors">
                <Check className="h-4 w-4" /> Approve Organizer
              </button>
              <button onClick={() => { onReject(org.id); onClose(); }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
                <X className="h-4 w-4" /> Reject Organizer
              </button>
            </>
          )}
          {org.status === "Approved" && (
            <button onClick={() => { onRevoke(org.id); onClose(); }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-50 py-2.5 text-sm font-medium text-amber-600 hover:bg-amber-100 transition-colors">
              <Star className="h-4 w-4" /> Revoke Approval
            </button>
          )}
          {org.status === "Rejected" && (
            <button onClick={() => { onApprove(org.id); onClose(); }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-50 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors">
              <Check className="h-4 w-4" /> Approve Anyway
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function OrganizersTable() {
  const router = useRouter();
  const [rows, setRows]       = useState<Organizer[]>(initialOrganizers);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState<OrganizerFilter>("All");
  const [viewing, setViewing] = useState<Organizer | null>(null);

  const filtered = rows.filter((o) => {
    const matchSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (filter === "All" || o.status === filter);
  });

  function approve(id: number) {
    setRows((prev) => prev.map((o) => o.id === id ? { ...o, status: "Approved" } : o));
  }
  function reject(id: number) {
    setRows((prev) => prev.map((o) => o.id === id ? { ...o, status: "Rejected" } : o));
  }
  function revoke(id: number) {
    setRows((prev) => prev.map((o) => o.id === id ? { ...o, status: "Pending" } : o));
  }

  const viewingLive = viewing ? rows.find((r) => r.id === viewing.id) ?? null : null;

  return (
    <>
      {viewingLive && (
        <OrganizerDrawer
          org={viewingLive}
          onClose={() => setViewing(null)}
          onApprove={approve}
          onReject={reject}
          onRevoke={revoke}
        />
      )}

      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/users")}
            className="rounded-md px-5 py-2 text-sm font-semibold border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Participants
          </button>
          <button className="rounded-md px-5 py-2 text-sm font-semibold bg-[#9B1C1C] text-white">
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
              placeholder="Search organizers..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            {(["All", "Pending", "Approved", "Rejected"] as OrganizerFilter[]).map((f) => (
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
            <h2 className="text-base font-semibold text-gray-800">Organizers ({filtered.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-gray-100 bg-gray-50/60">
                  {["Name","Email","Joined","Contests Created","Status","Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="py-12 text-center text-sm text-gray-400">No organizers found.</td></tr>
                ) : filtered.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar initials={org.initials} color={org.color} />
                        <span className="font-medium text-gray-800">{org.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-500">{org.email}</td>
                    <td className="px-6 py-3.5 text-gray-500">{org.joined}</td>
                    <td className="px-6 py-3.5 text-gray-700">{org.contestsCreated}</td>
                    <td className="px-6 py-3.5"><StatusBadge status={org.status} /></td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        {/* View — always */}
                        <button title="View" onClick={() => setViewing(org)}
                          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        {/* Pending → approve + reject */}
                        {org.status === "Pending" && (
                          <>
                            <button title="Approve" onClick={() => approve(org.id)}
                              className="rounded p-1 text-emerald-400 hover:bg-emerald-50 hover:text-emerald-600">
                              <Check className="h-4 w-4" />
                            </button>
                            <button title="Reject" onClick={() => reject(org.id)}
                              className="rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600">
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {/* Approved → revoke */}
                        {org.status === "Approved" && (
                          <button title="Revoke" onClick={() => revoke(org.id)}
                            className="rounded p-1 text-amber-400 hover:bg-amber-50 hover:text-amber-600">
                            <Star className="h-4 w-4" />
                          </button>
                        )}
                        {/* Rejected → view only */}
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