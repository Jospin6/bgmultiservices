"use client";
import { ProductForm } from "@/components/productForm";

export default function Products() {
    return (
        <>
            <div className="text-2xl py-4">produits</div>
            <ProductForm/>
            <div className="text-xl py-4">
                les produits en stock
            </div>
            <table className="w-full text-center">
                <thead>
                    <tr className="border-b-[1px] border-gray-300">
                        <th>Article</th>
                        <th>Prix</th>
                        <th>Stock</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b-[1px] border-gray-300">
                        <td>Maraguca</td>
                        <td>3000fc</td>
                        <td>2</td>
                        <td>12/2/2025</td>
                        <td className="flex justify-center">dd</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}