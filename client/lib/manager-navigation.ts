import { LayoutDashboard, ShoppingCart, Box } from "lucide-react";
import { NavItem } from "@/components/ui/responsive-sidebar";

export function getManagerNavItems(
  activePage: string,
  isOwner: boolean = false,
): NavItem[] {
  const baseNavItems: NavItem[] = [
    {
      href: "/manager-dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      isActive: activePage === "dashboard",
    },
    {
      href: "/manager-orders",
      icon: ShoppingCart,
      label: "Commandes",
      isActive: activePage === "orders",
    },
    {
      href: "/manager-articles",
      icon: Box,
      label: "Articles",
      isActive: activePage === "articles",
    },
  ];

  return baseNavItems;
}
