import { Grid3x3, Plus, ShoppingCart } from "lucide-react";
import { NavItem } from "@/components/ui/responsive-sidebar";

export function getMainNavItems(
  activePage: string,
  isOwner: boolean = false,
): NavItem[] {
  const baseNavItems: NavItem[] = [
    {
      href: "/dashboard",
      icon: Grid3x3,
      label: "Dashboard",
      isActive: activePage === "dashboard",
    },
    {
      href: "/new-order",
      icon: Plus,
      label: "Nouveau",
      isActive: activePage === "new-order",
    },
    {
      href: "/orders",
      icon: ShoppingCart,
      label: "Commandes",
      isActive: activePage === "orders",
    },
  ];

  return baseNavItems;
}
