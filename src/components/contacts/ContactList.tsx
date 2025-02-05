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

interface ContactListProps {
  contacts: Contact[];
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  onDeleteContact: (id: string) => void;
  onDeleteSelected: () => void;
  contactsCount: Record<string, number>;
}

export const ContactList = ({ 
  contacts, 
  selectedContacts,
  setSelectedContacts,
  onDeleteContact,
  onDeleteSelected,
  contactsCount 
}: ContactListProps) => {
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
              <DropdownMenuItem onClick={() => console.log("Edit clicked", contact)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteContact(contact.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
      {selectedContacts.length > 0 && (
        <div className="flex justify-end p-4">
          <Button variant="destructive" onClick={onDeleteSelected}>
            Delete Selected ({selectedContacts.length})
          </Button>
        </div>
      )}
    </div>
  );
};