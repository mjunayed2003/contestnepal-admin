import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-[210px]">
        <Topbar />
        <main className="pt-[72px]">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}