import { Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderDetailsModal } from "@/components/ui/order-details-modal";
import { EditOrderModal } from "@/components/ui/edit-order-modal";
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal";
import { useState } from "react";

interface Order {
  id: string;
  orderNumber: string;
  tableNumber: string;
  items: number;
  total: string;
  status: "validée" | "en-attente" | "servie";
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

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "C01",
    tableNumber: "T01",
    items: 3,
    total: "32000F",
    status: "validée",
  },
  {
    id: "2",
    orderNumber: "C02",
    tableNumber: "T02",
    items: 2,
    total: "18000F",
    status: "en-attente",
  },
  {
    id: "3",
    orderNumber: "C03",
    tableNumber: "T03",
    items: 5,
    total: "45000F",
    status: "servie",
  },
  {
    id: "4",
    orderNumber: "C04",
    tableNumber: "T04",
    items: 1,
    total: "12000F",
    status: "validée",
  },
  {
    id: "5",
    orderNumber: "C05",
    tableNumber: "T05",
    items: 4,
    total: "38000F",
    status: "en-attente",
  },
];

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
        name: "Pizza Margherita",
        quantity: 2,
        price: 15000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "plat",
      },
      {
        id: "item7",
        name: "Salade César",
        quantity: 1,
        price: 8000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "entrée",
      },
      {
        id: "item8",
        name: "Coca-Cola",
        quantity: 2,
        price: 3500,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "boisson",
      },
    ],
  },
  "4": {
    id: "4",
    orderNumber: "C04",
    tableNumber: "T04",
    status: "validated",
    totalPrice: 12000,
    createdAt: "2024-05-14T08:05:00Z",
    items: [
      {
        id: "item9",
        name: "Burger Classic",
        quantity: 1,
        price: 12000,
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
    status: "pending",
    totalPrice: 38000,
    createdAt: "2024-05-14T08:00:00Z",
    items: [
      {
        id: "item10",
        name: "Pâtes Carbonara",
        quantity: 1,
        price: 14000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "plat",
      },
      {
        id: "item11",
        name: "Tiramisu",
        quantity: 2,
        price: 6000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "dessert",
      },
      {
        id: "item12",
        name: "Vin Rouge",
        quantity: 1,
        price: 18000,
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
        category: "boisson",
      },
    ],
  },
};

function getStatusVariant(status: Order["status"]) {
  switch (status) {
    case "validée":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "en-attente":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "servie":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

function getStatusText(status: Order["status"]) {
  switch (status) {
    case "validée":
      return "Validée";
    case "en-attente":
      return "En attente";
    case "servie":
      return "Servie";
    default:
      return status;
  }
}

export function OrderTable() {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDetails = (orderId: string) => {
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
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-1 sm:gap-2 p-2 sm:p-3 bg-gray-50 border-b min-w-[600px]">
          <div className="font-semibold text-black text-center font-poppins text-xs">
            N° commande
          </div>
          <div className="font-semibold text-black text-center font-poppins text-xs">
            N° table
          </div>
          <div className="font-semibold text-black text-center font-poppins text-xs">
            Articles
          </div>
          <div className="font-semibold text-black text-center font-poppins text-xs">
            Prix total
          </div>
          <div className="font-semibold text-black text-center font-poppins text-xs">
            Statut
          </div>
          <div className="font-semibold text-black text-center font-poppins text-xs">
            Actions
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-1 sm:space-y-2 p-2 sm:p-3 bg-gray-50 min-h-[150px] sm:min-h-[200px]">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="flex flex-col lg:grid lg:grid-cols-6 gap-1 sm:gap-2 items-start lg:items-center p-2 sm:p-3 bg-white rounded-lg border border-gray-200 shadow-sm min-w-[600px] lg:min-w-0"
            >
              {/* Mobile Layout */}
              <div className="lg:hidden w-full space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Badge
                      variant="outline"
                      className="bg-white border-gray-200 text-gray-800 font-bold text-xs"
                    >
                      N°{index + 1}
                    </Badge>
                    <span className="font-bold text-gray-800 font-poppins text-sm">
                      {order.orderNumber}
                    </span>
                  </div>
                  <Badge
                    className={`${getStatusVariant(order.status)} text-xs px-2 py-1`}
                  >
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">
                    Table:{" "}
                    <span className="font-bold">{order.tableNumber}</span>
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    Articles: <span className="font-bold">{order.items}</span>
                  </span>
                  <span className="font-bold text-gray-800 text-sm">
                    {order.total}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(order.id)}
                    className="bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200 text-xs px-2 py-1"
                  >
                    Voir détails
                  </Button>
                  <div className="flex gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleViewDetails(order.id)}
                      className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 w-6 h-6 sm:w-8 sm:h-8"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditOrder(order.id)}
                      className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100 w-6 h-6 sm:w-8 sm:h-8"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 w-6 h-6 sm:w-8 sm:h-8"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:contents">
                {/* Order Number Badge */}
                <div className="flex justify-center">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Badge
                      variant="outline"
                      className="bg-white border-gray-200 text-gray-800 font-bold text-xs"
                    >
                      N°{index + 1}
                    </Badge>
                    <span className="font-bold text-gray-800 font-poppins text-sm">
                      {order.orderNumber}
                    </span>
                  </div>
                </div>

                {/* Table Number */}
                <div className="text-center font-bold text-gray-800 font-poppins text-sm">
                  {order.tableNumber}
                </div>

                {/* Items Count */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <span className="font-bold text-gray-800 font-poppins text-sm">
                    {order.items} articles
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(order.id)}
                    className="bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200 font-poppins text-xs px-2 py-1"
                  >
                    Voir
                  </Button>
                </div>

                {/* Total */}
                <div className="text-center font-bold text-gray-800 font-poppins text-sm">
                  {order.total}
                </div>

                {/* Status */}
                <div className="flex justify-center">
                  <Badge
                    className={`${getStatusVariant(order.status)} text-xs px-2 py-1`}
                  >
                    {getStatusText(order.status)}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-1 sm:gap-2 lg:gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleViewDetails(order.id)}
                    className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                  >
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditOrder(order.id)}
                    className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                  >
                    <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteOrder(order.id)}
                    className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                  >
                    <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  </Button>
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
}
