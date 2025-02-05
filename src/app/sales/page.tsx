"use client";
import { SaleForm } from "@/components/saleForm";
import { AppDispatch, RootState } from "@/features/store";
import { Printer } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "@/features/saleSlice"
import { useReactToPrint } from "react-to-print";

interface Article {
    nom: string;
    quantite: string;
    prix: string
}

interface SaleState {
    date: string;
    articles: Article[];
    total: string
}

// Composant Facture avec un ref typé
const Facture = forwardRef<HTMLDivElement, { sale: SaleState }>(({ sale }, ref) => (
    <div ref={ref} className="p-5 border">
        <h2>Facture</h2>
        <p><strong>Date:</strong> {sale.date}</p>
        <table>
            <thead>
                <tr>
                    <th>Nom du Produit</th>
                    <th>Quantité</th>
                    <th>Prix Total</th>
                </tr>
            </thead>
            <tbody>
                {sale.articles.map((article, idx) => (
                    <tr key={idx}>
                        <td>{article.nom}</td>
                        <td>{article.quantite}</td>
                        <td>{article.prix} FC</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <p><strong>Total:</strong> {sale.total} FC</p>
    </div>
));

Facture.displayName = "Facture";

export default function Sales() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, sales } = useSelector((state: RootState) => state.sale)

    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Invoice",
        pageStyle: "@page { size: auto; margin: 0mm; }",
        content: () => printRef.current,
    } as any);

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
                                        <td className="flex justify-center">
                                            <Printer size={20} className="cursor-pointer" onClick={() => handlePrint()} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    )
                }
            </table>
            {/* Facture cachée pour l'impression */}
            <div style={{ display: "none" }}>
                {sales!.length > 0 && <Facture sale={sales![0]} ref={printRef} />}
            </div>
        </>
    )
}