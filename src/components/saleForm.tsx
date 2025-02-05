"use client";

import { useState } from "react";
import { addSale } from "@/features/saleSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/features/store";
import {SaleState, Article } from "@/helpers/types"
import { Timestamp } from "firebase/firestore";


export const SaleForm = () => {
    const [date, setDate] = useState("");
    const [articles, setArticles] = useState<Article[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    const addArticle = () => {
        setArticles([...articles, { nom: "", quantite: 1, prix: 0 }]);
    };
    const handleSubmit = async () => {
        const total = articles.reduce((sum, article) => sum + Number(article.quantite) * Number(article.prix), 0);
        const saleData: SaleState = {
            date: new Date(date).toISOString(),
            articles,
            total
        };

        dispatch(addSale(saleData));
        setDate("");
        setArticles([]);
    };

    return (
        <div className="px-[10%]">
            <h2 className="w-full bg-blue-400 p-4 rounded-t-lg text-white">Ajouter une vente</h2>
            <div className="mt-2">
                <label htmlFor="datejour">Date du jour</label>
                <input
                    type="date"
                    id="datejour"
                    className="block border-[1px] border-gray-300 w-full rounded-lg h-[35px]"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button onClick={addArticle} className="px-[10px] py-[3px] rounded-lg bg-gray-600 my-2 text-gray-100">Ajouter un article</button>
            {articles.map((article, index) => (
                <div key={index} className="mt-2">
                    <input type="text" className="border-[1px] border-gray-300 rounded-lg pl-2 mr-2" placeholder="Nom du produit" value={article.nom} onChange={(e) => {
                        const updatedArticles = [...articles];
                        updatedArticles[index].nom = e.target.value;
                        setArticles(updatedArticles);
                    }} />
                    <input type="number" className="border-[1px] border-gray-300 rounded-lg pl-2 mr-2" placeholder="Quantité" value={article.quantite} onChange={(e) => {
                        const updatedArticles = [...articles];
                        updatedArticles[index].quantite = Number(e.target.value);
                        setArticles(updatedArticles);
                    }} />
                    <input type="number" className="border-[1px] border-gray-300 rounded-lg pl-2 mr-2" placeholder="Prix unitaire" value={article.prix} onChange={(e) => {
                        const updatedArticles = [...articles];
                        updatedArticles[index].prix = Number(e.target.value);
                        setArticles(updatedArticles);
                    }} />
                    <p>Total: {Number(article.quantite) * Number(article.prix)} €</p>
                </div>
            ))}
            <div className="flex justify-end">
                <button onClick={handleSubmit} className="px-[10px] py-[3px] rounded-lg bg-blue-400 my-2 text-gray-100">Ajouter</button>
            </div>
        </div>
    );
};
