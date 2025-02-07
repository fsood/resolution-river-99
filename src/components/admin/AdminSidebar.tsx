
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Building2,
  BarChart,
  Users,
  Settings,
  FileText
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

const mainMenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Tickets",
    icon: Ticket,
    path: "/admin/tickets",
  },
  {
    title: "Contacts",
    icon: Users,
    path: "/admin/contacts",
  },
  {
    title: "Companies",
    icon: Building2,
    path: "/admin/companies",
  },
  {
    title: "Analytics",
    icon: BarChart,
    path: "/admin/analytics",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/admin/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Navigation</SidebarGroupLabel>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
