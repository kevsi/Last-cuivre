// Base types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Order types
export interface Order {
  id: string;
  orderNumber: string;
  tableNumber: string;
  articleCount: number;
  totalPrice: number;
  status: "validated" | "pending" | "served" | "cancelled";
  createdAt: string;
  updatedAt?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  category: string;
}

export interface OrderDetails extends Order {
  items: OrderItem[];
}

export interface CreateOrderRequest {
  tableNumber: string;
  items: {
    articleId: string;
    quantity: number;
  }[];
}

export interface UpdateOrderRequest {
  status?: Order["status"];
  tableNumber?: string;
  items?: {
    articleId: string;
    quantity: number;
  }[];
}

// Article types
export interface Article {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateArticleRequest {
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}

export interface UpdateArticleRequest extends Partial<CreateArticleRequest> {
  inStock?: boolean;
}

// User types
export interface User {
  id: string;
  nom: string;
  prenoms: string;
  email: string;
  telephone: string;
  age: number;
  role: "admin" | "manager" | "serveur";
  createdAt: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  nom: string;
  prenoms: string;
  email: string;
  telephone: string;
  age: number;
  role: User["role"];
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}

// Filter types
export interface OrderFilters {
  status?: Order["status"];
  dateFrom?: string;
  dateTo?: string;
  tableNumber?: string;
  search?: string;
}

export interface ArticleFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  search?: string;
}

export interface UserFilters {
  role?: User["role"];
  search?: string;
}

// Stats types
export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  servedOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  activeServers: number;
}
