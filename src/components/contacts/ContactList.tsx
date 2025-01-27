import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
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
  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((contact) => contact.id));
    }
  };

  const handleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((contactId) => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  return (
    <div>
      {selectedContacts.length > 0 && (
        <div className="mb-4">
          <Button variant="destructive" onClick={onDeleteSelected}>
            Delete Selected ({selectedContacts.length})
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedContacts.length === contacts.length && contacts.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={() => handleSelectContact(contact.id)}
                />
              </TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.title}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteContact(contact.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};