import { Grid3x3, Plus, ShoppingCart } from "lucide-react";
import { NewOrderHeader } from "@/components/neworder/NewOrderHeader";
import { MenuFilters } from "@/components/neworder/MenuFilters";
import { MenuGrid } from "@/components/neworder/MenuGrid";
import { OrderCart } from "@/components/neworder/OrderCart";
import { OrderSuccessModal } from "@/components/neworder/OrderSuccessModal";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";
import { SavingAnimation } from "@/components/ui/saving-animation";
import { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    icon: Grid3x3,
    label: "Dashboard",
  },
  {
    href: "/new-order",
    icon: Plus,
    label: "Nouveau",
    isActive: true,
  },
  {
    href: "/orders",
    icon: ShoppingCart,
    label: "Commandes",
  },
];

export default function NewOrder() {
  const { notifications } = useNotifications();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState("T12");
  const [tip, setTip] = useState(500);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">(
    "name",
  );
  const [priceRange, setPriceRange] = useState<
    "all" | "0-3000" | "3000-5000" | "5000+"
  >("all");

  const addToCart = (item: MenuItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      notifications.quantityUpdated(item.name, existingItem.quantity + 1);
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      notifications.articleAdded(item.name);
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    const item = cartItems.find((item) => item.id === id);

    if (quantity <= 0) {
      if (item) {
        notifications.articleRemoved(item.name);
      }
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      if (item) {
        notifications.quantityUpdated(item.name, quantity);
      }
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + tip;
  };

  const handleTipChange = (newTip: number) => {
    setTip(newTip);
  };

  const handleSaveOrder = async () => {
    try {
      setIsSaving(true);

      // Simuler un délai de sauvegarde
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Saving order:", {
        tableNumber,
        items: cartItems,
        subtotal: calculateSubtotal(),
        tip: tip,
        total: calculateTotal(),
      });

      // Générer un numéro de commande
      const orderNumber = `C${Date.now().toString().slice(-3)}`;
      notifications.orderCreated(orderNumber);
    } catch (error) {
      setIsSaving(false);
      notifications.actionError("Cr��ation de la commande");
    }
  };

  const handleSavingComplete = () => {
    setIsSaving(false);
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Reset cart after successful order
    setCartItems([]);
  };

  return (
    <>
      <ResponsiveLayout navItems={navItems} header={<NewOrderHeader />}>
        {/* Filters */}
        <div className="px-4 lg:px-6 py-3">
          <MenuFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />
        </div>

        {/* Content Area */}
        <div className="px-4 lg:px-6 pb-4">
          <div className="flex flex-col xl:flex-row gap-3 lg:gap-4">
            {/* Menu Grid */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl lg:text-2xl font-bold text-dashboard-dark mb-5 sm:mb-6 lg:mb-7 pt-2 sm:pt-3 font-poppins">
                Liste des articles
              </h2>
              <MenuGrid
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                sortBy={sortBy}
                priceRange={priceRange}
                onAddToCart={addToCart}
              />
            </div>

            {/* Order Cart */}
            <div className="w-full xl:w-80 flex-shrink-0">
              <OrderCart
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                subtotal={calculateSubtotal()}
                tip={tip}
                total={calculateTotal()}
                onSaveOrder={handleSaveOrder}
                tableNumber={tableNumber}
                onTableNumberChange={setTableNumber}
                onTipChange={handleTipChange}
                isSaving={isSaving}
              />
            </div>
          </div>
        </div>
      </ResponsiveLayout>

      {/* Saving Animation */}
      <SavingAnimation
        isVisible={isSaving}
        message="Enregistrement de votre commande en cours..."
        successMessage="Commande enregistrée avec succès !"
        onComplete={handleSavingComplete}
        duration={1500}
      />

      {/* Success Modal */}
      {showSuccessModal && <OrderSuccessModal onClose={handleCloseModal} />}
    </>
  );
}
