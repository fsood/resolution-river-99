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
import { CompanyForm } from "@/components/companies/CompanyForm";
import { ContactForm } from "@/components/contacts/ContactForm";
import type { Ticket } from "@/types/ticket";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";
import { AlertCircle, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TicketFormProps {
  onClose: () => void;
  onSubmit: (ticket: Omit<Ticket, "id">) => void;
  companies: Company[];
}

export const TicketForm = ({ onClose, onSubmit, companies }: TicketFormProps) => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
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

  // Load contacts from localStorage
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    setContacts(storedContacts);
  }, []);

  // Filter contacts based on selected company
  const filteredContacts = contacts.filter(
    (contact) => contact.companyId === formData.company
  );

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

  const handleNewCompanySubmit = (company: Omit<Company, "id">) => {
    const updatedCompanies = [...companies, { ...company, id: crypto.randomUUID() }];
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));
    setShowCompanyForm(false);
    toast({ title: "Success", description: "Company added successfully" });
  };

  const handleNewContactSubmit = (contact: Omit<Contact, "id">) => {
    const newContact = { ...contact, id: crypto.randomUUID() };
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    setShowContactForm(false);
    toast({ title: "Success", description: "Contact added successfully" });
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Company*</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Select
                  value={formData.company}
                  onValueChange={handleCompanyChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={showCompanyForm} onOpenChange={setShowCompanyForm}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[100vh] overflow-y-auto">
                  <CompanyForm
                    onClose={() => setShowCompanyForm(false)}
                    onSubmit={handleNewCompanySubmit}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Contact*</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Select
                  value={formData.contact}
                  onValueChange={(value) => handleChange("contact", value)}
                  disabled={!formData.company}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.company ? "Select a contact" : "Select a company first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredContacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" disabled={!formData.company}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <ContactForm
                    onClose={() => setShowContactForm(false)}
                    onSubmit={handleNewContactSubmit}
                    companies={companies}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
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
              <label className="text-sm font-medium">Source</label>
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
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Agent</label>
              <div className="flex gap-2">
                <Input
                  value={formData.agent}
                  onChange={(e) => handleChange("agent", e.target.value)}
                  placeholder="Assigned agent"
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
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
            Create Ticket
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};