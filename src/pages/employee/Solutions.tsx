import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EmployeeSidebar } from "@/components/EmployeeSidebar";
import { ArticleList } from "@/components/solutions/ArticleList";
import { ArticleForm } from "@/components/solutions/ArticleForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";

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
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger 
                  value="all" 
                  onClick={() => setShowDraftsOnly(false)}
                >
                  All Articles
                </TabsTrigger>
                <TabsTrigger 
                  value="drafts" 
                  onClick={() => setShowDraftsOnly(true)}
                >
                  My Drafts
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <ArticleList searchQuery={searchQuery} showDraftsOnly={false} />
              </TabsContent>
              <TabsContent value="drafts">
                <ArticleList searchQuery={searchQuery} showDraftsOnly={true} />
              </TabsContent>
            </Tabs>

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