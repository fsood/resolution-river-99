import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Ticket } from "@/types/ticket";

interface BasicInfoFieldsProps {
  formData: {
    subject: string;
    description: string;
  };
  handleChange: (field: keyof Omit<Ticket, "id">, value: string) => void;
}

export const BasicInfoFields = ({ formData, handleChange }: BasicInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Subject*</Label>
        <Input
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder="Brief description of the issue"
        />
      </div>

      <div className="space-y-2">
        <Label>Description*</Label>
        <Input
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Detailed description of the issue"
        />
      </div>
    </div>
  );
};