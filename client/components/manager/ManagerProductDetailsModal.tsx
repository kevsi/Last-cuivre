import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ManagerProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    badges: string[];
  };
}

export default function ManagerProductDetailsModal({
  isOpen,
  onClose,
  product,
}: ManagerProductDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#FDFDFD]">
      {/* Product Image */}
      <div className="relative w-full h-[460px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-black/10 rounded-full flex items-center justify-center"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content Container with curved top */}
      <div className="relative -mt-12 bg-white rounded-t-[24px] min-h-[472px] px-8 pt-6">
        {/* Scroll Indicator */}
        <div className="w-[60px] h-[3px] bg-black rounded-full mx-auto mb-8" />

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          {product.badges.includes("NEW") && (
            <div className="flex items-center gap-2 bg-black/10 rounded-lg px-3 py-2">
              <div className="w-[25px] h-[25px] bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                NEW
              </div>
            </div>
          )}

          {product.badges.includes("Populaire") && (
            <div className="flex items-center gap-2 bg-black/10 rounded-lg px-3 py-2">
              <div className="w-[25px] h-[25px] bg-red-500 rounded-full flex items-center justify-center">
                🔥
              </div>
              <span className="text-black text-xs font-medium font-poppins">
                Populaire
              </span>
            </div>
          )}

          {product.badges.includes("CHAMPAGNE") && (
            <div className="bg-[#FFDFC7]/70 rounded-lg px-4 py-2">
              <span className="text-black text-xs font-medium font-poppins">
                CHAMPAGNE
              </span>
            </div>
          )}
        </div>

        {/* Product Name and Price */}
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-[#09051C] text-[28px] font-bold font-poppins leading-[121%]">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 bg-black/10 rounded-lg px-2 py-1">
            <div className="w-[25px] h-[25px] bg-orange-500 rounded-full flex items-center justify-center">
              💰
            </div>
            <span className="text-black text-xs font-medium font-poppins">
              {product.price}
            </span>
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-8">
          <p className="text-black text-sm font-normal font-poppins leading-[156.5%] tracking-[0.105px]">
            {product.description}
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center">
          <button className="w-12 h-9 bg-black/10 rounded-lg flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          <button className="w-12 h-9 bg-black/10 rounded-lg flex items-center justify-center">
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
