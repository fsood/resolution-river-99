import { SideNav } from "@/components/ui/sidebar";
import { Users, UserPlus, Settings } from "lucide-react";

export const AdminSidebar = () => {
  const menuItems = [
    {
      title: "Agents",
      href: "/admin/agents",
      icon: Users,
    },
    {
      title: "Groups",
      href: "/admin/groups",
      icon: UserPlus,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return <SideNav items={menuItems} />;
};