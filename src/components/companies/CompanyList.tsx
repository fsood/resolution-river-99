import React from "react";
import type { Company } from "@/types/company";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CompanyListProps {
  companies: Company[];
  selectedCompanies: string[];
  setSelectedCompanies: (companies: string[]) => void;
  onEditCompany?: (company: Company) => void;
  onDeleteCompany: (id: string) => void;
  onDeleteSelected: () => void;
  contactsCount: Record<string, number>;
}

export const CompanyList = ({
  companies,
  selectedCompanies,
  setSelectedCompanies,
  onEditCompany,
  onDeleteCompany,
  onDeleteSelected,
  contactsCount,
}: CompanyListProps) => {
  const handleSelectCompany = (id: string) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((companyId) => companyId !== id));
    } else {
      setSelectedCompanies([...selectedCompanies, id]);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allCompanyIds = companies.map((company) => company.id);
      setSelectedCompanies(allCompanyIds);
    } else {
      setSelectedCompanies([]);
    }
  };

  return (
    <div className="space-y-1">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="w-8 py-3 px-4">
              <Checkbox
                checked={selectedCompanies.length === companies.length && companies.length > 0}
                onCheckedChange={(checked) => handleSelectAll(!!checked)}
              />
            </th>
            <th className="text-left py-3 px-4">Company Name</th>
            <th className="text-left py-3 px-4">Contacts</th>
            <th className="w-8 py-3 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4">
                <Checkbox
                  checked={selectedCompanies.includes(company.id)}
                  onCheckedChange={() => handleSelectCompany(company.id)}
                />
              </td>
              <td className="py-3 px-4">{company.name}</td>
              <td className="py-3 px-4">{contactsCount[company.id] || 0}</td>
              <td className="py-3 px-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onEditCompany && (
                      <DropdownMenuItem onClick={() => onEditCompany(company)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => onDeleteCompany(company.id)}
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCompanies.length > 0 && (
        <div className="flex justify-end p-4">
          <Button variant="destructive" onClick={onDeleteSelected}>
            Delete Selected ({selectedCompanies.length})
          </Button>
        </div>
      )}
    </div>
  );
};