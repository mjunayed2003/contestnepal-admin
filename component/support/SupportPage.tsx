"use client";

import { useState } from "react";
import { MessageCircle, Mail, Clock, CheckCircle2, XCircle, ChevronDown } from "lucide-react";

type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
type TicketPriority = "Low" | "Medium" | "High";

interface Ticket {
  id: string;
  subject: string;
  user: string;
  email: string;
  status: TicketStatus;
  priority: TicketPriority;
  date: string;
  message: string;
}

const tickets: Ticket[] = [
  { id: "#1001", subject: "Cannot submit my entry",        user: "Sophia Anderson",  email: "sophia@example.com",    status: "Open",        priority: "High",   date: "2026-03-10", message: "I keep getting an error when trying to submit my photo for the Logo Design Challenge." },
  { id: "#1002", subject: "Votes not counting correctly",  user: "Liam Johnson",     email: "liam.j@example.com",    status: "In Progress", priority: "High",   date: "2026-03-09", message: "My votes are not being reflected in the contest leaderboard even after 24 hours." },
  { id: "#1003", subject: "How to change my email?",       user: "Emma Williams",    email: "emma.w@example.com",    status: "Resolved",    priority: "Low",    date: "2026-03-08", message: "I would like to update the email address associated with my account." },
  { id: "#1004", subject: "Organizer account approval",    user: "SportsPro Events", email: "events@sportspro.com",  status: "Open",        priority: "Medium", date: "2026-03-08", message: "We submitted our organizer application 2 weeks ago and have not heard back." },
  { id: "#1005", subject: "Contest banner not uploading",  user: "FoodieWorld",      email: "contests@foodieworld.net",status:"In Progress", priority: "Medium", date: "2026-03-07", message: "The banner image upload keeps failing with a 500 error on our contest draft." },
  { id: "#1006", subject: "Winner not declared after end", user: "Ava Garcia",       email: "ava.g@example.com",     status: "Closed",      priority: "Low",    date: "2026-03-06", message: "The Winter Art Exhibition ended 5 days ago but winner has not been announced." },
];

const statusStyles: Record<TicketStatus, string> = {
  "Open":        "bg-red-50    text-red-600    ring-1 ring-red-200",
  "In Progress": "bg-amber-50  text-amber-600  ring-1 ring-amber-200",
  "Resolved":    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "Closed":      "bg-gray-100  text-gray-500   ring-1 ring-gray-200",
};

const priorityStyles: Record<TicketPriority, string> = {
  "High":   "text-red-500",
  "Medium": "text-amber-500",
  "Low":    "text-gray-400",
};

export function SupportPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, TicketStatus>>(
    Object.fromEntries(tickets.map((t) => [t.id, t.status]))
  );

  function toggle(id: string) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  function updateStatus(id: string, status: TicketStatus) {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  }

  const open       = tickets.filter((t) => statuses[t.id] === "Open").length;
  const inProgress = tickets.filter((t) => statuses[t.id] === "In Progress").length;
  const resolved   = tickets.filter((t) => statuses[t.id] === "Resolved" || statuses[t.id] === "Closed").length;

  return (
    <div className="space-y-5">

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Open Tickets",     value: open,       icon: MessageCircle, color: "text-red-500",     bg: "bg-red-50"     },
          { label: "In Progress",      value: inProgress, icon: Clock,         color: "text-amber-500",   bg: "bg-amber-50"   },
          { label: "Resolved / Closed",value: resolved,   icon: CheckCircle2,  color: "text-emerald-500", bg: "bg-emerald-50" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4">
            <div className={`rounded-xl p-2.5 ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tickets list ── */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-800">Support Tickets</h2>
        </div>

        <div className="divide-y divide-gray-50">
          {tickets.map((ticket) => {
            const status = statuses[ticket.id];
            const isOpen = expanded === ticket.id;

            return (
              <div key={ticket.id}>
                {/* Row */}
                <button
                  onClick={() => toggle(ticket.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-gray-50/60 transition-colors"
                >
                  {/* ID */}
                  <span className="w-14 shrink-0 text-xs font-mono text-gray-400">{ticket.id}</span>

                  {/* Subject */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">{ticket.subject}</p>
                    <p className="text-xs text-gray-400">{ticket.user} · {ticket.date}</p>
                  </div>

                  {/* Priority dot */}
                  <span className={`text-xs font-medium ${priorityStyles[ticket.priority]}`}>
                    {ticket.priority}
                  </span>

                  {/* Status badge */}
                  <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
                    {status}
                  </span>

                  {/* Chevron */}
                  <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="border-t border-gray-100 bg-gray-50/40 px-5 py-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        {/* User info */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5" /> {ticket.email}
                          </span>
                        </div>
                        {/* Message */}
                        <p className="text-sm text-gray-700 leading-relaxed">{ticket.message}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 flex-col gap-2">
                        {status !== "In Progress" && (
                          <button
                            onClick={() => updateStatus(ticket.id, "In Progress")}
                            className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-600 hover:bg-amber-100 transition-colors"
                          >
                            <Clock className="h-3.5 w-3.5" /> Mark In Progress
                          </button>
                        )}
                        {status !== "Resolved" && (
                          <button
                            onClick={() => updateStatus(ticket.id, "Resolved")}
                            className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Mark Resolved
                          </button>
                        )}
                        {status !== "Closed" && (
                          <button
                            onClick={() => updateStatus(ticket.id, "Closed")}
                            className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Close Ticket
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