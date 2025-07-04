import { Search, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNotificationContext } from "@/main";
import { useAuth } from "@/contexts/AuthContext";
import { useLogout } from "@/hooks/use-logout";
import { UserProfileModal } from "@/components/ui/user-profile-modal";
import { NotificationCenter } from "@/components/ui/notification-center";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  leftAction?: React.ReactNode;
}

export function DashboardHeader({ leftAction }: DashboardHeaderProps) {
  const { showNotifications, setShowNotifications } = useNotificationContext();
  const { user } = useAuth();
  const { handleLogout } = useLogout();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const getUserDisplayName = () => {
    if (!user) return "Utilisateur";
    return `${user.prenoms} ${user.nom}`;
  };

  const getUserRole = () => {
    if (!user) return "Utilisateur";
    switch (user.role) {
      case "owner":
        return "Supa Admin";
      case "manager":
        return "Manager";
      case "employee":
        return "Employé";
      default:
        return "Utilisateur";
    }
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const firstInitial = user.prenoms.charAt(0).toUpperCase();
    const lastInitial = user.nom.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <header className="bg-dashboard-gray border-b border-gray-100 p-2 sm:p-3">
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-3 lg:gap-2 lg:justify-between">
        {/* Mobile layout: Toggle + Greeting */}
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto flex-shrink-0">
          {leftAction}
          <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark font-poppins truncate">
            Hello, {user?.prenoms || "Utilisateur"}
          </h1>
        </div>

        {/* Search Bar - Agrandie */}
        <div className="flex-1 w-full lg:max-w-2xl lg:mx-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-dashboard-yellow z-10" />
            <Input
              placeholder="What do you want eat today..."
              className="pl-8 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 h-9 sm:h-10 bg-white border-0 rounded-lg text-sm sm:text-base placeholder:text-dashboard-muted font-poppins shadow-sm"
            />
          </div>
        </div>

        {/* Right Actions - Larger buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Notifications Center */}
          <NotificationCenter />

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
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "email@restaurant.com"}
                  </p>
                  <p className="text-xs leading-none text-dashboard-yellow font-semibold">
                    {getUserRole()}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Profile Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </header>
  );
}
