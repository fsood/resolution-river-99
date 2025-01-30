import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Company } from "@/types/company";
import { Image } from "lucide-react";

interface CompanyFormProps {
  onClose: () => void;
  onSubmit: (company: Omit<Company, "id">) => void;
  companyId?: string | null;
}

export const CompanyForm = ({ onClose, onSubmit }: CompanyFormProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    notes: "",
    domains: [] as string[],
    renewalDate: "",
    industry: "",
    accTier: "basic" as Company["accTier"],
  });
  const [logoPreview, setLogoPreview] = useState<string>("");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(/image\/(png|jpeg|jpg)/i)) {
        toast({
          title: "Error",
          description: "Please upload a PNG, JPG, or JPEG image",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ ...prev, logo: base64String }));
        setLogoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      ...formData,
      companyId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      Contacts: [],
    });

    toast({
      title: "Success",
      description: "Company created successfully",
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDomainsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const domains = e.target.value.split(',').map(domain => domain.trim());
    setFormData(prev => ({ ...prev, domains }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">New Company</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Logo</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleLogoChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image className="h-4 w-4 mr-2" />
                Upload Logo
              </Button>
              {logoPreview && (
                <div className="w-16 h-16 relative">
                  <img
                    src={logoPreview}
                    alt="Company logo preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name*</label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Company name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Company description"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Additional notes"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Domains (comma-separated)</label>
            <Input
              value={formData.domains.join(', ')}
              onChange={handleDomainsChange}
              placeholder="example.com, example.org"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Renewal Date</label>
            <Input
              type="date"
              value={formData.renewalDate}
              onChange={(e) => handleChange("renewalDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Input
              value={formData.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
              placeholder="Industry"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ACC Tier</label>
            <Select
              value={formData.accTier}
              onValueChange={(value) => handleChange("accTier", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t pt-6">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">
            Create Company
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
