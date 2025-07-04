import { toast } from "@/hooks/use-toast";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationConfig {
  title: string;
  description?: string;
  type: NotificationType;
  duration?: number;
}

export const useNotifications = () => {
  const showNotification = ({
    title,
    description,
    type,
    duration = 3000,
  }: NotificationConfig) => {
    const variant = type === "error" ? "destructive" : "default";

    toast({
      title,
      description,
      variant,
      duration,
    });
  };

  // Notifications spécifiques pour les actions courantes
  const notifications = {
    // Commandes
    orderCreated: (orderNumber: string) =>
      showNotification({
        title: "🎉 Commande enregistrée",
        description: `Commande ${orderNumber} transmise en cuisine`,
        type: "success",
      }),

    orderValidated: (orderNumber: string) =>
      showNotification({
        title: "✅ Commande confirmée",
        description: `Commande ${orderNumber} prise en charge`,
        type: "success",
      }),

    orderServed: (orderNumber: string) =>
      showNotification({
        title: "🍽️ Service terminé",
        description: `Commande ${orderNumber} servie à table`,
        type: "success",
      }),

    orderCancelled: (orderNumber: string) =>
      showNotification({
        title: "⚠️ Commande annulée",
        description: `Commande ${orderNumber} retirée du système`,
        type: "warning",
      }),

    orderDeleted: (orderNumber: string) =>
      showNotification({
        title: "🗑️ Commande supprimée",
        description: `Commande ${orderNumber} effacée définitivement`,
        type: "error",
      }),

    // Articles/Menu
    articleAdded: (articleName: string) =>
      showNotification({
        title: "🍽️ Article ajouté",
        description: `${articleName} ajouté à la commande`,
        type: "success",
        duration: 2500,
      }),

    articleRemoved: (articleName: string) =>
      showNotification({
        title: "🗑️ Article retiré",
        description: `${articleName} retiré de la commande`,
        type: "info",
        duration: 2500,
      }),

    articleAddedToMenu: (articleName: string) =>
      showNotification({
        title: "📋 Ajouté au menu",
        description: `${articleName} disponible en cuisine`,
        type: "success",
      }),

    articleCreated: (articleName: string) =>
      showNotification({
        title: "✨ Nouvel article créé",
        description: `${articleName} ajouté au catalogue`,
        type: "success",
      }),

    // Quantités
    quantityUpdated: (articleName: string, quantity: number) =>
      showNotification({
        title: "📊 Quantité ajustée",
        description: `${articleName} × ${quantity}`,
        type: "info",
        duration: 2000,
      }),

    // Gestion des tables
    tableNumberChanged: (oldTable: string, newTable: string) =>
      showNotification({
        title: "🪑 Table modifiée",
        description: `${oldTable} → ${newTable}`,
        type: "info",
        duration: 2500,
      }),

    // Recherche et filtres
    searchPerformed: (query: string, results: number) =>
      showNotification({
        title: "Recherche effectuée",
        description: `${results} résultat(s) trouvé(s) pour "${query}"`,
        type: "info",
        duration: 2000,
      }),

    filterApplied: (filterType: string, filterValue: string) =>
      showNotification({
        title: "Filtre appliqué",
        description: `${filterType}: ${filterValue}`,
        type: "info",
        duration: 2000,
      }),

    // Actions administratives
    dataExported: (type: string) =>
      showNotification({
        title: "Données exportées",
        description: `Export ${type} terminé avec succès`,
        type: "success",
      }),

    settingsSaved: () =>
      showNotification({
        title: "Paramètres sauvegardés",
        description: "Vos paramètres ont été enregistrés",
        type: "success",
      }),

    // Erreurs communes
    networkError: () =>
      showNotification({
        title: "Erreur de connexion",
        description: "Vérifiez votre connexion internet",
        type: "error",
      }),

    unauthorized: () =>
      showNotification({
        title: "Accès non autorisé",
        description: "Vous n'avez pas les droits pour cette action",
        type: "error",
      }),

    serverError: () =>
      showNotification({
        title: "Erreur serveur",
        description: "Une erreur est survenue. Veuillez réessayer",
        type: "error",
      }),

    // Actions génériques - désactivées pour éviter le spam
    actionSuccess: (action: string) => {
      // Notification désactivée pour éviter les notifications inutiles
      // console.log(`Action réussie: ${action}`);
    },

    actionError: (action: string, error?: string) =>
      showNotification({
        title: "Échec de l'action",
        description: error || `Impossible d'effectuer ${action}`,
        type: "error",
      }),

    // Sidebar et navigation - notifications désactivées
    sidebarToggled: (isOpen: boolean) => {
      // Notification désactivée pour éviter les notifications inutiles
      // console.log(`Menu ${isOpen ? "ouvert" : "fermé"}`);
    },
  };

  return {
    showNotification,
    notifications,
  };
};
