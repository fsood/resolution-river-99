import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Contact } from "@/types/contact";

interface ContactListProps {
  contacts: Contact[];
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  onDeleteContact: (id: string) => void;
  onDeleteSelected: () => void;
}

export const ContactList = ({
  contacts,
  selectedContacts,
  setSelectedContacts,
  onDeleteContact,
  onDeleteSelected,
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
          <div>
            <h3 className="text-lg font-semibold">{contact.name}</h3>
            <p className="text-sm text-gray-500">{contact.email}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => handleSelectContact(contact.id)}>
              {selectedContacts.includes(contact.id) ? "Deselect" : "Select"}
            </Button>
            <Button variant="destructive" onClick={() => onDeleteContact(contact.id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
      {selectedContacts.length > 0 && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={onDeleteSelected}>
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  );
};
