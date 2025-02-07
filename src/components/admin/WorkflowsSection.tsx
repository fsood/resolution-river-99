
import { List, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const workflowItems = [
  {
    title: "Ticket Fields",
    description: "Customize your ticket type to categorize, prioritize, and route tickets efficiently.",
    icon: List,
    path: "/admin/workflows/ticket-fields",
  },
  {
    title: "Ticket Forms",
    description: "Show the right form to your customers depending on what they want to contact you about.",
    icon: List,
    path: "/admin/workflows/ticket-forms",
  },
  {
    title: "SLA Policies",
    description: "Set up targets for agents to guarantee timely responses and resolutions to customers.",
    icon: Shield,
    path: "/admin/workflows/sla-policies",
  },
];

export function WorkflowsSection() {
  return (
    <section id="workflows">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Workflows</h2>
        <span className="text-sm text-muted-foreground">4 of 8 Configured</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflowItems.map((item) => (
          <Card key={item.title} className="p-6 hover:shadow-lg transition-shadow">
            <Link to={item.path} className="space-y-4">
              <item.icon className="h-6 w-6 text-primary" />
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
