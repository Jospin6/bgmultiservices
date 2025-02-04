"use client"
import { AppDispatch } from "@/features/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {loginUser} from "@/features/authSlice";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(loginUser({ name, password }));
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin} >
        <input type="text" placeholder="Votre nom" onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}