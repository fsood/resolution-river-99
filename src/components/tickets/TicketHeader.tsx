import React from "react";
import type { Ticket } from "@/types/ticket";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface TicketHeaderProps {
  tickets: Ticket[];
}

export const TicketHeader = ({ tickets }: TicketHeaderProps) => {
  return (
    <div className="flex-1">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-0 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-primary">Support Tickets</h1>
          </div>
        </div>
      </header>
    </div>
  );
};