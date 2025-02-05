"use client";
import { ImpressionForm } from "@/components/impressionForm";
import { AppDispatch, RootState } from "@/features/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImpressions } from "@/features/impressionSlice"
import {parseISODate} from "@/helpers/date"

export default function Impressions() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, impression } = useSelector((state: RootState) => state.impression)

    useEffect(() => {
        dispatch(fetchImpressions())
    }, [])

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
                    </tr>
                </thead>
                <tbody>
                    {
                        impression?.map(impr => (
                            <tr className="border-b-[1px] border-gray-300" key={impr.id}>
                                <td> {parseISODate(impr.date)} </td>
                                <td> {impr.totalPapers} </td>
                                <td> {impr.amount} fc </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}