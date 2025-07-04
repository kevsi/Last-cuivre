import React, { useState } from "react";
import {
  X,
  Check,
  ChefHat,
  Clock,
  ShoppingCart,
  Users,
  AlertCircle,
  CheckCircle,
  Trash2,
  Bell,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NotificationUser {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

interface NotificationAction {
  id: string;
  label: string;
  type: "primary" | "secondary" | "success" | "warning";
  icon?: React.ReactNode;
}

interface Notification {
  id: string;
  type: "order" | "kitchen" | "table" | "staff" | "alert" | "system";
  user: NotificationUser;
  action: string;
  target?: string;
  timestamp: string;
  isRead: boolean;
  hasActions?: boolean;
  actions?: NotificationAction[];
  orderInfo?: {
    number: string;
    table: string;
  };
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    user: {
      id: "1",
      name: "Chef Marcus",
      initials: "CM",
      avatar: "/placeholder.svg",
    },
    action: "a terminé la commande",
    target: "C142",
    timestamp: "2 min",
    isRead: false,
    hasActions: true,
    actions: [
      {
        id: "serve",
        label: "Servir",
        type: "success",
        icon: <Check className="w-4 h-4" />,
      },
    ],
    orderInfo: {
      number: "C142",
      table: "T05",
    },
  },
  {
    id: "2",
    type: "table",
    user: {
      id: "2",
      name: "Maria Gonzalez",
      initials: "MG",
      avatar: "/placeholder.svg",
    },
    action: "a demandé l'addition pour",
    target: "Table 8",
    timestamp: "5 min",
    isRead: false,
    hasActions: true,
    actions: [
      {
        id: "print-bill",
        label: "Imprimer",
        type: "primary",
        icon: <ShoppingCart className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "3",
    type: "kitchen",
    user: {
      id: "3",
      name: "Système",
      initials: "SY",
      avatar: "/placeholder.svg",
    },
    action: "temps de préparation dépassé pour",
    target: "C138",
    timestamp: "8 min",
    isRead: false,
  },
  {
    id: "4",
    type: "staff",
    user: {
      id: "4",
      name: "Julie Martin",
      initials: "JM",
      avatar: "/placeholder.svg",
    },
    action: "a commencé son service",
    timestamp: "15 min",
    isRead: true,
  },
  {
    id: "5",
    type: "alert",
    user: {
      id: "5",
      name: "Système",
      initials: "SY",
      avatar: "/placeholder.svg",
    },
    action: "stock faible : Mojito",
    timestamp: "1h",
    isRead: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return <ShoppingCart className="w-3 h-3 text-dashboard-yellow" />;
    case "kitchen":
      return <ChefHat className="w-3 h-3 text-orange-500" />;
    case "table":
      return <Users className="w-3 h-3 text-blue-500" />;
    case "staff":
      return <CheckCircle className="w-3 h-3 text-green-500" />;
    case "alert":
      return <AlertCircle className="w-3 h-3 text-red-500" />;
    default:
      return <Bell className="w-3 h-3 text-gray-500" />;
  }
};

const getActionButtonClass = (type: NotificationAction["type"]) => {
  switch (type) {
    case "primary":
      return "bg-dashboard-yellow text-white hover:bg-dashboard-yellow/90 font-medium";
    case "secondary":
      return "bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium";
    case "success":
      return "bg-green-600 text-white hover:bg-green-700 font-medium";
    case "warning":
      return "bg-orange-500 text-white hover:bg-orange-600 font-medium";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium";
  }
};

export function NotificationsPanel({
  isOpen,
  onClose,
}: NotificationsPanelProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-80 h-screen bg-white shadow-2xl border-l border-gray-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-dashboard-gray">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-dashboard-yellow" />
          <h2 className="text-lg font-bold text-dashboard-dark font-poppins">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <Badge
              variant="secondary"
              className="bg-dashboard-yellow text-white font-semibold"
            >
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            className="text-sm text-dashboard-yellow hover:text-dashboard-yellow/80 font-medium font-inter flex items-center gap-1"
            title="Marquer tout comme lu"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors font-inter",
            activeTab === "all"
              ? "border-dashboard-yellow text-dashboard-yellow bg-white"
              : "border-transparent text-gray-600 hover:text-dashboard-dark",
          )}
        >
          Toutes
        </button>
        <button
          onClick={() => setActiveTab("unread")}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors font-inter",
            activeTab === "unread"
              ? "border-dashboard-yellow text-dashboard-yellow bg-white"
              : "border-transparent text-gray-600 hover:text-dashboard-dark",
          )}
        >
          Non lues ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Check className="w-8 h-8 mb-2" />
            <p className="text-sm">
              {activeTab === "unread"
                ? "No unread notifications"
                : "No notifications"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "relative p-4 hover:bg-gray-50 transition-colors group",
                  !notification.isRead &&
                    "bg-dashboard-yellow/5 border-l-4 border-dashboard-yellow",
                )}
              >
                {/* Delete button */}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded-md transition-all"
                >
                  <Trash2 className="w-3 h-3 text-gray-400" />
                </button>

                <div className="flex items-start gap-3">
                  {/* Avatar with notification icon */}
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback className="text-xs bg-gray-200">
                        {notification.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border border-gray-200">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-semibold text-dashboard-dark text-sm font-poppins">
                        {notification.user.name}
                      </span>
                      <div className="flex items-center text-sm text-gray-700 font-inter">
                        <span>{notification.action}</span>
                        {notification.target && (
                          <>
                            <span className="mx-1"></span>
                            <span className="font-semibold text-dashboard-yellow">
                              {notification.target}
                            </span>
                          </>
                        )}
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-dashboard-yellow rounded-full ml-auto flex-shrink-0"></div>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mb-2">
                      {notification.timestamp}
                    </p>

                    {/* Order info */}
                    {notification.orderInfo && (
                      <div className="flex items-center gap-2 p-2 bg-dashboard-yellow/10 rounded-lg mb-2 border border-dashboard-yellow/20">
                        <ShoppingCart className="w-4 h-4 text-dashboard-yellow" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-dashboard-dark truncate">
                            Commande {notification.orderInfo.number}
                          </p>
                          <p className="text-xs text-gray-600">
                            {notification.orderInfo.table}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    {notification.hasActions && notification.actions && (
                      <div className="flex gap-2 mt-2">
                        {notification.actions.map((action) => (
                          <Button
                            key={action.id}
                            size="sm"
                            className={cn(
                              "h-7 px-2 text-xs",
                              getActionButtonClass(action.type),
                            )}
                            onClick={() => markAsRead(notification.id)}
                          >
                            {action.icon}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
