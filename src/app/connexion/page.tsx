"use client"
import { AppDispatch } from "@/features/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/features/authSlice";
import { useRouter } from "next/navigation";

export default function Connexion() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useRouter()

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    try {
      const result = await dispatch(loginUser({ name, password })).unwrap();
  
      if (result) {
        navigation.push("/");
      } else {
        console.error("Identifiants incorrects");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <div className="w-[300px] mt-4 m-auto">
      <h2 className="text-2xl pb-4">Connexion</h2>
      <form onSubmit={handleLogin} >
        <input type="text" placeholder="Votre nom" className="block pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px] mb-2" onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="Mot de passe" className="block pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px]" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="px-[10px] py-[3px] rounded-lg bg-blue-400 my-2 text-gray-100">Se connecter</button>
      </form>
    </div>
  );
}