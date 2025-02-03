"use client"
import { useState } from "react";
// import { login } from "../services/authService";
import { useDispatch } from "react-redux";
// import { setUser } from "../features/userSlice";
// import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
//   const router = useRouter();

//   const handleLogin = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     const user = await login(email, password);
//     if (user) {
//       dispatch(setUser(user));
//       router.push("/dashboard");
//     } else {
//       alert("Échec de la connexion");
//     } onSubmit={handleLogin}
//   };

  return (
    <div>
      <h2>Connexion</h2>
      <form >
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}