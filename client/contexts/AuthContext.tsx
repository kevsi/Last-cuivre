import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  nom: string;
  prenoms: string;
  email: string;
  role: "owner" | "manager" | "employee";
  telephone?: string;
  age?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  isOwner: boolean;
  isManager: boolean;
  isEmployee: boolean;
  canAddUsers: boolean;
  canManageOrders: boolean;
  canViewDashboard: boolean;
  canDeleteOrders: boolean;
  canViewReports: boolean;
  canManageInventory: boolean;
  lastLoginTime: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database - in real app this would come from your API
const mockUsers: Array<User & { password: string }> = [
  {
    id: "1",
    nom: "SUPER",
    prenoms: "Admin",
    email: "admin@restaurant.com",
    password: "admin123",
    role: "owner",
    telephone: "0123456789",
    age: 35,
  },
  {
    id: "2",
    nom: "MANAGER",
    prenoms: "Jean",
    email: "manager@restaurant.com",
    password: "manager123",
    role: "manager",
    telephone: "0123456788",
    age: 30,
  },
  {
    id: "3",
    nom: "EMPLOYE",
    prenoms: "Marie",
    email: "employee@restaurant.com",
    password: "employee123",
    role: "employee",
    telephone: "0123456787",
    age: 25,
  },
];

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastLoginTime, setLastLoginTime] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    const savedLoginTime = localStorage.getItem("lastLoginTime");

    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
        setLastLoginTime(savedLoginTime);
      } catch (error) {
        localStorage.removeItem("authUser");
        localStorage.removeItem("lastLoginTime");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password,
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        const loginTime = new Date().toISOString();

        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        setLastLoginTime(loginTime);

        localStorage.setItem("authUser", JSON.stringify(userWithoutPassword));
        localStorage.setItem("lastLoginTime", loginTime);
        localStorage.setItem(
          "sessionId",
          `session_${Date.now()}_${foundUser.id}`,
        );

        return true;
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setLastLoginTime(null);

    // Clear all auth-related storage
    localStorage.removeItem("authUser");
    localStorage.removeItem("lastLoginTime");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("lastActivity");
    localStorage.removeItem("activeUser");
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("authUser", JSON.stringify(updatedUser));

      return true;
    } catch (error) {
      return false;
    }
  };

  const isOwner = user?.role === "owner";
  const isManager = user?.role === "manager";
  const isEmployee = user?.role === "employee";

  // Permissions based on roles
  const canAddUsers = isOwner; // Only supa admin (owner) can add users
  const canManageOrders = isOwner || isManager; // Owner and managers can manage orders
  const canViewDashboard = isAuthenticated; // All authenticated users can view dashboard
  const canDeleteOrders = isOwner; // Only owner can delete orders
  const canViewReports = isOwner || isManager; // Owner and managers can view reports
  const canManageInventory = isOwner || isManager; // Owner and managers can manage inventory

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
    isOwner,
    isManager,
    isEmployee,
    canAddUsers,
    canManageOrders,
    canViewDashboard,
    canDeleteOrders,
    canViewReports,
    canManageInventory,
    lastLoginTime,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
