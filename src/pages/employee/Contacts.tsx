import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EmployeeSidebar } from "@/components/EmployeeSidebar";
import { ContactList } from "@/components/contacts/ContactList";
import { ContactFilters } from "@/components/contacts/ContactFilters";
import { ContactForm } from "@/components/contacts/ContactForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Contact } from "@/types/contact";

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewContactOpen, setIsNewContactOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleDeleteSelected = () => {
    setContacts(contacts.filter(contact => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <EmployeeSidebar />
        <div className="flex-1 p-8">
          <ContactFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onNewContact={() => setIsNewContactOpen(true)}
            contacts={contacts}
            onFilterChange={{
              setFilterCreatedAt: () => {},
              setFilterCompany: () => {},
            }}
          />

          <div className="mt-8">
            <ContactList
              contacts={contacts}
              selectedContacts={selectedContacts}
              setSelectedContacts={setSelectedContacts}
              onDeleteContact={handleDeleteContact}
              onDeleteSelected={handleDeleteSelected}
            />
          </div>

          <Dialog open={isNewContactOpen} onOpenChange={setIsNewContactOpen}>
            <DialogContent className="max-w-2xl">
              <ContactForm
                onClose={() => setIsNewContactOpen(false)}
                onSubmit={(contact) => {
                  setContacts([...contacts, { ...contact, id: crypto.randomUUID() }]);
                  setIsNewContactOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Contacts;