import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/employee/Dashboard";
import Tickets from "./pages/employee/Tickets";
import TicketDetails from "./pages/employee/TicketDetails";
import Contacts from "./pages/employee/Contacts";
import Companies from "./pages/employee/Companies";
import Solutions from "./pages/employee/Solutions";
import Analytics from "./pages/employee/Analytics";
import Admin from "./pages/admin/Admin";
import Agents from "./pages/admin/Agents";
import Groups from "./pages/admin/Groups";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <div>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/employee/dashboard" replace />} />
            
            {/* Employee Portal Routes */}
            <Route path="/employee/dashboard" element={<Dashboard />} />
            <Route path="/employee/tickets" element={<Tickets />} />
            <Route path="/employee/tickets/:id" element={<TicketDetails />} />
            <Route path="/employee/contacts" element={<Contacts />} />
            <Route path="/employee/companies" element={<Companies />} />
            <Route path="/employee/solutions/*" element={<Solutions />} />
            <Route path="/employee/analytics" element={<Analytics />} />
            
            {/* Admin Portal Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/agents" element={<Agents />} />
            <Route path="/admin/groups" element={<Groups />} />
          </Routes>
        </div>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;