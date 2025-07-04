import { CheckCircle2, Clock, XCircle, ArrowUpRight } from "lucide-react";

interface HistoryItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: "approved" | "rejected" | "pending";
}

const historyItems: HistoryItem[] = [
  {
    id: "1",
    title: "Commande #C001",
    subtitle: "Table 5 • 3 articles",
    time: "Il y a 5 min",
    type: "pending",
  },
  {
    id: "2",
    title: "Commande #C002",
    subtitle: "Table 3 • 2 articles",
    time: "Il y a 12 min",
    type: "rejected",
  },
  {
    id: "3",
    title: "Commande #C003",
    subtitle: "Table 8 • 4 articles",
    time: "Il y a 18 min",
    type: "approved",
  },
  {
    id: "4",
    title: "Commande #C004",
    subtitle: "Table 2 • 1 article",
    time: "Il y a 25 min",
    type: "approved",
  },
];

function getHistoryConfig(type: HistoryItem["type"]) {
  switch (type) {
    case "approved":
      return {
        icon: <CheckCircle2 className="w-3 h-3 text-white" />,
        bgColor: "bg-emerald-500",
        textColor: "text-emerald-700",
        dotColor: "bg-emerald-200",
        status: "Servie",
      };
    case "rejected":
      return {
        icon: <XCircle className="w-3 h-3 text-white" />,
        bgColor: "bg-red-500",
        textColor: "text-red-700",
        dotColor: "bg-red-200",
        status: "Annulée",
      };
    case "pending":
      return {
        icon: <Clock className="w-3 h-3 text-white" />,
        bgColor: "bg-amber-500",
        textColor: "text-amber-700",
        dotColor: "bg-amber-200",
        status: "En attente",
      };
    default:
      return {
        icon: <Clock className="w-3 h-3 text-white" />,
        bgColor: "bg-gray-500",
        textColor: "text-gray-700",
        dotColor: "bg-gray-200",
        status: "Inconnue",
      };
  }
}

export function HistorySidebar() {
  return (
    <div className="bg-white h-full rounded-xl shadow-sm border border-gray-100/80 backdrop-blur-sm">
      <div className="p-3 space-y-1">
        {historyItems.map((item, index) => {
          const config = getHistoryConfig(item.type);
          return (
            <div key={item.id} className="relative group">
              <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50/80 transition-all duration-200 cursor-pointer">
                {/* Timeline */}
                <div className="relative flex flex-col items-center">
                  {/* Icon */}
                  <div
                    className={`w-6 h-6 ${config.bgColor} rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ring-2 ring-white`}
                  >
                    {config.icon}
                  </div>

                  {/* Connector line */}
                  {index < historyItems.length - 1 && (
                    <div className="w-0.5 h-8 bg-gradient-to-b from-gray-200 to-gray-100 mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-gray-900 truncate">
                      {item.title}
                    </h4>
                    <ArrowUpRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                  </div>

                  <p className="text-xs text-gray-600 truncate">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-medium ${config.textColor} bg-opacity-10`}
                    >
                      <div
                        className={`w-1.5 h-1.5 ${config.dotColor} rounded-full`}
                      ></div>
                      {config.status}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* View All Button */}
        <div className="pt-2 mt-3 border-t border-gray-100">
          <button className="w-full text-xs font-medium text-gray-600 hover:text-gray-900 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            Voir tout l'historique
          </button>
        </div>
      </div>
    </div>
  );
}
