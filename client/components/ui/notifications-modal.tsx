import React from "react";
import { X, Bell, CheckCircle2, AlertCircle, Clock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
  timestamp: string;
  isRead: boolean;
  category: "order" | "system" | "user" | "general";
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
}

const getNotificationConfig = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return {
        icon: <CheckCircle2 className="w-5 h-5" />,
        bgColor: "bg-emerald-50",
        iconColor: "bg-emerald-500",
        textColor: "text-emerald-700",
        borderColor: "border-emerald-200",
      };
    case "warning":
      return {
        icon: <AlertCircle className="w-5 h-5" />,
        bgColor: "bg-amber-50",
        iconColor: "bg-amber-500",
        textColor: "text-amber-700",
        borderColor: "border-amber-200",
      };
    case "error":
      return {
        icon: <AlertCircle className="w-5 h-5" />,
        bgColor: "bg-red-50",
        iconColor: "bg-red-500",
        textColor: "text-red-700",
        borderColor: "border-red-200",
      };
    case "info":
      return {
        icon: <Info className="w-5 h-5" />,
        bgColor: "bg-blue-50",
        iconColor: "bg-blue-500",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
      };
    default:
      return {
        icon: <Info className="w-5 h-5" />,
        bgColor: "bg-gray-50",
        iconColor: "bg-gray-500",
        textColor: "text-gray-700",
        borderColor: "border-gray-200",
      };
  }
};

const getCategoryLabel = (category: Notification["category"]) => {
  switch (category) {
    case "order":
      return "Commande";
    case "system":
      return "Système";
    case "user":
      return "Utilisateur";
    case "general":
      return "Général";
    default:
      return "Autre";
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

  if (diffInMinutes < 1) return "À l'instant";
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
  if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `Il y a ${hours}h`;
  }
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Données d'exemple des notifications
const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "Nouvelle commande",
    message: "Commande #C007 créée pour la table 5",
    type: "info",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    isRead: false,
    category: "order",
  },
  {
    id: "2",
    title: "Commande validée",
    message: "La commande #C006 a été validée et est en préparation",
    type: "success",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    isRead: false,
    category: "order",
  },
  {
    id: "3",
    title: "Stock faible",
    message: "L'article 'Café Expresso' est bientôt en rupture de stock",
    type: "warning",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    isRead: true,
    category: "system",
  },
  {
    id: "4",
    title: "Commande servie",
    message: "Commande #C005 servie à la table 3",
    type: "success",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    isRead: true,
    category: "order",
  },
  {
    id: "5",
    title: "Nouveau utilisateur",
    message: "Un nouveau serveur a été ajouté au système",
    type: "info",
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
    isRead: true,
    category: "user",
  },
];

export function NotificationsModal({
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationsModalProps) {
  const [notifications] = React.useState<Notification[]>(sampleNotifications);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-blue-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-xl relative">
              <Bell className="w-6 h-6 text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Notifications
              </h2>
              <p className="text-sm text-gray-600">
                {unreadCount > 0
                  ? `${unreadCount} nouvelle${unreadCount > 1 ? "s" : ""} notification${unreadCount > 1 ? "s" : ""}`
                  : "Toutes les notifications sont lues"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="p-4 border-b border-gray-100">
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Marquer tout comme lu
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[50vh]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune notification</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                const config = getNotificationConfig(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.isRead ? "bg-blue-50/30" : ""
                    }`}
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 ${config.iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        {config.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-0.5"
                          >
                            {getCategoryLabel(notification.category)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <button className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium py-2 hover:bg-gray-100 rounded-lg transition-colors">
            Voir toutes les notifications
          </button>
        </div>
      </div>
    </div>
  );
}
