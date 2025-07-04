import React, { useState } from "react";
import { X, Plus, Minus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  category: string;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  tableNumber: string;
  status: "validated" | "pending" | "served" | "cancelled";
  totalPrice: number;
  createdAt: string;
  items: OrderItem[];
}

interface EditOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedOrder: OrderDetails) => void;
  orderDetails: OrderDetails | null;
  isLoading?: boolean;
}

export function EditOrderModal({
  isOpen,
  onClose,
  onSave,
  orderDetails,
  isLoading = false,
}: EditOrderModalProps) {
  const [editedOrder, setEditedOrder] = useState<OrderDetails | null>(null);

  React.useEffect(() => {
    if (orderDetails) {
      setEditedOrder({ ...orderDetails });
    }
  }, [orderDetails]);

  if (!isOpen || !orderDetails || !editedOrder) return null;

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setEditedOrder((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
        ),
      };
    });
  };

  const removeItem = (itemId: string) => {
    setEditedOrder((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== itemId),
      };
    });
  };

  const calculateTotal = () => {
    return editedOrder.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const handleSave = () => {
    const updatedOrder = {
      ...editedOrder,
      totalPrice: calculateTotal(),
    };
    onSave(updatedOrder);
  };

  const canSave = editedOrder.items.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-blue-100">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Save className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Modifier la commande {orderDetails.orderNumber}
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>📍 Table {orderDetails.tableNumber}</span>
                <span>•</span>
                <Badge className="bg-blue-50 text-blue-700 border-0">
                  {orderDetails.status === "validated"
                    ? "Validée"
                    : orderDetails.status === "pending"
                      ? "En attente"
                      : orderDetails.status === "served"
                        ? "Servie"
                        : "Annulée"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Articles ({editedOrder.items.length})
            </h3>

            {editedOrder.items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Aucun article dans cette commande</p>
                <p className="text-sm mt-1">
                  Ajoutez des articles pour continuer
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {editedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {item.category} • {item.price.toLocaleString()}F/unité
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                          disabled={isLoading || item.quantity <= 1}
                          className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                          disabled={isLoading}
                          className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="w-20 text-right font-bold text-gray-900">
                        {(item.price * item.quantity).toLocaleString()}F
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={isLoading}
                        className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-100 disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">Total de la commande</div>
            <div className="text-2xl font-bold text-gray-900">
              {calculateTotal().toLocaleString()}F
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="px-6"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading || !canSave}
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Enregistrement...
                </div>
              ) : (
                "Enregistrer les modifications"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
