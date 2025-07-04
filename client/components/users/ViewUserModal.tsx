import { User } from "@/pages/Users";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon, Mail, Phone, Calendar } from "lucide-react";

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function ViewUserModal({ isOpen, onClose, user }: ViewUserModalProps) {
  if (!user) return null;

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "Manager":
        return "bg-purple-100 text-purple-800";
      case "Serveur":
        return "bg-blue-100 text-blue-800";
      case "Cuisinier":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="w-5 h-5" />
            Détails de l'utilisateur
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Avatar et nom */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-dashboard-yellow rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user.prenoms.charAt(0)}
                {user.nom.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {user.prenoms} {user.nom}
              </h3>
              <Badge className={getRoleColor(user.role)}>
                {user.role || "Utilisateur"}
              </Badge>
            </div>
          </div>

          {/* Informations */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium">{user.telephone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Âge</p>
                <p className="font-medium">{user.age} ans</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
