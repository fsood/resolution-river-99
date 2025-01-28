import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CompanyList } from "@/components/companies/CompanyList";
import { CompanyHeader } from "@/components/companies/CompanyHeader";
import { CompanyFilters } from "@/components/companies/CompanyFilters";
import { CompanyForm } from "@/components/companies/CompanyForm";
import type { Company } from "@/types/company";

const Companies = () => {
  const [showForm, setShowForm] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [filterCreatedAt, setFilterCreatedAt] = useState("");

  // Load companies from localStorage on initial render
  useEffect(() => {
    const savedCompanies = localStorage.getItem("companies");
    if (savedCompanies) {
      setCompanies(JSON.parse(savedCompanies));
    }
  }, []);

  // Save companies to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("companies", JSON.stringify(companies));
  }, [companies]);

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

  // Mock contact count for companies
  const contactsCount: Record<string, number> = {};
  companies.forEach((company) => {
    contactsCount[company.id] = Math.floor(Math.random() * 10); // Replace with actual contact count
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
