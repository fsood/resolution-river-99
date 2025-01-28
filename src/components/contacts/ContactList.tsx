import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import type { Contact } from "@/types/contact";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface ContactListProps {
  onNewContact: () => void;
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  onDeleteContact: (id: string) => void;
  onDeleteSelected: () => void;
  onEditContact?: (contact: Contact) => void;
}

export const ContactList = ({
  selectedContacts,
  setSelectedContacts,
  onDeleteContact,
  onDeleteSelected,
  onEditContact,
}: ContactListProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Retrieve contacts from localStorage on component mount
  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

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
                ref={(el) => {
                  if (el) {
                    (el as HTMLInputElement).indeterminate = selectedContacts.length > 0 && selectedContacts.length < contacts.length;
                  }
                }}
                onCheckedChange={(checked) => handleSelectAll(!!checked)}
              />
            </th>
            <th className="text-left py-3 px-4">Contact</th>
            <th className="text-left py-3 px-4">Title</th>
            <th className="text-left py-3 px-4">Company</th>
            <th className="text-left py-3 px-4">Email address</th>
            <th className="text-left py-3 px-4">Work phone</th>
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
              <td className="py-3 px-4">{contact.title}</td>
              <td className="py-3 px-4">{contact.company}</td>
              <td className="py-3 px-4">{contact.email}</td>
              <td className="py-3 px-4">{contact.phone}</td>
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
