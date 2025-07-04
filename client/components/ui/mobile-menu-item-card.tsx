import React, { useState } from "react";
import { Plus } from "lucide-react";
import { ProductDetailsModal } from "./product-details-modal";
import { useNotifications } from "@/hooks/use-notifications";

interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    isPopular?: boolean;
  };
  onAddToCart: (item: any) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export const MobileMenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onAddToCart,
  onNext,
  onPrevious,
}) => {
  const { notifications } = useNotifications();
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const productWithDescription = {
    ...item,
    description:
      item.description ||
      "Nulla occaecat velit laborum exercitation ullamco. Elit labore eu aute elit nostrud culpa velit excepteur deserunt sunt. Velit non est cillum consequat cupidatat ex Lorem laboris labore aliqua ad duis eu laborum.",
  };

  return (
    <>
      <div
        onClick={handleShowDetails}
        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer min-w-0"
      >
        {/* Article Image */}
        <div className="relative mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-32 lg:h-40 object-cover rounded-lg"
          />
          {item.isPopular && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              🔥 Populaire
            </div>
          )}
        </div>

        {/* Article Info */}
        <div className="flex items-center justify-between min-w-0">
          <div className="flex-1 min-w-0 overflow-hidden">
            <h3 className="text-sm lg:text-base font-bold text-gray-800 font-poppins mb-1 truncate">
              {item.name}
            </h3>
            <p className="text-sm lg:text-base font-bold text-dashboard-yellow truncate">
              {item.price}F
            </p>
          </div>

          {/* Add Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            className="bg-dashboard-yellow text-white w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center hover:bg-dashboard-yellow/90 transition-colors flex-shrink-0 ml-2"
          >
            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        product={productWithDescription}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </>
  );
};
