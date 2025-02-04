import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import type { Contact } from "@/types/contact";
import { useState, useEffect } from "react";

interface ContactFormProps {
  onClose: () => void;
  onSubmit: (contact: Omit<Contact, "id">) => void;
  companies: any[]; // Company data passed from the parent
}

export const ContactForm = ({ onClose, onSubmit, companies }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const selectedCompany = companies.find(company => company.name === formData.company);
    onSubmit({
      ...formData,
      companyId: selectedCompany?.id || "",
      createdAt: new Date().toISOString(),
    });

    toast({
      title: "Success",
      description: "Contact created successfully",
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">New Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name*</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Contact name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Job title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company*</label>
            <Select
              value={formData.company}
              onValueChange={(value) => handleChange("company", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.name}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email*</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Phone number"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t pt-6">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">
            Create Contact
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
