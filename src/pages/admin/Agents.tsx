
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { NewAgentForm } from "@/components/admin/NewAgentForm";
import { AgentListItem } from "@/components/admin/AgentListItem";
import type { Agent } from "@/types/agent";

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewAgentOpen, setIsNewAgentOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  // Load agents from localStorage on component mount
  useState(() => {
    const storedAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    setAgents(storedAgents);
  });

  const handleDelete = (agentId: string) => {
    const updatedAgents = agents.filter(agent => agent.id !== agentId);
    localStorage.setItem("agents", JSON.stringify(updatedAgents));
    setAgents(updatedAgents);
  };

  const handleDeactivate = (agentId: string) => {
    const updatedAgents = agents.map(agent => 
      agent.id === agentId ? { ...agent, active: false } : agent
    );
    localStorage.setItem("agents", JSON.stringify(updatedAgents));
    setAgents(updatedAgents);
  };

  const handleActivate = (agentId: string) => {
    const updatedAgents = agents.map(agent => 
      agent.id === agentId ? { ...agent, active: true } : agent
    );
    localStorage.setItem("agents", JSON.stringify(updatedAgents));
    setAgents(updatedAgents);
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseDialog = () => {
    setIsNewAgentOpen(false);
    setEditingAgent(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">Agents</h1>
                <Button onClick={() => setIsNewAgentOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Agent
                </Button>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 px-6 text-left">Agent</th>
                    <th className="py-4 px-6 text-left">Job Title</th>
                    <th className="py-4 px-6 text-left">Role</th>
                    <th className="py-4 px-6 text-left">Phone</th>
                    <th className="py-4 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map((agent) => (
                    <AgentListItem
                      key={agent.id}
                      agent={agent}
                      onEdit={(agent) => {
                        setEditingAgent(agent);
                        setIsNewAgentOpen(true);
                      }}
                      onDelete={handleDelete}
                      onDeactivate={handleDeactivate}
                      onActivate={handleActivate}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <Dialog open={isNewAgentOpen} onOpenChange={setIsNewAgentOpen}>
              <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
                <NewAgentForm
                  onClose={handleCloseDialog}
                  editingAgent={editingAgent}
                />
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Agents;
