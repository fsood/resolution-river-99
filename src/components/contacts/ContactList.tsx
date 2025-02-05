import React from "react";
import type { Contact } from "@/types/contact";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface ContactListProps {
  contacts: Contact[];
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  onEditContact?: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
  onDeleteSelected: () => void;
}

export const ContactList = ({
  contacts,
  selectedContacts,
  setSelectedContacts,
  onEditContact,
  onDeleteContact,
  onDeleteSelected,
}: ContactListProps) => {
  const handleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((contactId) => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allContactIds = contacts.map((contact) => contact.id);
      setSelectedContacts(allContactIds);
    } else {
      setSelectedContacts([]);
    }
  };

  return (
    <div className="space-y-1">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="w-8 py-3 px-4">
              <Checkbox
                checked={selectedContacts.length === contacts.length && contacts.length > 0}
                onCheckedChange={(checked) => handleSelectAll(!!checked)}
              />
            </th>
            <th className="text-left py-3 px-4">Name</th>
            <th className="text-left py-3 px-4">Email</th>
            <th className="w-8 py-3 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4">
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={() => handleSelectContact(contact.id)}
                />
              </td>
              <td className="py-3 px-4">{contact.name}</td>
              <td className="py-3 px-4">{contact.email}</td>
              <td className="py-3 px-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onEditContact && (
                      <DropdownMenuItem onClick={() => onEditContact(contact)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => onDeleteContact(contact.id)}
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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