import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Ticket } from "@/types/ticket";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { ContactFields } from "./form/ContactFields";
import { TicketDetailsFields } from "./form/TicketDetailsFields";
import { Button } from "@/components/ui/button";

interface TicketFormProps {
  onClose: () => void;
  onSubmit: (ticket: Omit<Ticket, "id">) => void;
}

export const TicketForm = ({ onClose, onSubmit }: TicketFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<Ticket, "id">>({
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
    companyId: ""
  });

  const handleChange = (field: keyof Omit<Ticket, "id">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.description) {
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
      <BasicInfoFields formData={formData} onChange={handleChange} />
      <ContactFields formData={formData} onChange={handleChange} />
      <TicketDetailsFields formData={formData} onChange={handleChange} />
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Ticket</Button>
      </div>
    </form>
  );
};