import { useState } from "react";
import { TicketCard } from "./TicketCard";
import { TicketSearch } from "./TicketSearch";
import { TicketFilters } from "./TicketFilters";
import { TicketActions } from "./TicketActions";
import { TicketHeader } from "./TicketHeader";
import type { Ticket } from "@/types/ticket";

interface TicketListProps {
  tickets: Ticket[];
  onNewTicket: () => void;
}

export const TicketList = ({ tickets, onNewTicket }: TicketListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [filterCreatedAt, setFilterCreatedAt] = useState("");
  const [filterClosedAt, setFilterClosedAt] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [filterAgent, setFilterAgent] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleBulkAction = (action: string) => {
    // Handle bulk actions like delete, assign, etc.
    console.log(`Bulk action ${action} for tickets:`, selectedTickets);
    setSelectedTickets([]);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompany = !filterCompany || ticket.company === filterCompany;
    const matchesAgent = !filterAgent || ticket.agent === filterAgent;
    const matchesType = !filterType || ticket.type === filterType;
    const matchesPriority = !filterPriority || ticket.priority === filterPriority;
    const matchesStatus = !filterStatus || ticket.status === filterStatus;
    
    return (
      matchesSearch &&
      matchesCompany &&
      matchesAgent &&
      matchesType &&
      matchesPriority &&
      matchesStatus
    );
  });

  return (
    <div className="flex-1">
      <TicketHeader tickets={tickets} />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <TicketSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onNewTicket={onNewTicket}
            tickets={tickets}
            onFilterChange={{
              setFilterCreatedAt,
              setFilterClosedAt,
              setFilterCompany,
              setFilterAgent,
              setFilterType,
              setFilterPriority,
              setFilterStatus,
            }}
          />

          <TicketActions
            selectedTickets={selectedTickets}
            tickets={tickets}
            onBulkAction={handleBulkAction}
          />

          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}

            {filteredTickets.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No tickets found
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};