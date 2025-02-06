import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EmployeeSidebar } from "@/components/EmployeeSidebar";
import { CompanyList } from "@/components/companies/CompanyList";
import { CompanyFilters } from "@/components/companies/CompanyFilters";
import { CompanyForm } from "@/components/companies/CompanyForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Company } from "@/types/company";

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewCompanyOpen, setIsNewCompanyOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const handleDeleteCompany = (id: string) => {
    setCompanies(companies.filter(company => company.id !== id));
  };

  const handleDeleteSelected = () => {
    setCompanies(companies.filter(company => !selectedCompanies.includes(company.id)));
    setSelectedCompanies([]);
  };

  const handleSubmitCompany = (company: Omit<Company, "id">) => {
    const newCompany = {
      ...company,
      id: crypto.randomUUID(),
    };
    setCompanies([...companies, newCompany]);
    setIsNewCompanyOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <EmployeeSidebar />
        <div className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <CompanyFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onNewCompany={() => setIsNewCompanyOpen(true)}
              companies={companies}
              onFilterChange={{
                setFilterCreatedAt: () => {},
              }}
            />

            <div className="mt-8">
              <CompanyList
                companies={companies}
                selectedCompanies={selectedCompanies}
                setSelectedCompanies={setSelectedCompanies}
                onDeleteCompany={handleDeleteCompany}
                onDeleteSelected={handleDeleteSelected}
              />
            </div>

            <Dialog open={isNewCompanyOpen} onOpenChange={setIsNewCompanyOpen}>
              <DialogContent className="max-w-2xl">
                <CompanyForm
                  onClose={() => setIsNewCompanyOpen(false)}
                  onSubmit={handleSubmitCompany}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Companies;