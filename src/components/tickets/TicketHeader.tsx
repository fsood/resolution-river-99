import React from "react";
import type { Ticket } from "@/types/ticket";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface TicketHeaderProps {
  tickets: Ticket[];
}

export const TicketHeader = ({ tickets }: TicketHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold text-primary">Support Desk</h1>
      </div>
    </div>
  );
};