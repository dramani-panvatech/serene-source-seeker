
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BookingFlow from "./pages/BookingFlow";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Customers from "./pages/Customers";
import Provider from "./pages/Provider";
import Services from "./pages/Services";
import Payment from "./pages/Payment";
import Settings from "./pages/Settings";
import Offering from "./pages/Offering";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Resource from "./pages/Resource";
import Location from "./pages/Location";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { LOCAL_STORAGE_KEYS } from "@/lib/localStorageKeys";

// Client Portal Imports
import ClientLogin from "./pages/ClientLogin";
import ClientPortalLayout from "./pages/ClientPortalLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientPlan from "./pages/client/ClientPlan";
import ClientSubscription from "./pages/client/ClientSubscription";
import ClientBooking from "./pages/client/ClientBooking";
import ClientProfile from "./pages/client/ClientProfile";
import ClientSettings from "./pages/client/ClientSettings";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const fetchTenantInfo = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        // Use full origin (protocol + host + port)
        const domain = window.location.origin;
        const url = `${baseUrl}/api/Tenant/GetTenantInfoByDomain?domain=${encodeURIComponent(domain)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch tenant info");
        const data = await response.json();
        if (data && typeof data === "object") {
          var resdata = data.data;
          localStorage.setItem(LOCAL_STORAGE_KEYS.tenantId, resdata.tenantId);
          localStorage.setItem(LOCAL_STORAGE_KEYS.tenantName, resdata.name);
          localStorage.setItem(LOCAL_STORAGE_KEYS.faviconUrl, resdata.faviconUrl);
          localStorage.setItem(LOCAL_STORAGE_KEYS.logoUrl, resdata.logoUrl);
        
        }
      } catch (error) {
        // Optionally handle error (e.g., show toast)
        // console.error("Tenant info fetch error:", error);
      }
    };
    fetchTenantInfo();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/booking" element={<BookingFlow />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/calendar" element={<Calendar />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/provider" element={<Provider />} />
            <Route path="/dashboard/services" element={<Services />} />
            <Route path="/dashboard/payment" element={<Payment />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/offering" element={<Offering />} />
            <Route path="/dashboard/help" element={<Help />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/resource" element={<Resource />} />
            <Route path="/dashboard/location" element={<Location />} />
            
            {/* Client Portal Routes */}
            <Route path="/client-login" element={<ClientLogin />} />
            <Route path="/" element={<ClientPortalLayout />}>
              <Route path="client-dashboard" element={<ClientDashboard />} />
              <Route path="client-plan" element={<ClientPlan />} />
              <Route path="client-subscription" element={<ClientSubscription />} />
              <Route path="client-booking" element={<ClientBooking />} />
              <Route path="client-profile" element={<ClientProfile />} />
              <Route path="client-settings" element={<ClientSettings />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
