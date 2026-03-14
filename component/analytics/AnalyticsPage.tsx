"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Users, ThumbsUp, FileText, Trophy, TrendingUp, TrendingDown } from "lucide-react";

// ─── Date range ───────────────────────────────────────────────────────────────

type Range = "7d" | "30d" | "90d";

// ─── Chart data ───────────────────────────────────────────────────────────────

const userGrowth7d = [
  { day: "Mon", users: 1180 }, { day: "Tue", users: 1195 },
  { day: "Wed", users: 1210 }, { day: "Thu", users: 1224 },
  { day: "Fri", users: 1236 }, { day: "Sat", users: 1241 },
  { day: "Sun", users: 1248 },
];
const userGrowth30d = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  users: 1000 + Math.floor(Math.sin(i / 3) * 50 + i * 8 + Math.random() * 20),
}));
const userGrowth90d = Array.from({ length: 12 }, (_, i) => ({
  day: `W${i + 1}`,
  users: 900 + Math.floor(i * 30 + Math.random() * 40),
}));

const votesData7d = [
  { day: "Mon", votes: 3100 }, { day: "Tue", votes: 3800 },
  { day: "Wed", votes: 4200 }, { day: "Thu", votes: 3900 },
  { day: "Fri", votes: 5100 }, { day: "Sat", votes: 4700 },
  { day: "Sun", votes: 4521 },
];
const votesData30d = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  votes: 2000 + Math.floor(Math.random() * 3000 + i * 30),
}));
const votesData90d = Array.from({ length: 12 }, (_, i) => ({
  day: `W${i + 1}`,
  votes: 18000 + Math.floor(i * 1500 + Math.random() * 2000),
}));

const submissionsData7d = [
  { day: "Mon", submissions: 38 }, { day: "Tue", submissions: 52 },
  { day: "Wed", submissions: 61 }, { day: "Thu", submissions: 47 },
  { day: "Fri", submissions: 70 }, { day: "Sat", submissions: 55 },
  { day: "Sun", submissions: 44 },
];
const submissionsData30d = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  submissions: 20 + Math.floor(Math.random() * 60),
}));
const submissionsData90d = Array.from({ length: 12 }, (_, i) => ({
  day: `W${i + 1}`,
  submissions: 200 + Math.floor(i * 30 + Math.random() * 100),
}));

const contestTypeData = [
  { name: "Submission + Voting", value: 5, color: "#6366f1" },
  { name: "Giveaway",            value: 2, color: "#10b981" },
  { name: "Poll",                value: 1, color: "#f59e0b" },
];

const topContests = [
  { title: "Best Tech Startup Poll 2026", entries: 1204, votes: 8930,  organizer: "TechBrand Inc.",   status: "Active"          },
  { title: "Summer Photography Showdown", entries: 234,  votes: 4521,  organizer: "TechBrand Inc.",   status: "Winner Declared" },
  { title: "Eco-Friendly Product Giveaway",entries: 512, votes: 0,     organizer: "EcoGreen Init.",   status: "Active"          },
  { title: "Logo Design Challenge",       entries: 89,   votes: 1203,  organizer: "Creative Studio",  status: "Active"          },
  { title: "Winter Art Exhibition",       entries: 167,  votes: 2890,  organizer: "ArtisanCraft Co.", status: "Closed"          },
];

const statusColors: Record<string, string> = {
  "Active":          "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "Winner Declared": "bg-blue-50    text-blue-700   ring-1 ring-blue-200",
  "Closed":          "bg-amber-50   text-amber-600  ring-1 ring-amber-200",
};

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, iconBg, iconColor, topBorder,
  label, value, trend, trendLabel,
}: {
  icon: React.ElementType; iconBg: string; iconColor: string; topBorder: string;
  label: string; value: string; trend: "up" | "down"; trendLabel: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5`}>
      <div className={`absolute left-0 right-0 top-0 h-[3px] rounded-t-xl ${topBorder}`} />
      <div className="flex items-start justify-between">
        <div className={`rounded-xl p-2.5 ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium ${trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
          {trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {trendLabel}
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-0.5 text-sm text-gray-500">{label}</p>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

// ─── Range picker ─────────────────────────────────────────────────────────────

function RangePicker({ value, onChange }: { value: Range; onChange: (r: Range) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
      {(["7d", "30d", "90d"] as Range[]).map((r) => (
        <button key={r} onClick={() => onChange(r)}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            value === r ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}>
          {r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : "90 Days"}
        </button>
      ))}
    </div>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs text-gray-500">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function AnalyticsPage() {
  const [range, setRange] = useState<Range>("7d");

  const userD    = range === "7d" ? userGrowth7d    : range === "30d" ? userGrowth30d    : userGrowth90d;
  const votesD   = range === "7d" ? votesData7d     : range === "30d" ? votesData30d     : votesData90d;
  const subsD    = range === "7d" ? submissionsData7d: range === "30d" ? submissionsData30d: submissionsData90d;

  return (
    <div className="space-y-5">

      {/* ── Top: stat cards + range picker ── */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Overview</h2>
        <RangePicker value={range} onChange={setRange} />
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={Users}    iconBg="bg-blue-50"    iconColor="text-blue-500"    topBorder="bg-blue-500"    label="Total Users"       value="1,248"  trend="up"   trendLabel="+48 this month" />
        <StatCard icon={ThumbsUp} iconBg="bg-violet-50"  iconColor="text-violet-500"  topBorder="bg-violet-500"  label="Total Votes"       value="47,230" trend="up"   trendLabel="+3.2k today"    />
        <StatCard icon={FileText} iconBg="bg-emerald-50" iconColor="text-emerald-500" topBorder="bg-emerald-500" label="Total Submissions"  value="2,891"  trend="up"   trendLabel="+124 this week" />
        <StatCard icon={Trophy}   iconBg="bg-amber-50"   iconColor="text-amber-500"   topBorder="bg-amber-500"   label="Active Contests"   value="4"      trend="down" trendLabel="-1 this week"   />
      </div>

      {/* ── Row 2: User Growth + Votes ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="User Growth">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={userD} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="ugGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="users" name="Users" stroke="#3b82f6" strokeWidth={2} fill="url(#ugGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Votes Over Time">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={votesD} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="votes" name="Votes" stroke="#8b5cf6" strokeWidth={2} fill="url(#vGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Row 3: Submissions bar + Contest type pie ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
        <Card title="Submissions Per Day">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subsD} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="submissions" name="Submissions" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Contest Types">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={contestTypeData} cx="50%" cy="50%"
                innerRadius={55} outerRadius={80}
                paddingAngle={3} dataKey="value"
              >
                {contestTypeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Tooltip formatter={(value: any) => [`${value ?? 0} contests`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {contestTypeData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  {d.name}
                </span>
                <span className="font-semibold text-gray-800">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Row 4: Top Contests ── */}
      <Card title="Top Contests by Engagement">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Contest", "Organizer", "Entries", "Votes", "Status"].map((h) => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {topContests.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="py-3 pr-4 font-medium text-gray-800">{c.title}</td>
                  <td className="py-3 pr-4 text-gray-500">{c.organizer}</td>
                  <td className="py-3 pr-4 text-gray-700">{c.entries.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-gray-700">{c.votes.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}