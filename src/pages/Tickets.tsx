import { useState } from "react";
import { useLocation } from "react-router-dom";
import { TicketList } from "@/components/TicketList";
import { TicketForm } from "@/components/TicketForm";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import type { Ticket } from "@/types/ticket";

const Tickets = () => {
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const location = useLocation();
  const isTicketsPage = location.pathname === "/tickets";

  const handleCreateTicket = (ticketData: Omit<Ticket, "id">) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `TICK-${String(tickets.length + 1).padStart(3, '0')}`,
    };
    setTickets([newTicket, ...tickets]);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {isTicketsPage && (
                  <h1 className="text-2xl font-bold text-primary">Support Desk</h1>
                )}
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            {showForm ? (
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowForm(false)}
                  className="mb-4"
                >
                  ← Back to Tickets
                </Button>
                <TicketForm 
                  onClose={() => setShowForm(false)}
                  onSubmit={handleCreateTicket}
                />
              </div>
            ) : (
              <TicketList 
                tickets={tickets}
                onNewTicket={() => setShowForm(true)}
              />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Tickets;