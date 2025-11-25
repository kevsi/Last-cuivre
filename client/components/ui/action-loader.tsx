import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionLoaderProps {
  isLoading: boolean;
  text?: string;
  variant?: "default" | "overlay" | "inline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ActionLoader({
  isLoading,
  text = "Chargement...",
  variant = "default",
  size = "md",
  className,
}: ActionLoaderProps) {
  if (!isLoading) return null;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  if (variant === "overlay") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
          <Loader2
            className={cn(
              sizeClasses[size],
              "animate-spin text-dashboard-yellow",
            )}
          />
          <p className={cn(textSizeClasses[size], "text-gray-700 font-medium")}>
            {text}
          </p>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Loader2
          className={cn(
            sizeClasses[size],
            "animate-spin text-dashboard-yellow",
          )}
        />
        <span className={cn(textSizeClasses[size], "text-gray-700")}>
          {text}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 space-y-4",
        className,
      )}
    >
      <Loader2
        className={cn(sizeClasses[size], "animate-spin text-dashboard-yellow")}
      />
      <p
        className={cn(
          textSizeClasses[size],
          "text-gray-700 font-medium text-center",
        )}
      >
        {text}
      </p>
    </div>
  );
}
