
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Card } from "@/components/ui/card";
import { BarChart, TrendingUp, CreditCard, ArrowRight } from "lucide-react";

const AdminAnalytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-primary">Analytics Dashboard</h1>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <h3 className="text-2xl font-bold">$45,231.89</h3>
                    <p className="text-sm text-green-600">+20.1% from last month</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Subscriptions</p>
                    <h3 className="text-2xl font-bold">+2350</h3>
                    <p className="text-sm text-green-600">+180.1% from last month</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sales</p>
                    <h3 className="text-2xl font-bold">+12,234</h3>
                    <p className="text-sm text-green-600">+19% from last month</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Recent Sales</h3>
                  <button className="text-sm text-primary flex items-center gap-1">
                    View all
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {/* Sales content would go here */}
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Performance</h3>
                  <button className="text-sm text-primary flex items-center gap-1">
                    View report
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {/* Performance metrics would go here */}
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminAnalytics;
