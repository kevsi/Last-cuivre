import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/pages/Users";
import { cn } from "@/lib/utils";

interface UsersTableProps {
  users: User[];
  onUserAction: (action: "view" | "edit" | "delete", userId: string) => void;
}

export function UsersTable({ users, onUserAction }: UsersTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-[rgba(230,165,2,0)] to-[rgba(248,182,2,0)] px-2 sm:px-3 py-2 sm:py-3">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 items-center min-w-[800px]">
            <div className="text-center">
              <span className="text-xs font-semibold text-black font-poppins">
                N°
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-black font-poppins">
                Nom
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-black font-poppins">
                Prénoms
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-black font-poppins">
                Age
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-black font-poppins">
                Telephone
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-black font-poppins">
                Adresse Email
              </span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-black font-poppins">
                Actions
              </span>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="bg-[#FAFAFA] p-2 sm:p-3">
          <div className="space-y-2 sm:space-y-3">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm p-2 sm:p-3"
              >
                <div className="grid grid-cols-7 gap-1 sm:gap-2 items-center min-w-[800px]">
                  {/* Number */}
                  <div className="flex justify-center">
                    <div className="bg-white border border-[#E5E7EB] rounded-lg px-4 py-2">
                      <span className="text-sm font-bold text-[#1F2937] font-poppins">
                        N°{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="text-center">
                    <span className="text-base font-bold text-[#1F2937] font-poppins">
                      {user.nom}
                    </span>
                  </div>

                  {/* First Name */}
                  <div className="text-center">
                    <span className="text-base font-bold text-[#1F2937] font-poppins">
                      {user.prenoms}
                    </span>
                  </div>

                  {/* Age */}
                  <div className="text-center">
                    <span className="text-base font-bold text-[#1F2937] font-poppins">
                      {user.age}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="text-center">
                    <span className="text-base font-bold text-[#1F2937] font-poppins">
                      {user.telephone}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="text-center">
                    <span className="text-sm font-bold text-black font-poppins">
                      Pierre
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onUserAction("view", user.id)}
                      className="w-10 h-10 rounded-lg bg-[rgba(59,130,246,0.1)] hover:bg-[rgba(59,130,246,0.2)]"
                    >
                      <Eye className="w-5 h-5 text-[#3B82F6]" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onUserAction("edit", user.id)}
                      className="w-10 h-10 rounded-lg bg-[rgba(245,158,11,0.1)] hover:bg-[rgba(245,158,11,0.2)]"
                    >
                      <Edit className="w-5 h-5 text-[#F59E0B]" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onUserAction("delete", user.id)}
                      className="w-10 h-10 rounded-lg bg-[rgba(239,68,68,0.1)] hover:bg-[rgba(239,68,68,0.2)]"
                    >
                      <Trash2 className="w-5 h-5 text-[#EF4444]" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
