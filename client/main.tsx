import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModernNotificationsPanel } from "@/components/ui/modern-notifications-panel";
import { useState, createContext, useContext } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/loaders";

// Lazy load des pages
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NewOrder = lazy(() => import("./pages/NewOrder"));
const Orders = lazy(() => import("./pages/Orders"));
const Users = lazy(() => import("./pages/Users"));
const ManagerDashboard = lazy(() => import("./pages/ManagerDashboard"));
const ManagerOrders = lazy(() => import("./pages/ManagerOrders"));
const ManagerArticles = lazy(() => import("./pages/ManagerArticles"));
const ManagerProductDetails = lazy(
  () => import("./pages/ManagerProductDetails"),
);
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { SessionManager } from "./components/auth/SessionManager";

interface NotificationContextType {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
};

const queryClient = new QueryClient();

const App = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <NotificationContext.Provider
            value={{ showNotifications, setShowNotifications }}
          >
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SessionManager />
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Spinner size="lg" /></div>}>
                <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/new-order"
                  element={
                    <ProtectedRoute>
                      <NewOrder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute requireOwner={true}>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager-dashboard"
                  element={
                    <ProtectedRoute requireManager={true}>
                      <ManagerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager-orders"
                  element={
                    <ProtectedRoute requireManager={true}>
                      <ManagerOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager-articles"
                  element={
                    <ProtectedRoute requireManager={true}>
                      <ManagerArticles />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager-product-details/:id"
                  element={
                    <ProtectedRoute requireManager={true}>
                      <ManagerProductDetails />
                    </ProtectedRoute>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ModernNotificationsPanel
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </BrowserRouter>
          </NotificationContext.Provider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);