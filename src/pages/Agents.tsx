import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NewAgentForm } from "@/components/admin/NewAgentForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Download, Search, Users } from "lucide-react";

const Agents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Agents</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10">
                      <Users className="h-3 w-3 mr-1" />
                      Seats Available: 9
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>New agent</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <NewAgentForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    placeholder="Search for agents"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Tabs defaultValue="support">
                <TabsList>
                  <TabsTrigger value="support">
                    Support Agents
                    <Badge variant="secondary" className="ml-2">1</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="collaborators">
                    Collaborators
                    <Badge variant="secondary" className="ml-2">0</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="deactivated">
                    Deactivated Agents
                    <Badge variant="secondary" className="ml-2">0</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="support">
                  <Card>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">Sort by:</span>
                          <select className="text-sm border rounded px-2 py-1">
                            <option>Name</option>
                            <option>Last active</option>
                            <option>Role</option>
                          </select>
                        </div>
                        <select className="text-sm border rounded px-2 py-1">
                          <option>All agents (1)</option>
                        </select>
                      </div>

                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500">
                            <th className="pb-4">Name</th>
                            <th className="pb-4">Add-on access</th>
                            <th className="pb-4">Roles</th>
                            <th className="pb-4">Groups</th>
                            <th className="pb-4">Last Seen</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>FR</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">Fatma Rashid</div>
                                  <div className="text-sm text-gray-500">
                                    fatmas@techbizafrica.com
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">--</td>
                            <td className="py-4">
                              <div>
                                Account Administrator
                                <Badge variant="outline" className="ml-2">+2</Badge>
                              </div>
                            </td>
                            <td className="py-4">--</td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span>5 minutes ago</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="collaborators">
                  <Card className="p-8 text-center text-gray-500">
                    No collaborators found
                  </Card>
                </TabsContent>

                <TabsContent value="deactivated">
                  <Card className="p-8 text-center text-gray-500">
                    No deactivated agents found
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Agents;