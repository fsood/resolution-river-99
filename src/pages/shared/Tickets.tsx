
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { EmployeeSidebar } from "@/components/employee/EmployeeSidebar";
import { TicketList } from "@/components/tickets/TicketList";
import { useLocation } from "react-router-dom";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleNewTicket = () => {
    // Handle new ticket creation
    console.log("Creating new ticket");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {isAdminRoute ? <AdminSidebar /> : <EmployeeSidebar />}
        <TicketList tickets={tickets} onNewTicket={handleNewTicket} />
      </div>
    </SidebarProvider>
  );
};

export default Tickets;
