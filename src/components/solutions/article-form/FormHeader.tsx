import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FormHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-4 border-b">
      <Button
        variant="ghost"
        onClick={() => navigate("/solutions")}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Solutions
      </Button>
    </div>
  );
};