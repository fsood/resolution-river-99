
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Agents from "./Agents";
import Groups from "./Groups";

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

          <main className="container mx-auto px-4 py-8">
            <Tabs defaultValue="agents">
              <TabsList>
                <TabsTrigger value="agents">Agents</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>
              <TabsContent value="agents">
                <Agents />
              </TabsContent>
              <TabsContent value="groups">
                <Groups />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminSettings;
