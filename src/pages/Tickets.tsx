import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TicketList } from "@/components/TicketList";
import { TicketForm } from "@/components/TicketForm";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import type { Ticket } from "@/types/ticket";

const Tickets = () => {
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const location = useLocation();

  // Load tickets from localStorage on component mount
  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  const handleCreateTicket = (ticketData: Omit<Ticket, "id">) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `TICK-${String(tickets.length + 1).padStart(3, '0')}`,
    };
    const updatedTickets = [newTicket, ...tickets];
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Collapsible open={isNavOpen}>
          <CollapsibleContent>
            <AppSidebar />
          </CollapsibleContent>
        </Collapsible>
        <div className="flex-1">
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