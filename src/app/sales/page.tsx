"use client";
import { SaleForm } from "@/components/saleForm";
import { AppDispatch, RootState } from "@/features/store";
import { Printer } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "@/features/saleSlice"


export default function Sales() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, sales } = useSelector((state: RootState) => state.sale)

    useEffect(() => {
        dispatch(fetchSales())
    }, [dispatch])

    return (
        <>
            <div className="text-2xl py-4">ventes</div>
            <SaleForm />

            <div className="text-xl py-4">
                les ventes enregistré
            </div>
            <table className="w-full text-center">
                <thead>
                    <tr className="border-b-[1px] border-gray-300">
                        <th>Date</th>
                        <th>Articles</th>
                        <th>Prix total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    loading ? (<div>Loading...</div>) : (
                        <tbody>
                            {
                                sales?.map(sale => (
                                    <tr className="border-b-[1px] border-gray-300">
                                        <td> {sale.date} </td>
                                        <td>
                                            {
                                                sale.articles.map(article => (
                                                    <span> nom: {article.nom}, qté: {article.quantite}, prixTot {article.prix} fc </span>
                                                ))
                                            }
                                        </td>
                                        <td> {sale.total} fc </td>
                                        <td className="flex justify-center"><Printer size={20} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
        </>
    )
}