import { Trophy, Users, FileText, ThumbsUp } from "lucide-react";

const stats = [
  {
    label: "Active Contests",
    value: "4",
    sub: "+2 this week",
    icon: Trophy,
    iconColor: "text-[#9B1C1C]",
    iconBg: "bg-red-50",
  },
  {
    label: "Draft Contests",
    value: "2",
    sub: null,
    icon: Trophy,
    iconColor: "text-[#9B1C1C]",
    iconBg: "bg-red-50",
  },
  {
    label: "Closed Contests",
    value: "1",
    sub: null,
    icon: Trophy,
    iconColor: "text-[#9B1C1C]",
    iconBg: "bg-red-50",
  },
  {
    label: "Total Users",
    value: "1,248",
    sub: "+48 this month",
    icon: Users,
    iconColor: "text-[#9B1C1C]",
    iconBg: "bg-red-50",
  },
  {
    label: "Total Submissions",
    value: "2,891",
    sub: "+124 this week",
    icon: FileText,
    iconColor: "text-[#9B1C1C]",
    iconBg: "bg-red-50",
  },
  {
    label: "Total Votes",
    value: "47,230",
    sub: "+3.2k today",
    icon: ThumbsUp,
    iconColor: "text-[#9B1C1C]",
    iconBg: "bg-red-50",
  },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4"
        >
          {/* Top border accent */}
          <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-xl bg-[#9B1C1C]" />

          <div className="flex items-start justify-between">
            <p className="text-xs text-gray-500">{s.label}</p>
            <div className={`rounded-lg p-1.5 ${s.iconBg}`}>
              <s.icon className={`h-4 w-4 ${s.iconColor}`} />
            </div>
          </div>

          <p className="mt-2 text-2xl font-bold text-gray-900">{s.value}</p>

          {s.sub && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <span>↗</span>
              {s.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}