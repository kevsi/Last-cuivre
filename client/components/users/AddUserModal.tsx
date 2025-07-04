import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SavingAnimation } from "@/components/ui/saving-animation";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: UserFormData) => void;
}

export interface UserFormData {
  nom: string;
  prenoms: string;
  age: number;
  telephone: string;
  email: string;
  role: string;
}

export function AddUserModal({
  isOpen,
  onClose,
  onAddUser,
}: AddUserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    nom: "",
    prenoms: "",
    age: 18,
    telephone: "",
    email: "",
    role: "Utilisateur",
  });

  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    field: keyof UserFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }

    if (!formData.prenoms.trim()) {
      newErrors.prenoms = "Le prénom est requis";
    }

    if (formData.age < 16 || formData.age > 100) {
      newErrors.age = "L'âge doit être entre 16 et 100 ans";
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis";
    } else if (!/^\d{10}$/.test(formData.telephone.replace(/\s/g, ""))) {
      newErrors.telephone = "Le téléphone doit contenir 10 chiffres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.role) {
      newErrors.role = "Le rôle est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSaving(true);

      // Simuler un délai de sauvegarde
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onAddUser(formData);
    }
  };

  const handleSavingComplete = () => {
    setIsSaving(false);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      nom: "",
      prenoms: "",
      age: 18,
      telephone: "",
      email: "",
      role: "Utilisateur",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl">
        <DialogHeader className="relative pb-6">
          <button
            onClick={handleClose}
            className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <DialogTitle className="text-2xl font-bold text-dashboard-dark font-poppins text-center">
            Nouveau Utilisateur
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div className="space-y-2">
            <Label
              htmlFor="nom"
              className="text-sm font-semibold text-gray-700 font-poppins"
            >
              Nom *
            </Label>
            <Input
              id="nom"
              value={formData.nom}
              onChange={(e) => handleInputChange("nom", e.target.value)}
              placeholder="Entrez le nom"
              className="h-12 font-poppins"
            />
            {errors.nom && (
              <p className="text-sm text-red-500 font-inter">{errors.nom}</p>
            )}
          </div>

          {/* Prénoms */}
          <div className="space-y-2">
            <Label
              htmlFor="prenoms"
              className="text-sm font-semibold text-gray-700 font-poppins"
            >
              Prénoms *
            </Label>
            <Input
              id="prenoms"
              value={formData.prenoms}
              onChange={(e) => handleInputChange("prenoms", e.target.value)}
              placeholder="Entrez les prénoms"
              className="h-12 font-poppins"
            />
            {errors.prenoms && (
              <p className="text-sm text-red-500 font-inter">
                {errors.prenoms}
              </p>
            )}
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label
              htmlFor="age"
              className="text-sm font-semibold text-gray-700 font-poppins"
            >
              Âge *
            </Label>
            <Input
              id="age"
              type="number"
              min="16"
              max="100"
              value={formData.age}
              onChange={(e) =>
                handleInputChange("age", parseInt(e.target.value) || 18)
              }
              className="h-12 font-poppins"
            />
            {errors.age && (
              <p className="text-sm text-red-500 font-inter">{errors.age}</p>
            )}
          </div>

          {/* Téléphone */}
          <div className="space-y-2">
            <Label
              htmlFor="telephone"
              className="text-sm font-semibold text-gray-700 font-poppins"
            >
              Téléphone *
            </Label>
            <Input
              id="telephone"
              value={formData.telephone}
              onChange={(e) => handleInputChange("telephone", e.target.value)}
              placeholder="0142011445"
              className="h-12 font-poppins"
            />
            {errors.telephone && (
              <p className="text-sm text-red-500 font-inter">
                {errors.telephone}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 font-poppins"
            >
              Adresse Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="utilisateur@exemple.com"
              className="h-12 font-poppins"
            />
            {errors.email && (
              <p className="text-sm text-red-500 font-inter">{errors.email}</p>
            )}
          </div>

          {/* Rôle */}
          <div className="space-y-2">
            <Label
              htmlFor="role"
              className="text-sm font-semibold text-gray-700 font-poppins"
            >
              Rôle *
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
            >
              <SelectTrigger className="h-12 font-poppins">
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Utilisateur">Utilisateur</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Serveur">Serveur</SelectItem>
                <SelectItem value="Cuisinier">Cuisinier</SelectItem>
                <SelectItem value="Administrateur">Administrateur</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500 font-inter">{errors.role}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 font-poppins"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-black font-poppins"
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Ajout...</span>
                </div>
              ) : (
                "Ajouter Utilisateur"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>

      {/* Saving Animation */}
      <SavingAnimation
        isVisible={isSaving}
        message="Ajout du nouvel utilisateur..."
        successMessage="Utilisateur ajouté avec succès !"
        onComplete={handleSavingComplete}
        duration={1000}
      />
    </Dialog>
  );
}
