import React, { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { ManagerOrdersHeader } from "@/components/manager/ManagerOrdersHeader";
import { ManagerOrdersFilters } from "@/components/manager/ManagerOrdersFilters";
import { ManagerOrdersTable } from "@/components/manager/ManagerOrdersTable";
import { ManagerSessionManager } from "@/components/manager/ManagerSessionManager";
import { HistorySidebar } from "@/components/dashboard/HistorySidebar";
import { getManagerNavItems } from "@/lib/manager-navigation";
import { useAuth } from "@/contexts/AuthContext";

export interface ManagerOrder {
  id: string;
  orderNumber: string;
  tableNumber: string;
  articleCount: number;
  totalPrice: number;
  status: "nouvelle" | "validee" | "servie" | "annulee";
  serverName: string;
  serverAvatar: string;
  createdAt: string;
}

const navItems: NavItem[] = [
  {
    href: "/manager-dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/manager-orders",
    icon: ShoppingCart,
    label: "Commandes",
    isActive: true,
  },
  {
    href: "/manager-articles",
    icon: Box,
    label: "Articles",
  },
];

const sampleManagerOrders: ManagerOrder[] = [
  {
    id: "1",
    orderNumber: "C01",
    tableNumber: "T01",
    articleCount: 3,
    totalPrice: 32000,
    status: "nouvelle",
    serverName: "Pierre",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a581c1b02fd399a4a3622f9a8ab2a7c75a5950ed?width=96",
    createdAt: "2024-05-14T08:20:00Z",
  },
  {
    id: "2",
    orderNumber: "C02",
    tableNumber: "T02",
    articleCount: 3,
    totalPrice: 32000,
    status: "nouvelle",
    serverName: "Chloé",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0fc4a66c4c0424020a2db292b5ead3ffebd3ec9e?width=96",
    createdAt: "2024-05-14T08:15:00Z",
  },
  {
    id: "3",
    orderNumber: "C03",
    tableNumber: "T03",
    articleCount: 3,
    totalPrice: 32000,
    status: "nouvelle",
    serverName: "Val",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d2f0743df5d6e59647165812b0f16ad41c8eb14c?width=96",
    createdAt: "2024-05-14T08:10:00Z",
  },
  {
    id: "4",
    orderNumber: "C04",
    tableNumber: "T04",
    articleCount: 3,
    totalPrice: 32000,
    status: "validee",
    serverName: "Pierre",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a581c1b02fd399a4a3622f9a8ab2a7c75a5950ed?width=96",
    createdAt: "2024-05-14T08:05:00Z",
  },
  {
    id: "5",
    orderNumber: "C05",
    tableNumber: "T05",
    articleCount: 3,
    totalPrice: 32000,
    status: "validee",
    serverName: "Chloé",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0fc4a66c4c0424020a2db292b5ead3ffebd3ec9e?width=96",
    createdAt: "2024-05-14T08:00:00Z",
  },
  {
    id: "6",
    orderNumber: "C06",
    tableNumber: "T06",
    articleCount: 3,
    totalPrice: 32000,
    status: "validee",
    serverName: "Val",
    serverAvatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d2f0743df5d6e59647165812b0f16ad41c8eb14c?width=96",
    createdAt: "2024-05-14T07:55:00Z",
  },
];

const ManagerOrders: React.FC = () => {
  const { notifications } = useNotifications();
  const [orders, setOrders] = useState<ManagerOrder[]>(sampleManagerOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.serverName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "" || order.status === statusFilter;

    const matchesTime = () => {
      if (timeFilter === "") return true;

      const orderDate = new Date(order.createdAt);
      const hour = orderDate.getHours();

      switch (timeFilter) {
        case "morning":
          return hour >= 6 && hour < 12;
        case "afternoon":
          return hour >= 12 && hour < 18;
        case "evening":
          return hour >= 18 && hour < 24;
        case "night":
          return hour >= 0 && hour < 6;
        default:
          return true;
      }
    };

    const matchesDate = () => {
      if (dateFilter === "") return true;

      const orderDate = new Date(order.createdAt);
      const today = new Date();
      const orderDateStr = orderDate.toDateString();
      const todayStr = today.toDateString();

      switch (dateFilter) {
        case "today":
          return orderDateStr === todayStr;
        case "yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return orderDateStr === yesterday.toDateString();
        case "week":
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return orderDate >= weekAgo;
        default:
          return true;
      }
    };

    return matchesSearch && matchesStatus && matchesTime() && matchesDate();
  });

  return (
    <ResponsiveLayout navItems={navItems} header={<ManagerOrdersHeader />}>
      {/* Orders Section */}
      <div className="flex-1 px-2 sm:px-3 pb-2 sm:pb-3">
        {/* Section Headers */}
        <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6 pt-2 sm:pt-3">
          <div className="flex-1">
            <h2 className="text-sm sm:text-base font-semibold text-dashboard-dark font-poppins mb-1 sm:mb-2">
              Commandes
            </h2>
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
            <ManagerOrdersFilters
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
              <ManagerOrdersTable orders={filteredOrders} />
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

export default ManagerOrders;
