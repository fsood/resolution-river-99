import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface ContentFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const ContentField = ({ value, onChange }: ContentFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Content*</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your article content here..."
        className="min-h-[200px]"
      />
    </div>
  );
};