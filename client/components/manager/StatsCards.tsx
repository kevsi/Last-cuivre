import React from "react";

export const StatsCards: React.FC = () => {
  const stats = [
    {
      title: "Total des articles",
      value: "140",
      change: "+12% ce mois",
      bgColor: "bg-white",
      icon: "📦",
    },
    {
      title: "Chiffres d'affaires",
      value: "20000F",
      change: "+12% ce mois",
      bgColor: "bg-yellow-100",
      icon: "💰",
    },
    {
      title: "Commandes Totales",
      value: "8",
      change: "+12% ce mois",
      bgColor: "bg-orange-100",
      icon: "📋",
    },
    {
      title: "Commandes validées",
      value: "8",
      change: "+12% ce mois",
      bgColor: "bg-green-100",
      icon: "✅",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-lg lg:rounded-xl xl:rounded-2xl p-2 sm:p-3 lg:p-4 xl:p-6 shadow-sm lg:shadow-lg border border-gray-100 min-w-0`}
        >
          <div className="flex justify-between items-start mb-2 sm:mb-3 lg:mb-4 xl:mb-6 min-w-0">
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-xs sm:text-xs lg:text-sm text-blue-800 font-medium mb-1 sm:mb-2 font-inter truncate">
                {stat.title}
              </p>
              <p className="text-sm sm:text-base lg:text-lg xl:text-2xl font-bold text-blue-900 font-inter truncate">
                {stat.value}
              </p>
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-12 xl:h-12 bg-blue-500 rounded-lg lg:rounded-xl flex items-center justify-center shadow-sm lg:shadow-lg flex-shrink-0">
              <img
                src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${
                  index === 0
                    ? "43165c6e0e3250266d078c20ac3360f4ac478b1d"
                    : index === 1
                      ? "2247bd9c4918a687d8e636235940db9b4d0beb6b"
                      : index === 2
                        ? "94ae10b6fc688dfe90ebf200984ac2f1fb30b27f"
                        : "963b37f6e422c12cd94034b574c299f9a223cf50"
                }?width=40`}
                alt={stat.title}
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5"
              />
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 overflow-hidden">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <span className="text-xs text-blue-800 font-medium font-inter truncate min-w-0">
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
