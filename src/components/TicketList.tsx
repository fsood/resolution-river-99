import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Clock, AlertCircle, CheckCircle2, Download, Bell, Filter } from "lucide-react";
import * as XLSX from 'xlsx';

<lov-add-dependency>xlsx@latest</lov-add-dependency>

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

const statusConfig = {
  open: {
    label: "Open",
    icon: AlertCircle,
    className: "bg-yellow-100 text-yellow-800",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    className: "bg-blue-100 text-blue-800",
  },
  closed: {
    label: "Closed",
    icon: CheckCircle2,
    className: "bg-green-100 text-green-800",
  },
};

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-red-100 text-red-800",
};

export const TicketList = ({ onNewTicket }: TicketListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [filterCreatedAt, setFilterCreatedAt] = useState<string>("");
  const [filterClosedAt, setFilterClosedAt] = useState<string>("");
  const [filterCompany, setFilterCompany] = useState<string>("");
  const [filterAgent, setFilterAgent] = useState<string>("");

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(mockTickets);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tickets");
    XLSX.writeFile(wb, "tickets.xlsx");
  };

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
    // Implement bulk actions here
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

      <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded-lg">
        <Select onValueChange={setFilterCreatedAt}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Created Date" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(new Set(mockTickets.map(t => t.createdAt))).map(date => (
              <SelectItem key={date} value={date}>{date}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setFilterClosedAt}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Closed Date" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(new Set(mockTickets.filter(t => t.closedAt).map(t => t.closedAt!))).map(date => (
              <SelectItem key={date} value={date}>{date}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setFilterCompany}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(new Set(mockTickets.map(t => t.company))).map(company => (
              <SelectItem key={company} value={company}>{company}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setFilterAgent}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Agent" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(new Set(mockTickets.filter(t => t.agent).map(t => t.agent!))).map(agent => (
              <SelectItem key={agent} value={agent}>{agent}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTickets.length > 0 && (
        <div className="flex gap-2 bg-gray-50 p-4 rounded-lg">
          <Select onValueChange={handleBulkAction}>
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

      <div className="grid gap-4">
        <div className="flex items-center gap-2 px-4">
          <Checkbox
            checked={selectedTickets.length === mockTickets.length}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-gray-500">Select All</span>
        </div>

        {filteredTickets.map((ticket) => {
          const StatusIcon = statusConfig[ticket.status].icon;
          return (
            <Card
              key={ticket.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedTickets.includes(ticket.id)}
                  onCheckedChange={(checked) => handleSelectTicket(ticket.id, checked as boolean)}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-gray-500">
                          {ticket.id}
                        </span>
                        <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge className={statusConfig[ticket.status].className}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[ticket.status].label}
                        </Badge>
                        <Badge className={priorityColors[ticket.priority]}>
                          {ticket.priority}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {ticket.requester} ({ticket.company})
                        </span>
                        {ticket.agent && (
                          <span className="text-sm text-gray-500">
                            Assigned to: {ticket.agent}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <div>Created: {ticket.createdAt}</div>
                      {ticket.closedAt && <div>Closed: {ticket.closedAt}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};