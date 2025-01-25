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
      <SidebarTrigger>
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
                  <SidebarMenuButton>
                    <Link to={item.path} className="flex items-center gap-2 w-full">
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