import React, { useState } from "react";
import { ChevronDown, Calendar, Filter, Search } from "lucide-react";

interface OrdersFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const OrdersFilters: React.FC<OrdersFiltersProps> = ({
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
    { value: "pending", label: "En attente" },
    { value: "validated", label: "Validée" },
    { value: "served", label: "Servie" },
    { value: "cancelled", label: "Annulée" },
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
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 shadow-sm">
      {/* Mobile: Stack filters vertically */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Filter buttons row */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          {/* Time Filter */}
          <div className="relative">
            <div className="flex items-center">
              <div className="bg-dashboard-yellow/10 border border-dashboard-yellow/30 rounded-lg px-4 py-3 font-inter text-base md:text-sm font-medium text-dashboard-dark h-12">
                {getCurrentTimeLabel()}
              </div>
              <button
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="ml-2 bg-dashboard-yellow text-white border border-dashboard-yellow rounded-lg p-3 shadow-sm hover:bg-dashboard-yellow/90 transition-all h-12 w-12 flex items-center justify-center"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {showTimeDropdown && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-10 backdrop-blur-sm">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => {
                      onTimeFilterChange(range.value);
                      setShowTimeDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-dashboard-yellow/10 transition-all first:rounded-t-xl last:rounded-b-xl ${
                      timeFilter === range.value
                        ? "bg-dashboard-yellow/20 text-dashboard-dark border-l-4 border-dashboard-yellow"
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 font-inter text-base md:text-sm font-medium text-blue-700 h-12 flex items-center">
              Date
            </div>
            <button className="ml-2 bg-blue-500 text-white border border-blue-500 rounded-lg p-3 shadow-sm hover:bg-blue-600 transition-all h-12 w-12 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </button>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="flex items-center">
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 font-inter text-base md:text-sm font-medium text-green-700 h-12 flex items-center">
                {getCurrentStatusLabel()}
              </div>
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="ml-2 bg-green-500 text-white border border-green-500 rounded-lg p-3 shadow-sm hover:bg-green-600 transition-all h-12 w-12 flex items-center justify-center"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {showStatusDropdown && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-10 backdrop-blur-sm">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onStatusFilterChange(option.value);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-green-50 transition-all first:rounded-t-xl last:rounded-b-xl ${
                      statusFilter === option.value
                        ? "bg-green-50 text-green-700 border-l-4 border-green-500"
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
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 shadow-sm focus-within:bg-white focus-within:border-dashboard-yellow focus-within:ring-2 focus-within:ring-dashboard-yellow/20 transition-all h-12">
            <Search className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Rechercher par numéro, table, article..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 outline-none text-dashboard-dark font-inter text-base md:text-sm bg-transparent placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
