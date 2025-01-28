import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const CategoryField = ({ value, onChange }: CategoryFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Category</label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="guides">Guides</SelectItem>
          <SelectItem value="tutorials">Tutorials</SelectItem>
          <SelectItem value="best-practices">Best Practices</SelectItem>
          <SelectItem value="case-studies">Case Studies</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};