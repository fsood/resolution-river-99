import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

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

    // Get existing articles or initialize empty array
    const existingArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    const newArticle = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    
    // Add new article to array and save back to localStorage
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
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title*</label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Article title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Content*</label>
            <Textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Write your article content here..."
              className="min-h-[200px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <Input
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="draft-mode"
              checked={formData.isDraft}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isDraft: checked })
              }
            />
            <label
              htmlFor="draft-mode"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Save as draft
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t pt-6">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">
            {formData.isDraft ? "Save Draft" : "Publish Article"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};