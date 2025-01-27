import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Companies = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-primary">Companies</h1>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <p>Companies content will go here</p>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Companies;