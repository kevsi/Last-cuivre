import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLogout } from "@/hooks/use-logout";
import { toast } from "@/components/ui/use-toast";

const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before logout

export function SessionManager() {
  const { isAuthenticated, user } = useAuth();
  const { handleLogout } = useLogout();
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const warningTimeoutRef = useRef<NodeJS.Timeout>();
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = () => {
    if (!isAuthenticated) return;

    lastActivityRef.current = Date.now();

    // Clear existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);

    setShowWarning(false);

    // Set warning timeout
    warningTimeoutRef.current = setTimeout(() => {
      setShowWarning(true);
      toast({
        title: "Session expirée bientôt",
        description:
          "Votre session expirera dans 5 minutes. Cliquez quelque part pour rester connecté.",
        duration: 10000,
        variant: "destructive",
      });
    }, IDLE_TIMEOUT - WARNING_TIME);

    // Set logout timeout
    timeoutRef.current = setTimeout(() => {
      toast({
        title: "Session expirée",
        description: "Vous avez été déconnecté pour inactivité.",
        variant: "destructive",
      });
      handleLogout();
    }, IDLE_TIMEOUT);
  };

  const handleActivity = () => {
    if (showWarning) {
      toast({
        title: "Session prolongée",
        description: "Votre session a été prolongée avec succès.",
      });
    }
    resetTimer();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // Clear timeouts when not authenticated
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      setShowWarning(false);
      return;
    }

    // Initial timer setup
    resetTimer();

    // Activity listeners
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      // Cleanup
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    };
  }, [isAuthenticated, showWarning]);

  // Auto-save user activity (could be extended to save work)
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const saveActivity = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
      localStorage.setItem("activeUser", JSON.stringify(user));
    };

    const interval = setInterval(saveActivity, 60000); // Save every minute

    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  return null; // This component doesn't render anything
}
