import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Download } from "lucide-react";
import * as XLSX from 'xlsx';

interface TicketActionsProps {
  selectedTickets: string[];
  tickets: any[];
  onBulkAction: (action: string) => void;
}

export const TicketActions = ({ selectedTickets, tickets, onBulkAction }: TicketActionsProps) => {
  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tickets);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tickets");
    XLSX.writeFile(wb, "tickets.xlsx");
  };

  return (
    <div className="space-y-4">
      {selectedTickets.length > 0 && (
        <div className="flex gap-2 bg-gray-50 p-4 rounded-lg">
          <Select onValueChange={onBulkAction}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Bulk Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="assign">Assign</SelectItem>
              <SelectItem value="close">Close</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="merge">Merge</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">
            {selectedTickets.length} tickets selected
          </span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log("Notifications clicked")}
        >
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