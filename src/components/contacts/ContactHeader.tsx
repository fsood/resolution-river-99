import { SidebarTrigger } from "@/components/ui/sidebar";

export const ContactHeader = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold text-primary">Contacts</h1>
        </div>
      </div>
    </header>
  );
};