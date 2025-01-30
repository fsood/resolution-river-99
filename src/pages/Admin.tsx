import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Users,
  Clock,
  Shield,
  UserCog,
  List,
  MessageSquare,
  Mail,
  Phone,
  Facebook,
  WhatsApp,
} from "lucide-react";
import { Link } from "react-router-dom";

const teamSection = [
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

const channelsSection = [
  {
    title: "Email",
    description: "Integrate support mailboxes, configure DKIM, custom mail servers, Bcc and more",
    icon: Mail,
    path: "/admin/channels/email",
  },
  {
    title: "Phone",
    description: "Run a virtual call center and manage phone conversations with Freshcaller",
    icon: Phone,
    path: "/admin/channels/phone",
  },
  {
    title: "Facebook",
    description: "Associate your Facebook page to pull in customer posts, comments, and messages as tickets",
    icon: Facebook,
    path: "/admin/channels/facebook",
  },
  {
    title: "WhatsApp",
    description: "Integrate your WhatsApp business number to support customers and offer instant resolutions",
    icon: WhatsApp,
    path: "/admin/channels/whatsapp",
  },
];

const workflowsSection = [
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

const Admin = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-primary">Admin</h1>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <div className="space-y-12">
              {/* Team Section */}
              <section id="team">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Team</h2>
                  <span className="text-sm text-muted-foreground">1 of 7 Configured</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamSection.map((item) => (
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

              {/* Channels Section */}
              <section id="channels">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Channels</h2>
                  <span className="text-sm text-muted-foreground">2 of 8 Configured</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {channelsSection.map((item) => (
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

              {/* Workflows Section */}
              <section id="workflows">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Workflows</h2>
                  <span className="text-sm text-muted-foreground">4 of 8 Configured</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workflowsSection.map((item) => (
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
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;