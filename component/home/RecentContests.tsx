import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ContestStatus = "Winner Declared" | "Active" | "Closed" | "Draft";

interface Contest {
  name: string;
  organizer: string;
  type: string;
  status: ContestStatus;
  entries: number;
}

const contests: Contest[] = [
  { name: "Summer Photography Show",    organizer: "TechBrand Inc.",      type: "Submission + Voting", status: "Winner Declared", entries: 234   },
  { name: "Logo Design Challenge",      organizer: "Creative Studio",     type: "Submission + Voting", status: "Active",          entries: 89    },
  { name: "Eco-Friendly Product Givea", organizer: "EcoGreen Initiative", type: "Giveaway",            status: "Active",          entries: 512   },
  { name: "Best Tech Startup Poll 2026",organizer: "TechBrand Inc.",      type: "Poll",                status: "Active",          entries: 1204  },
  { name: "Winter Art Exhibition",      organizer: "ArtisanCraft Co.",    type: "Submission + Voting", status: "Closed",          entries: 167   },
];

const statusStyles: Record<ContestStatus, string> = {
  "Winner Declared": "bg-blue-50   text-blue-700   border-blue-200",
  "Active":          "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Closed":          "bg-orange-50 text-orange-600  border-orange-200",
  "Draft":           "bg-gray-100  text-gray-500    border-gray-200",
};

export function RecentContests() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-800">Recent Contests</h2>
        <Link
          href="/contests"
          className="flex items-center gap-1 text-xs font-medium text-[#9B1C1C] hover:underline"
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/60">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Contest</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Type</th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">Status</th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">Entries</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {contests.map((c) => (
              <tr key={c.name} className="hover:bg-gray-50/60">
                {/* Contest name + organizer */}
                <td className="px-5 py-3.5">
                  <p className="font-medium text-gray-800 truncate max-w-[200px]">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.organizer}</p>
                </td>
                {/* Type */}
                <td className="px-5 py-3.5 text-gray-500">{c.type}</td>
                {/* Status */}
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
                {/* Entries */}
                <td className="px-5 py-3.5 text-right font-medium text-gray-700">
                  {c.entries.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}