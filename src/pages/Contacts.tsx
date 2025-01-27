import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContactList } from "@/components/contacts/ContactList";
import { ContactHeader } from "@/components/contacts/ContactHeader";
import { ContactFilters } from "@/components/contacts/ContactFilters";
import { ContactForm } from "@/components/contacts/ContactForm";
import type { Contact } from "@/types/contact";

const Contacts = () => {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [filterCreatedAt, setFilterCreatedAt] = useState("");
  const [filterCompany, setFilterCompany] = useState("");

  const handleNewContact = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitContact = (contact: Omit<Contact, "id">) => {
    const newContact = {
      ...contact,
      id: crypto.randomUUID(),
    };
    setContacts((prev) => [...prev, newContact]);
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
    setSelectedContacts((prev) => prev.filter((contactId) => contactId !== id));
  };

  const handleDeleteSelected = () => {
    setContacts((prev) =>
      prev.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <ContactHeader />
          <main className="container mx-auto px-4 py-8">
            {showForm ? (
              <ContactForm onClose={handleCloseForm} onSubmit={handleSubmitContact} />
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <ContactFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onNewContact={handleNewContact}
                    contacts={contacts}
                    onFilterChange={{
                      setFilterCreatedAt,
                      setFilterCompany,
                    }}
                  />
                </div>
                <ContactList
                  contacts={contacts}
                  selectedContacts={selectedContacts}
                  setSelectedContacts={setSelectedContacts}
                  onDeleteContact={handleDeleteContact}
                  onDeleteSelected={handleDeleteSelected}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Contacts;