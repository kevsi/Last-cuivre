import { Info } from "lucide-react";

export function FallbackBanner() {
  const useFallback = import.meta.env.VITE_USE_FALLBACK === "true";

  if (!useFallback) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Info className="h-4 w-4 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-xs text-yellow-700">
            <strong>Mode développement</strong> - L'application utilise des
            données de test.
          </p>
        </div>
      </div>
    </div>
  );
}
