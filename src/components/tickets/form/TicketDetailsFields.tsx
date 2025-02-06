import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TicketDetailsFieldsProps {
  formData: {
    agent: string;
    type: string;
    priority: string;
  };
  handleChange: (field: string, value: string) => void;
}

export const TicketDetailsFields = ({ formData, handleChange }: TicketDetailsFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Agent</Label>
        <Select value={formData.agent} onValueChange={(value) => handleChange("agent", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select agent" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="agent1">Agent 1</SelectItem>
            <SelectItem value="agent2">Agent 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="problem">Problem</SelectItem>
            <SelectItem value="question">Question</SelectItem>
            <SelectItem value="incident">Incident</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Priority</Label>
        <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};