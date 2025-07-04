import { Search, Calendar, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type SortBy = "name" | "price-asc" | "price-desc";
type PriceRange = "all" | "0-3000" | "3000-5000" | "5000+";

interface MenuFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortBy;
  onSortByChange: (sortBy: SortBy) => void;
  priceRange: PriceRange;
  onPriceRangeChange: (priceRange: PriceRange) => void;
}

interface MenuFiltersState {
  sortBy: SortBy;
  priceRange: PriceRange;
}

const categories = [
  { value: "all", label: "Toutes les catégories" },
  { value: "champagne", label: "Champagne" },
  { value: "cocktails", label: "Cocktails" },
  { value: "bières", label: "Bières" },
  { value: "vins", label: "Vins" },
  { value: "sodas", label: "Sodas" },
];

const sortOptions = [
  { value: "name" as SortBy, label: "Par nom (A-Z)" },
  { value: "price-asc" as SortBy, label: "Prix croissant" },
  { value: "price-desc" as SortBy, label: "Prix décroissant" },
];

const priceRanges = [
  { value: "all" as PriceRange, label: "Tous les prix" },
  { value: "0-3000" as PriceRange, label: "0 - 3,000F" },
  { value: "3000-5000" as PriceRange, label: "3,000 - 5,000F" },
  { value: "5000+" as PriceRange, label: "5,000F+" },
];

export function MenuFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortByChange,
  priceRange,
  onPriceRangeChange,
}: MenuFiltersProps) {
  const currentCategory = categories.find(
    (cat) => cat.value === selectedCategory,
  );
  const currentSort = sortOptions.find((sort) => sort.value === sortBy);
  const currentPriceRange = priceRanges.find(
    (range) => range.value === priceRange,
  );

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 lg:p-6">
      {/* Mobile: Stacked layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-4">
        {/* Filter buttons row */}
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-300 border-0 text-black font-inter text-xs lg:text-sm"
                >
                  {currentCategory?.label || "Catégorie"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-slate-50 border-gray-300 shadow-sm h-8 w-8 lg:h-10 lg:w-10"
                >
                  <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.value}
                  onClick={() => onCategoryChange(category.value)}
                  className={
                    selectedCategory === category.value ? "bg-gray-100" : ""
                  }
                >
                  {category.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-300 border-0 text-black font-inter text-xs lg:text-sm"
                >
                  {currentSort?.label || "Tri"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-slate-50 border-gray-300 shadow-sm h-8 w-8 lg:h-10 lg:w-10"
                >
                  <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onSortByChange(option.value)}
                  className={sortBy === option.value ? "bg-gray-100" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-300 border-0 text-black font-inter text-xs lg:text-sm"
                >
                  {currentPriceRange?.label || "Prix"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-slate-50 border-gray-300 shadow-sm h-8 w-8 lg:h-10 lg:w-10"
                >
                  <Filter className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {priceRanges.map((range) => (
                <DropdownMenuItem
                  key={range.value}
                  onClick={() => onPriceRangeChange(range.value)}
                  className={priceRange === range.value ? "bg-gray-100" : ""}
                >
                  {range.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-black" />
            <Input
              placeholder="Rechercher par nom, prix"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 lg:pl-12 bg-white border-gray-300 shadow-sm font-inter text-sm lg:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
