"use client";
import { ImpressionForm } from "@/components/impressionForm";

export default function Impressions() {
    return (
        <>
            <div className="text-2xl py-4">Impression</div>
            <ImpressionForm />
            <div className="text-xl py-4">
                les impressions
            </div>
            <table className="w-full text-center">
                <thead>
                    <tr className="border-b-[1px] border-gray-300">
                        <th>Nombre des papiers</th>
                        <th>Montant</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b-[1px] border-gray-300">
                        <td>Maraguca</td>
                        <td>3000fc</td>
                        <td className="flex justify-center">dd</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}