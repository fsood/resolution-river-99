import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NewGroupForm } from "@/components/admin/NewGroupForm";
import { GroupList } from "@/components/admin/groups/GroupList";
import type { Group } from "@/types/group";

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    setGroups(storedGroups);
  }, []);

  const handleDeleteGroup = (groupId: string) => {
    const updatedGroups = groups.filter(group => group.id !== groupId);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
  };

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    setShowNewGroupDialog(true);
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
                <h1 className="text-2xl font-bold">Groups</h1>
                <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
                  <DialogTrigger asChild>
                    <Button>New group</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <NewGroupForm 
                      onClose={() => {
                        setShowNewGroupDialog(false);
                        setEditingGroup(null);
                      }}
                      initialData={editingGroup}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <GroupList 
                groups={groups}
                onEdit={handleEditGroup}
                onDelete={handleDeleteGroup}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Groups;