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
  MoreHorizontal,
  Archive,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  priority?: "low" | "medium" | "high" | "urgent";
}

interface ModernNotificationsPanelProps {
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
    priority: "high",
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
    priority: "medium",
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
    priority: "urgent",
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
    priority: "low",
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
    priority: "medium",
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return <ShoppingCart className="w-4 h-4 text-blue-500" />;
    case "kitchen":
      return <ChefHat className="w-4 h-4 text-orange-500" />;
    case "table":
      return <Users className="w-4 h-4 text-purple-500" />;
    case "staff":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "alert":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Bell className="w-4 h-4 text-gray-500" />;
  }
};

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case "urgent":
      return "border-l-red-500 bg-red-50/50";
    case "high":
      return "border-l-orange-500 bg-orange-50/50";
    case "medium":
      return "border-l-blue-500 bg-blue-50/50";
    case "low":
      return "border-l-gray-300 bg-gray-50/50";
    default:
      return "border-l-gray-300 bg-gray-50/50";
  }
};

export function ModernNotificationsPanel({
  isOpen,
  onClose,
}: ModernNotificationsPanelProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-96 h-screen bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Elegant Header */}
            <div className="relative bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    {unreadCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-xs font-bold">
                          {unreadCount}
                        </span>
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Notifications
                    </h2>
                    <p className="text-sm text-gray-500">
                      {unreadCount > 0
                        ? `${unreadCount} nouveau${unreadCount > 1 ? "x" : ""}`
                        : "Tout est à jour"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    title="Marquer tout comme lu"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Modern Tabs */}
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setActiveTab("all")}
                  className={cn(
                    "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    activeTab === "all"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setActiveTab("unread")}
                  className={cn(
                    "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 relative",
                    activeTab === "unread"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  Non lues
                  {unreadCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-64 text-gray-500"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Bell className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-lg font-medium mb-2">Tout est propre !</p>
                  <p className="text-sm text-center px-8">
                    {activeTab === "unread"
                      ? "Aucune notification non lue"
                      : "Aucune notification pour le moment"}
                  </p>
                </motion.div>
              ) : (
                <div className="p-2 space-y-2">
                  <AnimatePresence>
                    {filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "relative group rounded-xl border-l-4 p-4 transition-all duration-200 hover:shadow-md cursor-pointer",
                          !notification.isRead
                            ? getPriorityColor(notification.priority)
                            : "border-l-gray-200 bg-gray-50/30 hover:bg-gray-50",
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        {/* Action Menu */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-white/80"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="flex items-start gap-3">
                          {/* Enhanced Avatar */}
                          <div className="relative flex-shrink-0">
                            <Avatar className="w-10 h-10 ring-2 ring-white shadow-sm">
                              <AvatarImage src={notification.user.avatar} />
                              <AvatarFallback className="text-sm bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                                {notification.user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                              {getNotificationIcon(notification.type)}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-gray-900 text-sm">
                                    {notification.user.name}
                                  </span>
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {notification.action}
                                  {notification.target && (
                                    <span className="font-semibold text-gray-900 ml-1">
                                      {notification.target}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                              <Clock className="w-3 h-3" />
                              <span>{notification.timestamp}</span>
                            </div>

                            {/* Order Info */}
                            {notification.orderInfo && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 mb-3 shadow-sm"
                              >
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-gray-900">
                                    Commande {notification.orderInfo.number}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {notification.orderInfo.table}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredNotifications.length > 0 && (
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <Button
                  variant="ghost"
                  className="w-full text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => setNotifications([])}
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archiver toutes les notifications
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
