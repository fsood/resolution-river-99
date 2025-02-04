export interface Agent {
  id: string;
  email: string;
  name: string;
  phone: string;
  jobTitle: string;
  role: AgentRole;
  type: "support" | "collaborator";
  timeType: "full-time" | "occasional";
  active: boolean;
  groups: string[];
}

export type AgentRole = 
  | "account_admin" 
  | "supervisor" 
  | "agent" 
  | "ticket_collaborator" 
  | "analytics_collaborator";

export interface AgentScope {
  groupId: string;
  access: "view" | "edit";
}