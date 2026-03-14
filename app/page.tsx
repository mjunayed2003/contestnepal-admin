
import { DashboardLayout } from "@/component/layout/DasboardLayout";
import { StatCards } from "@/component/home/StatCards";
import { ContestLifecycle } from "@/component/home/ContestLifecycle";
import { RecentContests } from "@/component/home/RecentContests";
import { LiveActivityFeed } from "@/component/home/LiveActivityFeed";

export default function DashboardPage() {
  return (
      <div className="space-y-5">
        {/* Stat Cards */}
        <StatCards />

        {/* Middle Row: Lifecycle + Activity Feed */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <ContestLifecycle />
            <RecentContests />
          </div>
          <LiveActivityFeed />
        </div>
      </div>
  );
}