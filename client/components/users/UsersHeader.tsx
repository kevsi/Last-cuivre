import { Search, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNotificationContext } from "@/main";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UsersHeader() {
  const { showNotifications, setShowNotifications } = useNotificationContext();
  const { user } = useAuth();

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="bg-dashboard-gray border-b border-gray-100 p-2 sm:p-3">
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-3 lg:gap-2 lg:justify-between">
        {/* Mobile layout: Title */}
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto flex-shrink-0">
          <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark font-poppins truncate">
            Gestion des utilisateurs
          </h1>
        </div>

        {/* Search Bar - Agrandie */}
        <div className="flex-1 w-full lg:max-w-2xl lg:mx-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-dashboard-yellow z-10" />
            <Input
              placeholder="Rechercher un utilisateur..."
              className="pl-8 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 h-9 sm:h-10 bg-white border-0 rounded-lg text-sm sm:text-base placeholder:text-dashboard-muted font-poppins shadow-sm"
            />
          </div>
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

          {/* Authentication Header */}
          <AuthHeader />
        </div>
      </div>
    </header>
  );
}
