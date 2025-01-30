import { useState, useEffect } from "react";
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
  const [companies, setCompanies] = useState<any[]>([]); // To store company data for selecting in contact form
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [filterCreatedAt, setFilterCreatedAt] = useState("");
  const [filterCompany, setFilterCompany] = useState("");

  // Load contacts and companies from localStorage on initial render
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const savedCompanies = localStorage.getItem('companies');



    
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
    if (savedCompanies) {
      setCompanies(JSON.parse(savedCompanies));
    }
  }, []);

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
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const handleDeleteContact = (id: string) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setSelectedContacts((prev) => prev.filter((contactId) => contactId !== id));
  };

  const handleDeleteSelected = () => {
    const updatedContacts = contacts.filter(
      (contact) => !selectedContacts.includes(contact.id)
    );
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setSelectedContacts([]);
  };

  // Calculate contact count for each company
  const contactsCount: Record<string, number> = {};
  companies.forEach((company) => {
    contactsCount[company.id] = contacts.filter(
      (contact) => contact.company === company.name
    ).length; // Count contacts that belong to this company
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <ContactHeader />
          <main className="container mx-auto px-4 py-8">
            {showForm ? (
              <ContactForm
                onClose={handleCloseForm}
                onSubmit={handleSubmitContact}
                companies={companies}
              />
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
                  contactsCount={contactsCount}
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
