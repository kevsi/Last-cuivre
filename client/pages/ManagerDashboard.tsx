import React from "react";
import { ManagerHeader } from "../components/manager/ManagerHeader";
import { StatisticsChart } from "../components/manager/StatisticsChart";
import { StatsCards } from "../components/manager/StatsCards";
import { ManagerOrdersTable } from "../components/manager/ManagerOrdersTable";
import { ManagerSessionManager } from "../components/manager/ManagerSessionManager";
import { HistorySidebar } from "@/components/dashboard/HistorySidebar";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
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
];

const ManagerDashboard: React.FC = () => {
  const { isOwner } = useAuth();
  const navItems = getManagerNavItems("dashboard", isOwner);

  return (
    <>
      <ManagerSessionManager />
      <ResponsiveLayout navItems={navItems} header={<ManagerHeader />}>
        {/* Stats Cards */}
        <div className="px-2 sm:px-3 py-1 sm:py-2">
          <StatsCards />
        </div>

        {/* Dashboard Section */}
        <div className="flex-1 px-2 sm:px-3 pb-2 sm:pb-3">
          {/* Section Headers */}
          <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 mb-4 sm:mb-5 lg:mb-6 pt-2 sm:pt-3">
            <div className="flex-1">
              <h2 className="text-sm sm:text-base font-semibold text-dashboard-dark font-poppins mb-1 sm:mb-2">
                Dashboard Manager
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
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Statistics Chart */}
              <div className="mb-4">
                <StatisticsChart />
              </div>

              {/* Recent Orders Section */}
              <div className="mb-2 sm:mb-3 lg:mb-4">
                <h3 className="text-sm sm:text-base font-semibold text-dashboard-dark font-poppins mb-3 sm:mb-4">
                  Commandes récentes
                </h3>
                <ManagerOrdersTable orders={sampleManagerOrders} />
              </div>
            </div>

            {/* History Sidebar - Stack below on smaller screens */}
            <div className="w-full xl:w-56 flex-shrink-0">
              <HistorySidebar />
            </div>
          </div>
        </div>
      </ResponsiveLayout>
    </>
  );
};

export default ManagerDashboard;
