"use client"
import { useState } from "react";

export const SaleForm = () => {
    const [date, setDate] = useState("");
    const [articles, setArticles] = useState<{ name: string; quantity: number; unitPrice: number; totalPrice: number }[]>([]);

    const addArticle = () => {
        setArticles([...articles, { name: "", quantity: 1, unitPrice: 0, totalPrice: 0 }]);
    };
    return <div className="px-[10%]">
        <h2 className="w-full bg-blue-400 p-4 rounded-t-lg text-white">Ajouter une vente</h2>
        <div className="mt-2">
            <label htmlFor="datejour">Date du jour</label>
            <input
                type="date"
                id="datejour"
                className="block border-[1px] border-gray-300 w-full rounded-lg h-[35px]"
                onChange={(e) => setDate(e.target.value)} />
        </div>
        <button onClick={addArticle} className="px-[10px] py-[3px] rounded-lg bg-gray-600 my-2 text-gray-100">Ajouter un article</button>
        {articles.map((article, index) => (
            <div key={index}>
                <input type="text" className="border-[1px] border-gray-300 rounded-lg pl-2 mr-2" placeholder="Nom du produit" onChange={(e) => {
                    const updatedArticles = [...articles];
                    updatedArticles[index].name = e.target.value;
                    setArticles(updatedArticles);
                }} />
                <input type="number" className="border-[1px] border-gray-300 rounded-lg pl-2 mr-2" placeholder="Quantité" onChange={(e) => {
                    const updatedArticles = [...articles];
                    updatedArticles[index].quantity = Number(e.target.value);
                    updatedArticles[index].totalPrice = updatedArticles[index].quantity * updatedArticles[index].unitPrice;
                    setArticles(updatedArticles);
                }} />
                <input type="number" className="border-[1px] border-gray-300 rounded-lg pl-2 mr-2" placeholder="Prix unitaire" onChange={(e) => {
                    const updatedArticles = [...articles];
                    updatedArticles[index].unitPrice = Number(e.target.value);
                    updatedArticles[index].totalPrice = updatedArticles[index].quantity * updatedArticles[index].unitPrice;
                    setArticles(updatedArticles);
                }} />
                <p>Total: {articles[index].totalPrice} €</p>
            </div>
        ))}
        <div className="flex justify-end">
            <button className="px-[10px] py-[3px] rounded-lg bg-blue-400 my-2 text-gray-100">Ajouter</button>
        </div>
    </div>
}