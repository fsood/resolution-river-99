import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import type { Agent, AgentRole } from "@/types/agent";
import type { Group } from "@/types/group";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

const SUPPORT_ROLES: AgentRole[] = ["account_admin", "supervisor", "agent"];
const COLLABORATOR_ROLES: AgentRole[] = ["ticket_collaborator", "analytics_collaborator"];

const SEATS = {
  "full-time": 9,
  "occasional": 3
};

interface NewAgentFormProps {
  onClose?: () => void;
  editingAgent?: Agent | null;
}

export const NewAgentForm = ({ onClose, editingAgent }: NewAgentFormProps) => {
  const { toast } = useToast();
  const [agentType, setAgentType] = useState<"support" | "collaborator">("support");
  const [timeType, setTimeType] = useState<"full-time" | "occasional">("full-time");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [role, setRole] = useState<AgentRole>("agent");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    setGroups(storedGroups);

    if (editingAgent) {
      setAgentType(editingAgent.type);
      setTimeType(editingAgent.timeType);
      setEmail(editingAgent.email);
      setName(editingAgent.name);
      setPhone(editingAgent.phone);
      setJobTitle(editingAgent.jobTitle);
      setRole(editingAgent.role);
      setSelectedGroups(editingAgent.groups);
    }
  }, [editingAgent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name || !role || !phone || !jobTitle) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const existingAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    if (!editingAgent && existingAgents.some((agent: Agent) => agent.email === email)) {
      toast({
        title: "Error",
        description: "An agent with this email already exists",
        variant: "destructive",
      });
      return;
    }

    // Check available seats only for new agents
    if (!editingAgent) {
      const activeAgents = existingAgents.filter((agent: Agent) => 
        agent.active && agent.timeType === timeType
      );
      if (activeAgents.length >= SEATS[timeType]) {
        toast({
          title: "Error",
          description: `No ${timeType} seats available`,
          variant: "destructive",
        });
        return;
      }
    }

    const newAgent: Agent = {
      id: editingAgent?.id || crypto.randomUUID(),
      email,
      name,
      phone,
      jobTitle,
      role,
      type: agentType,
      timeType,
      active: editingAgent?.active ?? true,
      groups: selectedGroups,
    };

    const updatedAgents = editingAgent
      ? existingAgents.map((agent: Agent) => 
          agent.id === editingAgent.id ? newAgent : agent
        )
      : [...existingAgents, newAgent];

    localStorage.setItem("agents", JSON.stringify(updatedAgents));

    toast({
      title: "Success",
      description: editingAgent ? "Agent updated successfully" : "Agent created successfully",
    });

    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <DialogTitle>{editingAgent ? "Edit agent" : "New agent"}</DialogTitle>
        <DialogDescription>
          {editingAgent 
            ? "Update the agent's information below" 
            : "Add a new agent by filling out the information below"}
        </DialogDescription>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto px-2 space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Agent type</Label>
            <Select value={agentType} onValueChange={(value: "support" | "collaborator") => {
              setAgentType(value);
              setRole(value === "support" ? "agent" : "ticket_collaborator");
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select agent type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="support">Support agent</SelectItem>
                <SelectItem value="collaborator">Collaborator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <RadioGroup value={timeType} onValueChange={(value: "full-time" | "occasional") => setTimeType(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full-time" id="full-time" />
              <Label htmlFor="full-time">
                <div>Full time</div>
                <p className="text-sm text-gray-500">({SEATS["full-time"]} seats available)</p>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="occasional" id="occasional" />
              <Label htmlFor="occasional">
                <div>Occasional</div>
                <p className="text-sm text-gray-500">({SEATS["occasional"]} seats available)</p>
              </Label>
            </div>
          </RadioGroup>

          <div className="space-y-4">
            <h3 className="font-medium">Agent details</h3>
            
            <div>
              <Label htmlFor="email">Email address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={(value: AgentRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {(agentType === "support" ? SUPPORT_ROLES : COLLABORATOR_ROLES).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.split("_").map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Groups</Label>
              <Select
                value={selectedGroups[0]}
                onValueChange={(value) => setSelectedGroups([value])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                Organize agents into specific groups for better ticket management and workflows
              </p>
            </div>
          </div>
        </div>
      </div>
            
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{editingAgent ? "Update" : "Create"} Agent</Button>
      </div>
    </form>
  );
};