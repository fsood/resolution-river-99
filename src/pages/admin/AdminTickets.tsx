
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { TicketList } from "@/components/tickets/TicketList";

const AdminTickets = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <TicketList tickets={[]} onNewTicket={() => {}} />
      </div>
    </SidebarProvider>
  );
};

export default AdminTickets;
