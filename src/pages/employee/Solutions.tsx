import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EmployeeSidebar } from "@/components/EmployeeSidebar";
import { ArticleList } from "@/components/solutions/ArticleList";
import { ArticleForm } from "@/components/solutions/ArticleForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Solutions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDraftsOnly, setShowDraftsOnly] = useState(false);
  const [isNewArticleOpen, setIsNewArticleOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <EmployeeSidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Knowledge Base</h2>
              <p className="text-muted-foreground">
                Create and manage help articles
              </p>
            </div>
            <Button onClick={() => setIsNewArticleOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Article
            </Button>
          </div>

          <ArticleList
            searchQuery={searchQuery}
            showDraftsOnly={showDraftsOnly}
          />

          <Dialog open={isNewArticleOpen} onOpenChange={setIsNewArticleOpen}>
            <DialogContent className="max-w-4xl">
              <ArticleForm onClose={() => setIsNewArticleOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Solutions;