import { useState } from "react";
import { useLocation } from "react-router-dom";
import { TicketList } from "@/components/TicketList";
import { TicketForm } from "@/components/TicketForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Tickets = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const isTicketsPage = location.pathname === "/tickets";

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
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
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
                <TicketForm onClose={() => setShowForm(false)} />
              </div>
            ) : (
              <TicketList onNewTicket={() => setShowForm(true)} />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Tickets;