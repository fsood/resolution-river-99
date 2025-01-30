import { SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Clock,
  Star,
  Users,
  Settings,
  Trash2,
} from "lucide-react";

const analyticsLinks = [
  {
    title: "Recent",
    icon: Clock,
    path: "/analytics/recent",
    description: "View recently accessed reports",
  },
  {
    title: "Favorites",
    icon: Star,
    path: "/analytics/favorites",
    description: "Access your favorite reports",
  },
  {
    title: "All Reports",
    icon: Users,
    path: "/analytics/all-reports",
    description: "Browse all available reports",
  },
  {
    title: "My Reports",
    icon: Users,
    path: "/analytics/my-reports",
    description: "View reports created by you",
  },
  {
    title: "Curated Reports",
    icon: Users,
    path: "/analytics/curated",
    description: "Access system curated reports",
  },
  {
    title: "Private Reports",
    icon: Users,
    path: "/analytics/private",
    description: "View your private reports",
  },
  {
    title: "Shared Reports",
    icon: Users,
    path: "/analytics/shared",
    description: "Access reports shared with you",
  },
  {
    title: "Trash",
    icon: Trash2,
    path: "/analytics/trash",
    description: "View deleted reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/analytics/settings",
    description: "Configure report settings",
  },
];

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-primary">Analytics & Reports</h1>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyticsLinks.map((item) => (
                <Link to={item.path} key={item.title}>
                  <Card className="p-6 hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-primary">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;