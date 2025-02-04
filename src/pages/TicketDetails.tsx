import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import type { Ticket } from "@/types/ticket";
import { AlertCircle, Clock, CheckCircle2, Info } from "lucide-react";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const foundTicket = tickets.find((t: Ticket) => t.id === id);
    if (foundTicket) {
      setTicket(foundTicket);
    }
  }, [id]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  const statusConfig = {
    open: {
      label: "Open",
      icon: AlertCircle,
      className: "bg-yellow-100 text-yellow-800",
    },
    "in-progress": {
      label: "In Progress",
      icon: Clock,
      className: "bg-blue-100 text-blue-800",
    },
    closed: {
      label: "Closed",
      icon: CheckCircle2,
      className: "bg-green-100 text-green-800",
    },
  };

  const StatusIcon = statusConfig[ticket.status].icon;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">{ticket.subject}</h1>
              <div className="flex gap-2 items-center">
                <Badge className={statusConfig[ticket.status].className}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusConfig[ticket.status].label}
                </Badge>
                <Badge variant="outline">{ticket.type}</Badge>
                <Badge variant="outline" className="bg-primary/10">
                  {ticket.priority}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <Tabs defaultValue="details">
                  <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="attachments">Attachments</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4">
                    <Card className="p-4">
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-gray-600">{ticket.description}</p>
                    </Card>
                    <Card className="p-4">
                      <h3 className="font-semibold mb-4">Contact Information</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm text-gray-500">Company</label>
                          <p>{ticket.company}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Contact</label>
                          <p>{ticket.contact}</p>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                  <TabsContent value="activity">
                    <Card className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <Info className="h-5 w-5 text-blue-500 mt-1" />
                          <div>
                            <p className="font-medium">Ticket created</p>
                            <p className="text-sm text-gray-500">
                              {new Date(ticket.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                  <TabsContent value="attachments">
                    <Card className="p-4">
                      <p className="text-gray-500">No attachments found</p>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Properties</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Status</label>
                      <Badge className={statusConfig[ticket.status].className}>
                        {statusConfig[ticket.status].label}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Priority</label>
                      <Badge>{ticket.priority}</Badge>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Type</label>
                      <Badge variant="outline">{ticket.type}</Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-4">Add Reply</h3>
                  <div className="space-y-4">
                    <Textarea placeholder="Type your reply..." />
                    <Button>Send Reply</Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TicketDetails;