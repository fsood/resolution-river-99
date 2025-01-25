import React from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
            <TicketFilters
              onFilterChange={onFilterChange}
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
  );
};