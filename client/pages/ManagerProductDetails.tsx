import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ResponsiveLayout } from "../components/ui/responsive-layout";
import { NavItem } from "../components/ui/responsive-sidebar";
import { LayoutDashboard, ShoppingCart, Box } from "lucide-react";
import { ManagerHeader } from "../components/manager/ManagerHeader";
import ManagerProductDetailsModal from "../components/manager/ManagerProductDetailsModal";

const navItems: NavItem[] = [
  {
    href: "/manager-dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/manager-orders",
    icon: ShoppingCart,
    label: "Commandes",
  },
  {
    href: "/manager-articles",
    icon: Box,
    label: "Articles",
    isActive: true,
  },
];

// Mock product data - in real app this would come from API
const mockProducts = {
  "1": {
    id: "1",
    name: "Kir Royale",
    price: "20000 FCFA",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b789a0a1aa3a46bd1486a4a274f4c1885534f292?width=782",
    description:
      "Nulla occaecat velit laborum exercitation ullamco. Elit labore eu aute elit nostrud culpa velit excepteur deserunt sunt. Velit non est cillum consequat cupidatat ex Lorem laboris labore aliqua ad duis eu laborum.",
    badges: ["NEW", "Populaire", "CHAMPAGNE"],
  },
  "2": {
    id: "2",
    name: "Mojito Classique",
    price: "15000 FCFA",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800",
    description:
      "Un cocktail rafraîchissant à base de rhum blanc, menthe fraîche, citron vert et eau gazeuse. Parfait pour les chaudes soirées d'été.",
    badges: ["Populaire"],
  },
  "3": {
    id: "3",
    name: "Whisky Sour",
    price: "25000 FCFA",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800",
    description:
      "Cocktail classique à base de whisky, jus de citron frais et sirop de sucre. Servi avec une garniture d'orange et une cerise.",
    badges: ["CHAMPAGNE"],
  },
};

export default function ManagerProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id && mockProducts[id as keyof typeof mockProducts]) {
      setProduct(mockProducts[id as keyof typeof mockProducts]);
    } else {
      // Product not found, redirect back
      navigate("/manager-articles");
    }
  }, [id, navigate]);

  const handleClose = () => {
    navigate("/manager-articles");
  };

  if (!product) {
    return null;
  }

  return (
    <ResponsiveLayout navItems={navItems} header={<ManagerHeader />}>
      <ManagerProductDetailsModal
        isOpen={true}
        onClose={handleClose}
        product={product}
      />
    </ResponsiveLayout>
  );
}
