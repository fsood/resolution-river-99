import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                      <p className="text-3xl font-bold">1,234</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">Active Tickets</h3>
                      <p className="text-3xl font-bold">56</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">Response Time</h3>
                      <p className="text-3xl font-bold">2.4h</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Company Name
                        </label>
                        <Input placeholder="Enter company name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Support Email
                        </label>
                        <Input type="email" placeholder="support@example.com" />
                      </div>
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logs">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">System Logs</h3>
                    <div className="space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="p-3 bg-gray-50 rounded-lg text-sm"
                        >
                          [2024-01-{String(i + 1).padStart(2, "0")}] System backup completed successfully
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;