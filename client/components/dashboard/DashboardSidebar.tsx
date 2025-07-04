import { Grid3x3, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardSidebar() {
  return (
    <div className="w-80 bg-white h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 text-center">
        <h1 className="text-dashboard-dark text-3xl font-normal font-leckerli">
          Lounge Bar Le Cuivre
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="px-6 flex-1">
        <ul className="space-y-4">
          {/* Dashboard - Active */}
          <li>
            <Link to="/dashboard">
              <div className="flex items-center gap-6 px-6 py-4 bg-dashboard-yellow rounded-2xl shadow-sm">
                <Grid3x3 className="w-10 h-10 text-white" />
                <span className="text-white text-lg font-medium">
                  Dashboard
                </span>
              </div>
            </Link>
          </li>

          {/* Nouveau */}
          <li>
            <Link to="/new-order">
              <div className="flex items-center gap-6 px-6 py-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <Plus className="w-10 h-10 text-dashboard-muted" />
                <span className="text-dashboard-muted text-lg font-medium">
                  Nouveau
                </span>
              </div>
            </Link>
          </li>

          {/* Commandes */}
          <li>
            <Link to="/orders">
              <div className="flex items-center gap-6 px-6 py-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <ShoppingCart className="w-10 h-10 text-dashboard-muted" />
                <span className="text-dashboard-muted text-lg font-medium">
                  Commandes
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
