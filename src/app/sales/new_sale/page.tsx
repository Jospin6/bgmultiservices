"use client"
import { useState } from "react";

export default function NewSale() {
  const [date, setDate] = useState("");
  const [articles, setArticles] = useState<{ name: string; quantity: number; unitPrice: number; totalPrice: number }[]>([]);

  const addArticle = () => {
    setArticles([...articles, { name: "", quantity: 1, unitPrice: 0, totalPrice: 0 }]);
  };

  return (
    <div>
      <h2>Vente</h2>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={addArticle}>Ajouter un article</button>
      {articles.map((article, index) => (
        <div key={index}>
          <input type="text" placeholder="Nom du produit" onChange={(e) => {
            const updatedArticles = [...articles];
            updatedArticles[index].name = e.target.value;
            setArticles(updatedArticles);
          }} />
          <input type="number" placeholder="Quantité" onChange={(e) => {
            const updatedArticles = [...articles];
            updatedArticles[index].quantity = Number(e.target.value);
            updatedArticles[index].totalPrice = updatedArticles[index].quantity * updatedArticles[index].unitPrice;
            setArticles(updatedArticles);
          }} />
          <input type="number" placeholder="Prix unitaire" onChange={(e) => {
            const updatedArticles = [...articles];
            updatedArticles[index].unitPrice = Number(e.target.value);
            updatedArticles[index].totalPrice = updatedArticles[index].quantity * updatedArticles[index].unitPrice;
            setArticles(updatedArticles);
          }} />
          <p>Total: {articles[index].totalPrice} €</p>
        </div>
      ))}
    </div>
  );
}