import {
  Order,
  Article,
  User,
  DashboardStats,
  OrderDetails,
  OrderItem,
} from "@/types/api";

// Données de fallback pour les commandes
export const fallbackOrders: Order[] = [
  {
    id: "1",
    orderNumber: "C01",
    tableNumber: "T01",
    articleCount: 3,
    totalPrice: 32000,
    status: "validated",
    createdAt: "2024-05-14T08:20:00Z",
  },
  {
    id: "2",
    orderNumber: "C02",
    tableNumber: "T02",
    articleCount: 5,
    totalPrice: 45000,
    status: "pending",
    createdAt: "2024-05-14T08:15:00Z",
  },
  {
    id: "3",
    orderNumber: "C03",
    tableNumber: "T03",
    articleCount: 2,
    totalPrice: 18000,
    status: "served",
    createdAt: "2024-05-14T08:10:00Z",
  },
  {
    id: "4",
    orderNumber: "C04",
    tableNumber: "T04",
    articleCount: 4,
    totalPrice: 38000,
    status: "cancelled",
    createdAt: "2024-05-14T08:05:00Z",
  },
  {
    id: "5",
    orderNumber: "C05",
    tableNumber: "T05",
    articleCount: 6,
    totalPrice: 52000,
    status: "validated",
    createdAt: "2024-05-14T08:00:00Z",
  },
  {
    id: "6",
    orderNumber: "C06",
    tableNumber: "T06",
    articleCount: 1,
    totalPrice: 12000,
    status: "pending",
    createdAt: "2024-05-14T07:55:00Z",
  },
];

// Données de fallback pour les articles
export const fallbackArticles: Article[] = [
  {
    id: "1",
    name: "Mojito",
    price: 2000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
    category: "cocktail",
    description: "Cocktail rafraîchissant à base de rhum et menthe",
    inStock: true,
    createdAt: "2024-05-14T08:00:00Z",
  },
  {
    id: "2",
    name: "Daiquiri",
    price: 2000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
    category: "cocktail",
    description: "Cocktail classique au rhum et citron vert",
    inStock: true,
    createdAt: "2024-05-14T08:00:00Z",
  },
  {
    id: "3",
    name: "Margarita",
    price: 2800,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
    category: "cocktail",
    description: "Cocktail tequila avec triple sec et citron vert",
    inStock: true,
    createdAt: "2024-05-14T08:00:00Z",
  },
  {
    id: "4",
    name: "Café Expresso",
    price: 1500,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
    category: "boisson",
    description: "Café italien serré et aromatique",
    inStock: true,
    createdAt: "2024-05-14T08:00:00Z",
  },
  {
    id: "5",
    name: "Croissant au Beurre",
    price: 2000,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
    category: "pâtisserie",
    description: "Viennoiserie française traditionnelle",
    inStock: true,
    createdAt: "2024-05-14T08:00:00Z",
  },
];

// Données de fallback pour les utilisateurs
export const fallbackUsers: User[] = [
  {
    id: "1",
    nom: "Dupont",
    prenoms: "Jean",
    email: "jean.dupont@restaurant.com",
    telephone: "+33123456789",
    age: 28,
    role: "serveur",
    createdAt: "2024-05-14T08:00:00Z",
  },
  {
    id: "2",
    nom: "Martin",
    prenoms: "Marie",
    email: "marie.martin@restaurant.com",
    telephone: "+33123456790",
    age: 32,
    role: "manager",
    createdAt: "2024-05-14T08:00:00Z",
  },
  {
    id: "3",
    nom: "Bernard",
    prenoms: "Pierre",
    email: "pierre.bernard@restaurant.com",
    telephone: "+33123456791",
    age: 45,
    role: "admin",
    createdAt: "2024-05-14T08:00:00Z",
  },
];

// Données de fallback pour les statistiques
export const fallbackStats: DashboardStats = {
  totalOrders: 156,
  pendingOrders: 12,
  servedOrders: 98,
  totalRevenue: 2850000,
  todayRevenue: 125000,
  activeServers: 8,
};

// Items détaillés pour les commandes
export const fallbackOrderItems: Record<string, OrderItem[]> = {
  "1": [
    {
      id: "item1",
      name: "Café Expresso",
      quantity: 2,
      price: 1500,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
      category: "boisson",
    },
    {
      id: "item2",
      name: "Croissant au Beurre",
      quantity: 1,
      price: 2000,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=200",
      category: "pâtisserie",
    },
  ],
  "2": [
    {
      id: "item3",
      name: "Mojito",
      quantity: 2,
      price: 2000,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "cocktail",
    },
    {
      id: "item4",
      name: "Margarita",
      quantity: 1,
      price: 2800,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
      category: "cocktail",
    },
  ],
};

// Fonction pour filtrer les données localement (fallback)
export const filterOrdersLocally = (orders: Order[], filters: any) => {
  return orders.filter((order) => {
    const matchesSearch =
      !filters.search ||
      order.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.tableNumber.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus = !filters.status || order.status === filters.status;

    return matchesSearch && matchesStatus;
  });
};

export const filterArticlesLocally = (articles: Article[], filters: any) => {
  return articles.filter((article) => {
    const matchesSearch =
      !filters.search ||
      article.name.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      !filters.category || article.category === filters.category;

    const matchesPrice =
      (!filters.priceMin || article.price >= filters.priceMin) &&
      (!filters.priceMax || article.price <= filters.priceMax);

    return matchesSearch && matchesCategory && matchesPrice;
  });
};
