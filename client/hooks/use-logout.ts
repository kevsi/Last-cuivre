import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export function useLogout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const userName = user ? `${user.prenoms} ${user.nom}` : "Utilisateur";

    // Clear any stored data
    localStorage.clear();
    sessionStorage.clear();

    // Call auth logout
    logout();

    // Show confirmation toast
    toast({
      title: "Déconnexion réussie",
      description: `Au revoir ${user?.prenoms || ""}! À bientôt.`,
      duration: 3000,
    });

    // Navigate to login with a slight delay to show the toast
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 500);
  };

  return { handleLogout };
}
