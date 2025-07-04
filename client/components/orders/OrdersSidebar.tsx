import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Plus, ShoppingCart } from "lucide-react";

export const OrdersSidebar: React.FC = () => {
  return (
    <div className="w-48 sm:w-52 lg:w-56 min-h-screen bg-white border-r border-gray-100 shadow-sm">
      <div className="p-3 sm:p-4">
        <h1 className="text-sm sm:text-base font-semibold font-leckerli text-dashboard-dark text-center mb-6 sm:mb-8">
          Lounge Bar Le Cuivre
        </h1>

        <nav>
          <ul className="space-y-1">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-all duration-200 font-medium text-xs sm:text-sm group"
              >
                <LayoutDashboard className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/new-order"
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-all duration-200 font-medium text-xs sm:text-sm group"
              >
                <Plus className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                <span>Nouveau</span>
              </Link>
            </li>

            <li>
              <Link
                to="/orders"
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 bg-dashboard-yellow text-white rounded-md shadow-sm font-medium text-xs sm:text-sm"
              >
                <ShoppingCart className="w-4 h-4 text-white" />
                <span>Commandes</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
