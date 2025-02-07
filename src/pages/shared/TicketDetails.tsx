
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { EmployeeSidebar } from "@/components/employee/EmployeeSidebar";
import { useLocation } from "react-router-dom";

const TicketDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [ticket, setTicket] = useState(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {isAdminRoute ? <AdminSidebar /> : <EmployeeSidebar />}
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Ticket Details #{id}</h1>
          {/* Ticket details content */}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TicketDetails;
