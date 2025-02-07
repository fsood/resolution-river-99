
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Employee routes
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeAnalytics from "./pages/employee/Analytics";

// Admin routes
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminReports from "./pages/admin/AdminReports";

// Shared routes
import Contacts from "./pages/shared/Contacts";
import Companies from "./pages/shared/Companies";
import Tickets from "./pages/shared/Tickets";
import TicketDetails from "./pages/shared/TicketDetails";
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
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/employee/dashboard" replace />} />
            
            {/* Employee Portal Routes */}
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/tickets" element={<Tickets />} />
            <Route path="/employee/tickets/:id" element={<TicketDetails />} />
            <Route path="/employee/contacts" element={<Contacts />} />
            <Route path="/employee/companies" element={<Companies />} />
            <Route path="/employee/analytics" element={<EmployeeAnalytics />} />
            
            {/* Admin Portal Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/tickets" element={<Tickets />} />
            <Route path="/admin/tickets/:id" element={<TicketDetails />} />
            <Route path="/admin/contacts" element={<Contacts />} />
            <Route path="/admin/companies" element={<Companies />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
