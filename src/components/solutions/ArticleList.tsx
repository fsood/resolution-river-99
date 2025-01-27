import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ArticleListProps {
  searchQuery: string;
}

export const ArticleList = ({ searchQuery }: ArticleListProps) => {
  const [articles, setArticles] = React.useState<Array<{
    id: string;
    title: string;
    category: string;
    content: string;
    createdAt: string;
  }>>([]);

  return (
    <div className="space-y-4">
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found. Create your first article!</p>
        </div>
      ) : (
        articles
          .filter((article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{article.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {article.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{article.content}</p>
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
          ))
      )}
    </div>
  );
};