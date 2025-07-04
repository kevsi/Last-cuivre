import { ClipboardList, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendColor: string;
  bgGradient: string;
  iconBg: string;
}

function StatCard({
  title,
  value,
  icon,
  trend,
  trendColor,
  bgGradient,
  iconBg,
}: StatCardProps) {
  return (
    <Card className={`${bgGradient} border-0 shadow-sm font-inter min-w-0`}>
      <CardContent className="p-2 sm:p-3 lg:p-4">
        <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4 min-w-0">
          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1 overflow-hidden">
            <p className="text-xs sm:text-xs lg:text-sm font-medium opacity-70 leading-3 sm:leading-4 tracking-wide truncate">
              {title}
            </p>
            <p className="text-sm sm:text-base lg:text-xl xl:text-2xl font-bold leading-4 sm:leading-5 lg:leading-6 truncate">
              {value}
            </p>
          </div>
          <div
            className={`p-1 sm:p-1.5 lg:p-2 xl:p-2.5 rounded-lg lg:rounded-xl ${iconBg} shadow-sm flex-shrink-0`}
          >
            {icon}
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 overflow-hidden">
          <div
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${trendColor} flex-shrink-0`}
          ></div>
          <span className="text-xs font-medium leading-3 sm:leading-4 truncate min-w-0">
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const stats = [
    {
      title: "Commandes Totales",
      value: "8",
      icon: (
        <ClipboardList className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
      ),
      trend: "+12% ce mois",
      trendColor: "bg-green-500",
      bgGradient: "bg-white text-blue-900",
      iconBg: "bg-blue-500",
    },
    {
      title: "Chiffre d'Affaires",
      value: "196,2 €",
      icon: (
        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
      ),
      trend: "+8.2% ce mois",
      trendColor: "bg-green-500",
      bgGradient: "bg-gradient-to-r from-green-50 to-emerald-50 text-green-800",
      iconBg: "bg-green-500",
    },
    {
      title: "Commandes en attente",
      value: "1",
      icon: (
        <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
      ),
      trend: "Urgent",
      trendColor: "bg-red-500",
      bgGradient: "bg-gradient-to-r from-red-50 to-rose-50 text-red-900",
      iconBg: "bg-red-500",
    },
    {
      title: "Commandes Servies",
      value: "4",
      icon: (
        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
      ),
      trend: "100% complétées",
      trendColor: "bg-green-500",
      bgGradient: "bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-900",
      iconBg: "bg-yellow-500",
    },
    {
      title: "Commandes validées",
      value: "1",
      icon: (
        <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
      ),
      trend: "En cours",
      trendColor: "bg-green-500",
      bgGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-900",
      iconBg: "bg-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
