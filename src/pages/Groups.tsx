import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NewGroupForm } from "@/components/admin/NewGroupForm";
import { Search, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Group } from "@/types/group";

const Groups = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    setGroups(storedGroups);
  }, []);

  const handleDeleteGroup = (groupId: string) => {
    const updatedGroups = groups.filter(group => group.id !== groupId);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    toast({
      title: "Success",
      description: "Group deleted successfully",
    });
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Groups</h1>
                <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
                  <DialogTrigger asChild>
                    <Button>New group</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <NewGroupForm onClose={() => setShowNewGroupDialog(false)} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    placeholder="Search groups"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Card>
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="pb-4">Name</th>
                        <th className="pb-4">Agents</th>
                        <th className="pb-4">Business hours</th>
                        <th className="pb-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGroups.map(group => (
                        <tr key={group.id} className="border-t">
                          <td className="py-4">
                            <div className="font-medium">{group.name}</div>
                            <div className="text-sm text-gray-500">{group.description}</div>
                          </td>
                          <td className="py-4">{group.agentCount}</td>
                          <td className="py-4">{group.businessHours}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {/* TODO: Implement edit */}}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteGroup(group.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Groups;