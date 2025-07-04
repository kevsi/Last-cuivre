import {
  ApiResponse,
  PaginatedResponse,
  Order,
  OrderDetails,
  CreateOrderRequest,
  UpdateOrderRequest,
  Article,
  CreateArticleRequest,
  UpdateArticleRequest,
  User,
  CreateUserRequest,
  UpdateUserRequest,
  OrderFilters,
  ArticleFilters,
  UserFilters,
  DashboardStats,
} from "@/types/api";
import {
  fallbackOrders,
  fallbackArticles,
  fallbackUsers,
  fallbackStats,
  fallbackOrderItems,
  filterOrdersLocally,
  filterArticlesLocally,
} from "./fallback-data";

// Configuration de l'API
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Mode fallback pour le développement
const USE_FALLBACK = import.meta.env.VITE_USE_FALLBACK === "true";

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    // Si le mode fallback est activé, on ne fait pas de requête
    if (USE_FALLBACK) {
      throw new Error("Fallback mode is enabled - skipping API request");
    }

    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.warn(`⚠️  Laravel API non disponible sur ${url}`);
        console.info("💡 Utilisation des données de fallback");
      } else {
        console.error("API request failed:", error);
      }
      throw error;
    }
  }

  // Orders API
  async getOrders(
    filters?: OrderFilters,
  ): Promise<ApiResponse<PaginatedResponse<Order>>> {
    if (USE_FALLBACK) {
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 500));

      const filteredOrders = filterOrdersLocally(fallbackOrders, filters || {});

      return {
        success: true,
        message: "Orders retrieved successfully (fallback)",
        data: {
          data: filteredOrders,
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: filteredOrders.length,
        },
      };
    }

    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.dateFrom) params.append("date_from", filters.dateFrom);
    if (filters?.dateTo) params.append("date_to", filters.dateTo);
    if (filters?.tableNumber)
      params.append("table_number", filters.tableNumber);
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString() ? `?${params.toString()}` : "";

    try {
      return await this.request<ApiResponse<PaginatedResponse<Order>>>(
        `/orders${query}`,
      );
    } catch (error) {
      console.warn("API failed, using fallback data for orders:", error);
      const filteredOrders = filterOrdersLocally(fallbackOrders, filters || {});

      return {
        success: true,
        message: "Orders retrieved successfully (fallback after error)",
        data: {
          data: filteredOrders,
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: filteredOrders.length,
        },
      };
    }
  }

  async getOrder(id: string): Promise<ApiResponse<OrderDetails>> {
    if (USE_FALLBACK) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const order = fallbackOrders.find((o) => o.id === id);
      if (!order) {
        throw new Error("Order not found");
      }

      const orderDetails: OrderDetails = {
        ...order,
        items: fallbackOrderItems[id] || [],
      };

      return {
        success: true,
        message: "Order retrieved successfully (fallback)",
        data: orderDetails,
      };
    }

    try {
      return await this.request<ApiResponse<OrderDetails>>(`/orders/${id}`);
    } catch (error) {
      console.warn("API failed, using fallback data for order:", error);

      const order = fallbackOrders.find((o) => o.id === id);
      if (!order) {
        throw new Error("Order not found");
      }

      const orderDetails: OrderDetails = {
        ...order,
        items: fallbackOrderItems[id] || [],
      };

      return {
        success: true,
        message: "Order retrieved successfully (fallback after error)",
        data: orderDetails,
      };
    }
  }

  async createOrder(data: CreateOrderRequest): Promise<ApiResponse<Order>> {
    if (USE_FALLBACK) {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newOrder: Order = {
        id: Date.now().toString(),
        orderNumber: `C${String(fallbackOrders.length + 1).padStart(2, "0")}`,
        tableNumber: data.tableNumber,
        articleCount: data.items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: data.items.reduce((sum, item) => {
          const article = fallbackArticles.find((a) => a.id === item.articleId);
          return sum + (article?.price || 0) * item.quantity;
        }, 0),
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      return {
        success: true,
        message: "Order created successfully (fallback)",
        data: newOrder,
      };
    }

    try {
      return await this.request<ApiResponse<Order>>("/orders", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn("API failed for create order, using fallback simulation");
      throw error; // Pour les mutations, on préfère échouer plutôt que simuler
    }
  }

  async updateOrder(
    id: string,
    data: UpdateOrderRequest,
  ): Promise<ApiResponse<Order>> {
    if (USE_FALLBACK) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const existingOrder = fallbackOrders.find((o) => o.id === id);
      if (!existingOrder) {
        throw new Error("Order not found");
      }

      const updatedOrder: Order = {
        ...existingOrder,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        message: "Order updated successfully (fallback)",
        data: updatedOrder,
      };
    }

    try {
      return await this.request<ApiResponse<Order>>(`/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn("API failed for update order, using fallback simulation");
      throw error;
    }
  }

  async deleteOrder(id: string): Promise<ApiResponse<null>> {
    if (USE_FALLBACK) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      return {
        success: true,
        message: "Order deleted successfully (fallback)",
        data: null,
      };
    }

    try {
      return await this.request<ApiResponse<null>>(`/orders/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.warn("API failed for delete order, using fallback simulation");
      throw error;
    }
  }

  // Articles API
  async getArticles(
    filters?: ArticleFilters,
  ): Promise<ApiResponse<PaginatedResponse<Article>>> {
    if (USE_FALLBACK) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const filteredArticles = filterArticlesLocally(
        fallbackArticles,
        filters || {},
      );

      return {
        success: true,
        message: "Articles retrieved successfully (fallback)",
        data: {
          data: filteredArticles,
          current_page: 1,
          last_page: 1,
          per_page: 20,
          total: filteredArticles.length,
        },
      };
    }

    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.priceMin)
      params.append("price_min", filters.priceMin.toString());
    if (filters?.priceMax)
      params.append("price_max", filters.priceMax.toString());
    if (filters?.inStock !== undefined)
      params.append("in_stock", filters.inStock.toString());
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString() ? `?${params.toString()}` : "";

    try {
      return await this.request<ApiResponse<PaginatedResponse<Article>>>(
        `/articles${query}`,
      );
    } catch (error) {
      console.warn("API failed, using fallback data for articles:", error);
      const filteredArticles = filterArticlesLocally(
        fallbackArticles,
        filters || {},
      );

      return {
        success: true,
        message: "Articles retrieved successfully (fallback after error)",
        data: {
          data: filteredArticles,
          current_page: 1,
          last_page: 1,
          per_page: 20,
          total: filteredArticles.length,
        },
      };
    }
  }

  async getArticle(id: string): Promise<ApiResponse<Article>> {
    return this.request<ApiResponse<Article>>(`/articles/${id}`);
  }

  async createArticle(
    data: CreateArticleRequest,
  ): Promise<ApiResponse<Article>> {
    if (USE_FALLBACK) {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newArticle: Article = {
        id: Date.now().toString(),
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description,
        image:
          data.image ||
          "https://cdn.builder.io/api/v1/image/assets%2F9598003611af423eab7c134af77a1af0%2F78661e7e35694c88aafdf6c26f62d581?format=webp&width=800",
        inStock: true,
        createdAt: new Date().toISOString(),
      };

      return {
        success: true,
        message: "Article created successfully (fallback)",
        data: newArticle,
      };
    }

    try {
      return await this.request<ApiResponse<Article>>("/articles", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn("API failed for create article, using fallback simulation");
      throw error;
    }
  }

  async updateArticle(
    id: string,
    data: UpdateArticleRequest,
  ): Promise<ApiResponse<Article>> {
    return this.request<ApiResponse<Article>>(`/articles/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteArticle(id: string): Promise<ApiResponse<null>> {
    return this.request<ApiResponse<null>>(`/articles/${id}`, {
      method: "DELETE",
    });
  }

  // Users API
  async getUsers(
    filters?: UserFilters,
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    const params = new URLSearchParams();
    if (filters?.role) params.append("role", filters.role);
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString() ? `?${params.toString()}` : "";
    return this.request<ApiResponse<PaginatedResponse<User>>>(`/users${query}`);
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>(`/users/${id}`);
  }

  async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateUser(
    id: string,
    data: UpdateUserRequest,
  ): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    return this.request<ApiResponse<null>>(`/users/${id}`, {
      method: "DELETE",
    });
  }

  // Dashboard API
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    if (USE_FALLBACK) {
      await new Promise((resolve) => setTimeout(resolve, 400));

      return {
        success: true,
        message: "Dashboard stats retrieved successfully (fallback)",
        data: fallbackStats,
      };
    }

    try {
      return await this.request<ApiResponse<DashboardStats>>(
        "/dashboard/stats",
      );
    } catch (error) {
      console.warn(
        "API failed, using fallback data for dashboard stats:",
        error,
      );

      return {
        success: true,
        message:
          "Dashboard stats retrieved successfully (fallback after error)",
        data: fallbackStats,
      };
    }
  }

  // Upload API
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append("image", file);

    return this.request<ApiResponse<{ url: string }>>("/upload/image", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }
}

export const apiService = new ApiService();
export default apiService;
