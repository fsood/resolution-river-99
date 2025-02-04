import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface TicketTypeInfoProps {
  formData: any;
  handleChange: (field: string, value: string) => void;
}

export const TicketTypeInfo = ({
  formData,
  handleChange,
}: TicketTypeInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Type</Label>
        <Select onValueChange={(value) => handleChange("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="problem">Problem</SelectItem>
            <SelectItem value="question">Question</SelectItem>
            <SelectItem value="incident">Incident</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Source</Label>
        <Select onValueChange={(value) => handleChange("source", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Priority</Label>
        <Select onValueChange={(value) => handleChange("priority", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                High
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};