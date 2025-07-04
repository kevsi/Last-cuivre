import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SavingAnimationProps {
  isVisible: boolean;
  message: string;
  successMessage?: string;
  onComplete?: () => void;
  duration?: number;
  className?: string;
}

export function SavingAnimation({
  isVisible,
  message,
  successMessage,
  onComplete,
  duration = 2000,
  className,
}: SavingAnimationProps) {
  const [stage, setStage] = useState<"loading" | "success" | "hidden">(
    "hidden",
  );

  useEffect(() => {
    if (isVisible) {
      setStage("loading");

      const timer = setTimeout(() => {
        setStage("success");

        const successTimer = setTimeout(() => {
          setStage("hidden");
          onComplete?.();
        }, 1000);

        return () => clearTimeout(successTimer);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setStage("hidden");
    }
  }, [isVisible, duration, onComplete]);

  if (stage === "hidden") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm",
        "animate-in fade-in-0 duration-300",
        className,
      )}
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl min-w-[300px] max-w-md mx-4">
        <div className="flex flex-col items-center text-center space-y-4">
          {stage === "loading" && (
            <>
              <div className="relative">
                <Loader2 className="w-12 h-12 text-dashboard-yellow animate-spin" />
                <div className="absolute inset-0 rounded-full border-2 border-dashboard-yellow/20"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-dashboard-dark font-poppins">
                  Enregistrement...
                </h3>
                <p className="text-dashboard-muted text-sm">{message}</p>
              </div>
            </>
          )}

          {stage === "success" && (
            <>
              <div className="relative">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-500">
                  <CheckCircle className="w-8 h-8 text-green-600 animate-in zoom-in-50 duration-300 delay-200" />
                </div>
              </div>
              <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-300 delay-300">
                <h3 className="text-lg font-semibold text-green-700 font-poppins">
                  Succès !
                </h3>
                <p className="text-dashboard-muted text-sm">
                  {successMessage ||
                    "L'enregistrement a été effectué avec succès"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
