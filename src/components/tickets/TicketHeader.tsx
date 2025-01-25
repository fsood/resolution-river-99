import React, { useState } from "react";
import { Bell, Download, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from 'xlsx';
import type { Ticket } from "@/types/ticket";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AppSidebar } from "@/components/AppSidebar";

interface TicketHeaderProps {
  tickets: Ticket[];
}

export const TicketHeader = ({ tickets }: TicketHeaderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  
  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tickets);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tickets");
    XLSX.writeFile(wb, "tickets.xlsx");
  };

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Support Desk</h1>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportToExcel}
        >
          <Download className="h-4 w-4 mr-2" />
          Export to Excel
        </Button>
      </div>
    </div>
  );
};