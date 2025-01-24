import React, { useState } from "react";
import { Search, Filter, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TicketFilters } from "./tickets/TicketFilters";
import { TicketCard } from "./tickets/TicketCard";
import type { Ticket } from "@/types/ticket";

interface TicketListProps {
  tickets: Ticket[];
  onNewTicket: () => void;
}

export const TicketList = ({ tickets, onNewTicket }: TicketListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCreatedAt, setFilterCreatedAt] = useState<string>("");
  const [filterClosedAt, setFilterClosedAt] = useState<string>("");
  const [filterCompany, setFilterCompany] = useState<string>("");
  const [filterAgent, setFilterAgent] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.contact.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCreatedAt = !filterCreatedAt || ticket.createdAt.includes(filterCreatedAt);
    const matchesClosedAt = !filterClosedAt || (ticket.closedAt && ticket.closedAt.includes(filterClosedAt));
    const matchesCompany = !filterCompany || ticket.company === filterCompany;
    const matchesAgent = !filterAgent || ticket.agent === filterAgent;
    const matchesType = !filterType || ticket.type === filterType;
    const matchesPriority = !filterPriority || ticket.priority === filterPriority;
    const matchesStatus = !filterStatus || ticket.status === filterStatus;
    
    return matchesSearch && matchesCreatedAt && matchesClosedAt && matchesCompany && 
           matchesAgent && matchesType && matchesPriority && matchesStatus;
  });

  return (
    <div className="min-h-screen w-full">
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <TicketFilters
                    onFilterChange={{
                      setFilterCreatedAt,
                      setFilterClosedAt,
                      setFilterCompany,
                      setFilterAgent,
                      setFilterType,
                      setFilterPriority,
                      setFilterStatus,
                    }}
                    tickets={tickets}
                  />
                </SheetContent>
              </Sheet>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={onNewTicket}
              >
                New Ticket
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
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
      </div>
    </div>
  );
};