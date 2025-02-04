"use client";
import { SaleForm } from "@/components/saleForm";
import { Printer } from "lucide-react";


export default function Sales() {
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
                        <th>Article</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b-[1px] border-gray-300">
                        <td>Maraguca</td>
                        <td>4</td>
                        <td>3000fc</td>
                        <td>12/2/2025</td>
                        <td className="flex justify-center"><Printer size={20}/></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}