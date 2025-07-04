import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenuItemCard } from "@/components/ui/mobile-menu-item-card";
import { useBreakpoint } from "@/hooks/use-mobile";
import type { MenuItem } from "@/pages/NewOrder";

type SortBy = "name" | "price-asc" | "price-desc";
type PriceRange = "all" | "0-3000" | "3000-5000" | "5000+";

interface MenuGridProps {
  searchQuery: string;
  selectedCategory: string;
  sortBy: SortBy;
  priceRange: PriceRange;
  onAddToCart: (item: MenuItem) => void;
}

// Sample menu data - in a real app this would come from an API
const menuItems: (MenuItem & { isPopular?: boolean; description?: string })[] =
  [
    {
      id: "1",
      name: "Kir Royale",
      price: 20000,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F3c639019e64345d6b4f2b67b537ac1c3?format=webp&width=800",
      category: "champagne",
      isPopular: true,
      description:
        "Nulla occaecat velit laborum exercitation ullamco. Elit labore eu aute elit nostrud culpa velit excepteur deserunt sunt. Velit non est cillum consequat cupidatat ex Lorem laboris labore aliqua ad duis eu laborum.",
    },
    {
      id: "2",
      name: "Mojito",
      price: 4000,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "cocktails",
      isPopular: true,
    },
    {
      id: "3",
      name: "Daiquiri",
      price: 4000,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "cocktails",
    },
    {
      id: "4",
      name: "Margarita",
      price: 4500,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "cocktails",
    },
    {
      id: "5",
      name: "Dom Pérignon",
      price: 25000,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F3c639019e64345d6b4f2b67b537ac1c3?format=webp&width=800",
      category: "champagne",
    },
    {
      id: "6",
      name: "Heineken",
      price: 2500,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "bières",
    },
    {
      id: "7",
      name: "Corona",
      price: 2800,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "bières",
    },
    {
      id: "8",
      name: "Bordeaux Rouge",
      price: 6000,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "vins",
    },
    {
      id: "9",
      name: "Chardonnay",
      price: 5500,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "vins",
    },
    {
      id: "10",
      name: "Coca-Cola",
      price: 1500,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "sodas",
    },
    {
      id: "11",
      name: "Sprite",
      price: 1500,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "sodas",
    },
    {
      id: "12",
      name: "Whisky Sour",
      price: 4800,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "cocktails",
    },
  ];

export function MenuGrid({
  searchQuery,
  selectedCategory,
  sortBy,
  priceRange,
  onAddToCart,
}: MenuGridProps) {
  const breakpoint = useBreakpoint();

  const filteredItems = menuItems
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      // Price range filtering
      let matchesPriceRange = true;
      if (priceRange !== "all") {
        switch (priceRange) {
          case "0-3000":
            matchesPriceRange = item.price <= 3000;
            break;
          case "3000-5000":
            matchesPriceRange = item.price > 3000 && item.price <= 5000;
            break;
          case "5000+":
            matchesPriceRange = item.price > 5000;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesPriceRange;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  // Mobile layout with details modal
  if (breakpoint === "mobile") {
    return (
      <div className="grid grid-cols-2 gap-4 pb-4">
        {filteredItems.map((item, index) => (
          <MobileMenuItemCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
            onNext={index < filteredItems.length - 1 ? () => {} : undefined}
            onPrevious={index > 0 ? () => {} : undefined}
          />
        ))}
      </div>
    );
  }

  // Desktop layout (existing) - Optimized for 4 cards
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-4">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-0"
        >
          {/* Image */}
          <div className="relative mb-4">
            <div className="w-full h-32 bg-gray-200 rounded-xl mb-3 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-2 min-w-0 overflow-hidden">
            <h3 className="font-semibold text-dashboard-dark font-poppins text-base truncate">
              {item.name}
            </h3>
            <p className="text-dashboard-yellow font-bold text-lg font-poppins truncate">
              {item.price}F
            </p>
          </div>

          {/* Add Button */}
          <div className="flex justify-end mt-4">
            <Button
              size="sm"
              className="bg-dashboard-yellow hover:bg-dashboard-yellow/90 rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => onAddToCart(item)}
            >
              <Plus className="w-4 h-4 text-white mr-1" />
              <span className="text-white font-medium text-sm">Ajouter</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
