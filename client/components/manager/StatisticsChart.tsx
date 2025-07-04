import React from "react";

export const StatisticsChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg lg:rounded-xl xl:rounded-2xl shadow-sm lg:shadow-lg p-2 sm:p-3 lg:p-4 xl:p-6 h-48 sm:h-56 lg:h-64 xl:h-96 min-w-0">
      <div className="mb-2 sm:mb-3 lg:mb-4 xl:mb-6">
        <h3 className="text-sm sm:text-base lg:text-lg xl:text-2xl font-medium text-gray-700 font-inter mb-1 sm:mb-2 truncate">
          Statistics
        </h3>
        <p className="text-xs sm:text-xs lg:text-sm text-gray-400 font-inter truncate">
          Suivez les statistiques de votre boite
        </p>
      </div>

      <div className="mb-2 sm:mb-3 lg:mb-4 xl:mb-6">
        <h4 className="text-sm sm:text-sm lg:text-base xl:text-lg font-medium text-gray-600 font-inter mb-2 sm:mb-3 lg:mb-4 truncate">
          Suivi des ventes
        </h4>

        {/* Filter buttons */}
        <div className="flex gap-1 sm:gap-2 lg:gap-3 xl:gap-4 mb-2 sm:mb-3 lg:mb-4 xl:mb-6 overflow-x-auto scrollbar-hide">
          <button className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 text-xs sm:text-xs lg:text-sm font-bold text-black bg-gray-200 rounded-lg border border-gray-300 whitespace-nowrap">
            Par produit
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 text-xs sm:text-xs lg:text-sm font-bold text-black hover:bg-gray-100 rounded-lg whitespace-nowrap">
            Par serveur
          </button>
          <button className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 text-xs sm:text-xs lg:text-sm font-bold text-black hover:bg-gray-100 rounded-lg whitespace-nowrap">
            Par période
          </button>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="relative h-24 sm:h-28 lg:h-32 xl:h-48 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1552eb337f4371ede038834440b46f6453b3049c?width=1380"
          alt="Sales Chart"
          className="w-full h-full object-contain"
        />

        {/* Value indicator */}
        <div className="absolute top-1 sm:top-2 lg:top-3 xl:top-4 left-1/2 transform -translate-x-1/2 bg-gray-200 border border-gray-300 rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-2 text-xs sm:text-xs lg:text-sm text-gray-600">
          50000F
        </div>
      </div>

      {/* Y-axis labels */}
      <div className="flex justify-between text-xs text-gray-400 mt-1 sm:mt-2">
        <span>Jan</span>
        <span>Fab</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Set</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
    </div>
  );
};
