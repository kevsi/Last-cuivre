import React, { useState } from "react";
import { ChevronDown, Calendar, Filter, Search } from "lucide-react";

interface ManagerOrdersFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const ManagerOrdersFilters: React.FC<ManagerOrdersFiltersProps> = ({
  searchQuery,
  onSearchChange,
  timeFilter,
  onTimeFilterChange,
  dateFilter,
  onDateFilterChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const timeRanges = [
    { value: "", label: "Toutes les heures" },
    { value: "morning", label: "Matin (06h-12h)" },
    { value: "afternoon", label: "Après-midi (12h-18h)" },
    { value: "evening", label: "Soir (18h-00h)" },
    { value: "night", label: "Nuit (00h-06h)" },
  ];

  const statusOptions = [
    { value: "", label: "Tous les statuts" },
    { value: "nouvelle", label: "Nouvelle" },
    { value: "validee", label: "Validée" },
    { value: "servie", label: "Servie" },
    { value: "annulee", label: "Annulée" },
  ];

  const getCurrentTimeLabel = () => {
    const time = timeRanges.find((range) => range.value === timeFilter);
    return time ? time.label : "Heure";
  };

  const getCurrentStatusLabel = () => {
    const status = statusOptions.find(
      (option) => option.value === statusFilter,
    );
    return status ? status.label : "Statut";
  };

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 lg:p-6">
      {/* Mobile: Stack filters vertically */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Filter buttons row */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          {/* Time Filter */}
          <div className="relative">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 font-inter text-xs lg:text-sm">
                {getCurrentTimeLabel()}
              </div>
              <button
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="ml-2 bg-gray-100 border border-gray-300 rounded-lg p-2 lg:p-3 shadow-sm hover:bg-gray-200 transition-colors"
              >
                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
              </button>
            </div>

            {showTimeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => {
                      onTimeFilterChange(range.value);
                      setShowTimeDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      timeFilter === range.value
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

          {/* Date Filter */}
          <div className="flex items-center">
            <div className="bg-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 font-inter text-xs lg:text-sm">
              Date
            </div>
            <button className="ml-2 bg-gray-100 border border-gray-300 rounded-lg p-2 lg:p-3 shadow-sm hover:bg-gray-200 transition-colors">
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
            </button>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 font-inter text-xs lg:text-sm">
                {getCurrentStatusLabel()}
              </div>
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="ml-2 bg-gray-100 border border-gray-300 rounded-lg p-2 lg:p-3 shadow-sm hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
              </button>
            </div>

            {showStatusDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onStatusFilterChange(option.value);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      statusFilter === option.value
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 lg:px-4 lg:py-3 shadow-sm focus-within:border-dashboard-yellow focus-within:ring-2 focus-within:ring-dashboard-yellow/20 transition-all">
            <Search className="w-4 h-4 lg:w-5 lg:h-5 text-black mr-2 lg:mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Rechercher par numéro de commande, table, article, serveur"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 outline-none text-black font-inter text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Advanced Search - Hide on small screens */}
        <div className="hidden lg:flex items-center min-w-0 lg:max-w-md">
          <div className="bg-gray-300 rounded-lg px-4 py-3 font-inter text-sm flex-1 min-w-0">
            <span className="truncate">
              Entrez juste une phrase pour une recherche efficace
            </span>
          </div>
          <button className="ml-2 bg-gray-100 border border-gray-300 rounded-lg p-3 shadow-sm hover:bg-gray-200 transition-colors">
            <Search className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
