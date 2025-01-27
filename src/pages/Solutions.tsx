import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ArticleForm } from "@/components/solutions/ArticleForm";
import { ArticleList } from "@/components/solutions/ArticleList";

const Solutions = () => {
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
              <Button
                onClick={() => setShowArticleForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Article
              </Button>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <div className="relative">
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

            <ArticleList searchQuery={searchQuery} />

            {showArticleForm && (
              <ArticleForm onClose={() => setShowArticleForm(false)} />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Solutions;