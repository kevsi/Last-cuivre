import React, { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { LayoutDashboard, ShoppingCart, Box } from "lucide-react";
import { ResponsiveLayout } from "@/components/ui/responsive-layout";
import { NavItem } from "@/components/ui/responsive-sidebar";
import { ManagerOrdersHeader } from "@/components/manager/ManagerOrdersHeader";
import { ManagerArticlesFilters } from "@/components/manager/ManagerArticlesFilters";
import { ManagerArticlesGrid } from "@/components/manager/ManagerArticlesGrid";
import { NewArticleModal } from "@/components/manager/NewArticleModal";
import { useArticles, useCreateArticle } from "@/hooks/api";
import { ArticleFilters } from "@/types/api";
import { ArticlesGridSkeleton } from "@/components/ui/loaders";

export interface Article {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const navItems: NavItem[] = [
  {
    href: "/manager-dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/manager-orders",
    icon: ShoppingCart,
    label: "Commandes",
  },
  {
    href: "/manager-articles",
    icon: Box,
    label: "Articles",
    isActive: true,
  },
];

const ManagerArticles: React.FC = () => {
  const { notifications } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [isNewArticleModalOpen, setIsNewArticleModalOpen] = useState(false);

  // Construire les filtres pour l'API
  const filters: ArticleFilters = {
    search: searchQuery || undefined,
    category: selectedCategory || undefined,
    priceMin:
      priceFilter === "0-1000"
        ? 0
        : priceFilter === "1000-3000"
          ? 1000
          : priceFilter === "3000-5000"
            ? 3000
            : undefined,
    priceMax:
      priceFilter === "0-1000"
        ? 1000
        : priceFilter === "1000-3000"
          ? 3000
          : priceFilter === "3000-5000"
            ? 5000
            : undefined,
  };

  // API hooks
  const {
    data: articlesResponse,
    isLoading,
    error,
    refetch,
  } = useArticles(filters);

  const createArticleMutation = useCreateArticle();

  const articles = articlesResponse?.data?.data || [];

  // Le filtrage est fait côté serveur
  const filteredArticles = articles;

  const handleAddToMenu = (articleId: string) => {
    try {
      const article = articles.find((a) => a.id === articleId);
      if (article) {
        console.log("Adding article to menu:", articleId);
        notifications.articleAddedToMenu(article.name);
        // Logique pour ajouter l'article au menu
      }
    } catch (error) {
      notifications.actionError("Ajout de l'article au menu");
    }
  };

  const handleCreateArticle = async (articleData: {
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    image?: File;
  }) => {
    try {
      await createArticleMutation.mutateAsync({
        name: articleData.name,
        price: articleData.price,
        category: articleData.category.toLowerCase(),
        description: articleData.description,
        // L'image sera gérée séparément via l'API d'upload
      });

      notifications.articleCreated(articleData.name);
      setIsNewArticleModalOpen(false);
    } catch (error) {
      notifications.actionError("Création de l'article");
    }
  };

  return (
    <ResponsiveLayout navItems={navItems} header={<ManagerOrdersHeader />}>
      <div className="p-4 lg:p-6 bg-gray-50/50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-dashboard-dark font-poppins">
              Gestion des Articles
            </h2>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Gérez vos articles et ajoutez-les au menu
            </p>
          </div>

          <ManagerArticlesFilters
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
              if (query.length > 2) {
                const results = filteredArticles.length;
                notifications.searchPerformed(query, results);
              }
            }}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            onNewArticleClick={() => setIsNewArticleModalOpen(true)}
          />

          <div className="mt-6 lg:mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {filteredArticles.length} article
                {filteredArticles.length !== 1 ? "s" : ""} trouvé
                {filteredArticles.length !== 1 ? "s" : ""}
              </h3>
            </div>
            {isLoading ? (
              <ArticlesGridSkeleton count={12} />
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-red-500 mb-4 text-base md:text-sm">
                    Erreur lors du chargement des articles
                  </p>
                  <button
                    onClick={() => refetch()}
                    className="bg-dashboard-yellow text-white px-6 py-3 md:px-4 md:py-2 rounded text-base md:text-sm hover:bg-dashboard-yellow/90 transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            ) : (
              <ManagerArticlesGrid
                articles={filteredArticles}
                onAddToMenu={handleAddToMenu}
              />
            )}
          </div>

          <NewArticleModal
            isOpen={isNewArticleModalOpen}
            onClose={() => setIsNewArticleModalOpen(false)}
            onSubmit={handleCreateArticle}
          />
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default ManagerArticles;
