import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import type { Ticket } from "@/types/ticket";

interface TicketFormProps {
  onClose: () => void;
  onSubmit: (ticketData: Omit<Ticket, "id">) => void;
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
    priority: "medium",
    status: "open",
    createdAt: new Date().toISOString(),
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
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="space-y-2">
        <Label>Company*</Label>
        <Select value={formData.company} onValueChange={(value) => handleChange("company", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a company" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {/* Replace with actual company options */}
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
            {/* Replace with actual contact options */}
            <SelectItem value="contact1">Contact 1</SelectItem>
            <SelectItem value="contact2">Contact 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Agent</Label>
        <Select
          value={formData.agent}
          onValueChange={(value) => handleChange("agent", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select agent" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {/* Replace with actual agent options */}
            <SelectItem value="agent1">Agent 1</SelectItem>
            <SelectItem value="agent2">Agent 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <Select 
          value={formData.type} 
          onValueChange={(value) => handleChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="problem">Problem</SelectItem>
            <SelectItem value="question">Question</SelectItem>
            <SelectItem value="incident">Incident</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Priority</Label>
        <Select 
          value={formData.priority} 
          onValueChange={(value) => handleChange("priority", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
