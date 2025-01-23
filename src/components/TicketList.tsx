import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

interface TicketListProps {
  onNewTicket: () => void;
}

interface Ticket {
  id: string;
  title: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  requester: string;
}

const mockTickets: Ticket[] = [
  {
    id: "TICK-001",
    title: "Unable to access email",
    status: "open",
    priority: "high",
    createdAt: "2024-03-10",
    requester: "John Doe",
  },
  {
    id: "TICK-002",
    title: "Printer not responding",
    status: "in-progress",
    priority: "medium",
    createdAt: "2024-03-09",
    requester: "Jane Smith",
  },
  {
    id: "TICK-003",
    title: "Software update request",
    status: "closed",
    priority: "low",
    createdAt: "2024-03-08",
    requester: "Mike Johnson",
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

  const filteredTickets = mockTickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid gap-4">
        {filteredTickets.map((ticket) => {
          const StatusIcon = statusConfig[ticket.status].icon;
          return (
            <Card
              key={ticket.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
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
                      {ticket.requester}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{ticket.createdAt}</div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  );
};