import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import type { Company } from "@/types/company";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const handleSelectAll = () => {
    if (selectedCompanies.length === companies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(companies.map((company) => company.id));
    }
  };

  const handleSelectCompany = (id: string) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((companyId) => companyId !== id));
    } else {
      setSelectedCompanies([...selectedCompanies, id]);
    }
  };

  return (
    <div>
      {selectedCompanies.length > 0 && (
        <div className="mb-4">
          <Button variant="destructive" onClick={onDeleteSelected}>
            Delete Selected ({selectedCompanies.length})
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedCompanies.length === companies.length && companies.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>ACC Tier</TableHead>
            <TableHead>Contacts</TableHead>
            <TableHead>Renewal Date</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>
                <Checkbox
                  checked={selectedCompanies.includes(company.id)}
                  onCheckedChange={() => handleSelectCompany(company.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={company.logo} alt={company.name} />
                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {company.name}
                </div>
              </TableCell>
              <TableCell>{company.industry}</TableCell>
              <TableCell>{company.accTier}</TableCell>
              <TableCell>{contactsCount[company.id] || 0}</TableCell>
              <TableCell>{new Date(company.renewalDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteCompany(company.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};