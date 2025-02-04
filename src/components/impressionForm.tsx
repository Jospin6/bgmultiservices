"use client"
import { AppDispatch } from "@/features/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addImpression } from "@/features/impressionSlice";

export const ImpressionForm = () => {
    const [nbrPapier, setNbrPapier] = useState(0);
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddImpression = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(addImpression({ totalPapers: nbrPapier, amount: price, date: new Date("YYYY-MM-DD").toISOString() }));
    };
    return <div className="px-[10%]">
        <h2 className="w-full bg-blue-400 p-4 rounded-t-lg text-white">Rapport d'impression</h2>
        <form onSubmit={handleAddImpression}>
            <div className="mt-2">
                <label htmlFor="nom">Nombre des papier</label>
                <input
                    type="text"
                    id="nom"
                    className="block pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px]"
                    placeholder="Nombre papier"
                    onChange={(e) => setNbrPapier(Number(e.target.value))} />
            </div>
            <div className="mt-2">
                <label htmlFor="prix" className="block">Montant</label>
                <input
                    type="number"
                    id="prix"
                    placeholder="Montant"
                    className="pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px]"
                    onChange={(e) => setPrice(Number(e.target.value))} />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="px-[10px] py-[3px] rounded-lg bg-blue-400 my-2 text-gray-100">Ajouter</button>
            </div>
        </form>
    </div>
}