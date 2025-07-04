import { LogOut, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  userName = "Utilisateur",
}: LogoutConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Confirmation de déconnexion
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Êtes-vous sûr de vouloir vous déconnecter ?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-700">
            <span className="font-medium">{userName}</span>, vous serez redirigé
            vers la page de connexion.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Toutes vos données seront sauvegardées automatiquement.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="flex-1 gap-2"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
