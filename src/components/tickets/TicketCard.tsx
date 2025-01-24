import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import type { Ticket } from "@/types/ticket";

interface TicketCardProps {
  ticket: Ticket;
}

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

export const TicketCard = ({ ticket }: TicketCardProps) => {
  const StatusIcon = statusConfig[ticket.status].icon;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
            <div className="flex gap-2 items-center flex-wrap">
              <Badge className={statusConfig[ticket.status].className}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig[ticket.status].label}
              </Badge>
              <Badge className={priorityColors[ticket.priority]}>
                {ticket.priority}
              </Badge>
              <Badge variant="outline">{ticket.type}</Badge>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(ticket.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="space-x-4">
            <span>Company: {ticket.company}</span>
            <span>Contact: {ticket.contact}</span>
          </div>
          {ticket.agent && <span>Agent: {ticket.agent}</span>}
        </div>
        
        {ticket.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
        )}
      </div>
    </Card>
  );
};