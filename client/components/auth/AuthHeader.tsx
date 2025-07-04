import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Crown, Shield, Users } from "lucide-react";

export function AuthHeader() {
  const { user, logout, isOwner } = useAuth();

  if (!user) return null;

  const getRoleIcon = () => {
    switch (user.role) {
      case "owner":
        return <Crown className="w-4 h-4" />;
      case "manager":
        return <Shield className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getRoleColor = () => {
    switch (user.role) {
      case "owner":
        return "bg-yellow-100 text-yellow-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = () => {
    switch (user.role) {
      case "owner":
        return "Propriétaire";
      case "manager":
        return "Manager";
      default:
        return "Employé";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">Connecté en tant que:</span>
        <Badge className={`${getRoleColor()} flex items-center gap-1`}>
          {getRoleIcon()}
          {getRoleLabel()}
        </Badge>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <User className="w-4 h-4" />
            {user.prenoms} {user.nom}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5 text-sm">
            <div className="font-medium">
              {user.prenoms} {user.nom}
            </div>
            <div className="text-gray-500">{user.email}</div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-red-600 gap-2">
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
