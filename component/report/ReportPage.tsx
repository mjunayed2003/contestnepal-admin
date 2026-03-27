"use client";

import { useState } from "react";
import { Download, Check, X, ShieldAlert, AlertCircle, RefreshCcw } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────

type ReportCategory = "All" | "Contest" | "User" | "Submission" | "Vote";
type ReportStatus = "New" | "Reviewed" | "Dismissed";

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

// ─── Mock Data ────────────────────────────────────────────────────

const reportsData: Report[] =[
  { id: "#R001", category: "Submission", title: "Inappropriate submission content", reportedBy: "Liam Johnson", target: "Sophia Anderson's submission", reason: "The submitted image contains offensive content violating community guidelines.", date: "2026-03-12", status: "New" },
  { id: "#R002", category: "Vote", title: "Suspicious voting activity", reportedBy: "Emma Williams", target: "Best Tech Startup Poll 2026", reason: "Detected over 500 votes from the same IP address within 10 minutes.", date: "2026-03-11", status: "Reviewed" },
  { id: "#R003", category: "User", title: "Spam account creating fake entries", reportedBy: "Olivia Davis", target: "User: james.r@example.com", reason: "This user has submitted identical entries across 5 different contests.", date: "2026-03-10", status: "New" },
  { id: "#R004", category: "Contest", title: "Contest prize not delivered", reportedBy: "Noah Brown", target: "Winter Art Exhibition", reason: "Winner was declared 2 months ago but has not received the promised prize.", date: "2026-03-09", status: "Dismissed" },
];

// ─── Main Component ─────────────────────────────────────────────────

export function ReportPage() {
  const [activeTab, setActiveTab] = useState<ReportCategory>("All");
  const[statuses, setStatuses] = useState<Record<string, ReportStatus>>(
    Object.fromEntries(reportsData.map((r) => [r.id, r.status]))
  );

  const filteredReports = reportsData.filter(
    (r) => activeTab === "All" || r.category === activeTab
  );

  function updateStatus(id: string, status: ReportStatus) {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  }

  const newCount = reportsData.filter((r) => statuses[r.id] === "New").length;

  return (
    <div className="max-w-full mx-auto p-4 md:p-6 space-y-8 bg-gray-50 min-h-screen">
      
      {/* ── Header Section ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 p-2 rounded-lg">
              <ShieldAlert className="h-6 w-6 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Reports Overview</h1>
          </div>
          <p className="text-gray-500 text-sm">
            You have <strong className="text-red-600">{newCount} new</strong> reports waiting for your review.
          </p>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {/* ── Simple Tabs ── */}
      <div className="flex overflow-x-auto border-b border-gray-200 hide-scrollbar">
        {(["All", "Contest", "User", "Submission", "Vote"] as ReportCategory[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Cards List (No Accordion, Direct View) ── */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Check className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-gray-900 font-medium">All clear!</h3>
            <p className="text-gray-500 text-sm">No reports found in this category.</p>
          </div>
        ) : (
          filteredReports.map((report) => {
            const status = statuses[report.id];

            return (
              <div 
                key={report.id} 
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6"
              >
                {/* ── Left Side: Information ── */}
                <div className="flex-1">
                  {/* Tags */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md">
                      {report.category}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                      status === "New" ? "bg-red-50 text-red-600" :
                      status === "Reviewed" ? "bg-emerald-50 text-emerald-600" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {status}
                    </span>
                    <span className="text-gray-400 text-xs ml-auto md:ml-2">{report.date}</span>
                  </div>

                  {/* Title & Target */}
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{report.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Target: <span className="font-medium text-gray-700">{report.target}</span>
                  </p>

                  {/* Reason Box */}
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
                    <p className="text-sm text-gray-700">{report.reason}</p>
                  </div>

                  {/* Reporter Info */}
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Reported by {report.reportedBy} ({report.id})
                  </p>
                </div>

                {/* ── Right Side: Action Buttons ── */}
                <div className="flex md:flex-col gap-2 shrink-0 md:w-40 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6">
                  {status !== "Reviewed" && (
                    <button 
                      onClick={() => updateStatus(report.id, "Reviewed")}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm font-semibold transition"
                    >
                      <Check className="h-4 w-4" /> Approve
                    </button>
                  )}

                  {status !== "Dismissed" && (
                    <button 
                      onClick={() => updateStatus(report.id, "Dismissed")}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-semibold transition"
                    >
                      <X className="h-4 w-4" /> Dismiss
                    </button>
                  )}

                  {status === "Dismissed" && (
                    <button 
                      onClick={() => updateStatus(report.id, "New")}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-semibold transition"
                    >
                      <RefreshCcw className="h-4 w-4" /> Reopen
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}