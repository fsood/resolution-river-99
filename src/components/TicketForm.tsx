import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CompanyForm } from "@/components/companies/CompanyForm";
import { ContactForm } from "@/components/contacts/ContactForm";
import type { Ticket } from "@/types/ticket";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";
import { TicketBasicInfo } from "./tickets/form/TicketBasicInfo";
import { TicketTypeInfo } from "./tickets/form/TicketTypeInfo";
import { TicketAgentInfo } from "./tickets/form/TicketAgentInfo";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface TicketFormProps {
  onClose: () => void;
  onSubmit: (ticket: Omit<Ticket, "id">) => void;
  initialData?: Ticket;
}

export const TicketForm = ({ onClose, onSubmit, initialData }: TicketFormProps) => {
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [formData, setFormData] = useState<{
    subject: string;
    company: string;
    contact: string;
    type: "problem" | "question" | "incident";
    source: string;
    status: "open" | "in-progress" | "closed";
    priority: "high" | "medium" | "low";
    agent: string;
    description: string;
    documentUrl: string;
  }>(initialData || {
    subject: "",
    company: "",
    contact: "",
    type: "problem",
    source: "",
    status: "open",
    priority: "high",
    agent: "",
    description: "",
    documentUrl: "",
  });

  useEffect(() => {
    const storedCompanies = JSON.parse(localStorage.getItem("companies") || "[]");
    setCompanies(storedCompanies);
  }, []);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    setContacts(storedContacts);
  }, []);

  const handleCompanyChange = (companyId: string) => {
    setFormData((prev) => ({ ...prev, company: companyId, contact: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.company || !formData.contact) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const selectedCompany = companies.find(company => company.id === formData.company);
    const newTicket: Omit<Ticket, "id"> = {
      ...formData,
      companyId: selectedCompany?.id || "",
      createdAt: new Date().toISOString(),
    };

    if (initialData) {
      const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      const updatedTickets = tickets.map((t: Ticket) =>
        t.id === initialData.id ? { ...newTicket, id: initialData.id } : t
      );
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      toast({ title: "Success", description: "Ticket updated successfully" });
    } else {
      const existingTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      const updatedTickets = [...existingTickets, { ...newTicket, id: crypto.randomUUID() }];
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      toast({ title: "Success", description: "Ticket created successfully" });
    }

    onSubmit(newTicket);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "type" && value === "" ? "problem" : value,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">
            {initialData ? "Edit Ticket" : "Create New Ticket"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <TicketBasicInfo
            formData={formData}
            handleChange={handleChange}
            companies={companies}
            contacts={contacts}
            handleCompanyChange={handleCompanyChange}
          />

          <TicketTypeInfo
            formData={formData}
            handleChange={handleChange}
          />

          <TicketAgentInfo
            formData={formData}
            handleChange={handleChange}
          />

          <div className="space-y-2">
            <Label>Document URL</Label>
            <Input
              value={formData.documentUrl}
              onChange={(e) => handleChange("documentUrl", e.target.value)}
              placeholder="Enter document URL"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Detailed description of the issue"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t pt-6">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Ticket" : "Create Ticket"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};