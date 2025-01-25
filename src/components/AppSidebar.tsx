import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Building2,
  LifeBuoy,
  ChartBar,
  UserCog,
  Menu,
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
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
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
    title: "Contacts & Companies",
    icon: Building2,
    path: "/contacts",
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
  return (
    <Sidebar>
      <SidebarTrigger asChild>
        <button className="fixed left-4 top-4 z-50 lg:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </SidebarTrigger>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="w-full">
                      <item.icon />
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