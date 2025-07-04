import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemType: string; // e.g., "commande", "article", "utilisateur"
  itemName: string; // e.g., "Commande C001", "Article Café"
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemType,
  itemName,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b border-red-100">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Confirmer la suppression
              </h2>
              <p className="text-sm text-gray-600">
                Cette action est irréversible
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed mb-6">
            Êtes-vous sûr de vouloir supprimer{" "}
            <span className="font-semibold text-gray-900">{itemName}</span> ?
            <br />
            <br />
            Cette {itemType} sera définitivement supprimée et ne pourra pas être
            récupérée.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-amber-800 mb-1">Attention</p>
                <p className="text-amber-700">
                  {itemType === "commande"
                    ? "La suppression de cette commande affectera les statistiques et l'historique."
                    : itemType === "article"
                      ? "Cet article sera retiré du menu et des commandes en cours."
                      : "Les données associées à cet utilisateur seront perdues."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="px-6"
            >
              Annuler
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-6 bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Suppression...
                </div>
              ) : (
                "Supprimer définitivement"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
