import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TicketFilters } from "./tickets/TicketFilters";
import { TicketCard } from "./tickets/TicketCard";
import { TicketActions } from "./tickets/TicketActions";

interface TicketListProps {
  onNewTicket: () => void;
}

interface Ticket {
  id: string;
  title: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  closedAt?: string;
  requester: string;
  company: string;
  agent?: string;
}

const mockTickets: Ticket[] = [
  {
    id: "TICK-001",
    title: "Unable to access email",
    status: "open",
    priority: "high",
    createdAt: "2024-03-10",
    requester: "John Doe",
    company: "Acme Corp",
    agent: "Sarah Smith",
  },
  {
    id: "TICK-002",
    title: "Printer not responding",
    status: "in-progress",
    priority: "medium",
    createdAt: "2024-03-09",
    requester: "Jane Smith",
    company: "TechCo",
  },
  {
    id: "TICK-003",
    title: "Software update request",
    status: "closed",
    priority: "low",
    createdAt: "2024-03-08",
    closedAt: "2024-03-09",
    requester: "Mike Johnson",
    company: "DevInc",
    agent: "Tom Wilson",
  },
];

export const TicketList = ({ onNewTicket }: TicketListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [filterCreatedAt, setFilterCreatedAt] = useState<string>("");
  const [filterClosedAt, setFilterClosedAt] = useState<string>("");
  const [filterCompany, setFilterCompany] = useState<string>("");
  const [filterAgent, setFilterAgent] = useState<string>("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(mockTickets.map(ticket => ticket.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (ticketId: string, checked: boolean) => {
    if (checked) {
      setSelectedTickets([...selectedTickets, ticketId]);
    } else {
      setSelectedTickets(selectedTickets.filter(id => id !== ticketId));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on tickets:`, selectedTickets);
  };

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCreatedAt = !filterCreatedAt || ticket.createdAt === filterCreatedAt;
    const matchesClosedAt = !filterClosedAt || ticket.closedAt === filterClosedAt;
    const matchesCompany = !filterCompany || ticket.company === filterCompany;
    const matchesAgent = !filterAgent || ticket.agent === filterAgent;
    
    return matchesSearch && matchesCreatedAt && matchesClosedAt && matchesCompany && matchesAgent;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <TicketFilters
          onFilterChange={{
            setFilterCreatedAt,
            setFilterClosedAt,
            setFilterCompany,
            setFilterAgent,
          }}
          tickets={mockTickets}
        />
        
        <div className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <SidebarTrigger>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SidebarTrigger>
              <TicketActions
                selectedTickets={selectedTickets}
                tickets={mockTickets}
                onBulkAction={handleBulkAction}
              />
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-2 px-4">
                <Checkbox
                  checked={selectedTickets.length === mockTickets.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-500">Select All</span>
              </div>

              {filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  isSelected={selectedTickets.includes(ticket.id)}
                  onSelect={(checked) => handleSelectTicket(ticket.id, checked)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
