import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    isPopular?: boolean;
  };
  onNext?: () => void;
  onPrevious?: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
  onNext,
  onPrevious,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm mx-auto bg-white rounded-t-3xl overflow-hidden shadow-xl">
        {/* Product Image */}
        <div className="relative h-[460px] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-20 rounded-full flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Container */}
        <div className="relative bg-white rounded-t-3xl -mt-20 pt-5">
          {/* Scroll Indicator */}
          <div className="w-15 h-1 bg-black rounded-full mx-auto mb-6"></div>

          {/* Badges */}
          <div className="px-8 mb-6">
            <div className="flex flex-wrap gap-3">
              {/* NEW Badge */}
              <div className="flex items-center gap-2 bg-black bg-opacity-10 rounded-lg px-3 py-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">NEW</span>
                </div>
              </div>

              {/* Popular Badge */}
              {product.isPopular && (
                <div className="flex items-center gap-2 bg-black bg-opacity-10 rounded-lg px-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                    <span className="text-white text-xs">🔥</span>
                  </div>
                  <span className="text-black text-xs font-medium font-poppins">
                    Populaire
                  </span>
                </div>
              )}

              {/* Category Badge */}
              <div className="bg-orange-100 bg-opacity-70 rounded-lg px-4 py-2">
                <span className="text-black text-xs font-medium font-poppins uppercase">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="px-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 font-poppins">
                {product.name}
              </h1>

              {/* Price Badge */}
              <div className="flex items-center gap-2 bg-black bg-opacity-10 rounded-lg px-2 py-1">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                <span className="text-black text-xs font-medium font-poppins">
                  {product.price} FCFA
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-black text-sm font-normal font-poppins leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="px-8 pb-8">
            <div className="flex justify-between items-center">
              {/* Previous Button */}
              <button
                onClick={onPrevious}
                disabled={!onPrevious}
                className={cn(
                  "w-12 h-9 rounded-lg flex items-center justify-center transition-colors",
                  onPrevious
                    ? "bg-black bg-opacity-10 hover:bg-opacity-20"
                    : "bg-gray-100 opacity-50 cursor-not-allowed",
                )}
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>

              {/* Navigation Dots/Indicators */}
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-black bg-opacity-10"></div>
                <div className="w-2 h-2 rounded-full bg-black bg-opacity-30"></div>
                <div className="w-2 h-2 rounded-full bg-black bg-opacity-10"></div>
              </div>

              {/* Next Button */}
              <button
                onClick={onNext}
                disabled={!onNext}
                className={cn(
                  "w-12 h-9 rounded-lg flex items-center justify-center transition-colors",
                  onNext
                    ? "bg-black bg-opacity-10 hover:bg-opacity-20"
                    : "bg-gray-100 opacity-50 cursor-not-allowed",
                )}
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
