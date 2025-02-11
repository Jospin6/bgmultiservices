"use client";
import { AppDispatch, RootState } from "@/features/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImpression } from "@/features/impressionSlice";
import { currentUser } from "@/features/authSlice";

export const ImpressionForm = () => {
    const [nbrPapier, setNbrPapier] = useState<number>(0); // Spécifiez le type  
    const [price, setPrice] = useState<number>(0); // Spécifiez le type  
    const dispatch = useDispatch<AppDispatch>();
    const getCurrentUser = useSelector((state: RootState) => state.auth.user)
    const today = new Date().setUTCHours(0, 0, 0, 0);

    useEffect(() => {
        dispatch(currentUser())
    }, [dispatch]);

    const handleAddImpression = (e: React.FormEvent<HTMLFormElement>) => { // Typage correct de l'événement  
        e.preventDefault();
        dispatch(addImpression({
            totalPapers: nbrPapier,
            amount: price,
            user: getCurrentUser?.name,
            date: new Date(today).toISOString()
        }));
        setPrice(0);
        setNbrPapier(0);
    };

    return (
        <div className="md:px-[10%] px-4">
            <h2 className="w-full bg-blue-400 p-4 rounded-t-lg text-white">{"Rapport d'impression"}</h2>
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