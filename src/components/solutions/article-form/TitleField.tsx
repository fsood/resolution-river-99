import React from "react";
import { Input } from "@/components/ui/input";

interface TitleFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const TitleField = ({ value, onChange }: TitleFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Title*</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Article title"
      />
    </div>
  );
};