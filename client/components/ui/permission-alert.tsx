import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PermissionAlertProps {
  message?: string;
  requiredRole?: string;
}

export function PermissionAlert({
  message = "Vous n'avez pas les permissions nécessaires pour cette action",
  requiredRole = "Supa Admin",
}: PermissionAlertProps) {
  return (
    <Alert variant="destructive" className="border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="text-red-800">
        <div className="space-y-1">
          <p className="font-medium">{message}</p>
          <p className="text-sm">
            Cette action nécessite le rôle : {requiredRole}
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
