import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '@/servicces/firebase'
import { error } from "console";

interface Article {
    nom: string;
    quantite: string;
    prix: string
}

interface SaleState {
    date: string | null;
    articles: Article[] | null;
    total: string | null
}

interface InitialState {
    loading: boolean,
    sales: SaleState[] | null,
    error: string
}

const initialState: InitialState = {
    loading: false,
    sales: null,
    error: ""
}

export const addSale = createAsyncThunk("sale/addSale", async (data: SaleState) => {
    try {
        const docRef = await addDoc(collection(db, "sales"), data);
        console.log("Vente ajouté avec ID :", docRef.id);
    } catch (e) {
        console.error("Erreur lors de l'ajout :", e);
    }
})

export const fetchSales = createAsyncThunk("sale/fetchSales", async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "sales"));
        const produits = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("ventes récupérés :", produits);
    } catch (e) {
        console.error("Erreur lors de la récupération :", e);
    }
})

export const updateSale = createAsyncThunk("sale/updateSale", async (id: string, data: any) => {
    try {
        const productRef = doc(db, "sales", id);
        await updateDoc(productRef, data);
        console.log("Vente mis à jour !");
    } catch (e) {
        console.error("Erreur lors de la mise à jour :", e);
    }
})

export const deleteSale = createAsyncThunk("sale/deleteSale", async (id: string) => {
    try {
        await deleteDoc(doc(db, "sales", id));
        console.log("Vente supprimé !");
    } catch (e) {
        console.error("Erreur lors de la suppression :", e);
    }
})

const saleSlice = createSlice({
    name: "sale",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSales.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSales.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.sales = action.payload
        })
        builder.addCase(fetchSales.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default saleSlice.reducer