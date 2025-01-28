import React, { useEffect } from "react";
import type { Company } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";

interface CompanyListProps {
  companies: Company[];
  selectedCompanies: string[];
  setSelectedCompanies: (companies: string[]) => void;
  onDeleteCompany: (id: string) => void;
  onDeleteSelected: () => void;
  onEditCompany?: (company: Company) => void;
  contactsCount: Record<string, number>;
}

export const CompanyList = ({
  companies,
  selectedCompanies,
  setSelectedCompanies,
  onDeleteCompany,
  onDeleteSelected,
  onEditCompany,
  contactsCount,
}: CompanyListProps) => {
  // Save companies to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  const handleCompanySelection = (companyId: string) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId));
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };

  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <Card key={company.id} className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedCompanies.includes(company.id)}
              onChange={() => handleCompanySelection(company.id)}
              className="h-4 w-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{company.name}</h3>
              <p className="text-sm text-gray-500">
                Contacts: {contactsCount[company.id] || 0}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onEditCompany && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEditCompany(company)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDeleteCompany(company.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
      {selectedCompanies.length > 0 && (
        <div className="flex justify-end">
          <Button variant="destructive" onClick={onDeleteSelected}>
            Delete Selected ({selectedCompanies.length})
          </Button>
        </div>
      )}
    </div>
  );
};