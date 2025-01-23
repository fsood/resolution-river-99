import { useState } from "react";
import { TicketList } from "@/components/TicketList";
import { TicketForm } from "@/components/TicketForm";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-primary">Support Desk</h1>
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
            <TicketForm />
          </div>
        ) : (
          <TicketList />
        )}
      </main>
    </div>
  );
};

export default Index;