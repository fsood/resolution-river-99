import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Building2,
  LifeBuoy,
  ChartBar,
  UserCog,
  Menu,
  Users,
  Clock,
  Shield,
  List,
  MessageSquare,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const adminMenuItems = {
  team: [
    { title: "Agents", path: "/admin/agents", icon: Users },
    { title: "Groups", path: "/admin/groups", icon: Users },
    { title: "Roles", path: "/admin/roles", icon: Shield },
    { title: "Business Hours", path: "/admin/business-hours", icon: Clock },
    { title: "Skills", path: "/admin/skills", icon: UserCog },
    { title: "Agent Shifts", path: "/admin/agent-shifts", icon: Clock },
    { title: "Agent Statuses", path: "/admin/agent-statuses", icon: UserCog },
  ],
  channels: [
    { title: "Email", path: "/admin/channels/email", icon: MessageSquare },
    { title: "Phone", path: "/admin/channels/phone", icon: MessageSquare },
    { title: "Facebook", path: "/admin/channels/facebook", icon: MessageSquare },
    { title: "WhatsApp", path: "/admin/channels/whatsapp", icon: MessageSquare },
  ],
  workflows: [
    { title: "Ticket Fields", path: "/admin/workflows/ticket-fields", icon: List },
    { title: "Ticket Forms", path: "/admin/workflows/ticket-forms", icon: List },
    { title: "SLA Policies", path: "/admin/workflows/sla-policies", icon: Shield },
  ],
};

const mainMenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Tickets",
    icon: Ticket,
    path: "/tickets",
  },
  {
    title: "Solutions",
    icon: LifeBuoy,
    path: "/solutions",
  },
  {
    title: "Analytics & Reports",
    icon: ChartBar,
    path: "/analytics",
  },
  {
    title: "Admin",
    icon: UserCog,
    path: "/admin",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <Link 
                      to={item.path} 
                      className={`flex items-center gap-2 w-full ${
                        location.pathname === item.path ? 'text-primary' : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full">
                    <SidebarMenuButton>
                      <div className="flex items-center gap-2 w-full">
                        <Building2 className="h-4 w-4" />
                        <span>Contacts & Companies</span>
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to="/contacts" className="flex items-center gap-2 w-full">
                        <Users className="h-4 w-4" />
                        Contacts
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/companies" className="flex items-center gap-2 w-full">
                        <Building2 className="h-4 w-4" />
                        Companies
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdminRoute && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Team</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminMenuItems.team.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <Link 
                          to={item.path}
                          className={`flex items-center gap-2 w-full ${
                            location.pathname === item.path ? 'text-primary' : ''
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Channels</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminMenuItems.channels.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <Link 
                          to={item.path}
                          className={`flex items-center gap-2 w-full ${
                            location.pathname === item.path ? 'text-primary' : ''
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Workflows</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminMenuItems.workflows.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <Link 
                          to={item.path}
                          className={`flex items-center gap-2 w-full ${
                            location.pathname === item.path ? 'text-primary' : ''
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}