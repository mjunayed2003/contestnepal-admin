"use client";

import { useState } from "react";
import { Download, FileText, Users, Trophy, ThumbsUp, Flag, AlertTriangle, ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ReportCategory = "All" | "Contest" | "User" | "Submission" | "Vote";
type ReportStatus   = "New" | "Reviewed" | "Dismissed";

interface Report {
  id: string;
  category: ReportCategory;
  title: string;
  reportedBy: string;
  target: string;
  reason: string;
  date: string;
  status: ReportStatus;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const reportsData: Report[] = [
  { id: "#R001", category: "Submission", title: "Inappropriate submission content",    reportedBy: "Liam Johnson",    target: "Sophia Anderson's submission",    reason: "The submitted image contains offensive content violating community guidelines.", date: "2026-03-12", status: "New"       },
  { id: "#R002", category: "Vote",       title: "Suspicious voting activity",          reportedBy: "Emma Williams",   target: "Best Tech Startup Poll 2026",     reason: "Detected over 500 votes from the same IP address within 10 minutes.",           date: "2026-03-11", status: "Reviewed"  },
  { id: "#R003", category: "User",       title: "Spam account creating fake entries",  reportedBy: "Olivia Davis",    target: "User: james.r@example.com",       reason: "This user has submitted identical entries across 5 different contests.",        date: "2026-03-10", status: "New"       },
  { id: "#R004", category: "Contest",    title: "Contest prize not delivered",         reportedBy: "Noah Brown",      target: "Winter Art Exhibition",           reason: "Winner was declared 2 months ago but has not received the promised prize.",     date: "2026-03-09", status: "Dismissed" },
  { id: "#R005", category: "Submission", title: "Plagiarised design submission",       reportedBy: "Ava Garcia",      target: "Logo Design Challenge entry #47", reason: "The submitted logo is a direct copy of a well-known brand's trademark.",       date: "2026-03-08", status: "New"       },
  { id: "#R006", category: "User",       title: "Harassment in contest comments",      reportedBy: "William Martinez",target: "User: ethan.t@example.com",       reason: "This user is sending abusive messages to other participants.",                  date: "2026-03-07", status: "Reviewed"  },
  { id: "#R007", category: "Contest",    title: "Misleading contest description",      reportedBy: "Isabella Wilson", target: "Fitness Challenge 2026",          reason: "The contest rules were changed after entries were already submitted.",          date: "2026-03-06", status: "New"       },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const categoryIcon: Record<string, React.ElementType> = {
  Contest:    Trophy,
  User:       Users,
  Submission: FileText,
  Vote:       ThumbsUp,
};

const categoryColor: Record<string, string> = {
  Contest:    "bg-blue-50   text-blue-600",
  User:       "bg-violet-50 text-violet-600",
  Submission: "bg-emerald-50 text-emerald-600",
  Vote:       "bg-amber-50  text-amber-600",
};

const statusStyles: Record<ReportStatus, string> = {
  New:       "bg-red-50    text-red-600    ring-1 ring-red-200",
  Reviewed:  "bg-amber-50  text-amber-600  ring-1 ring-amber-200",
  Dismissed: "bg-gray-100  text-gray-500   ring-1 ring-gray-200",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ReportPage() {
  const [filter, setFilter]   = useState<ReportCategory>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, ReportStatus>>(
    Object.fromEntries(reportsData.map((r) => [r.id, r.status]))
  );

  const filtered = reportsData.filter(
    (r) => filter === "All" || r.category === filter
  );

  function updateStatus(id: string, status: ReportStatus) {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  }

  const newCount       = reportsData.filter((r) => statuses[r.id] === "New").length;
  const reviewedCount  = reportsData.filter((r) => statuses[r.id] === "Reviewed").length;
  const dismissedCount = reportsData.filter((r) => statuses[r.id] === "Dismissed").length;

  return (
    <div className="space-y-5">

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "New Reports",      value: newCount,       color: "text-red-500",     bg: "bg-red-50",     border: "border-red-200"     },
          { label: "Under Review",     value: reviewedCount,  color: "text-amber-500",   bg: "bg-amber-50",   border: "border-amber-200"   },
          { label: "Dismissed",        value: dismissedCount, color: "text-gray-500",    bg: "bg-gray-100",   border: "border-gray-200"    },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
            <div className={`rounded-xl p-2.5 ${s.bg} ring-1 ${s.border}`}>
              <Flag className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter + Export ── */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["All", "Contest", "User", "Submission", "Vote"] as ReportCategory[]).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-[#9B1C1C] text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}>
              {f}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* ── Reports list ── */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-800">
            Reports ({filtered.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-400">No reports found.</p>
          ) : filtered.map((report) => {
            const status  = statuses[report.id];
            const isOpen  = expanded === report.id;
            const Icon    = categoryIcon[report.category] ?? Flag;

            return (
              <div key={report.id}>
                {/* Row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : report.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50/60 transition-colors"
                >
                  {/* Category icon */}
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${categoryColor[report.category]}`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Title + meta */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">{report.title}</p>
                    <p className="text-xs text-gray-400">
                      {report.id} · Reported by {report.reportedBy} · {report.date}
                    </p>
                  </div>

                  {/* Category pill */}
                  <span className={`hidden shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium sm:inline-flex ${categoryColor[report.category]}`}>
                    {report.category}
                  </span>

                  {/* Status badge */}
                  <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
                    {status}
                  </span>

                  <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Expanded */}
                {isOpen && (
                  <div className="border-t border-gray-100 bg-gray-50/40 px-5 py-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        {/* Target */}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                          <span>Target: <span className="font-medium text-gray-700">{report.target}</span></span>
                        </div>
                        {/* Reason */}
                        <p className="text-sm text-gray-700 leading-relaxed">{report.reason}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 flex-col gap-2">
                        {status !== "Reviewed" && (
                          <button onClick={() => updateStatus(report.id, "Reviewed")}
                            className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-600 hover:bg-amber-100 transition-colors">
                            <Flag className="h-3.5 w-3.5" /> Mark Reviewed
                          </button>
                        )}
                        {status !== "Dismissed" && (
                          <button onClick={() => updateStatus(report.id, "Dismissed")}
                            className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors">
                            <ChevronDown className="h-3.5 w-3.5 rotate-90" /> Dismiss
                          </button>
                        )}
                        {status === "Dismissed" && (
                          <button onClick={() => updateStatus(report.id, "New")}
                            className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors">
                            <AlertTriangle className="h-3.5 w-3.5" /> Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}