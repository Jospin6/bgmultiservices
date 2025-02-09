"use client";

import { useEffect, useState } from "react";
import { addSale } from "@/features/saleSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/features/store";
import { SaleState, Article } from "@/helpers/types";
import { fetchProducts, updateProduct } from "@/features/productSlice";

export const SaleForm = () => {
    const [date, setDate] = useState("");
    const [articles, setArticles] = useState<Article[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const addArticle = () => {
        setArticles([...articles, { nom: "", quantite: 1, prix: 0 }]);
    };

    const handleSubmit = async () => {
        const total = articles.reduce(
            (sum, article) => sum + Number(article.quantite) * Number(article.prix),
            0
        );
        const saleData: SaleState = {
            date: new Date(date).toISOString(),
            articles,
            total,
        };

        dispatch(addSale(saleData));

        // Pour chaque article, mettre à jour le stock du produit
        articles.forEach((article) => {
            const selectedProduct = products?.find(
                (product) => product.nom === article.nom
            );
            if (selectedProduct && selectedProduct.id) {
                // Calculer la nouvelle quantité du produit après la vente
                const newStock = selectedProduct.stock - article.quantite;

                // Appeler la fonction updateProduct avec l'ID et la nouvelle quantité de stock
                dispatch(updateProduct({ id: selectedProduct.id, newStock: newStock }));
            }
        });

        setDate("");
        setArticles([]);
    };

    return (
        <div className="md:px-[10%] px-4">
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
            <button
                onClick={addArticle}
                className="px-[10px] py-[3px] rounded-lg bg-gray-600 my-2 text-gray-100"
            >
                Ajouter un article
            </button>
            {articles.map((article, index) => (
                <div key={index} className="mt-2">
                    <select
                        className="border-[1px] border-gray-300 rounded-lg pl-2 mr-2 mb-2"
                        value={article.nom}
                        onChange={(e) => {
                            const selectedProduct = products?.find(
                                (product) => product.nom === e.target.value
                            );
                            const updatedArticles = [...articles];
                            updatedArticles[index].nom = e.target.value;
                            updatedArticles[index].prix = selectedProduct ? selectedProduct.prix : 0;
                            setArticles(updatedArticles);
                        }}
                    >
                        <option value="">Sélectionner un produit</option>
                        {products?.map((product) => (
                            <option key={product.id} value={product.nom}>
                                {product.nom}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        className="border-[1px] border-gray-300 rounded-lg pl-2 mr-2 mb-2"
                        placeholder="Quantité"
                        value={article.quantite}
                        onChange={(e) => {
                            const updatedArticles = [...articles];
                            updatedArticles[index].quantite = Number(e.target.value);
                            setArticles(updatedArticles);
                        }}
                    />
                    <input
                        type="number"
                        className="border-[1px] border-gray-300 rounded-lg pl-2 mr-2"
                        placeholder="Prix unitaire"
                        value={article.prix}
                        readOnly
                    />
                    <p>Total: {Number(article.quantite) * Number(article.prix)} €</p>
                </div>
            ))}
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="px-[10px] py-[3px] rounded-lg bg-blue-400 my-2 text-gray-100"
                >
                    Ajouter
                </button>
            </div>
        </div>
    );
};
