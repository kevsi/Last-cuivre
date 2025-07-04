import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/use-mobile";
import { useNotifications } from "@/hooks/use-notifications";

export interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
}

interface ResponsiveSidebarProps {
  children?: React.ReactNode;
  navItems: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function ResponsiveSidebar({
  children,
  navItems,
  isOpen,
  onToggle,
  className,
}: ResponsiveSidebarProps) {
  const { notifications } = useNotifications();
  const breakpoint = useBreakpoint();
  const location = useLocation();

  const handleToggle = () => {
    onToggle();
  };

  // Auto-close sidebar on mobile when navigating
  React.useEffect(() => {
    if (breakpoint === "mobile") {
      onToggle();
    }
  }, [location.pathname]);

  const sidebarContent = (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-gray-100 shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="p-3 sm:p-4 text-center border-b border-gray-50">
        <div className="flex items-center justify-between">
          <h1 className="text-dashboard-dark text-sm sm:text-base font-semibold font-leckerli truncate">
            Lounge Bar Le Cuivre
          </h1>
          {breakpoint === "mobile" && (
            <button
              onClick={handleToggle}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 sm:px-3 py-3 sm:py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || item.isActive;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-md transition-all duration-200 font-medium text-xs sm:text-sm group",
                    isActive
                      ? "bg-dashboard-yellow text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-4 h-4 flex-shrink-0 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-gray-700",
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Additional content */}
      {children && (
        <div className="p-4 lg:p-6 border-t border-gray-100">{children}</div>
      )}
    </div>
  );

  // Mobile: Overlay sidebar
  if (breakpoint === "mobile") {
    return (
      <>
        {/* Mobile backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={handleToggle}
          />
        )}

        {/* Mobile sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-56 sm:w-64 transform transition-transform duration-300 ease-in-out lg:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  // Tablet: Collapsible sidebar
  if (breakpoint === "tablet") {
    return (
      <div
        className={cn(
          "transition-all duration-300 ease-in-out bg-white border-r border-gray-100",
          isOpen ? "w-56 sm:w-64" : "w-14 sm:w-16",
        )}
      >
        {isOpen ? (
          sidebarContent
        ) : (
          <div className="flex flex-col h-full">
            {/* Collapsed header */}
            <div className="p-4 text-center border-b border-gray-100">
              <button
                onClick={handleToggle}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Collapsed nav items */}
            <nav className="flex-1 px-2 py-6">
              <ul className="space-y-4">
                {navItems.map((item) => {
                  const isActive =
                    location.pathname === item.href || item.isActive;
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center justify-center p-3 rounded-xl transition-colors",
                          isActive
                            ? "bg-dashboard-yellow text-white"
                            : "text-dashboard-muted hover:bg-gray-50",
                        )}
                        title={item.label}
                      >
                        <item.icon className="w-6 h-6" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>
    );
  }

  // Desktop: Always open
  return (
    <div className="w-48 sm:w-52 lg:w-56 flex-shrink-0">{sidebarContent}</div>
  );
}

export function SidebarToggle({
  onToggle,
  className,
}: {
  onToggle: () => void;
  className?: string;
}) {
  const { notifications } = useNotifications();

  const handleToggle = () => {
    onToggle();
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "p-2 hover:bg-gray-100 rounded-lg transition-colors",
        className,
      )}
      aria-label="Toggle sidebar"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
