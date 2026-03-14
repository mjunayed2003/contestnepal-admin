import { ThumbsUp, FileText, Users, AlertTriangle, Trophy } from "lucide-react";

interface Activity {
  id: number;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  message: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: 1,
    icon: ThumbsUp,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    message: "Sophia Anderson voted in Logo Design Challenge",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: FileText,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    message: "New submission by Ethan Taylor in Eco-Friendly Giveaway",
    time: "5 min ago",
  },
  {
    id: 3,
    icon: Users,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
    message: "New organizer registered: PixelDreams Ltd.",
    time: "12 min ago",
  },
  {
    id: 4,
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    message: "Voting spike detected in Best Tech Startup Poll 2026 (+340 votes)",
    time: "18 min ago",
  },
  {
    id: 5,
    icon: Trophy,
    iconColor: "text-[#9B1C1C]",
    iconBg: "bg-red-50",
    message: "Contest \"Mobile App UX Design\" is now active",
    time: "25 min ago",
  },
  {
    id: 6,
    icon: FileText,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    message: "New submission by Charlotte Thomas in Logo",
    time: "32 min ago",
  },
];

export function LiveActivityFeed() {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-800">Live Activity Feed</h2>
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>

      {/* Feed items */}
      <div className="flex flex-col divide-y divide-gray-50 overflow-y-auto">
        {activities.map((a) => (
          <div key={a.id} className="flex gap-3 px-5 py-3.5 hover:bg-gray-50/60">
            <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${a.iconBg}`}>
              <a.icon className={`h-3.5 w-3.5 ${a.iconColor}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs leading-snug text-gray-700">{a.message}</p>
              <p className="mt-1 text-[11px] text-gray-400">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}