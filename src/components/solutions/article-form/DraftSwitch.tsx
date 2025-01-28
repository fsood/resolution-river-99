import React from "react";
import { Switch } from "@/components/ui/switch";

interface DraftSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const DraftSwitch = ({ checked, onChange }: DraftSwitchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="draft-mode"
        checked={checked}
        onCheckedChange={onChange}
      />
      <label
        htmlFor="draft-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Save as draft
      </label>
    </div>
  );
};