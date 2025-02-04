import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";

interface TicketBasicInfoProps {
  formData: any;
  handleChange: (field: string, value: string) => void;
  companies: Company[];
  contacts: Contact[];
  handleCompanyChange: (companyId: string) => void;
}

export const TicketBasicInfo = ({
  formData,
  handleChange,
  companies,
  contacts,
  handleCompanyChange,
}: TicketBasicInfoProps) => {
  const filteredContacts = contacts.filter(
    (contact) => contact.companyId === formData.company
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Subject*</Label>
        <Input
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder="Brief description of the issue"
        />
      </div>

      <div className="space-y-2">
        <Label>Company*</Label>
        <Select value={formData.company} onValueChange={handleCompanyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))}
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
            {filteredContacts.map((contact) => (
              <SelectItem key={contact.id} value={contact.id}>
                {contact.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};