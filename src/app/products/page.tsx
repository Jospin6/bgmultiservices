"use client";
import { ProductForm } from "@/components/productForm";
import { AppDispatch, RootState } from "@/features/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/features/productSlice"

export default function Products() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, products } = useSelector((state: RootState) => state.product)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <>
            <div className="text-2xl py-4">produits</div>
            <ProductForm />
            <div className="text-xl py-4">
                les produits en stock
            </div>
            <table className="w-full text-center">
                <thead>
                    <tr className="border-b-[1px] border-gray-300">
                        <th>Article</th>
                        <th>Prix</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map(product => (
                            <tr className="border-b-[1px] border-gray-300">
                                <td> {product.nom} </td>
                                <td>{product.prix} fc</td>
                                <td>{product.stock} pieces</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}