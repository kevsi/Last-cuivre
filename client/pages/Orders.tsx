import React, { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { LayoutDashboard, Plus, ShoppingCart } from "lucide-react";
import { OrdersHeader } from "../components/orders/OrdersHeader";
import { OrdersFilters } from "../components/orders/OrdersFilters";
import { OrdersTable } from "../components/orders/OrdersTable";
import { HistorySidebar } from "@/components/dashboard/HistorySidebar";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";
import { useOrders } from "@/hooks/api";
import { OrderFilters } from "@/types/api";
import { TableSkeleton } from "@/components/ui/loaders";

export interface Order {
  id: string;
  orderNumber: string;
  tableNumber: string;
  articleCount: number;
  totalPrice: number;
  status: "validated" | "pending" | "served" | "cancelled";
  createdAt: string;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/new-order",
    icon: Plus,
    label: "Nouveau",
  },
  {
    href: "/orders",
    icon: ShoppingCart,
    label: "Commandes",
    isActive: true,
  },
];

const Orders: React.FC = () => {
  const { notifications } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Construire les filtres pour l'API
  const filters: OrderFilters = {
    search: searchQuery || undefined,
    status: (statusFilter as any) || undefined,
  };

  // Récupérer les commandes via l'API
  const {
    data: ordersResponse,
    isLoading,
    error,
    refetch,
  } = useOrders(filters);

  const orders = ordersResponse?.data?.data || [];

  // Le filtrage est maintenant fait côté serveur
  const filteredOrders = orders;

  return (
    <ResponsiveLayout navItems={navItems} header={<OrdersHeader />}>
      {/* Orders Section */}
      <div className="flex-1 px-2 sm:px-3 pb-2 sm:pb-3">
        {/* Section Headers */}
        <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6 pt-2 sm:pt-3">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h2 className="text-sm sm:text-base font-semibold text-dashboard-dark font-poppins mb-1 sm:mb-2">
                Mes commandes
              </h2>
              <button
                onClick={() => notifications.dataExported("commandes")}
                className="bg-dashboard-yellow text-white px-6 py-3 rounded-md font-inter text-sm font-medium hover:bg-dashboard-yellow/90 transition-colors whitespace-nowrap"
              >
                📊 Exporter
              </button>
            </div>
          </div>
          <div className="w-full xl:w-56 flex-shrink-0">
            <h2 className="text-sm sm:text-base font-semibold text-dashboard-dark font-poppins text-center xl:text-left mb-1 sm:mb-2 xl:pl-0">
              Historique
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 h-full">
          {/* Orders Table */}
          <div className="flex-1 min-w-0">
            <OrdersFilters
              searchQuery={searchQuery}
              onSearchChange={(query) => {
                setSearchQuery(query);
                if (query.length > 2) {
                  const results = filteredOrders.length;
                  notifications.searchPerformed(query, results);
                }
              }}
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />

            <div className="mt-4">
              {isLoading ? (
                <TableSkeleton rows={6} />
              ) : error ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-red-500 mb-4 text-base md:text-sm">
                      Erreur lors du chargement des commandes
                    </p>
                    <button
                      onClick={() => refetch()}
                      className="bg-dashboard-yellow text-white px-6 py-3 md:px-4 md:py-2 rounded text-base md:text-sm hover:bg-dashboard-yellow/90 transition-colors"
                    >
                      Réessayer
                    </button>
                  </div>
                </div>
              ) : (
                <OrdersTable orders={filteredOrders} />
              )}
            </div>
          </div>

          {/* History Sidebar - Stack below on smaller screens */}
          <div className="w-full xl:w-56 flex-shrink-0">
            <HistorySidebar />
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default Orders;
