import { useState } from "react";
import { UsersSidebar } from "@/components/users/UsersSidebar";
import { UsersHeader } from "@/components/users/UsersHeader";
import { UsersFilters } from "@/components/users/UsersFilters";
import { UsersTable } from "@/components/users/UsersTable";
import { AddUserModal, UserFormData } from "@/components/users/AddUserModal";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PermissionAlert } from "@/components/ui/permission-alert";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  nom: string;
  prenoms: string;
  age: number;
  telephone: string;
  email: string;
  role?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    nom: "ASSOBGA",
    prenoms: "Giles-Christ",
    age: 23,
    telephone: "0142011445",
    email: "pierre@example.com",
    role: "Utilisateur",
  },
  {
    id: "2",
    nom: "ASSOBGA",
    prenoms: "Giles-Christ",
    age: 23,
    telephone: "0142011445",
    email: "pierre@example.com",
    role: "Manager",
  },
  {
    id: "3",
    nom: "ASSOBGA",
    prenoms: "Giles-Christ",
    age: 23,
    telephone: "0142011445",
    email: "pierre@example.com",
    role: "Serveur",
  },
  {
    id: "4",
    nom: "ASSOBGA",
    prenoms: "Giles-Christ",
    age: 23,
    telephone: "0142011445",
    email: "pierre@example.com",
    role: "Cuisinier",
  },
];

function UsersPage() {
  const { canAddUsers } = useAuth();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedAge, setSelectedAge] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterUsers(query, selectedRole, selectedAge);
  };

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
    filterUsers(searchQuery, role, selectedAge);
  };

  const handleAgeFilter = (age: string) => {
    setSelectedAge(age);
    filterUsers(searchQuery, selectedRole, age);
  };

  const filterUsers = (
    query: string,
    role: string,
    age: string,
    usersList = users,
  ) => {
    let filtered = usersList;

    if (query) {
      filtered = filtered.filter(
        (user) =>
          user.nom.toLowerCase().includes(query.toLowerCase()) ||
          user.prenoms.toLowerCase().includes(query.toLowerCase()) ||
          user.role?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (role !== "all") {
      filtered = filtered.filter((user) => user.role === role);
    }

    if (age !== "all") {
      // Simple age filtering logic - you can expand this
      const ageNum = parseInt(age);
      filtered = filtered.filter((user) => user.age === ageNum);
    }

    setFilteredUsers(filtered);
  };

  const handleUserAction = (
    action: "view" | "edit" | "delete",
    userId: string,
  ) => {
    console.log(`${action} user with ID: ${userId}`);
    // Implement action handlers here
  };

  const handleNewUser = () => {
    if (!canAddUsers) {
      toast({
        title: "Accès refusé",
        description: "Seul le Supa Admin peut ajouter des utilisateurs",
        variant: "destructive",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleAddUser = (userData: UserFormData) => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      ...userData,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Apply current filters to include new user if it matches
    filterUsers(searchQuery, selectedRole, selectedAge, updatedUsers);

    toast({
      title: "Utilisateur ajouté",
      description: `${userData.prenoms} ${userData.nom} a été ajouté avec succès`,
    });
  };

  return (
    <div className="min-h-screen bg-dashboard-gray flex">
      <UsersSidebar />

      <main className="flex-1 flex flex-col">
        <UsersHeader />

        <div className="flex-1 px-4 lg:px-6 py-4 lg:py-6">
          <h1 className="text-lg lg:text-xl font-semibold text-dashboard-dark mb-4 sm:mb-5 lg:mb-6 pt-2 sm:pt-3 font-poppins">
            Utilisateurs
          </h1>

          {!canAddUsers && (
            <div className="mb-4">
              <PermissionAlert
                message="Vous pouvez consulter les utilisateurs mais seul le Supa Admin peut en ajouter"
                requiredRole="Supa Admin"
              />
            </div>
          )}

          <UsersFilters
            searchQuery={searchQuery}
            selectedRole={selectedRole}
            selectedAge={selectedAge}
            totalUsers={users.length}
            onSearch={handleSearch}
            onRoleFilter={handleRoleFilter}
            onAgeFilter={handleAgeFilter}
            onNewUser={handleNewUser}
            canAddUsers={canAddUsers}
          />

          <div className="mt-4 lg:mt-6">
            <UsersTable users={filteredUsers} onUserAction={handleUserAction} />
          </div>
        </div>
      </main>

      {canAddUsers && (
        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddUser={handleAddUser}
        />
      )}
    </div>
  );
}

export default function Users() {
  return (
    <ProtectedRoute>
      <UsersPage />
    </ProtectedRoute>
  );
}
