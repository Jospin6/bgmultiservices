"use client";
import { ProductForm } from "@/components/productForm";
import { AppDispatch, RootState } from "@/features/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct, deleteProduct } from "@/features/productSlice";
import { PlusCircle, Trash } from "lucide-react";

interface ProductState {
    id?: string;
    nom: string;
    prix: number;
    stock: number;
}

export default function Products() {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.product);

    // États pour gérer l'ouverture du popup et le produit sélectionné
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductState | null>(null);
    const [newStock, setNewStock] = useState(0); // Pour mettre à jour le stock

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Fonction pour ouvrir le popup avec les données du produit sélectionné
    const handleOpenPopup = (product: ProductState) => {
        setSelectedProduct(product);
        setNewStock(product.stock); // Pré-remplir le stock actuel dans le formulaire
        setShowPopup(true);
    };

    // Fonction pour mettre à jour le stock
    const handleUpdateStock = () => {
        if (selectedProduct) {
            // Mettre à jour le produit avec la nouvelle quantité de stock
            dispatch(updateProduct({
                id: selectedProduct.id!,
                newStock: newStock,
            }));
            // Fermer le popup après la mise à jour
            setShowPopup(false);
        }
    };

    // remove item

    const removeProduct = (id: string) => dispatch(deleteProduct(id))

    return (
        <>
            <div className="text-2xl py-4">produits</div>
            <ProductForm />
            <div className="text-xl py-4">les produits en stock</div>
            <table className="w-full text-center mb-4">
                <thead>
                    <tr className="border-b-[1px] border-gray-300 border-collapse border border-gray-300">
                        <th>Article</th>
                        <th>Prix</th>
                        <th>Stock</th>
                        <th>Encodé par</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                        <tr key={product.id} className="border-[1px] border-gray-300">
                            <td>{product.nom}</td>
                            <td>{product.prix} fc</td>
                            <td>{product.stock} pièces</td>
                            <td>{product.user} </td>
                            <td className="flex justify-center">
                                <PlusCircle
                                    size={20}
                                    onClick={() => handleOpenPopup(product)}
                                    className="cursor-pointer"
                                />
                                <span className="w-[10px]"></span>
                                <Trash size={20} onClick={() => removeProduct(product.id!)} className="cursor-pointer text-red-500" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup pour mettre à jour le stock */}
            {showPopup && selectedProduct && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl mb-4">Mettre à jour le stock</h2>
                        <div className="mb-4">
                            <label className="block">Produit: {selectedProduct.nom}</label>
                        </div>
                        <div className="mb-4">
                            <label className="block">Stock actuel: {selectedProduct.stock}</label>
                            <input
                                type="number"
                                className="border-[1px] border-gray-300 rounded-lg w-full mt-2"
                                value={newStock}
                                onChange={(e) => setNewStock(Number(e.target.value))}
                                min={0}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdateStock}
                                className="bg-blue-400 text-white px-4 py-2 rounded-lg"
                            >
                                Mettre à jour
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="ml-2 bg-gray-400 text-white px-4 py-2 rounded-lg"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
