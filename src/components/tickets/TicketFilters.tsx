import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Ticket } from "@/types/ticket";

interface TicketFiltersProps {
  onFilterChange: {
    setFilterCreatedAt: (value: string) => void;
    setFilterClosedAt: (value: string) => void;
    setFilterCompany: (value: string) => void;
    setFilterAgent: (value: string) => void;
    setFilterType: (value: string) => void;
    setFilterPriority: (value: string) => void;
    setFilterStatus: (value: string) => void;
  };
  tickets: Ticket[];
}

export const TicketFilters = ({ onFilterChange, tickets }: TicketFiltersProps) => {
  const {
    setFilterCreatedAt,
    setFilterClosedAt,
    setFilterCompany,
    setFilterAgent,
    setFilterType,
    setFilterPriority,
    setFilterStatus
  } = onFilterChange;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <div className="space-y-4">
          <Select onValueChange={setFilterCreatedAt}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Created Date" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(tickets.map(t => t.createdAt))).map(date => (
                <SelectItem key={date} value={date}>{date}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setFilterClosedAt}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Closed Date" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(tickets.filter(t => t.closedAt).map(t => t.closedAt!))).map(date => (
                <SelectItem key={date} value={date}>{date}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setFilterCompany}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Company" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(tickets.map(t => t.company))).map(company => (
                <SelectItem key={company} value={company}>{company}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setFilterAgent}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Agent" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(tickets.filter(t => t.agent).map(t => t.agent!))).map(agent => (
                <SelectItem key={agent} value={agent}>{agent}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="problem">Problem</SelectItem>
              <SelectItem value="question">Question</SelectItem>
              <SelectItem value="incident">Incident</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setFilterPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};