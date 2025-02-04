import { Button } from "@/components/ui/button";
import { Agent } from "@/types/agent";
import { Edit, Trash2, Power } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AgentListItemProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (agentId: string) => void;
  onDeactivate: (agentId: string) => void;
}

export const AgentListItem = ({ agent, onEdit, onDelete, onDeactivate }: AgentListItemProps) => {
  return (
    <tr className="border-t">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {agent.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{agent.name}</div>
            <div className="text-sm text-gray-500">{agent.email}</div>
          </div>
        </div>
      </td>
      <td className="py-4">{agent.jobTitle}</td>
      <td className="py-4">{agent.role}</td>
      <td className="py-4">{agent.phone}</td>
      <td className="py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(agent)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(agent.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeactivate(agent.id)}
          >
            <Power className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};