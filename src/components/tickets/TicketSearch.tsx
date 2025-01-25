import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TicketFilters } from "./TicketFilters";
import type { Ticket } from "@/types/ticket";

interface TicketSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNewTicket: () => void;
  tickets: Ticket[];
  onFilterChange: {
    setFilterCreatedAt: (value: string) => void;
    setFilterClosedAt: (value: string) => void;
    setFilterCompany: (value: string) => void;
    setFilterAgent: (value: string) => void;
    setFilterType: (value: string) => void;
    setFilterPriority: (value: string) => void;
    setFilterStatus: (value: string) => void;
  };
}

export const TicketSearch = ({
  searchQuery,
  setSearchQuery,
  onNewTicket,
  tickets,
  onFilterChange,
}: TicketSearchProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={onNewTicket}>New Ticket</Button>
      </div>
      <TicketFilters onFilterChange={onFilterChange} tickets={tickets} />
    </div>
  );
};