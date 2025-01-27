import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CompanyList } from "@/components/companies/CompanyList";
import { CompanyFilters } from "@/components/companies/CompanyFilters";
import { CompanyForm } from "@/components/companies/CompanyForm";
import type { Company } from "@/types/company";

const Companies = () => {
  const [showForm, setShowForm] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [filterCreatedAt, setFilterCreatedAt] = useState("");

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
    setCompanies((prev) => [...prev, newCompany]);
  };

  const handleDeleteCompany = (id: string) => {
    setCompanies((prev) => prev.filter((company) => company.id !== id));
    setSelectedCompanies((prev) => prev.filter((companyId) => companyId !== id));
  };

  const handleDeleteSelected = () => {
    setCompanies((prev) =>
      prev.filter((company) => !selectedCompanies.includes(company.id))
    );
    setSelectedCompanies([]);
  };

  // Mock contact count for companies
  const contactsCount: Record<string, number> = {};
  companies.forEach(company => {
    contactsCount[company.id] = Math.floor(Math.random() * 10); // This should be replaced with actual contact count
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-primary">Companies</h1>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {showForm ? (
              <CompanyForm onClose={handleCloseForm} onSubmit={handleSubmitCompany} />
            ) : (
              <div className="space-y-6">
                <CompanyFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onNewCompany={handleNewCompany}
                  companies={companies}
                  onFilterChange={{
                    setFilterCreatedAt,
                  }}
                />
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