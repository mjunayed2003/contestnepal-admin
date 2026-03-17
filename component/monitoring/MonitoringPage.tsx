"use client";

import { useState, useEffect, useRef } from "react";
import { Users, ThumbsUp, FileText, Trophy, AlertTriangle, UserPlus, Smartphone, Monitor } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SystemStatusLevel = "Operational" | "Degraded" | "Down";

interface ActivityEvent {
  id: number;
  icon: "vote" | "submission" | "status" | "warning" | "user";
  message: string;
  time: string;
  isNew?: boolean;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const systemServices: { name: string; status: SystemStatusLevel }[] = [
  { name: "API Server",         status: "Operational" },
  { name: "Database",           status: "Operational" },
  { name: "File Storage",       status: "Operational" },
  { name: "Email Service",      status: "Degraded"    },
  { name: "Push Notifications", status: "Operational" },
];

const initialEvents: ActivityEvent[] = [
  { id: 1, icon: "vote",       message: "User cast a vote in Logo Design Challenge",         time: "Just now", isNew: true  },
  { id: 2, icon: "submission", message: "New submission in Eco-Friendly Giveaway",           time: "5s ago"               },
  { id: 3, icon: "status",     message: "Fitness Challenge 2026 status changed to Active",   time: "12s ago"              },
  { id: 4, icon: "warning",    message: "Abnormal voting rate in Best Tech Startup Poll (+520%)", time: "30s ago"         },
  { id: 5, icon: "user",       message: "New user registered from mobile",                   time: "45s ago"              },
  { id: 6, icon: "vote",       message: "User cast a vote in Mobile App UX Design",          time: "1 min ago"            },
];

const newEventPool: Omit<ActivityEvent, "id" | "time">[] = [
  { icon: "vote",       message: "User cast a vote in Summer Photography Showdown", isNew: true },
  { icon: "submission", message: "New submission in Logo Design Challenge",          isNew: true },
  { icon: "user",       message: "New organizer registered: DesignHub Co.",         isNew: true },
  { icon: "vote",       message: "User cast a vote in Best Tech Startup Poll",      isNew: true },
  { icon: "warning",    message: "Multiple rapid votes detected in Logo Challenge", isNew: true },
  { icon: "status",     message: "Recipe Innovation Contest is now Active",         isNew: true },
];

const eventBreakdown = [
  { label: "Votes Cast Today",  value: 3420, max: 5000, color: "bg-violet-500" },
  { label: "New Submissions",   value: 89,   max: 200,  color: "bg-emerald-500" },
  { label: "New Registrations", value: 34,   max: 200,  color: "bg-blue-500"   },
  { label: "Contest Views",     value: 1204, max: 2000, color: "bg-amber-500"  },
];

// ─── Icon map ─────────────────────────────────────────────────────────────────

function EventIcon({ type }: { type: ActivityEvent["icon"] }) {
  const map: Record<ActivityEvent["icon"], { icon: React.ElementType; bg: string; color: string }> = {
    vote:       { icon: ThumbsUp,      bg: "bg-violet-50",  color: "text-violet-500"  },
    submission: { icon: FileText,      bg: "bg-emerald-50", color: "text-emerald-500" },
    status:     { icon: Trophy,        bg: "bg-blue-50",    color: "text-blue-500"    },
    warning:    { icon: AlertTriangle, bg: "bg-amber-50",   color: "text-amber-500"   },
    user:       { icon: UserPlus,      bg: "bg-teal-50",    color: "text-teal-500"    },
  };
  const { icon: Icon, bg, color } = map[type];
  return (
    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${bg}`}>
      <Icon className={`h-3.5 w-3.5 ${color}`} />
    </div>
  );
}

// ─── System status dot ────────────────────────────────────────────────────────

function StatusDot({ status }: { status: SystemStatusLevel }) {
  const styles: Record<SystemStatusLevel, { dot: string; text: string; label: string }> = {
    Operational: { dot: "bg-emerald-400", text: "text-emerald-600", label: "Operational" },
    Degraded:    { dot: "bg-amber-400",   text: "text-amber-600",   label: "Degraded"    },
    Down:        { dot: "bg-red-500",     text: "text-red-600",     label: "Down"        },
  };
  const s = styles[status];
  return (
    <span className={`flex items-center gap-1.5 text-sm font-medium ${s.text}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MonitoringPage() {
  const [mobileUsers, setMobileUsers] = useState(54);
  const [webUsers, setWebUsers]       = useState(35);
  const [votesPerMin, setVotesPerMin] = useState(23);
  const [subsPerHour, setSubsPerHour] = useState(7);

  const activeUsers = mobileUsers + webUsers;

  const [events, setEvents] = useState<ActivityEvent[]>(initialEvents);
  const nextId = useRef(100);
  const poolIndex = useRef(0);

  // Simulate live counter drift every 3s
  useEffect(() => {
    const t = setInterval(() => {
      setMobileUsers((v) => Math.max(30, v + Math.floor(Math.random() * 5) - 2));
      setWebUsers((v)    => Math.max(20, v + Math.floor(Math.random() * 4) - 2));
      setVotesPerMin((v) => Math.max(10, v + Math.floor(Math.random() * 5) - 2));
      setSubsPerHour((v) => Math.max(1,  v + Math.floor(Math.random() * 3) - 1));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // Simulate new event every 5s
  useEffect(() => {
    const t = setInterval(() => {
      const template = newEventPool[poolIndex.current % newEventPool.length];
      poolIndex.current += 1;
      const newEvent: ActivityEvent = { ...template, id: nextId.current++, time: "Just now", isNew: true };
      setEvents((prev) => {
        const updated = prev.map((e) =>
          e.time === "Just now" ? { ...e, time: "5s ago", isNew: false } : e
        );
        return [newEvent, ...updated].slice(0, 8);
      });
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const mobilePercent = Math.round((mobileUsers / activeUsers) * 100);
  const webPercent    = 100 - mobilePercent;

  return (
    <div className="space-y-6">

      {/* ── Section heading ── */}
      <h2 className="text-base font-semibold text-gray-800">Platform Health</h2>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

        {/* Active Users — with mobile/web breakdown */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5">
          <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-xl bg-[#9B1C1C]" />
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-violet-50 p-2.5">
              <Users className="h-5 w-5 text-violet-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-gray-900">{activeUsers}</p>
          <p className="mt-0.5 text-sm text-gray-500">Active Users</p>

          {/* Progress bar: mobile vs web */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 flex">
            <div
              className="h-full bg-violet-500 transition-all duration-700"
              style={{ width: `${mobilePercent}%` }}
            />
            <div
              className="h-full bg-blue-400 transition-all duration-700"
              style={{ width: `${webPercent}%` }}
            />
          </div>

          {/* Mobile / Web labels */}
          <div className="mt-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Smartphone className="h-3 w-3 text-violet-500" />
              <span className="font-semibold text-gray-700">{mobileUsers}</span>
              <span className="text-gray-400">Mobile</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Monitor className="h-3 w-3 text-blue-400" />
              <span className="font-semibold text-gray-700">{webUsers}</span>
              <span className="text-gray-400">Web</span>
            </span>
          </div>
        </div>

        {/* Votes / Minute */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5">
          <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-xl bg-violet-500" />
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-violet-50 p-2.5">
              <ThumbsUp className="h-5 w-5 text-violet-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {votesPerMin}
            <span className="ml-1 text-base font-normal text-gray-400">/ min</span>
          </p>
          <p className="mt-0.5 text-sm text-gray-500">Votes / Minute</p>
        </div>

        {/* Submissions / Hour */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5">
          <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-xl bg-emerald-500" />
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-emerald-50 p-2.5">
              <FileText className="h-5 w-5 text-emerald-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {subsPerHour}
            <span className="ml-1 text-base font-normal text-gray-400">/ hr</span>
          </p>
          <p className="mt-0.5 text-sm text-gray-500">Submissions / Hour</p>
        </div>

        {/* Active Contests */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5">
          <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-xl bg-amber-400" />
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-amber-50 p-2.5">
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">4</p>
          <p className="mt-0.5 text-sm text-gray-500">Active Contests</p>
        </div>
      </div>

      {/* ── Bottom grid ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">

        {/* Live Activity Stream */}
        <div className="rounded-xl border-t-4 border-t-[#9B1C1C] border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="text-base font-semibold text-gray-800">Live Activity Stream</h3>
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Real-time
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            {events.map((event) => (
              <div
                key={event.id}
                className={`flex items-start gap-3 px-5 py-3.5 transition-colors ${
                  event.isNew ? "bg-blue-50/40" : "hover:bg-gray-50/60"
                }`}
              >
                <EventIcon type={event.icon} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{event.message}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{event.time}</p>
                </div>
                {event.isNew && (
                  <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                    New
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">

          {/* System Status */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-base font-semibold text-gray-800">System Status</h3>
            <div className="space-y-3">
              {systemServices.map((svc) => (
                <div key={svc.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{svc.name}</span>
                  <StatusDot status={svc.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Event Breakdown */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-base font-semibold text-gray-800">Event Breakdown</h3>
            <div className="space-y-4">
              {eventBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-800">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      className={`h-1.5 rounded-full ${item.color}`}
                      style={{ width: `${Math.min(100, (item.value / item.max) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}