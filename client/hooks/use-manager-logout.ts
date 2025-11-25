import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

/**
 * Hook spécialisé pour la déconnexion des managers
 * Gère la déconnexion avec nettoyage spécifique de l'environnement manager
 */
export function useManagerLogout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleManagerLogout = async () => {
    setIsLoggingOut(true);

    try {
      const userName = user ? `${user.prenoms} ${user.nom}` : "Manager";

      // Simuler un délai de nettoyage sécurisé
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Nettoyage spécifique à l'environnement manager
      localStorage.removeItem("managerSession");
      localStorage.removeItem("managerActiveView");
      localStorage.removeItem("managerLastActivity");

      // Nettoyage général
      localStorage.clear();
      sessionStorage.clear();

      // Appel de la déconnexion du contexte auth
      logout();

      // Toast spécialisé pour managers
      toast({
        title: "Session Manager fermée",
        description: `Au revoir ${user?.prenoms || "Manager"}! Votre session a été fermée en sécurité.`,
        duration: 3000,
      });

      // Navigation vers login avec remplacement de l'historique
      setTimeout(() => {
        navigate("/login", { replace: true });
        setIsLoggingOut(false);
      }, 500);
    } catch (error) {
      setIsLoggingOut(false);
      toast({
        title: "Erreur de déconnexion",
        description:
          "Une erreur s'est produite lors de la fermeture de session",
        variant: "destructive",
      });
    }
  };

  const handleQuickLogout = () => {
    // Déconnexion rapide sans toast (pour les timeouts automatiques)
    localStorage.clear();
    sessionStorage.clear();
    logout();
    navigate("/login", { replace: true });
  };

  return {
    handleManagerLogout,
    handleQuickLogout,
    isLoggingOut,
    isManager: user?.role === "manager" || user?.role === "owner",
  };
}
