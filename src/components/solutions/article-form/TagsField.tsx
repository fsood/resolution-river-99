import React from "react";
import { Input } from "@/components/ui/input";

interface TagsFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const TagsField = ({ value, onChange }: TagsFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Tags</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter tags separated by commas"
      />
    </div>
  );
};