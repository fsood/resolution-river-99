import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { ContactFields } from "./form/ContactFields";
import { TicketDetailsFields } from "./form/TicketDetailsFields";
import type { Ticket } from "@/types/ticket";

interface TicketFormProps {
  onClose: () => void;
  onSubmit: (ticketData: Omit<Ticket, "id">) => void;
}

export const TicketForm = ({ onClose, onSubmit }: TicketFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    company: "",
    contact: "",
    agent: "",
    type: "problem",
    source: "email",
    priority: "medium",
    status: "open",
    createdAt: new Date().toISOString(),
    documentUrl: "",
    companyId: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.description || !formData.company || !formData.contact) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoFields formData={formData} handleChange={handleChange} />
      <ContactFields formData={formData} handleChange={handleChange} />
      <TicketDetailsFields formData={formData} handleChange={handleChange} />
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};