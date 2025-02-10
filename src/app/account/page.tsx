"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser, deleteUser, logout, currentUser } from "@/features/authSlice";
import { AppDispatch, RootState } from "@/features/store";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Account() {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.auth.users);
    const getCurrentUser = useSelector((state: RootState) => state.auth.user)
    const navigation = useRouter();

    const [newUser, setNewUser] = useState({ name: "", password: "", role: "utilisateur" });

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(currentUser())
    }, [dispatch]);

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createUser(newUser));
        setNewUser({ name: "", password: "", role: "utilisateur" });
    };

    const handleDeleteUser = (id: string) => {
        dispatch(deleteUser(id));
    };

    const handleUserLogout = () => {
        dispatch(logout())
        navigation.push("/connexion")
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Gestion des utilisateurs</h2>

            <div className="mb-4">
                <span className="block">nom: {getCurrentUser?.name}</span>
                <span className="block">role: {getCurrentUser?.role}</span>
            </div>

            <h2 className="text-[20px] font-bold mb-2">Ajouter un nouveau utilisateur</h2>

            <form onSubmit={handleCreateUser} className="mb-6 space-y-2">
                <input
                    type="text"
                    placeholder="Nom"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="border p-2 rounded w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="border p-2 rounded w-full"
                    required
                />
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="border p-2 rounded w-full"
                >
                    <option value="caissier">Caissier</option>
                    <option value="impression">Impression</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Créer un utilisateur</button>
            </form>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Nom</th>
                        <th className="border p-2">Rôle</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="text-center">
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2">
                                <button onClick={() => handleDeleteUser(user.id!)} className="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <span className="flex text-red-500 mt-4 cursor-pointer" onClick={handleUserLogout}><LogOut /> Deconnexion</span>
            </div>
        </div>
    );
}
