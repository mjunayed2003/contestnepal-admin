"use client";

import { useState } from "react";
import { Search, LayoutGrid, List, ThumbsUp, Calendar, Check, X } from "lucide-react";
import { submissionsData, Submission, SubmissionStatus } from "./SubmissionsData";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusBadge: Record<SubmissionStatus, string> = {
  Approved: "bg-emerald-500 text-white",
  Pending:  "bg-amber-400   text-white",
  Rejected: "bg-red-500     text-white",
};

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${color}`}>
      {initials}
    </div>
  );
}

// ─── Grid Card ────────────────────────────────────────────────────────────────

function GridCard({
  sub, selected, onSelect, onApprove, onReject,
}: {
  sub: Submission; selected: boolean;
  onSelect: () => void; onApprove: () => void; onReject: () => void;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-white transition-all ${
        selected ? "border-[#9B1C1C] ring-2 ring-[#9B1C1C]/20" : "border-gray-200"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={onSelect}
        className={`absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
          selected ? "border-[#9B1C1C] bg-[#9B1C1C]" : "border-gray-300 bg-white/80"
        }`}
      >
        {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </button>

      {/* Status badge */}
      <span className={`absolute right-2 top-2 z-10 rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusBadge[sub.status]}`}>
        {sub.status}
      </span>

      {/* Media */}
      {sub.type === "Image" && sub.imageUrl ? (
        <img src={sub.imageUrl} alt={sub.participant} className="h-[160px] w-full object-cover" />
      ) : (
        <div className="flex h-[160px] items-center bg-gray-50 px-4">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{sub.textContent}</p>
        </div>
      )}

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Avatar initials={sub.initials} color={sub.avatarColor} />
          <span className="text-sm font-semibold text-gray-800 truncate">{sub.participant}</span>
        </div>
        <p className="mt-1 truncate text-xs text-[#9B1C1C]">{sub.contest}</p>
        <div className="mt-1.5 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {sub.date}
          </span>
          {sub.votes > 0 && (
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" /> {sub.votes}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center gap-2">
          {(sub.status === "Pending" || sub.status === "Rejected") && (
            <button onClick={onApprove}
              className="flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-emerald-600 transition-colors">
              <Check className="h-3 w-3" strokeWidth={3} /> OK
            </button>
          )}
          {(sub.status === "Pending" || sub.status === "Approved") && (
            <button onClick={onReject}
              className="flex items-center gap-1 rounded-full border border-red-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-red-500 hover:bg-red-50 transition-colors">
              <X className="h-3 w-3" strokeWidth={3} /> No
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── List Row ─────────────────────────────────────────────────────────────────

function ListRow({
  sub, selected, onSelect, onApprove, onReject,
}: {
  sub: Submission; selected: boolean;
  onSelect: () => void; onApprove: () => void; onReject: () => void;
}) {
  return (
    <tr className={`border-b border-gray-50 hover:bg-gray-50/50 ${selected ? "bg-red-50/30" : ""}`}>
      {/* Checkbox */}
      <td className="px-4 py-3.5">
        <button onClick={onSelect}
          className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
            selected ? "border-[#9B1C1C] bg-[#9B1C1C]" : "border-gray-300 bg-white"
          }`}>
          {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
        </button>
      </td>

      {/* Participant */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          {sub.type === "Image" && sub.imageUrl ? (
            <img src={sub.imageUrl} alt="" className="h-8 w-8 rounded-lg object-cover" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
              <span className="text-[10px] text-gray-400">Txt</span>
            </div>
          )}
          <span className="font-medium text-gray-800">{sub.participant}</span>
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm text-gray-500">{sub.contest}</td>
      <td className="px-4 py-3.5 text-sm text-gray-500">{sub.date}</td>
      <td className="px-4 py-3.5 text-sm text-gray-700">{sub.votes}</td>
      <td className="px-4 py-3.5 text-sm text-gray-600">{sub.type}</td>
      <td className="px-4 py-3.5">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge[sub.status]}`}>
          {sub.status}
        </span>
      </td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          {(sub.status === "Pending" || sub.status === "Rejected") && (
            <button onClick={onApprove}
              className="flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-emerald-600 transition-colors">
              <Check className="h-3 w-3" strokeWidth={3} /> Approve
            </button>
          )}
          {(sub.status === "Pending" || sub.status === "Approved") && (
            <button onClick={onReject}
              className="flex items-center gap-1 rounded-full border border-red-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-red-500 hover:bg-red-50 transition-colors">
              <X className="h-3 w-3" strokeWidth={3} /> Reject
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SubmissionsPage() {
  const [rows, setRows]         = useState<Submission[]>(submissionsData);
  const [view, setView]         = useState<"grid" | "list">("grid");
  const [search, setSearch]     = useState("");
  const [contestFilter, setContestFilter] = useState("All");
  const [typeFilter, setTypeFilter]       = useState("All");
  const [statusFilter, setStatusFilter]   = useState("All");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // Unique values for filters
  const contests = ["All", ...Array.from(new Set(rows.map((r) => r.contest)))];

  const filtered = rows.filter((r) => {
    const matchSearch  = r.participant.toLowerCase().includes(search.toLowerCase()) || r.contest.toLowerCase().includes(search.toLowerCase());
    const matchContest = contestFilter === "All" || r.contest === contestFilter;
    const matchType    = typeFilter    === "All" || r.type    === typeFilter;
    const matchStatus  = statusFilter  === "All" || r.status  === statusFilter;
    return matchSearch && matchContest && matchType && matchStatus;
  });

  // Selection helpers
  function toggleSelect(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function selectAll()   { setSelected(new Set(filtered.map((r) => r.id))); }
  function deselectAll() { setSelected(new Set()); }

  // Individual actions
  function approve(id: number) {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, status: "Approved" } : r));
  }
  function reject(id: number) {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, status: "Rejected" } : r));
  }

  // Bulk actions
  function bulkApprove() {
    setRows((prev) => prev.map((r) => selected.has(r.id) ? { ...r, status: "Approved" } : r));
    setSelected(new Set());
  }
  function bulkReject() {
    setRows((prev) => prev.map((r) => selected.has(r.id) ? { ...r, status: "Rejected" } : r));
    setSelected(new Set());
  }

  const allSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.id));

  return (
    <div className="space-y-4">

      {/* ── Top bar ── */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search submissions..."
            className="h-10 w-60 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40"
          />
        </div>

        {/* Contest filter */}
        <select value={contestFilter} onChange={(e) => setContestFilter(e.target.value)}
          className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40">
          {contests.map((c) => <option key={c}>{c}</option>)}
        </select>

        {/* Type filter */}
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40">
          <option>All</option>
          <option>Image</option>
          <option>Text</option>
        </select>

        {/* Status filter */}
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40">
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>

        <div className="flex-1" />

        {/* View toggle */}
        <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
          <button onClick={() => setView("grid")}
            className={`flex items-center rounded-md px-2.5 py-1.5 transition-colors ${view === "grid" ? "bg-[#9B1C1C] text-white" : "text-gray-500 hover:text-gray-700"}`}>
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button onClick={() => setView("list")}
            className={`flex items-center rounded-md px-2.5 py-1.5 transition-colors ${view === "list" ? "bg-[#9B1C1C] text-white" : "text-gray-500 hover:text-gray-700"}`}>
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Bulk action bar ── */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5">
          <span className="text-sm font-medium text-gray-700">{selected.size} selected</span>
          <button onClick={bulkApprove}
            className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 transition-colors">
            <Check className="h-3.5 w-3.5" strokeWidth={3} /> Approve All
          </button>
        </div>
      )}

      {/* ── Count row ── */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing {filtered.length} submissions</p>
        {allSelected ? (
          <button onClick={deselectAll} className="text-sm font-medium text-[#9B1C1C] hover:underline">
            Deselect All
          </button>
        ) : (
          <button onClick={selectAll} className="text-sm font-medium text-[#9B1C1C] hover:underline">
            Select All
          </button>
        )}
      </div>

      {/* ── Grid view ── */}
      {view === "grid" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((sub) => (
            <GridCard
              key={sub.id} sub={sub}
              selected={selected.has(sub.id)}
              onSelect={() => toggleSelect(sub.id)}
              onApprove={() => approve(sub.id)}
              onReject={() => reject(sub.id)}
            />
          ))}
        </div>
      )}

      {/* ── List view ── */}
      {view === "list" && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                {/* Select all checkbox */}
                <th className="px-4 py-3">
                  <button onClick={allSelected ? deselectAll : selectAll}
                    className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
                      allSelected ? "border-[#9B1C1C] bg-[#9B1C1C]" : "border-gray-300 bg-white"
                    }`}>
                    {allSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </button>
                </th>
                {["Participant","Contest","Date","Votes","Type","Status","Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <ListRow
                  key={sub.id} sub={sub}
                  selected={selected.has(sub.id)}
                  onSelect={() => toggleSelect(sub.id)}
                  onApprove={() => approve(sub.id)}
                  onReject={() => reject(sub.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-16 text-center text-sm text-gray-400">No submissions found.</div>
      )}
    </div>
  );
}