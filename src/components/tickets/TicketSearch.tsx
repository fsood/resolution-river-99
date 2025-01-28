import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Download } from "lucide-react";
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
  const handleExportToExcel = () => {
    // Export functionality would go here
    console.log("Exporting to Excel...");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex gap-4">
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={onNewTicket}>New Ticket</Button>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleExportToExcel}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <TicketFilters onFilterChange={onFilterChange} tickets={tickets} />
    </div>
  );
};