import { Clock, Star, Users, Settings, Trash2 } from "lucide-react";

export const analyticsLinks = [
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
