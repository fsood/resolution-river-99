import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { DialogTitle } from "@/components/ui/dialog";
import type { Group } from "@/types/group";

const BUSINESS_HOURS = [
  "General working hours",
  "24/7",
  "Custom schedule"
];

interface NewGroupFormProps {
  onClose?: () => void;
  initialData?: Group | null;
}

export const NewGroupForm = ({ onClose, initialData }: NewGroupFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [businessHours, setBusinessHours] = useState(initialData?.businessHours || BUSINESS_HOURS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !businessHours) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const existingGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    if (!initialData && existingGroups.some((group: Group) => group.name === name)) {
      toast({
        title: "Error",
        description: "A group with this name already exists",
        variant: "destructive",
      });
      return;
    }

    const newGroup: Group = {
      id: initialData?.id || crypto.randomUUID(),
      name,
      description,
      businessHours,
      agentCount: initialData?.agentCount || 0,
    };

    const updatedGroups = initialData
      ? existingGroups.map((group: Group) => group.id === initialData.id ? newGroup : group)
      : [...existingGroups, newGroup];
      
    localStorage.setItem("groups", JSON.stringify(updatedGroups));

    toast({
      title: "Success",
      description: `Group ${initialData ? 'updated' : 'created'} successfully`,
    });

    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DialogTitle>{initialData ? 'Edit group' : 'New group'}</DialogTitle>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Refund group"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. This group will answer all queries related to refunds."
          />
        </div>

        <div>
          <Label>Business hours</Label>
          <Select value={businessHours} onValueChange={setBusinessHours}>
            <SelectTrigger>
              <SelectValue placeholder="Select business hours" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_HOURS.map((hours) => (
                <SelectItem key={hours} value={hours}>
                  {hours}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? 'Save changes' : 'Create'}</Button>
      </div>
    </form>
  );
};