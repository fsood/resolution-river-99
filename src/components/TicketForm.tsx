import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import type { Ticket } from "@/types/ticket";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";
import { AlertCircle } from "lucide-react";

interface TicketFormProps {
  onClose: () => void;
  onSubmit: (ticket: Omit<Ticket, "id">) => void;
  companies: any[];
}

export const TicketForm = ({ onClose, onSubmit }: TicketFormProps) => {
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formData, setFormData] = useState({
    subject: "",
    company: "",
    contact: "",
    type: "",
    source: "",
    status: "open",
    priority: "",
    agent: "",
    description: "",
  });

  // Load companies from localStorage
  useEffect(() => {
    const storedCompanies = JSON.parse(localStorage.getItem("companies") || "[]");
    setCompanies(storedCompanies);
    console.log("Loaded Companies:", storedCompanies);
  }, []);

  // Update contacts when company changes
    const handleCompanyChange = (companyId: string) => {
      setFormData((prev) => ({ ...prev, company: companyId, contact: "" }));
      
      const selectedCompany = companies.find((c) => c.id === companyId);
      setContacts(selectedCompany?.Contacts || []);
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
    onSubmit({
      ...formData,
      companyId: selectedCompany?.id || "",
      createdAt: new Date().toISOString(),
    } as Omit<Ticket, "id">);
    
    toast({ title: "Success", description: "Ticket created successfully" });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Ticket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subject*</label>
            <Input
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="Brief description of the issue"
            />
          </div>

        {/* Company Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Company*</label>
              <Select
                value={formData.company}
                onValueChange={(value) => handleChange("company", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-companies" disabled>No companies available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Contact Dropdown (Filtered by Selected Company) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Contact*</label>
            <Select
              value={formData.contact}
              onValueChange={(value) => handleChange("contact", value)}
              disabled={!formData.company || contacts.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder={contacts.length > 0 ? "Select a contact" : "No contacts available"} />
              </SelectTrigger>
              <SelectContent>
                {contacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger
                  className="w-full justify-start text-left font-normal"
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-md rounded-md border border-gray-300">
                  <SelectItem value="problem">Problem</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="incident">Incident</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Source</label>
              <Input
                value={formData.source}
                onChange={(e) => handleChange("source", e.target.value)}
                placeholder="Ticket source"
              />
            </div>
          </div>

          <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <Select onValueChange={(value) => handleChange("priority", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-md">
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Agent</label>
              <Input
                value={formData.agent}
                onChange={(e) => handleChange("agent", e.target.value)}
                placeholder="Assigned agent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
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
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Create Ticket
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};