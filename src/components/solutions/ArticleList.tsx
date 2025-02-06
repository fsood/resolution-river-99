import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Article {
  id: string;
  title: string;
  content: string;
  isDraft: boolean;
  category: string;
  tags: string[];
  createdAt: string;
}

interface ArticleListProps {
  searchQuery: string;
  showDraftsOnly: boolean;
}

export const ArticleList = ({ searchQuery, showDraftsOnly }: ArticleListProps) => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>(() => {
    return JSON.parse(localStorage.getItem("articles") || "[]");
  });

  const handleEdit = (article: Article) => {
    // Navigate to edit page or open edit modal
    toast({
      title: "Edit Article",
      description: "Edit functionality will be implemented soon",
    });
  };

  const handleDelete = (articleId: string) => {
    const updatedArticles = articles.filter(article => article.id !== articleId);
    setArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
    
    toast({
      title: "Success",
      description: "Article deleted successfully",
    });
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDraft = showDraftsOnly ? article.isDraft : true;
    return matchesSearch && matchesDraft;
  });

  return (
    <div className="space-y-4">
      {filteredArticles.map((article) => (
        <Card key={article.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(article)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDelete(article.id)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      ))}
      
      {filteredArticles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No articles found
        </div>
      )}
    </div>
  );
};