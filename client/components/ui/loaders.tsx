import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Loader de base avec spinner
export function Spinner({
  className,
  size = "default",
}: {
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <Loader2
      className={cn(
        "animate-spin text-dashboard-yellow",
        sizeClasses[size],
        className,
      )}
    />
  );
}

// Skeleton loader pour les cartes d'articles
export function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-24 bg-gray-200 rounded-md mb-2"></div>

      {/* Content placeholders */}
      <div className="flex items-end justify-between gap-1.5">
        <div className="flex-1">
          <div className="h-3 bg-gray-200 rounded mb-1 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded-md flex-shrink-0"></div>
      </div>
    </div>
  );
}

// Grid de skeletons pour les articles
export function ArticlesGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
      {Array.from({ length: count }, (_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Skeleton pour les lignes de tableau
export function TableRowSkeleton() {
  return (
    <div className="bg-white rounded border border-gray-200 p-3 shadow-sm animate-pulse">
      <div className="lg:hidden space-y-2">
        {/* Mobile layout skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-4 bg-gray-200 rounded"></div>
            <div className="w-12 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex justify-between">
          <div className="w-20 h-3 bg-gray-200 rounded"></div>
          <div className="w-20 h-3 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-24 h-6 bg-gray-200 rounded"></div>
          <div className="flex gap-1">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Desktop layout skeleton */}
      <div className="hidden lg:grid lg:grid-cols-6 gap-4 items-center">
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
        <div className="w-12 h-4 bg-gray-200 rounded"></div>
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
        <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
        <div className="flex gap-2 justify-center">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Skeleton pour une table complète
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 p-3 space-y-2">
        {Array.from({ length: rows }, (_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// Loader pour les statistiques
export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="w-16 h-8 bg-gray-200 rounded mb-1"></div>
      <div className="w-24 h-3 bg-gray-200 rounded"></div>
    </div>
  );
}

// Grid de stats skeletons
export function StatsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Loader de page complet avec message
export function PageLoader({
  message = "Chargement...",
  className,
  size = "default",
}: {
  message?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className,
      )}
    >
      <Spinner size={size} className="mb-4" />
      <p className="text-gray-600 text-sm md:text-base">{message}</p>
    </div>
  );
}

// Loader pour les filtres
export function FiltersSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm animate-pulse">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-32 h-12 bg-gray-200 rounded"></div>
          <div className="w-20 h-12 bg-gray-200 rounded"></div>
          <div className="w-28 h-12 bg-gray-200 rounded"></div>
        </div>
        <div className="flex-1">
          <div className="w-full h-12 bg-gray-200 rounded"></div>
        </div>
        <div className="w-32 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

// Loader inline pour les boutons
export function ButtonLoader({ className }: { className?: string }) {
  return <Spinner size="sm" className={cn("mr-2", className)} />;
}
