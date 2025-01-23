import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

const mockTickets: Ticket[] = [
  {
    id: "TICK-001",
    title: "Unable to access email",
    status: "open",
    priority: "high",
    createdAt: "2024-03-10",
  },
  {
    id: "TICK-002",
    title: "Printer not responding",
    status: "in-progress",
    priority: "medium",
    createdAt: "2024-03-09",
  },
  {
    id: "TICK-003",
    title: "Software update request",
    status: "closed",
    priority: "low",
    createdAt: "2024-03-08",
  },
];

const statusColors = {
  open: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  closed: "bg-green-100 text-green-800",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-red-100 text-red-800",
};

export const TicketList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
        <Button className="bg-primary hover:bg-primary/90">New Ticket</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tickets..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid gap-4">
        {mockTickets.map((ticket) => (
          <Card key={ticket.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-gray-500">
                    {ticket.id}
                  </span>
                  <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
                </div>
                <div className="flex gap-2">
                  <Badge className={statusColors[ticket.status]}>
                    {ticket.status}
                  </Badge>
                  <Badge className={priorityColors[ticket.priority]}>
                    {ticket.priority}
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-gray-500">{ticket.createdAt}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};