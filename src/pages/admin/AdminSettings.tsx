
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { TeamSection } from "@/components/admin/TeamSection";
import { ChannelsSection } from "@/components/admin/ChannelsSection";
import { WorkflowsSection } from "@/components/admin/WorkflowsSection";

const AdminSettings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-primary">Settings</h1>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8 space-y-16">
            <TeamSection />
            <ChannelsSection />
            <WorkflowsSection />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminSettings;
