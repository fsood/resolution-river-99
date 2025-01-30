import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TeamSection } from "@/components/admin/TeamSection";
import { ChannelsSection } from "@/components/admin/ChannelsSection";
import { WorkflowsSection } from "@/components/admin/WorkflowsSection";

const Admin = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-primary">Admin</h1>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <div className="space-y-12">
              <TeamSection />
              <ChannelsSection />
              <WorkflowsSection />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;