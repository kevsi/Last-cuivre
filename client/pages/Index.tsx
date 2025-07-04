import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart3,
  Plus,
  Clock,
  Shield,
  TrendingUp,
  Settings,
  Zap,
  ShoppingCart,
} from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: "blue" | "green" | "purple" | "orange" | "indigo" | "gray";
}

function ActionCard({
  title,
  description,
  icon,
  href,
  color,
}: ActionCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300",
    green:
      "bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300",
    purple:
      "bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300",
    orange:
      "bg-orange-50 border-orange-200 hover:bg-orange-100 hover:border-orange-300",
    indigo:
      "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300",
    gray: "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300",
  };

  const iconColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    indigo: "text-indigo-600",
    gray: "text-gray-600",
  };

  return (
    <Link
      to={href}
      className={`block p-2 sm:p-3 lg:p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${colorClasses[color]}`}
    >
      <div className="flex items-start gap-2 sm:gap-2.5 lg:gap-3">
        <div
          className={`p-1 sm:p-1.5 lg:p-2 rounded-md bg-white shadow-sm ${iconColorClasses[color]} flex-shrink-0`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark mb-0.5 sm:mb-1 font-poppins">
            {title}
          </h3>
          <p className="text-xs sm:text-xs lg:text-sm text-dashboard-muted font-inter">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="text-center p-2 sm:p-3 lg:p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-dashboard-yellow rounded-md mb-1.5 sm:mb-2 lg:mb-3 text-white">
        {icon}
      </div>
      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-dashboard-dark mb-0.5 sm:mb-1 lg:mb-2 font-poppins">
        {title}
      </h3>
      <p className="text-xs sm:text-xs lg:text-sm text-dashboard-muted font-inter">
        {description}
      </p>
    </div>
  );
}

export default function Index() {
  const [messageFromServer, setMessageFromServer] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Fetch message from server on component mount
  useEffect(() => {
    fetchHello();
  }, []);

  const fetchHello = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setMessageFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-gray flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-dashboard-dark font-leckerli">
              Lounge Bar Le Cuivre
            </h1>
            <div className="flex items-center gap-2 sm:gap-3">
              <Badge
                variant="outline"
                className="px-1.5 sm:px-2 py-0.5 text-xs"
              >
                Version 1.0
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
        {/* Hero Section */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-dashboard-dark mb-2 sm:mb-3 lg:mb-4 font-poppins">
            Système de Gestion Restaurant
          </h2>
          <p className="text-sm sm:text-sm lg:text-base text-dashboard-muted max-w-2xl mx-auto font-inter mb-2 sm:mb-3">
            Une solution complète pour gérer les commandes, suivre les ventes et
            optimiser le service de votre restaurant.
          </p>
          {messageFromServer && (
            <p className="text-xs text-dashboard-yellow font-inter">
              {messageFromServer}
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-4 sm:mb-6 lg:mb-8">
          <Link to="/dashboard">
            <Button className="w-full sm:w-auto bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-white font-medium rounded-md">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard Serveur
            </Button>
          </Link>
          <Link to="/new-order">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-dashboard-yellow text-dashboard-yellow hover:bg-dashboard-yellow hover:text-white font-medium rounded-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Commande
            </Button>
          </Link>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-6 lg:mb-8">
          <ActionCard
            title="Dashboard Serveur"
            description="Accédez au tableau de bord principal pour gérer les commandes et suivre l'activité."
            icon={<BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />}
            href="/dashboard"
            color="blue"
          />

          <ActionCard
            title="Nouvelle Commande"
            description="Créez rapidement une nouvelle commande pour vos clients."
            icon={<Plus className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />}
            href="/new-order"
            color="green"
          />

          <ActionCard
            title="Historique"
            description="Consultez l'historique complet de toutes les commandes."
            icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />}
            href="/orders"
            color="purple"
          />

          <ActionCard
            title="Dashboard Manager"
            description="Interface de gestion avancée pour les responsables."
            icon={<Shield className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />}
            href="/manager-dashboard"
            color="orange"
          />

          <ActionCard
            title="Commandes Manager"
            description="Gérer toutes les commandes en tant que responsable."
            icon={
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            }
            href="/manager-orders"
            color="purple"
          />

          <ActionCard
            title="Statistiques"
            description="Analysez les performances et les tendances de vente."
            icon={
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            }
            href="/manager-dashboard"
            color="indigo"
          />

          <ActionCard
            title="Configuration"
            description="Paramètres et configuration du système."
            icon={<Settings className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />}
            href="#"
            color="gray"
          />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          <FeatureCard
            title="Interface Intuitive"
            description="Design moderne et facile à utiliser pour tous les membres de l'équipe."
            icon={<Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
          />
          <FeatureCard
            title="Gestion en Temps Réel"
            description="Suivi instantané des commandes et mise à jour automatique des statuts."
            icon={<Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
          />
          <FeatureCard
            title="Rapports Détaillés"
            description="Analytics avancés pour optimiser les performances de votre restaurant."
            icon={<BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <p className="text-xs text-dashboard-muted font-inter">
            © 2024 Lounge Bar Le Cuivre. Système de gestion restaurant.
          </p>
        </div>
      </footer>
    </div>
  );
}
