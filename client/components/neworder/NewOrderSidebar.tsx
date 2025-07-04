import { Grid3x3, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export function NewOrderSidebar() {
  return (
    <div className="w-48 sm:w-52 lg:w-56 bg-white h-screen flex flex-col border-r border-gray-100 shadow-sm">
      {/* Logo/Brand */}
      <div className="p-3 sm:p-4 text-center">
        <h1 className="text-dashboard-dark text-sm sm:text-base font-semibold font-leckerli">
          Lounge Bar Le Cuivre
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="px-2 sm:px-3 flex-1">
        <ul className="space-y-1">
          {/* Dashboard */}
          <li>
            <Link to="/dashboard">
              <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200 font-medium text-xs sm:text-sm text-gray-600 hover:text-gray-900 group">
                <Grid3x3 className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>

          {/* Nouveau - Active */}
          <li>
            <Link to="/new-order">
              <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 bg-dashboard-yellow rounded-md shadow-sm font-medium text-xs sm:text-sm">
                <Plus className="w-4 h-4 text-white" />
                <span className="text-white">Nouveau</span>
              </div>
            </Link>
          </li>

          {/* Commandes */}
          <li>
            <Link to="/orders">
              <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-200 font-medium text-xs sm:text-sm text-gray-600 hover:text-gray-900 group">
                <ShoppingCart className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                <span>Commandes</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
