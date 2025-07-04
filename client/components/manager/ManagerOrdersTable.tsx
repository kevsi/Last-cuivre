import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { ManagerOrder } from "../../pages/ManagerOrders";

interface ManagerOrdersTableProps {
  orders: ManagerOrder[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "nouvelle":
      return "bg-green-100 text-green-800";
    case "validee":
      return "bg-green-100 text-green-800";
    case "servie":
      return "bg-blue-100 text-blue-800";
    case "annulee":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "nouvelle":
      return "Nouvelle";
    case "validee":
      return "Validée";
    case "servie":
      return "Servie";
    case "annulee":
      return "Annulée";
    default:
      return status;
  }
};

export const ManagerOrdersTable: React.FC<ManagerOrdersTableProps> = ({
  orders,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        {/* Desktop Table Header - Hidden on mobile */}
        <div className="hidden lg:block p-2 sm:p-3">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 min-w-[800px]">
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
              Serveur
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
              className="bg-white rounded-lg border border-gray-200 p-2 sm:p-3 shadow-sm hover:shadow-md transition-shadow min-w-[800px] lg:min-w-0"
            >
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-2 sm:space-y-3 lg:space-y-4">
                {/* Header Row */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-gray-100 border border-gray-200 rounded-lg px-2 py-0.5 sm:px-3 sm:py-1">
                      <span className="text-gray-700 font-poppins font-bold text-xs">
                        N°{index + 1}
                      </span>
                    </div>
                    <span className="text-gray-700 font-poppins font-bold text-xs sm:text-sm">
                      {order.orderNumber}
                    </span>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-xs font-poppins font-bold ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                {/* Info Row */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500">Table:</span>
                    <span className="ml-1 sm:ml-2 font-bold text-gray-700">
                      {order.tableNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Articles:</span>
                    <span className="ml-1 sm:ml-2 font-bold text-gray-700">
                      {order.articleCount}
                    </span>
                  </div>
                </div>

                {/* Server and Price Row */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <img
                      src={order.serverAvatar}
                      alt={order.serverName}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg lg:rounded-2xl"
                    />
                    <span className="text-xs sm:text-sm font-bold text-gray-700">
                      {order.serverName}
                    </span>
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-700">
                    {order.totalPrice}F
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex justify-between items-center">
                  <button className="bg-blue-100 text-blue-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-poppins font-bold hover:bg-blue-200 transition-colors">
                    Voir
                  </button>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button className="bg-blue-100 text-blue-600 p-1 sm:p-1.5 lg:p-2 rounded-lg hover:bg-blue-200 transition-colors">
                      <Eye size={12} className="sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
                    </button>
                    <button className="bg-yellow-100 text-yellow-600 p-1 sm:p-1.5 lg:p-2 rounded-lg hover:bg-yellow-200 transition-colors">
                      <Edit size={12} className="sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
                    </button>
                    <button className="bg-red-100 text-red-600 p-1 sm:p-1.5 lg:p-2 rounded-lg hover:bg-red-200 transition-colors">
                      <Trash2
                        size={12}
                        className="sm:w-4 sm:h-4 lg:w-4 lg:h-4"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 items-center">
                {/* Order Number */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-white border border-gray-200 rounded-lg px-2 py-1 sm:px-3 sm:py-2">
                    <span className="text-gray-700 font-poppins font-bold text-xs sm:text-sm">
                      N°{index + 1}
                    </span>
                  </div>
                  <span className="text-gray-700 font-poppins font-bold text-xs sm:text-sm">
                    {order.orderNumber}
                  </span>
                </div>

                {/* Table Number */}
                <div className="text-center">
                  <span className="text-gray-700 font-poppins font-bold text-xs sm:text-sm">
                    {order.tableNumber}
                  </span>
                </div>

                {/* Article Count */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <span className="text-gray-700 font-poppins font-bold text-xs sm:text-sm">
                    {order.articleCount} articles
                  </span>
                  <button className="bg-blue-100 text-blue-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-poppins font-bold hover:bg-blue-200 transition-colors">
                    Voir
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-center">
                  <span className="text-gray-700 font-poppins font-bold text-xs sm:text-sm">
                    {order.totalPrice}F
                  </span>
                </div>

                {/* Status */}
                <div className="text-center">
                  <span
                    className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-poppins font-bold ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                {/* Server */}
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <img
                    src={order.serverAvatar}
                    alt={order.serverName}
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-lg lg:rounded-2xl"
                  />
                  <span className="text-xs sm:text-sm font-bold text-gray-700">
                    {order.serverName}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 justify-center">
                  <button className="bg-blue-100 text-blue-600 p-1 sm:p-1.5 lg:p-2 rounded-lg hover:bg-blue-200 transition-colors">
                    <Eye size={12} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  </button>
                  <button className="bg-yellow-100 text-yellow-600 p-1 sm:p-1.5 lg:p-2 rounded-lg hover:bg-yellow-200 transition-colors">
                    <Edit size={12} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  </button>
                  <button className="bg-red-100 text-red-600 p-1 sm:p-1.5 lg:p-2 rounded-lg hover:bg-red-200 transition-colors">
                    <Trash2 size={12} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
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
