import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ArticleForm } from "@/components/solutions/ArticleForm";
import { ArticleList } from "@/components/solutions/ArticleList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, Routes, Route } from "react-router-dom";

const SolutionsMain = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-primary">Solutions</h1>
              </div>
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
              <Button
                onClick={() => navigate("/solutions/new")}
                className="ml-4 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Article
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Articles</TabsTrigger>
                <TabsTrigger value="drafts">My Drafts</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <ArticleList searchQuery={searchQuery} showDraftsOnly={false} />
              </TabsContent>
              <TabsContent value="drafts">
                <ArticleList searchQuery={searchQuery} showDraftsOnly={true} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const NewArticlePage = () => {
  const navigate = useNavigate();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-primary">New Article</h1>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <ArticleForm onClose={() => navigate("/solutions")} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const Solutions = () => {
  return (
    <Routes>
      <Route path="/" element={<SolutionsMain />} />
      <Route path="/new" element={<NewArticlePage />} />
    </Routes>
  );
};

export default Solutions;