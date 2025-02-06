import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EmployeeSidebar } from "@/components/EmployeeSidebar";
import { TicketList } from "@/components/tickets/TicketList";
import { TicketForm } from "@/components/tickets/TicketForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Tickets = () => {
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <EmployeeSidebar />
        <div className="flex-1">
          <TicketList 
            tickets={[]} 
            onNewTicket={() => setIsNewTicketOpen(true)} 
          />

          <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
            <DialogContent className="max-w-4xl">
              <TicketForm
                onClose={() => setIsNewTicketOpen(false)}
                onSubmit={() => setIsNewTicketOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Tickets;