import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { FormHeader } from "./article-form/FormHeader";
import { TitleField } from "./article-form/TitleField";
import { CategoryField } from "./article-form/CategoryField";
import { ContentField } from "./article-form/ContentField";
import { TagsField } from "./article-form/TagsField";
import { DraftSwitch } from "./article-form/DraftSwitch";

interface ArticleFormProps {
  onClose: () => void;
}

export const ArticleForm = ({ onClose }: ArticleFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    title: "",
    category: "",
    content: "",
    tags: "",
    isDraft: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const existingArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    const newArticle = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem("articles", JSON.stringify([...existingArticles, newArticle]));
    
    toast({
      title: "Success",
      description: formData.isDraft 
        ? "Draft saved successfully" 
        : "Article published successfully",
    });
    navigate("/solutions");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <FormHeader />
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <TitleField
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
          />
          <CategoryField
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
          />
          <ContentField
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          <TagsField
            value={formData.tags}
            onChange={(value) => setFormData({ ...formData, tags: value })}
          />
          <DraftSwitch
            checked={formData.isDraft}
            onChange={(checked) => setFormData({ ...formData, isDraft: checked })}
          />
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t pt-6">
          <Button type="submit">
            {formData.isDraft ? "Save Draft" : "Publish Article"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};