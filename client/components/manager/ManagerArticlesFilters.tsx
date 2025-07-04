import React, { useState } from "react";
import { ChevronDown, Search, Calendar, Filter } from "lucide-react";
import { useResponsive } from "@/hooks/use-responsive";

interface ManagerArticlesFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  priceFilter: string;
  onPriceFilterChange: (value: string) => void;
  onNewArticleClick: () => void;
}

export const ManagerArticlesFilters: React.FC<ManagerArticlesFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceFilter,
  onPriceFilterChange,
  onNewArticleClick,
}) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const categories = [
    { value: "", label: "Toutes catégories" },
    { value: "cocktail", label: "Cocktails" },
    { value: "bieres", label: "Bières" },
    { value: "vins", label: "Vins" },
    { value: "spiritueux", label: "Spiritueux" },
    { value: "soft", label: "Soft Drinks" },
  ];

  const priceRanges = [
    { value: "", label: "Tous les prix" },
    { value: "0-1000", label: "0 - 1000 FCFA" },
    { value: "1000-3000", label: "1000 - 3000 FCFA" },
    { value: "3000-5000", label: "3000 - 5000 FCFA" },
    { value: "5000+", label: "5000+ FCFA" },
  ];

  const getCurrentCategoryLabel = () => {
    const category = categories.find((cat) => cat.value === selectedCategory);
    return category ? category.label : "Catégorie";
  };

  const getCurrentPriceLabel = () => {
    const price = priceRanges.find((range) => range.value === priceFilter);
    return price ? price.label : "Prix";
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded p-2">
      <div className="flex items-center gap-2">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="flex items-center gap-1 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>{getCurrentCategoryLabel()}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {showCategoryDropdown && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-300 rounded shadow-lg z-10">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    onCategoryChange(category.value);
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors first:rounded-t last:rounded-b ${
                    selectedCategory === category.value
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Noms Input */}
        <div className="flex-1 max-w-32">
          <input
            type="text"
            placeholder="Noms"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-base md:text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-dashboard-yellow focus:ring-2 focus:ring-dashboard-yellow/20"
          />
        </div>

        {/* Prix Button */}
        <div className="relative">
          <button
            onClick={() => setShowPriceDropdown(!showPriceDropdown)}
            className="flex items-center gap-1 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-3 h-3" />
            <span>Prix</span>
          </button>

          {showPriceDropdown && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-300 rounded shadow-lg z-10">
              {priceRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => {
                    onPriceFilterChange(range.value);
                    setShowPriceDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors first:rounded-t last:rounded-b ${
                    priceFilter === range.value
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Icon Button */}
        <button className="bg-white border border-gray-300 rounded p-1.5 text-gray-700 hover:bg-gray-50 transition-colors">
          <Filter className="w-3 h-3" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-64">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, prix"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded pl-8 pr-3 py-2 text-base md:text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-dashboard-yellow focus:ring-2 focus:ring-dashboard-yellow/20"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={onNewArticleClick}
          className="bg-dashboard-yellow text-white px-4 py-2 rounded text-base md:text-sm font-medium hover:bg-dashboard-yellow/90 transition-colors whitespace-nowrap"
        >
          Nouvel article
        </button>
      </div>
    </div>
  );
};
