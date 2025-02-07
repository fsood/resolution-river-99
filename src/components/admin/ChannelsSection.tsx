
import { Mail, Phone, Facebook, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const channelItems = [
  {
    title: "Email",
    description: "Integrate support mailboxes, configure DKIM, custom mail servers, Bcc and more",
    icon: Mail,
    path: "/admin/channels/email",
  },
  {
    title: "Phone",
    description: "Run a virtual call center and manage phone conversations with Freshcaller",
    icon: Phone,
    path: "/admin/channels/phone",
  },
  {
    title: "Facebook",
    description: "Associate your Facebook page to pull in customer posts, comments, and messages as tickets",
    icon: Facebook,
    path: "/admin/channels/facebook",
  },
  {
    title: "WhatsApp",
    description: "Integrate your WhatsApp business number to support customers and offer instant resolutions",
    icon: MessageSquare,
    path: "/admin/channels/whatsapp",
  },
];

export function ChannelsSection() {
  return (
    <section id="channels">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Channels</h2>
        <span className="text-sm text-muted-foreground">2 of 8 Configured</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channelItems.map((item) => (
          <Card key={item.title} className="p-6 hover:shadow-lg transition-shadow">
            <Link to={item.path} className="space-y-4">
              <item.icon className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
