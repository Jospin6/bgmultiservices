import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '@/servicces/firebase'

interface ImpressionState {
    date: string;
    totalPapers: string;
    amount: string
}

interface InitialState {
    loading: boolean,
    impression: ImpressionState[] | null,
    error: string
}

const initialState: InitialState = {
    loading: false,
    impression: null,
    error: ""
}

export const addImpression = createAsyncThunk("impression/addImpression", async (data: ImpressionState) => {
    try {
        const docRef = await addDoc(collection(db, "impressions"), data);
        console.log("Impression ajouté avec ID :", docRef.id);
    } catch (e) {
        console.error("Erreur lors de l'ajout :", e);
    }
})

export const fetchImpressions = createAsyncThunk("impression/fetchImpressions", async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "impressions"));
        const impressions = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Impressions récupérés :", impressions);
    } catch (e) {
        console.error("Erreur lors de la récupération :", e);
    }
})

export const updateImpression = createAsyncThunk("impression/updateImpression", async (id: string, data: any) => {
    try {
        const productRef = doc(db, "impressions", id);
        await updateDoc(productRef, data);
        console.log("Impressions mis à jour !");
    } catch (e) {
        console.error("Erreur lors de la mise à jour :", e);
    }
})

export const deleteImpression = createAsyncThunk("impression/deleteImpression", async (id: string) => {
    try {
        await deleteDoc(doc(db, "impressions", id));
        console.log("impression supprimé !");
    } catch (e) {
        console.error("Erreur lors de la suppression :", e);
    }
})

const impressionSlice = createSlice({
    name: "impression",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchImpressions.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchImpressions.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.impression = action.payload
        })
        builder.addCase(fetchImpressions.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default impressionSlice.reducer