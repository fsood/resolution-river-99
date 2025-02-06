import { Button } from "@/components/ui/button";
import { Agent } from "@/types/agent";
import { Edit, Trash2, Power } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AgentListItemProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (agentId: string) => void;
  onDeactivate: (agentId: string) => void;
  onActivate?: (agentId: string) => void;
}

export const AgentListItem = ({ 
  agent, 
  onEdit, 
  onDelete, 
  onDeactivate,
  onActivate 
}: AgentListItemProps) => {
  // Get initials safely, default to "AG" if name is undefined
  const getInitials = (name: string | undefined) => {
    if (!name) return "AG";
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <tr className="border-t">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {getInitials(agent.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{agent.name || "Unknown Agent"}</div>
            <div className="text-sm text-gray-500">{agent.email}</div>
          </div>
        </div>
      </td>
      <td className="py-4">{agent.jobTitle}</td>
      <td className="py-4">{agent.role}</td>
      <td className="py-4">{agent.phone}</td>
      <td className="py-4">
        <div className="flex items-center gap-2">
          {agent.active && (
            <>
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
            </>
          )}
          {!agent.active && onActivate && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onActivate(agent.id)}
              className="text-green-500 hover:text-green-600"
            >
              <Power className="h-4 w-4" />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};