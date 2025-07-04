import React, { useState } from "react";
import {
  ResponsiveSidebar,
  NavItem,
  SidebarToggle,
} from "./responsive-sidebar";
import { useBreakpoint } from "@/hooks/use-mobile";
import { useResponsive } from "@/hooks/use-responsive";
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  header?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  className?: string;
}

export function ResponsiveLayout({
  children,
  navItems,
  header,
  sidebarFooter,
  className,
}: ResponsiveLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const { isMobile, getTextSize, getSpacing } = useResponsive();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      className={cn(
        "min-h-screen bg-dashboard-gray leading-normal text-sm",
        className,
      )}
    >
      <div className="flex h-screen">
        {/* Sidebar */}
        <ResponsiveSidebar
          navItems={navItems}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        >
          {sidebarFooter}
        </ResponsiveSidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header with mobile toggle */}
          {header && (
            <div className="flex-shrink-0">
              {React.cloneElement(header as React.ReactElement, {
                leftAction: breakpoint !== "desktop" && (
                  <SidebarToggle
                    onToggle={toggleSidebar}
                    className="lg:hidden"
                  />
                ),
              })}
            </div>
          )}

          {/* Main content area */}
          <main className="flex-1 overflow-auto leading-normal text-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
