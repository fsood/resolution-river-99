import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NewAgentForm } from "@/components/admin/NewAgentForm";
import { AgentListItem } from "@/components/admin/AgentListItem";
import { Download, Search, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Agent } from "@/types/agent";

const Agents = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showNewAgentDialog, setShowNewAgentDialog] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  useEffect(() => {
    const storedAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    setAgents(storedAgents);
  }, []);

  const handleDeactivateAgent = (agentId: string) => {
    const updatedAgents = agents.map(agent =>
      agent.id === agentId ? { ...agent, active: false } : agent
    );
    localStorage.setItem("agents", JSON.stringify(updatedAgents));
    setAgents(updatedAgents);
    toast({
      title: "Success",
      description: "Agent deactivated successfully",
    });
  };

  const handleActivateAgent = (agentId: string) => {
    const updatedAgents = agents.map(agent =>
      agent.id === agentId ? { ...agent, active: true } : agent
    );
    localStorage.setItem("agents", JSON.stringify(updatedAgents));
    setAgents(updatedAgents);
    toast({
      title: "Success",
      description: "Agent activated successfully",
    });
  };

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setShowNewAgentDialog(true);
  };

  const handleDeleteAgent = (agentId: string) => {
    const updatedAgents = agents.filter(agent => agent.id !== agentId);
    localStorage.setItem("agents", JSON.stringify(updatedAgents));
    setAgents(updatedAgents);
    toast({
      title: "Success",
      description: "Agent deleted successfully",
    });
  };

  const filteredAgents = {
    support: agents.filter(a => a.type === "support" && a.active),
    collaborators: agents.filter(a => a.type === "collaborator" && a.active),
    deactivated: agents.filter(a => !a.active),
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Button className="n-6" variant="link" onClick={() => window.history.back()}>
            ← Admin
          </Button>
          <div className="p-3">
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
                  <Dialog open={showNewAgentDialog} onOpenChange={setShowNewAgentDialog}>
                    <DialogTrigger asChild>
                      <Button>New agent</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <NewAgentForm 
                        onClose={() => {
                          setShowNewAgentDialog(false);
                          setEditingAgent(null);
                        }}
                        editingAgent={editingAgent}
                      />
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
                    <Badge variant="secondary" className="ml-2">
                      {filteredAgents.support.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="collaborators">
                    Collaborators
                    <Badge variant="secondary" className="ml-2">
                      {filteredAgents.collaborators.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="deactivated">
                    Deactivated Agents
                    <Badge variant="secondary" className="ml-2">
                      {filteredAgents.deactivated.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="support">
                  <Card>
                    <div className="p-4">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500">
                            <th className="pb-4">Name</th>
                            <th className="pb-4">Add-on access</th>
                            <th className="pb-4">Roles</th>
                            <th className="pb-4">Groups</th>
                            <th className="pb-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAgents.support.map(agent => (
                            <AgentListItem 
                              key={agent.id} 
                              agent={agent}
                              onEdit={handleEditAgent}
                              onDelete={handleDeleteAgent}
                              onDeactivate={handleDeactivateAgent}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="collaborators">
                  <Card>
                    <div className="p-4">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500">
                            <th className="pb-4">Name</th>
                            <th className="pb-4">Add-on access</th>
                            <th className="pb-4">Roles</th>
                            <th className="pb-4">Groups</th>
                            <th className="pb-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAgents.collaborators.map(agent => (
                            <AgentListItem 
                              key={agent.id} 
                              agent={agent}
                              onEdit={handleEditAgent}
                              onDelete={handleDeleteAgent}
                              onDeactivate={handleDeactivateAgent}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="deactivated">
                  <Card>
                    <div className="p-4">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500">
                            <th className="pb-4">Name</th>
                            <th className="pb-4">Add-on access</th>
                            <th className="pb-4">Roles</th>
                            <th className="pb-4">Groups</th>
                            <th className="pb-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAgents.deactivated.map(agent => (
                            <AgentListItem 
                              key={agent.id} 
                              agent={agent}
                              onEdit={handleEditAgent}
                              onDelete={handleDeleteAgent}
                              onDeactivate={handleDeactivateAgent}
                              onActivate={handleActivateAgent}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
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