import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CompanyList } from "@/components/companies/CompanyList";
import { CompanyHeader } from "@/components/companies/CompanyHeader";
import { CompanyFilters } from "@/components/companies/CompanyFilters";
import { CompanyForm } from "@/components/companies/CompanyForm";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";

const Companies = () => {
  const [showForm, setShowForm] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [filterCreatedAt, setFilterCreatedAt] = useState("");

  // Load companies and contacts from localStorage on initial render
  useEffect(() => {
    const savedCompanies = localStorage.getItem("companies");
    if (savedCompanies) {
      setCompanies(JSON.parse(savedCompanies));
    }

    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save companies and contacts to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("companies", JSON.stringify(companies));
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [companies, contacts]);

  const handleNewCompany = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitCompany = (company: Omit<Company, "id">) => {
    const newCompany = {
      ...company,
      id: crypto.randomUUID(),
    };
    const updatedCompanies = [...companies, newCompany];
    setCompanies(updatedCompanies);
  };

  const handleDeleteCompany = (id: string) => {
    const updatedCompanies = companies.filter((company) => company.id !== id);
    setCompanies(updatedCompanies);
    setSelectedCompanies((prev) => prev.filter((companyId) => companyId !== id));
  };

  const handleDeleteSelected = () => {
    const updatedCompanies = companies.filter(
      (company) => !selectedCompanies.includes(company.id)
    );
    setCompanies(updatedCompanies);
    setSelectedCompanies([]);
  };

  // Calculate contactsCount for each company
  const contactsCount: Record<string, number> = {};
  companies.forEach((company) => {
    contactsCount[company.id] = contacts.filter(
      (contact) => contact.companyId === company.id
    ).length;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <CompanyHeader />
          <main className="container mx-auto px-4 py-8">
            {showForm ? (
              <CompanyForm onClose={handleCloseForm} onSubmit={handleSubmitCompany} />
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <CompanyFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onNewCompany={handleNewCompany}
                    companies={companies}
                    onFilterChange={{
                      setFilterCreatedAt,
                    }}
                  />
                </div>
                <CompanyList
                  companies={companies}
                  selectedCompanies={selectedCompanies}
                  setSelectedCompanies={setSelectedCompanies}
                  onDeleteCompany={handleDeleteCompany}
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

export default Companies;
