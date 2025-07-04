import { LayoutDashboard, ShoppingCart, Box, Users } from "lucide-react";
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

  // Si l'utilisateur est owner (admin), ajouter le lien utilisateurs
  if (isOwner) {
    baseNavItems.push({
      href: "/users",
      icon: Users,
      label: "Utilisateurs",
      isActive: activePage === "users",
    });
  }

  return baseNavItems;
}
