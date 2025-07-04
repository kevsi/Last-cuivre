import { useState } from "react";
import { User } from "@/pages/Users";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onConfirm: (userId: string) => void;
}

export function DeleteUserModal({
  isOpen,
  onClose,
  user,
  onConfirm,
}: DeleteUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (user) {
      setIsLoading(true);

      try {
        // Simuler un délai API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        onConfirm(user.id);
        onClose();
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Confirmer la suppression
          </DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Êtes-vous sûr de vouloir supprimer
            cet utilisateur ?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informations utilisateur */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-dashboard-yellow rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.prenoms.charAt(0)}
                  {user.nom.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">
                  {user.prenoms} {user.nom}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
