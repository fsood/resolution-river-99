import React from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import type { Contact } from "@/types/contact";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ContactList = ({ contacts, onEdit, onDelete }: { 
  contacts: Contact[]; 
  onEdit: (contact: Contact) => void; 
  onDelete: (contactId: string) => void; 
}) => {
  return (
    <div className="space-y-4">
      {contacts.map(contact => (
        <div key={contact.id} className="flex justify-between items-center p-4 border-b">
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <p className="text-sm text-gray-500">{contact.email}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onEdit(contact)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(contact.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};