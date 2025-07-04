import React, { useState } from "react";
import { Bell, User, LogOut, ChevronDown, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNotificationContext } from "@/main";
import { useAuth } from "@/contexts/AuthContext";
import { useManagerLogout } from "@/hooks/use-manager-logout";
import { UsersModal } from "@/components/users/UsersModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ManagerHeaderProps {
  leftAction?: React.ReactNode;
}

export const ManagerHeader: React.FC<ManagerHeaderProps> = ({ leftAction }) => {
  const { showNotifications, setShowNotifications } = useNotificationContext();
  const { user, isOwner } = useAuth();
  const { handleManagerLogout } = useManagerLogout();
  const [showUsersModal, setShowUsersModal] = useState(false);

  const getUserInitials = () => {
    if (!user) return "M";
    return `${user.prenoms.charAt(0)}${user.nom.charAt(0)}`.toUpperCase();
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="bg-dashboard-gray border-b border-gray-100 p-2 sm:p-3">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 sm:gap-3 lg:gap-2 lg:justify-between">
        {/* Mobile layout: Toggle + Greeting */}
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto flex-shrink-0">
          {leftAction}
          <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark font-poppins truncate">
            Hello, {user?.prenoms || "Manager"}
          </h1>
        </div>

        {/* Right Actions - Larger buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Notifications - Larger button */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNotificationClick}
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors border-gray-200"
            >
              <Bell className="w-5 h-5 text-dashboard-dark" />
            </Button>
            {/* Notification dot */}
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-dashboard-yellow rounded-full"></div>
          </div>

          {/* Profile Dropdown - Larger */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10 px-3 bg-white rounded-lg border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Avatar className="w-6 h-6 rounded-md">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="rounded-md text-xs bg-dashboard-yellow text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-dashboard-dark" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user ? `${user.prenoms} ${user.nom}` : "Manager"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "manager@restaurant.com"}
                  </p>
                  <p className="text-xs leading-none text-dashboard-yellow font-semibold">
                    {user?.role === "owner"
                      ? "Supa Admin"
                      : user?.role === "manager"
                        ? "Manager"
                        : "Employé"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleManagerLogout}
                className="text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
