import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Order } from "../../pages/Orders";
import { useNotifications } from "@/hooks/use-notifications";

interface OrdersTableProps {
  orders: Order[];
  onOrderUpdate?: (orderId: string, newStatus: Order["status"]) => void;
  onOrderDelete?: (orderId: string) => void;
}

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

export const OrdersTableWithNotifications: React.FC<OrdersTableProps> = ({
  orders,
  onOrderUpdate,
  onOrderDelete,
}) => {
  const { notifications } = useNotifications();

  const handleView = (order: Order) => {
    // Vue des détails de la commande
  };

  const handleEdit = (order: Order) => {
    // Modification de la commande
  };

  const handleDelete = (order: Order) => {
    if (onOrderDelete) {
      onOrderDelete(order.id);
      notifications.orderDeleted(order.orderNumber);
    }
  };

  const handleStatusChange = (order: Order, newStatus: Order["status"]) => {
    if (onOrderUpdate) {
      onOrderUpdate(order.id, newStatus);

      switch (newStatus) {
        case "validated":
          notifications.orderValidated(order.orderNumber);
          break;
        case "served":
          notifications.orderServed(order.orderNumber);
          break;
        case "cancelled":
          notifications.orderCancelled(order.orderNumber);
          break;
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        {/* Desktop Table Header - Hidden on mobile */}
        <div className="hidden lg:block p-2 sm:p-3">
          <div className="grid grid-cols-6 gap-1 sm:gap-2 min-w-[700px]">
            <div className="text-center font-poppins font-semibold text-xs text-black">
              N° commande
            </div>
            <div className="text-center font-poppins font-semibold text-xs text-black">
              N° table
            </div>
            <div className="text-center font-poppins font-semibold text-xs text-black">
              Articles
            </div>
            <div className="text-center font-poppins font-semibold text-xs text-black">
              Prix total
            </div>
            <div className="text-center font-poppins font-semibold text-xs text-black">
              Statut
            </div>
            <div className="text-center font-poppins font-semibold text-xs text-black">
              Actions
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="bg-gray-50 p-2 sm:p-3 space-y-2 sm:space-y-3">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-gray-200 p-2 sm:p-3 shadow-sm hover:shadow-md transition-shadow min-w-[700px] lg:min-w-0"
            >
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-4">
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
                  <button
                    onClick={() =>
                      handleStatusChange(
                        order,
                        order.status === "pending" ? "validated" : order.status,
                      )
                    }
                    className={`px-2 py-1 rounded-lg text-xs font-poppins font-bold ${getStatusColor(order.status)} hover:opacity-80 transition-opacity`}
                  >
                    {getStatusText(order.status)}
                  </button>
                </div>

                {/* Info Row */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Table:</span>
                    <span className="ml-2 font-bold text-gray-700">
                      {order.tableNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Articles:</span>
                    <span className="ml-2 font-bold text-gray-700">
                      {order.articleCount}
                    </span>
                  </div>
                </div>

                {/* Price and Actions Row */}
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-700">
                    {order.totalPrice}F
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(order)}
                      className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(order)}
                      className="bg-yellow-100 text-yellow-600 p-2 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(order)}
                      className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleView(order)}
                  className="w-full bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-poppins font-bold hover:bg-blue-200 transition-colors"
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
                  <span className="text-gray-700 font-poppins font-bold">
                    {order.tableNumber}
                  </span>
                </div>

                {/* Article Count */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-gray-700 font-poppins font-bold">
                    {order.articleCount} articles
                  </span>
                  <button
                    onClick={() => handleView(order)}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-poppins font-bold hover:bg-blue-200 transition-colors"
                  >
                    Voir
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-center">
                  <span className="text-gray-700 font-poppins font-bold">
                    {order.totalPrice}F
                  </span>
                </div>

                {/* Status */}
                <div className="text-center">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        order,
                        order.status === "pending" ? "validated" : order.status,
                      )
                    }
                    className={`px-3 py-1 rounded-lg text-sm font-poppins font-bold ${getStatusColor(order.status)} hover:opacity-80 transition-opacity`}
                  >
                    {getStatusText(order.status)}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 justify-center">
                  <button
                    onClick={() => handleView(order)}
                    className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => handleEdit(order)}
                    className="bg-yellow-100 text-yellow-600 p-2 rounded-lg hover:bg-yellow-200 transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(order)}
                    className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
