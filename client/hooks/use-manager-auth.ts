import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * Hook spécialisé pour l'authentification des managers
 * Redirige automatiquement les utilisateurs non-managers vers leur interface appropriée
 */
export function useManagerAuth() {
  const { user, isAuthenticated, isManager, isOwner } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Si l'utilisateur n'est ni manager ni owner, rediriger vers son interface
    if (!isManager && !isOwner) {
      if (user?.role === "employee") {
        navigate("/new-order");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, isManager, isOwner, user?.role, navigate]);

  return {
    user,
    isAuthenticated,
    isManager,
    isOwner,
    canAccessManagerFeatures: isManager || isOwner,
  };
}
