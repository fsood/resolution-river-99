
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Building2,
  Users,
  BarChart,
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
    path: "/employee/dashboard",
  },
  {
    title: "Tickets",
    icon: Ticket,
    path: "/employee/tickets",
  },
  {
    title: "Contacts",
    icon: Users,
    path: "/employee/contacts",
  },
  {
    title: "Companies",
    icon: Building2,
    path: "/employee/companies",
  },
  {
    title: "Analytics",
    icon: BarChart,
    path: "/employee/analytics",
  },
];

export function EmployeeSidebar() {
  const location = useLocation();

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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
