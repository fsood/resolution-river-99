import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

interface TicketCardProps {
  ticket: {
    id: string;
    title: string;
    status: "open" | "in-progress" | "closed";
    priority: "low" | "medium" | "high";
    createdAt: string;
    closedAt?: string;
    requester: string;
    company: string;
    agent?: string;
  };
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
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

export const TicketCard = ({ ticket, isSelected, onSelect }: TicketCardProps) => {
  const StatusIcon = statusConfig[ticket.status].icon;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelect(checked as boolean)}
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
};