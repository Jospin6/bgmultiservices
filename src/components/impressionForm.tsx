"use client";
import { AppDispatch } from "@/features/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addImpression } from "@/features/impressionSlice";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

export const ImpressionForm = () => {
    const [nbrPapier, setNbrPapier] = useState<number>(0); // Spécifiez le type  
    const [price, setPrice] = useState<number>(0); // Spécifiez le type  
    const dispatch = useDispatch<AppDispatch>();

    const handleAddImpression = (e: React.FormEvent<HTMLFormElement>) => { // Typage correct de l'événement  
        e.preventDefault();
        dispatch(addImpression({
            totalPapers: nbrPapier,
            amount: price,
            date: new Date().toISOString()  
        }));
        setPrice(0);
        setNbrPapier(0);
    };

    return (
        <div className="px-[10%]">
            <h2 className="w-full bg-blue-400 p-4 rounded-t-lg text-white">Rapport d'impression</h2>
            <form onSubmit={handleAddImpression}> {/* Ajoutez onSubmit au formulaire */}
                <div className="mt-2">
                    <label htmlFor="nom">Nombre de papiers</label>
                    <input
                        type="number"
                        id="nom"
                        className="block pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px]"
                        placeholder="Nombre de papiers"
                        onChange={(e) => setNbrPapier(Number(e.target.value))}
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="prix" className="block">Montant</label>
                    <input
                        type="number"
                        id="prix"
                        placeholder="Montant"
                        className="pl-2 border-[1px] border-gray-300 w-full rounded-lg h-[35px]"
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-[10px] py-[3px] rounded-lg bg-blue-400 my-2 text-gray-100">
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
    );
};