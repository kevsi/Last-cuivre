import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

export default function Login() {
  const { login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormLoading = isLoading || authLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Attendre un peu pour que le contexte se mette à jour
        setTimeout(() => {
          const userData = JSON.parse(localStorage.getItem("authUser") || "{}");
          console.log("User logged in:", userData);

          if (userData.role === "owner") {
            console.log("Redirecting owner to /dashboard");
            navigate("/dashboard");
          } else if (userData.role === "manager") {
            console.log("Redirecting manager to /manager-dashboard");
            navigate("/manager-dashboard");
          } else if (userData.role === "employee") {
            console.log("Redirecting employee to /new-order");
            navigate("/new-order");
          } else {
            console.log("Fallback redirect to /dashboard");
            navigate("/dashboard");
          }
        }, 100);
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Une erreur s'est produite lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-gray to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-dashboard-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-dashboard-dark font-poppins">
            Connexion Restaurant
          </h1>
          <p className="text-dashboard-muted mt-2">
            Connectez-vous pour accéder au système
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center text-lg font-semibold">
              Se connecter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 focus-visible:border-dashboard-yellow"
                    disabled={isFormLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 focus-visible:border-dashboard-yellow"
                    disabled={isFormLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-white font-semibold"
                disabled={isFormLoading}
              >
                {isFormLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connexion en cours...
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            {/* Demo credentials info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Comptes de démonstration:
              </h4>
              <div className="text-xs text-gray-600 space-y-1">
                <div>
                  <strong>Supa Admin:</strong> admin@restaurant.com / admin123
                </div>
                <div>
                  <strong>Manager:</strong> manager@restaurant.com / manager123
                </div>
                <div>
                  <strong>Employé:</strong> employee@restaurant.com /
                  employee123
                </div>
              </div>
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                <strong>Note:</strong> Seul le Supa Admin peut ajouter des
                utilisateurs
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
