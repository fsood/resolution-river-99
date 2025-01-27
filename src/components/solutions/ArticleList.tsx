import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ArticleListProps {
  searchQuery: string;
  showDraftsOnly: boolean;
}

export const ArticleList = ({ searchQuery, showDraftsOnly }: ArticleListProps) => {
  const [articles, setArticles] = React.useState<Array<{
    id: string;
    title: string;
    category: string;
    content: string;
    createdAt: string;
    isDraft: boolean;
  }>>([]);

  // Group articles by category
  const groupedArticles = React.useMemo(() => {
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (showDraftsOnly ? article.isDraft : true)
    );

    return filtered.reduce((acc, article) => {
      if (!acc[article.category]) {
        acc[article.category] = [];
      }
      acc[article.category].push(article);
      return acc;
    }, {} as Record<string, typeof articles>);
  }, [articles, searchQuery, showDraftsOnly]);

  return (
    <div className="space-y-8">
      {Object.keys(groupedArticles).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {showDraftsOnly
              ? "No drafts found. Create your first draft!"
              : "No articles found. Create your first article!"}
          </p>
        </div>
      ) : (
        Object.entries(groupedArticles).map(([category, categoryArticles]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">{category}</h2>
            <div className="grid gap-4">
              {categoryArticles.map((article) => (
                <Card
                  key={article.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">
                          {article.title}
                          {article.isDraft && (
                            <span className="ml-2 text-sm text-muted-foreground">
                              (Draft)
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {new Date(article.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 line-clamp-2">
                          {article.content}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};