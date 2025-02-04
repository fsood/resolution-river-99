import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import type { Group } from "@/types/group";

export const GroupList = ({ 
  groups, 
  onEdit, 
  onDelete 
}: { 
  groups: Group[]; 
  onEdit: (group: Group) => void;
  onDelete: (groupId: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (groupId: string) => {
    onDelete(groupId);
    toast({
      title: "Success",
      description: "Group deleted successfully",
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          placeholder="Search groups"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
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
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(group)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(group.id)}
                      >
                        Delete
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
  );
};