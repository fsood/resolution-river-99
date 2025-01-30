import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Building2,
  LifeBuoy,
  UserCog,
  Users,
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
    title: "Admin",
    icon: UserCog,
    path: "/admin",
  },
];

export function AppSidebar() {
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
      </SidebarContent>
    </Sidebar>
  );
}