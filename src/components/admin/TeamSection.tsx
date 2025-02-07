
import { Users, Clock, Shield, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const teamItems = [
  {
    title: "Agents",
    description: "Define agents' scope of work, type, language, and other details.",
    icon: Users,
    path: "/admin/agents",
  },
  {
    title: "Groups",
    description: "Organize agents and receive notifications on unattended tickets.",
    icon: Users,
    path: "/admin/groups",
  },
  {
    title: "Roles",
    description: "Provide and restrict fine-grained levels of access and privileges for agents.",
    icon: Shield,
    path: "/admin/roles",
  },
  {
    title: "Business Hours",
    description: "Define working hours and holidays to set expectations with customers",
    icon: Clock,
    path: "/admin/business-hours",
  },
  {
    title: "Skills",
    description: "Automatically assign certain kind of tickets to agents based on their expertise.",
    icon: UserCog,
    path: "/admin/skills",
  },
  {
    title: "Agent Shifts",
    description: "Create and effectively manage agent schedules in one place",
    icon: Clock,
    path: "/admin/agent-shifts",
  },
  {
    title: "Agent Statuses",
    description: "Configure statuses to define agent availability and get clear visibility on where they spend their time",
    icon: UserCog,
    path: "/admin/agent-statuses",
    isNew: true,
  },
];

export function TeamSection() {
  return (
    <section id="team">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Team</h2>
        <span className="text-sm text-muted-foreground">1 of 7 Configured</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamItems.map((item) => (
          <Card key={item.title} className="p-6 hover:shadow-lg transition-shadow">
            <Link to={item.path} className="space-y-4">
              <div className="flex items-start justify-between">
                <item.icon className="h-6 w-6 text-primary" />
                {item.isNew && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
