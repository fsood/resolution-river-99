import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import type { Contact } from "@/types/contact";

interface ContactListProps {
  contacts: Contact[];
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  onDeleteContact: (id: string) => void;
  onDeleteSelected: () => void;
  onEditContact?: (contact: Contact) => void;
}

export const ContactList = ({
  contacts,
  selectedContacts,
  setSelectedContacts,
  onDeleteContact,
  onDeleteSelected,
  onEditContact,
}: ContactListProps) => {
  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((contactId) => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <Card key={contact.id} className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedContacts.includes(contact.id)}
              onChange={() => handleSelectContact(contact.id)}
              className="h-4 w-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{contact.name}</h3>
              <p className="text-sm text-gray-500">{contact.title}</p>
              <p className="text-sm text-gray-500">{contact.company}</p>
              <p className="text-sm text-gray-500">{contact.email}</p>
              <p className="text-sm text-gray-500">{contact.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onEditContact && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEditContact(contact)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDeleteContact(contact.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
      {selectedContacts.length > 0 && (
        <div className="flex justify-end">
          <Button variant="destructive" onClick={onDeleteSelected}>
            Delete Selected ({selectedContacts.length})
          </Button>
        </div>
      )}
    </div>
  );
};