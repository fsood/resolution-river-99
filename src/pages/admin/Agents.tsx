import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface Agent {
  id: string;
  email: string;
  role: string;
  type: string;
  timeType: string;
}

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>(() => {
    return JSON.parse(localStorage.getItem("agents") || "[]");
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = agents.filter((agent) =>
    agent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (agentId: string) => {
    const updatedAgents = agents.filter((agent) => agent.id !== agentId);
    setAgents(updatedAgents);
    localStorage.setItem("agents", JSON.stringify(updatedAgents));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-primary">Agents</h1>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Agent
              </Button>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Time Type</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell>{agent.email}</TableCell>
                      <TableCell>{agent.role}</TableCell>
                      <TableCell>{agent.type}</TableCell>
                      <TableCell>{agent.timeType}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleDelete(agent.id)}
                              className="text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredAgents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No agents found
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Agents;