import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { analyticsLinks } from "./analyticsData";

const AnalyticsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {analyticsLinks.map((item) => (
        <Link to={item.path} key={item.title}>
          <Card className="p-6 hover:bg-accent transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default AnalyticsCards;
