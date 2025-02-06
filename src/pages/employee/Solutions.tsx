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
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-primary">Solutions</h1>
              </div>
              <Button onClick={() => setIsNewArticleOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Button>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <ArticleList
              searchQuery={searchQuery}
              showDraftsOnly={showDraftsOnly}
            />

            <Dialog open={isNewArticleOpen} onOpenChange={setIsNewArticleOpen}>
              <DialogContent className="max-w-4xl">
                <ArticleForm onClose={() => setIsNewArticleOpen(false)} />
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Solutions;