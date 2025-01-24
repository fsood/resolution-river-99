import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";

interface TicketFiltersProps {
  onFilterChange: {
    setFilterCreatedAt: (value: string) => void;
    setFilterClosedAt: (value: string) => void;
    setFilterCompany: (value: string) => void;
    setFilterAgent: (value: string) => void;
  };
  tickets: any[];
}

export const TicketFilters = ({ onFilterChange, tickets }: TicketFiltersProps) => {
  const { setFilterCreatedAt, setFilterClosedAt, setFilterCompany, setFilterAgent } = onFilterChange;

  return (
    <Sidebar className="w-64 border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4 p-4">
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};