import { Minus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CartItem } from "@/pages/NewOrder";

interface OrderCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  tip: number;
  total: number;
  onSaveOrder: () => void;
  tableNumber: string;
  onTableNumberChange: (value: string) => void;
  onTipChange: (value: number) => void;
  isSaving?: boolean;
}

export function OrderCart({
  items,
  onUpdateQuantity,
  subtotal,
  tip,
  total,
  onSaveOrder,
  tableNumber,
  onTableNumberChange,
  onTipChange,
  isSaving = false,
}: OrderCartProps) {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 h-fit min-w-0">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-3xl font-bold text-dashboard-dark font-poppins mb-3 sm:mb-4 truncate">
          Commande
        </h2>

        {/* Table Number Input */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-dashboard-dark font-roboto text-sm font-medium min-w-0">
            Numéro de table :
          </span>
          <Input
            value={tableNumber}
            onChange={(e) => onTableNumberChange(e.target.value)}
            className="w-20 h-8 text-center bg-white border border-gray-200 rounded-lg text-sm font-semibold"
            placeholder="N°"
          />
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-dashboard-muted text-center py-8">
            Aucun article dans la commande
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 sm:gap-4 min-w-0"
            >
              {/* Product Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <h4 className="font-bold text-dashboard-dark font-poppins text-sm sm:text-base truncate">
                  {item.name}
                </h4>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-6 h-5 p-0 bg-gray-300 border-0 rounded"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm font-sf-pro min-w-[1rem] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-6 h-5 p-0 bg-gray-300 border-0 rounded"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="text-dashboard-dark font-bold font-poppins text-sm sm:text-base flex-shrink-0">
                {item.price * item.quantity}F
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-dashboard-muted font-poppins">Sous-total</span>
          <span className="text-dashboard-dark font-poppins">{subtotal}F</span>
        </div>

        {/* Tip */}
        <div className="flex justify-between items-center">
          <span className="text-dashboard-muted font-poppins">Pourboire</span>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={tip}
              onChange={(e) => onTipChange(Number(e.target.value) || 0)}
              className="w-16 h-7 text-right bg-white border border-gray-200 rounded text-sm"
              min="0"
            />
            <span className="text-dashboard-dark font-poppins text-sm">F</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-dashboard-dark font-poppins font-semibold">
            Total
          </span>
          <span className="text-dashboard-dark font-bold text-xl font-poppins">
            {total}F
          </span>
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={onSaveOrder}
        className="w-full mt-6 bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-white font-poppins text-lg py-4 rounded-2xl"
        disabled={items.length === 0 || isSaving}
      >
        {isSaving ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Enregistrement...</span>
          </div>
        ) : (
          "Enregistrer"
        )}
      </Button>
    </div>
  );
}
