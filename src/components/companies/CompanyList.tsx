import React from "react";
import type { Company } from "@/types/company";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

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
  const handleSelectCompany = (id: string) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((companyId) => companyId !== id));
    } else {
      setSelectedCompanies([...selectedCompanies, id]);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCompanies(companies.map((company) => company.id));
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
                checked={
                  selectedCompanies.length === companies.length && companies.length > 0
                }
                ref={(el) => {
                  if (el) {
                    (el as HTMLInputElement).indeterminate =
                      selectedCompanies.length > 0 &&
                      selectedCompanies.length < companies.length;
                  }
                }}
                onCheckedChange={(checked) => handleSelectAll(!!checked)}
              />
            </th>
            <th className="text-left py-3 px-4">Company</th>
            <th className="text-left py-3 px-4">Industry</th>
            <th className="text-left py-3 px-4">Renewal Date</th>
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
              <td className="py-3 px-4">{company.industry}</td>
              <td className="py-3 px-4">{company.renewalDate}</td>
              <td className="py-3 px-4">{contactsCount[company.id]}</td>
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
