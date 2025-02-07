import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EmployeeSidebar } from "@/components/employee/EmployeeSidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { ContactList } from "@/components/contacts/ContactList";
import { ContactFilters } from "@/components/contacts/ContactFilters";
import { ContactForm } from "@/components/contacts/ContactForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ContactHeader } from "@/components/contacts/ContactHeader";
import type { Contact } from "@/types/contact";
import { useLocation } from "react-router-dom";

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewContactOpen, setIsNewContactOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Load contacts from localStorage
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }

    // Load companies from localStorage
    const savedCompanies = localStorage.getItem('companies');
    if (savedCompanies) {
      setCompanies(JSON.parse(savedCompanies));
    }
  }, []);

  useEffect(() => {
    // Save contacts to localStorage whenever they change
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleDeleteSelected = () => {
    setContacts(contacts.filter(contact => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {isAdminRoute ? <AdminSidebar /> : <EmployeeSidebar />}
        <div className="flex-1">
          <ContactHeader />
          <div className="p-8">
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
                contacts={filteredContacts}
                selectedContacts={selectedContacts}
                setSelectedContacts={setSelectedContacts}
                onDeleteContact={handleDeleteContact}
                onDeleteSelected={handleDeleteSelected}
              />
            </div>

            <Dialog open={isNewContactOpen} onOpenChange={setIsNewContactOpen}>
              <DialogContent className="max-w-2xl">
                <ContactForm
                  companies={companies}
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
      </div>
    </SidebarProvider>
  );
};

export default Contacts;
