"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Calendar, Building2, FileText,
  ShieldCheck, Gift, Users, ThumbsUp,
  Clock, CheckCircle2, Trophy, RotateCcw,
  ChevronDown,
} from "lucide-react";
import { contestsData, Contest, ContestStatus } from "./ContestData";

// ─── Type badge ───────────────────────────────────────────────────────────────

const typeBadge: Record<string, string> = {
  "Submission + Voting": "bg-blue-50   text-blue-700   ring-1 ring-blue-200",
  "Giveaway":            "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  "Poll":                "bg-teal-50   text-teal-700   ring-1 ring-teal-200",
};

const statusBadge: Record<ContestStatus, string> = {
  "Active":          "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "Draft":           "bg-gray-100   text-gray-600   ring-1 ring-gray-200",
  "Closed":          "bg-amber-50   text-amber-600  ring-1 ring-amber-200",
  "Winner Declared": "bg-blue-50    text-blue-700   ring-1 ring-blue-200",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ContestDetail({ id }: { id: number }) {
  const router = useRouter();
  const initial = contestsData.find((c) => c.id === id)!;
  const [contest, setContest] = useState<Contest>(initial);
  const [statusOpen, setStatusOpen] = useState(false);

  if (!contest) {
    return (
      <div className="py-20 text-center text-sm text-gray-400">
        Contest not found.
      </div>
    );
  }

  function changeStatus(status: ContestStatus) {
    setContest((prev) => ({ ...prev, status }));
    setStatusOpen(false);
  }

  const allStatuses: ContestStatus[] = ["Active", "Draft", "Closed", "Winner Declared"];

  return (
    <div className="space-y-5">

      {/* ── Back link ── */}
      <button
        onClick={() => router.push("/contests")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Contests
      </button>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">

        {/* ── Left column ── */}
        <div className="space-y-5">

          {/* Contest header card */}
          <div className="rounded-xl border-t-4 border-t-[#9B1C1C] border border-gray-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{contest.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadge[contest.type]}`}>
                    {contest.type}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge[contest.status]}`}>
                    {contest.status}
                  </span>
                  <span className="text-sm text-gray-500">{contest.organizer}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {contest.startDate} → {contest.endDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    {contest.organizer}
                  </span>
                </div>
              </div>

              {/* Change Status dropdown */}
              <div className="relative shrink-0">
                <button
                  onClick={() => setStatusOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Change Status
                  <ChevronDown className={`h-4 w-4 transition-transform ${statusOpen ? "rotate-180" : ""}`} />
                </button>
                {statusOpen && (
                  <div className="absolute right-0 top-full z-10 mt-1 w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                    {allStatuses.filter((s) => s !== contest.status).map((s) => (
                      <button
                        key={s}
                        onClick={() => changeStatus(s)}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description / Rules / Prize */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="h-4 w-4 text-gray-400" />
                Description
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{contest.description}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ShieldCheck className="h-4 w-4 text-red-400" />
                Rules
              </div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{contest.rules}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Gift className="h-4 w-4 text-amber-400" />
                Prize
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{contest.prize}</p>
            </div>
          </div>

          {/* Submissions */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-base font-semibold text-gray-800">
              Submissions ({contest.entries})
            </h3>
            {contest.entries === 0 ? (
              <div className="flex flex-col items-center py-10 text-gray-400">
                <FileText className="mb-2 h-10 w-10 opacity-30" />
                <p className="text-sm">No submissions yet</p>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {contest.entries} submissions received. View them in the Submissions section.
              </div>
            )}
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-5">

          {/* Contest Stats */}
          <div className="rounded-xl border-t-4 border-t-[#9B1C1C] border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-base font-semibold text-gray-800">Contest Stats</h3>
            <div className="space-y-3">
              {[
                { icon: Users,        color: "text-blue-500",    label: "Total Entries",   value: contest.entries   },
                { icon: ThumbsUp,     color: "text-violet-500",  label: "Total Votes",     value: contest.votes     },
                { icon: Clock,        color: "text-amber-500",   label: "Pending Review",  value: contest.pendingReview },
                { icon: CheckCircle2, color: "text-emerald-500", label: "Approved",        value: contest.approved  },
              ].map(({ icon: Icon, color, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                  <span className="flex-1 text-sm text-gray-600">{label}</span>
                  <span className="text-sm font-semibold text-gray-800">{value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-base font-semibold text-gray-800">Quick Actions</h3>
            <div className="space-y-2">

              {/* Approve Contest */}
              <button
                onClick={() => changeStatus("Active")}
                disabled={contest.status === "Active" || contest.status === "Winner Declared"}
                className="flex w-full items-center gap-2.5 rounded-lg bg-[#9B1C1C] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#7f1515] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="h-4 w-4" />
                Approve Contest
              </button>

              {/* Reject Contest */}
              <button
                onClick={() => changeStatus("Closed")}
                disabled={contest.status === "Closed" || contest.status === "Winner Declared"}
                className="flex w-full items-center gap-2.5 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShieldCheck className="h-4 w-4" />
                Reject Contest
              </button>

              {/* Reopen Contest */}
              <button
                onClick={() => changeStatus("Active")}
                disabled={contest.status === "Active" || contest.status === "Draft"}
                className="flex w-full items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <RotateCcw className="h-4 w-4" />
                Reopen Contest
              </button>

              {/* Declare Winner */}
              <button
                onClick={() => changeStatus("Winner Declared")}
                disabled={contest.status === "Winner Declared" || contest.status === "Draft"}
                className="flex w-full items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trophy className="h-4 w-4" />
                {contest.status === "Winner Declared" ? "Winner Already Declared" : "Declare Winner"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}