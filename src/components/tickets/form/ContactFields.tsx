import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactFieldsProps {
  formData: {
    company: string;
    contact: string;
  };
  handleChange: (field: string, value: string) => void;
}

export const ContactFields = ({ formData, handleChange }: ContactFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Company*</Label>
        <Select value={formData.company} onValueChange={(value) => handleChange("company", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="company1">Company 1</SelectItem>
            <SelectItem value="company2">Company 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Contact*</Label>
        <Select
          value={formData.contact}
          onValueChange={(value) => handleChange("contact", value)}
          disabled={!formData.company}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a contact" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="contact1">Contact 1</SelectItem>
            <SelectItem value="contact2">Contact 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};