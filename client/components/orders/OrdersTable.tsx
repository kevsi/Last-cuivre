import React, { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Order } from "../../pages/Orders";
import { OrderDetailsModal } from "@/components/ui/order-details-modal";
import { EditOrderModal } from "@/components/ui/edit-order-modal";
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal";

interface OrdersTableProps {
  orders: Order[];
}

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

// Données détaillées d'exemple pour les modales
const detailedOrders: Record<string, OrderDetails> = {
  "1": {
    id: "1",
    orderNumber: "C01",
    tableNumber: "T01",
    status: "validated",
    totalPrice: 32000,
    createdAt: "2024-05-14T08:20:00Z",
    items: [
      {
        id: "item1",
        name: "Café Expresso",
        quantity: 2,
        price: 1500,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "boisson",
      },
      {
        id: "item2",
        name: "Croissant au Beurre",
        quantity: 1,
        price: 2000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "pâtisserie",
      },
      {
        id: "item3",
        name: "Jus d'Orange Frais",
        quantity: 1,
        price: 27000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "boisson",
      },
    ],
  },
  "2": {
    id: "2",
    orderNumber: "C02",
    tableNumber: "T02",
    status: "pending",
    totalPrice: 18000,
    createdAt: "2024-05-14T08:15:00Z",
    items: [
      {
        id: "item4",
        name: "Thé Vert",
        quantity: 1,
        price: 1200,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "boisson",
      },
      {
        id: "item5",
        name: "Sandwich Club",
        quantity: 1,
        price: 16800,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "plat",
      },
    ],
  },
  "3": {
    id: "3",
    orderNumber: "C03",
    tableNumber: "T03",
    status: "served",
    totalPrice: 45000,
    createdAt: "2024-05-14T08:10:00Z",
    items: [
      {
        id: "item6",
        name: "Salade César",
        quantity: 1,
        price: 18000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "plat",
      },
      {
        id: "item7",
        name: "Eau Minérale",
        quantity: 2,
        price: 1000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "boisson",
      },
      {
        id: "item8",
        name: "Tiramisu",
        quantity: 1,
        price: 25000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "dessert",
      },
    ],
  },
  "4": {
    id: "4",
    orderNumber: "C04",
    tableNumber: "T04",
    status: "cancelled",
    totalPrice: 38000,
    createdAt: "2024-05-14T08:05:00Z",
    items: [
      {
        id: "item9",
        name: "Pizza Margherita",
        quantity: 1,
        price: 38000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "plat",
      },
    ],
  },
  "5": {
    id: "5",
    orderNumber: "C05",
    tableNumber: "T05",
    status: "validated",
    totalPrice: 52000,
    createdAt: "2024-05-14T08:00:00Z",
    items: [
      {
        id: "item10",
        name: "Burger Royal",
        quantity: 1,
        price: 25000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "plat",
      },
      {
        id: "item11",
        name: "Frites Maison",
        quantity: 1,
        price: 8000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "accompagnement",
      },
      {
        id: "item12",
        name: "Coca-Cola",
        quantity: 2,
        price: 1500,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "boisson",
      },
      {
        id: "item13",
        name: "Brownie Chocolat",
        quantity: 1,
        price: 16000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "dessert",
      },
    ],
  },
  "6": {
    id: "6",
    orderNumber: "C06",
    tableNumber: "T06",
    status: "pending",
    totalPrice: 12000,
    createdAt: "2024-05-14T07:55:00Z",
    items: [
      {
        id: "item14",
        name: "Café au Lait",
        quantity: 1,
        price: 2000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "boisson",
      },
      {
        id: "item15",
        name: "Pain Chocolat",
        quantity: 1,
        price: 10000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "pâtisserie",
      },
    ],
  },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "validated":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "served":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "validated":
      return "Validée";
    case "pending":
      return "En attente";
    case "served":
      return "Servie";
    case "cancelled":
      return "Annulée";
    default:
      return status;
  }
};

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewOrder = (orderId: string) => {
    const orderDetails = detailedOrders[orderId];
    if (orderDetails) {
      setSelectedOrder(orderDetails);
      setShowDetailsModal(true);
    }
  };

  const handleEditOrder = (orderId: string) => {
    const orderDetails = detailedOrders[orderId];
    if (orderDetails) {
      setSelectedOrder(orderDetails);
      setShowEditModal(true);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    const orderDetails = detailedOrders[orderId];
    if (orderDetails) {
      setSelectedOrder(orderDetails);
      setShowDeleteModal(true);
    }
  };

  const handleSaveEdit = async (updatedOrder: OrderDetails) => {
    setIsLoading(true);
    try {
      // Simuler l'enregistrement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Ici vous mettriez à jour vos données
      console.log("Commande mise à jour:", updatedOrder);

      setShowEditModal(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      // Simuler la suppression
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Ici vous supprimeriez la commande de vos données
      console.log("Commande supprimée:", selectedOrder?.orderNumber);

      setShowDeleteModal(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModals = () => {
    setShowDetailsModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        {/* Desktop Table Header - Hidden on mobile */}
        <div className="hidden lg:block bg-gradient-to-r from-dashboard-yellow/0 to-dashboard-yellow/0 p-2 sm:p-3">
          <div className="grid grid-cols-6 gap-1 sm:gap-2 min-w-[700px]">
            <div className="bg-dashboard-yellow text-white rounded-lg p-2 text-center font-poppins font-semibold text-xs">
              N° commande
            </div>
            <div className="bg-dashboard-yellow text-white rounded-lg p-2 text-center font-poppins font-semibold text-xs">
              N° table
            </div>
            <div className="bg-dashboard-yellow text-white rounded-lg p-2 text-center font-poppins font-semibold text-xs">
              Articles
            </div>
            <div className="bg-dashboard-yellow text-white rounded-lg p-2 text-center font-poppins font-semibold text-xs">
              Prix total
            </div>
            <div className="bg-dashboard-yellow text-white rounded-lg p-2 text-center font-poppins font-semibold text-xs">
              Statut
            </div>
            <div className="bg-dashboard-yellow text-white rounded-lg p-2 text-center font-poppins font-semibold text-xs">
              Actions
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="bg-gray-50 p-2 space-y-2">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="bg-white rounded border border-gray-200 p-2 shadow-sm hover:shadow-md transition-shadow min-w-[700px] lg:min-w-0"
            >
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-2">
                {/* Header Row */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-1">
                      <span className="text-gray-700 font-poppins font-bold text-xs">
                        N°{index + 1}
                      </span>
                    </div>
                    <span className="text-gray-700 font-poppins font-bold text-sm">
                      {order.orderNumber}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-poppins font-bold ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                {/* Info Row */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Table:</span>
                    <span className="ml-1 font-bold text-gray-700">
                      {order.tableNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Articles:</span>
                    <span className="ml-1 font-bold text-gray-700">
                      {order.articleCount}
                    </span>
                  </div>
                </div>

                {/* Price and Actions Row */}
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700">
                    {order.totalPrice}F
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleViewOrder(order.id)}
                      className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition-colors"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => handleEditOrder(order.id)}
                      className="bg-yellow-100 text-yellow-600 p-2 rounded hover:bg-yellow-200 transition-colors"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleViewOrder(order.id)}
                  className="w-full bg-blue-100 text-blue-600 py-2 rounded text-xs font-poppins font-bold hover:bg-blue-200 transition-colors"
                >
                  Voir détails
                </button>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-6 gap-4 items-center">
                {/* Order Number */}
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                    <span className="text-gray-700 font-poppins font-bold text-sm">
                      N°{index + 1}
                    </span>
                  </div>
                  <span className="text-gray-700 font-poppins font-bold">
                    {order.orderNumber}
                  </span>
                </div>

                {/* Table Number */}
                <div className="text-center">
                  <span className="text-gray-700 font-poppins font-bold text-xs">
                    {order.tableNumber}
                  </span>
                </div>

                {/* Article Count */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-gray-700 font-poppins font-bold text-xs">
                    {order.articleCount} articles
                  </span>
                  <button
                    onClick={() => handleViewOrder(order.id)}
                    className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded text-xs font-poppins font-bold hover:bg-blue-200 transition-colors"
                  >
                    Voir
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-center">
                  <span className="text-gray-700 font-poppins font-bold text-xs">
                    {order.totalPrice}F
                  </span>
                </div>

                {/* Status */}
                <div className="text-center">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-poppins font-bold ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 justify-center">
                  <button
                    onClick={() => handleViewOrder(order.id)}
                    className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEditOrder(order.id)}
                    className="bg-yellow-100 text-yellow-600 p-2 rounded hover:bg-yellow-200 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modales */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={closeModals}
        orderDetails={selectedOrder}
      />

      <EditOrderModal
        isOpen={showEditModal}
        onClose={closeModals}
        onSave={handleSaveEdit}
        orderDetails={selectedOrder}
        isLoading={isLoading}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeModals}
        onConfirm={handleConfirmDelete}
        itemType="commande"
        itemName={selectedOrder ? `Commande ${selectedOrder.orderNumber}` : ""}
        isLoading={isLoading}
      />
    </div>
  );
};
