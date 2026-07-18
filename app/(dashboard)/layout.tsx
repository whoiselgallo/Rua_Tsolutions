import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rua-layout">
      <Sidebar />
      <div className="rua-main">
        <Topbar pendingCount={2} />
        <main className="rua-page" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
