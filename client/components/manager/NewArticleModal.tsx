import React, { useState } from "react";
import { X, Upload, ChevronDown, Loader2 } from "lucide-react";
import { SavingAnimation } from "@/components/ui/saving-animation";

interface NewArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (articleData: {
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    image?: File;
  }) => void;
}

export const NewArticleModal: React.FC<NewArticleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Bières",
    price: "",
    quantity: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simuler un délai de sauvegarde
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onSubmit({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      quantity: parseInt(formData.quantity) || 0,
      description: formData.description,
      image: selectedImage || undefined,
    });
  };

  const handleSavingComplete = () => {
    setIsSaving(false);
    onClose();
    setFormData({
      name: "",
      category: "Bières",
      price: "",
      quantity: "",
      description: "",
    });
    setSelectedImage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/25" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-[#2E2E2E] font-poppins">
            Ajouter un nouvel article
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex gap-12">
            {/* Left side - Image upload */}
            <div className="flex-shrink-0">
              <div
                className={`w-80 h-52 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-colors ${
                  dragActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-[#C0D6E7] bg-[#F4F7FB]"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {selectedImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg mb-4"
                    />
                    <p className="text-sm text-gray-600">
                      {selectedImage.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-gray-400 mb-6" />
                    <div className="flex items-center gap-2 text-xs">
                      <Upload className="w-3 h-3" />
                      <span className="text-black font-light">
                        Drop your files here. or
                      </span>
                      <label className="text-[#85B1DC] cursor-pointer hover:underline">
                        <span>Browse</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right side - Form fields */}
            <div className="flex-1 space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-black mb-2 font-inter">
                  Nom du produit
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Navy Blue Sneakers Shoe"
                  className="w-full px-4 py-3 border-4 border-[#F1F1F1] rounded bg-[#FEFEFE] text-black font-inter text-xs font-light focus:outline-none focus:border-dashboard-yellow focus:ring-2 focus:ring-dashboard-yellow/20"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-black mb-2 font-inter">
                  Catégorie
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-4 border-[#F1F1F1] rounded bg-[#FEFEFE] text-black font-inter text-xs font-light focus:outline-none focus:border-blue-300 appearance-none pr-12"
                  >
                    <option value="Bières">Bières</option>
                    <option value="Cocktails">Cocktails</option>
                    <option value="Vins">Vins</option>
                    <option value="Spiritueux">Spiritueux</option>
                    <option value="Soft Drinks">Soft Drinks</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-black mb-2 font-inter">
                  Prix
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="175"
                  className="w-full px-4 py-3 border-4 border-[#F4F4F4] rounded bg-[#FEFEFE] text-black font-inter text-sm focus:outline-none focus:border-dashboard-yellow focus:ring-2 focus:ring-dashboard-yellow/20"
                  required
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-black mb-2 font-inter">
                  Quantité
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="14"
                  className="w-full px-4 py-3 border-4 border-[#F1F1F1] rounded bg-[#FEFEFE] text-black font-inter text-xs font-light focus:outline-none focus:border-dashboard-yellow focus:ring-2 focus:ring-dashboard-yellow/20"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-black mb-2 font-inter">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Thelifestyle Shaft mecollection is uist what ywutned o corcpletesh sporty look. Shaft measures appoxdimately low-top from arch Mesh fobric panels ot front, sides, and collar for breathable comfort foam cushioned comfort insole with arch support, Shock-absorbing."
                  rows={4}
                  className="w-full px-4 py-2 border-4 border-[#F4F4F5] rounded bg-[#FDFDFE] text-black font-inter text-xs leading-5 resize-none focus:outline-none focus:border-blue-300"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#037AFE] border border-[#0A6FF9] rounded-sm text-white font-inter text-xs font-bold hover:bg-blue-600 transition-colors disabled:opacity-50"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Ajout...</span>
                    </div>
                  ) : (
                    "Ajouter"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Cancel link at bottom */}
        <div className="pb-6 flex justify-center">
          <button
            onClick={onClose}
            className="text-[#E2AEB1] font-inter text-xs font-light hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Saving Animation */}
      <SavingAnimation
        isVisible={isSaving}
        message="Enregistrement de l'article en cours..."
        successMessage="Article ajouté avec succès !"
        onComplete={handleSavingComplete}
        duration={1500}
      />
    </div>
  );
};
