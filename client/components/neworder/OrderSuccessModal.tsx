import { Button } from "@/components/ui/button";

interface OrderSuccessModalProps {
  onClose: () => void;
}

export function OrderSuccessModal({ onClose }: OrderSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          {/* Success Image */}
          <div className="mb-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F8a037a6cab2c4e4b8386090471e52a34%2F70134b1db94647559130e56bde205556?format=webp&width=800"
              alt="Order Success"
              className="w-60 h-48 mx-auto rounded-lg object-cover"
            />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-medium text-black mb-8 font-roboto">
            Commande enregistré
          </h2>

          {/* OK Button */}
          <Button
            onClick={onClose}
            className="bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-black font-roboto text-2xl px-8 py-3 rounded-md"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
