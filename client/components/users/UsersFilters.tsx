import { Search, Calendar, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsersFiltersProps {
  searchQuery: string;
  selectedRole: string;
  selectedAge: string;
  totalUsers: number;
  onSearch: (query: string) => void;
  onRoleFilter: (role: string) => void;
  onAgeFilter: (age: string) => void;
  onNewUser: () => void;
  canAddUsers?: boolean;
}

export function UsersFilters({
  searchQuery,
  selectedRole,
  selectedAge,
  totalUsers,
  onSearch,
  onRoleFilter,
  onAgeFilter,
  onNewUser,
  canAddUsers = false,
}: UsersFiltersProps) {
  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 flex items-center gap-4 flex-wrap">
      {/* Role Filter */}
      <div className="flex items-center gap-3">
        <div className="bg-[#D9D9D9] rounded-lg px-5 py-3">
          <span className="text-sm text-black font-inter">Role</span>
        </div>
        <Select value={selectedRole} onValueChange={onRoleFilter}>
          <SelectTrigger className="w-11 h-12 bg-[#F1F5F9] border-[#D1D5DB] shadow-sm">
            <ChevronDown className="w-4 h-4 text-[#374151]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Serveur">Serveur</SelectItem>
            <SelectItem value="Cuisinier">Cuisinier</SelectItem>
            <SelectItem value="Utilisateur">Utilisateur</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Age Filter */}
      <div className="flex items-center gap-3">
        <div className="bg-[#D9D9D9] rounded-lg px-5 py-3">
          <span className="text-sm text-black font-inter">Age</span>
        </div>
        <Select value={selectedAge} onValueChange={onAgeFilter}>
          <SelectTrigger className="w-11 h-12 bg-[#F1F5F9] border-[#D1D5DB] shadow-sm">
            <Calendar className="w-5 h-5 text-black" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="23">23</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="30">30+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search Input */}
      <div className="flex-1 max-w-[526px]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
          <Input
            placeholder="Rechercher par nom ou par rôle"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-12 h-12 bg-white border-[#D1D5DB] shadow-sm font-inter"
          />
        </div>
      </div>

      {/* New User Button - Only for owners */}
      {canAddUsers && (
        <Button
          onClick={onNewUser}
          className="bg-dashboard-yellow hover:bg-dashboard-yellow/90 text-black font-inter px-5 py-3 h-auto rounded-lg"
        >
          Nouveau Utilisateur
        </Button>
      )}

      {/* Total Count */}
      <div className="bg-[#D9D9D9] rounded-lg px-5 py-3">
        <span className="text-sm text-black font-inter">
          Nombres totales d'utilisateurs : {totalUsers}
        </span>
      </div>
    </div>
  );
}
