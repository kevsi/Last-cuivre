import { Grid3x3, Plus, ShoppingCart, Users } from "lucide-react";
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
