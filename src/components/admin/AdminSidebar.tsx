import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdminSidebar = () => {
  const navigate = useNavigate();
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

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          className="w-full justify-start"
          onClick={() => navigate(item.href)}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Button>
      ))}
    </nav>
  );
};