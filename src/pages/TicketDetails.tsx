import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { Ticket } from "@/types/ticket";
import type { Contact } from "@/types/contact";
import { AlertCircle, Clock, CheckCircle2, Info, Trash2, Edit, Merge, X, Send } from "lucide-react";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState<Array<{text: string, timestamp: string}>>([]);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const foundTicket = tickets.find((t: Ticket) => t.id === id);
    if (foundTicket) {
      setTicket(foundTicket);
      
      const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
      const ticketContact = contacts.find((c: Contact) => c.id === foundTicket.contact);
      setContact(ticketContact || null);
    }
  }, [id]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  const handleCloseTicket = () => {
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const updatedTickets = tickets.map((t: Ticket) =>
      t.id === ticket.id ? { ...t, status: "closed", closedAt: new Date().toISOString() } : t
    );
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setTicket({ ...ticket, status: "closed", closedAt: new Date().toISOString() });
    toast({
      title: "Success",
      description: "Ticket closed successfully",
    });
  };

  const handleDeleteTicket = () => {
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const updatedTickets = tickets.filter((t: Ticket) => t.id !== ticket.id);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    toast({
      title: "Success",
      description: "Ticket deleted successfully",
    });
    navigate("/tickets");
  };

  const handleMergeTicket = () => {
    toast({
      title: "Info",
      description: "Merge functionality will be implemented soon",
    });
  };

  const handleSendReply = () => {
    if (!reply.trim()) return;
    
    const newReply = {
      text: reply,
      timestamp: new Date().toISOString()
    };
    
    setReplies([...replies, newReply]);
    setReply("");
    
    toast({
      title: "Success",
      description: "Reply sent successfully",
    });
  };

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
              <div className="flex justify-between items-start mb-4">
                <div>
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
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEditDialog(true)}
                    disabled={ticket.status === "closed"}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMergeTicket}
                    disabled={ticket.status === "closed"}
                  >
                    <Merge className="h-4 w-4 mr-2" />
                    Merge
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCloseTicket}
                    disabled={ticket.status === "closed"}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Close
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteTicket}
                    disabled={ticket.status === "closed"}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
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
                        {contact && (
                          <div className="space-y-1">
                            <label className="text-sm text-gray-500">Contact</label>
                            <p>{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.email}</p>
                            <p className="text-sm text-gray-500">{contact.phone}</p>
                          </div>
                        )}
                      </div>
                    </Card>

                    {replies.length > 0 && (
                      <Card className="p-4">
                        <h3 className="font-semibold mb-4">Replies</h3>
                        <div className="space-y-4">
                          {replies.map((reply, index) => (
                            <div key={index} className="border-b pb-4 last:border-b-0">
                              <p className="text-gray-600">{reply.text}</p>
                              <p className="text-sm text-gray-500 mt-2">
                                {new Date(reply.timestamp).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
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
                        {ticket.closedAt && (
                          <div className="flex items-start gap-4">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                            <div>
                              <p className="font-medium">Ticket closed</p>
                              <p className="text-sm text-gray-500">
                                {new Date(ticket.closedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        )}
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
                    <Textarea 
                      placeholder="Type your reply..." 
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      disabled={ticket.status === "closed"}
                    />
                    <Button 
                      onClick={handleSendReply}
                      disabled={ticket.status === "closed"}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
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
