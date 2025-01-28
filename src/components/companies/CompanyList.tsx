import React, { useEffect } from "react";
import type { Company } from "@/types/company";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CompanyListProps {
  companies: Company[];
  selectedCompanies: string[];
  setSelectedCompanies: (companies: string[]) => void;
  onDeleteCompany: (id: string) => void;
  onDeleteSelected: () => void;
  contactsCount: Record<string, number>;
}

export const CompanyList = ({
  companies,
  selectedCompanies,
  setSelectedCompanies,
  onDeleteCompany,
  onDeleteSelected,
  contactsCount,
}: CompanyListProps) => {
  // Save companies to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <Card key={company.id} className="flex justify-between items-center p-4">
          <CardContent>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{company.name}</h3>
              <p className="text-sm text-gray-500">{company.description}</p>
              <p className="text-sm text-gray-500">
                Contacts: {contactsCount[company.id] || 0}
              </p>
            </div>
          </CardContent>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => onDeleteCompany(company.id)}>
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCompanies((prev) =>
                  prev.includes(company.id)
                    ? prev.filter((id) => id !== company.id)
                    : [...prev, company.id]
                );
              }}
            >
              {selectedCompanies.includes(company.id) ? "Deselect" : "Select"}
            </Button>
          </div>
        </Card>
      ))}
      {selectedCompanies.length > 0 && (
        <div className="flex justify-end">
          <Button variant="outline" onClick={onDeleteSelected}>
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  );
};
