"use client"
import { AppDispatch, RootState } from "@/features/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/productSlice";
import { currentUser } from "@/features/authSlice";

export const ProductForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const getCurrentUser = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        dispatch(currentUser())
    }, [dispatch]);

    const handleAddProduct = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(addProduct({ nom: name, prix: price, stock: stock, user: getCurrentUser?.name }));
    };
    return <div className="md:px-[10%] px-4">
        <h2 className="w-full bg-blue-400 p-4 rounded-t-lg text-white">Ajouter un Produit</h2>
        <form onSubmit={handleAddProduct}>
            <div className="mt-2">
                <label htmlFor="nom">Nom du produit</label>
                <input
                    type="text"
                    id="nom"
                    className="block pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px]"
                    placeholder="Nom"
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="mt-2 col-span-2">
                    <label htmlFor="prix" className="block">Prix du produit</label>
                    <input
                        type="number"
                        id="prix"
                        placeholder="Prix"
                        className="pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px]"
                        onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div className="mt-2 col-span-2">
                    <label htmlFor="stock" className="block">Quantité en stock</label>
                    <input
                        type="number"
                        id="stock"
                        placeholder="Stock"
                        className="pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px]"
                        onChange={(e) => setStock(Number(e.target.value))} />
                </div>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="px-[10px] py-[3px] rounded-lg bg-blue-400 my-2 text-gray-100">Ajouter</button>
            </div>
        </form>
    </div>
}