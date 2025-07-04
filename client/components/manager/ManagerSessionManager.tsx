import React, { useEffect, useRef } from "react";
import { useManagerLogout } from "@/hooks/use-manager-logout";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Composant de gestion de session pour les managers
 * - Auto-déconnexion après inactivité
 * - Surveillance de l'activité
 * - Nettoyage automatique
 */
export function ManagerSessionManager() {
  const { user, isAuthenticated } = useAuth();
  const { handleQuickLogout } = useManagerLogout();
  const lastActivityRef = useRef<number>(Date.now());
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Timeout d'inactivité pour managers (20 minutes)
  const MANAGER_TIMEOUT = 20 * 60 * 1000;

  const updateActivity = () => {
    lastActivityRef.current = Date.now();
    localStorage.setItem(
      "managerLastActivity",
      lastActivityRef.current.toString(),
    );
  };

  const checkInactivity = () => {
    const now = Date.now();
    const lastActivity = lastActivityRef.current;
    const timeSinceActivity = now - lastActivity;

    if (timeSinceActivity >= MANAGER_TIMEOUT) {
      // Session expirée
      handleQuickLogout();
    }
  };

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      checkInactivity();
    }, MANAGER_TIMEOUT);
  };

  useEffect(() => {
    // Uniquement pour les managers authentifiés
    if (
      !isAuthenticated ||
      (user?.role !== "manager" && user?.role !== "owner")
    ) {
      return;
    }

    // Récupérer la dernière activité du localStorage
    const savedActivity = localStorage.getItem("managerLastActivity");
    if (savedActivity) {
      lastActivityRef.current = parseInt(savedActivity);
    }

    // Événements à surveiller pour l'activité
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = () => {
      updateActivity();
      resetInactivityTimer();
    };

    // Ajouter les listeners
    activityEvents.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    // Démarrer le timer
    resetInactivityTimer();

    // Vérification initiale
    checkInactivity();

    // Nettoyage
    return () => {
      activityEvents.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [isAuthenticated, user?.role]);

  // Ce composant ne rend rien visuellement
  return null;
}
