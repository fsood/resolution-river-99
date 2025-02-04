import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface Agent {
  id: string;
  email: string;
  role: string;
  type: string;
  timeType: string;
}

interface TicketAgentInfoProps {
  formData: any;
  handleChange: (field: string, value: string) => void;
}

export const TicketAgentInfo = ({
  formData,
  handleChange,
}: TicketAgentInfoProps) => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const storedAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    setAgents(storedAgents.filter((agent: Agent) => agent.type === "support"));
  }, []);

  return (
    <div className="space-y-2">
      <Label>Agent</Label>
      <Select
        value={formData.agent}
        onValueChange={(value) => handleChange("agent", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select agent" />
        </SelectTrigger>
        <SelectContent>
          {agents.map((agent) => (
            <SelectItem key={agent.id} value={agent.id}>
              {agent.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};