import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
}

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Support Team",
      description: "Front-line support team",
      members: 5,
    },
    {
      id: "2",
      name: "Technical Team",
      description: "Technical support specialists",
      members: 3,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
  });

  const handleCreateGroup = () => {
    const group: Group = {
      id: crypto.randomUUID(),
      name: newGroup.name,
      description: newGroup.description,
      members: 0,
    };
    setGroups([...groups, group]);
    setIsNewGroupOpen(false);
    setNewGroup({ name: "", description: "" });
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">Groups</h1>
                <Button onClick={() => setIsNewGroupOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Group
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
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Members</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.name}</TableCell>
                    <TableCell>{group.description}</TableCell>
                    <TableCell>{group.members}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Dialog open={isNewGroupOpen} onOpenChange={setIsNewGroupOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Group</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={newGroup.name}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={newGroup.description}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, description: e.target.value })
                      }
                    />
                  </div>
                  <Button onClick={handleCreateGroup} className="w-full">
                    Create Group
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Groups;