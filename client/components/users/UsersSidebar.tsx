import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users } from "lucide-react";

export function UsersSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
      active: false,
    },
    {
      icon: Users,
      label: "Utilisateurs",
      href: "/users",
      active: location.pathname === "/users",
    },
  ];

  return (
    <div className="w-48 sm:w-52 lg:w-56 bg-white h-screen flex-shrink-0 border-r border-gray-100 shadow-sm">
      <div className="p-3 sm:p-4">
        {/* Logo */}
        <h1 className="text-sm sm:text-base font-semibold text-dashboard-dark text-center leading-normal font-leckerli mb-6 sm:mb-8">
          Lounge Bar Le Cuivre
        </h1>

        {/* Menu Items */}
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-md transition-all duration-200 font-medium text-xs sm:text-sm",
                      item.active
                        ? "bg-dashboard-yellow text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group",
                    )}
                  >
                    <IconComponent
                      className={cn(
                        "w-4 h-4 transition-colors",
                        item.active
                          ? "text-white"
                          : "text-gray-500 group-hover:text-gray-700",
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
