"use client";
import { ImpressionForm } from "@/components/impressionForm";
import { AppDispatch, RootState } from "@/features/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImpressions, deleteImpression } from "@/features/impressionSlice"
import { parseISODate } from "@/helpers/date"
import { Trash } from "lucide-react";

export default function Impressions() {
    const dispatch = useDispatch<AppDispatch>();
    const { impression } = useSelector((state: RootState) => state.impression)

    useEffect(() => {
        dispatch(fetchImpressions())
    }, [dispatch])

    // remove item
    
      const removeImpression = (id: string) => dispatch(deleteImpression(id))

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
                        <th>Date</th>
                        <th>Nombre des papiers</th>
                        <th>Montant</th>
                        <th>Encodé par</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        impression?.map(impr => (
                            <tr className="border-b-[1px] border-gray-300" key={impr.id}>
                                <td> {parseISODate(impr.date)} </td>
                                <td> {impr.totalPapers} </td>
                                <td> {impr.amount} fc </td>
                                <td> {impr.user} </td>
                                <td className="flex justify-center">
                                    <Trash size={20} className="text-red-500" onClick={()=> removeImpression(impr.id!)}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}