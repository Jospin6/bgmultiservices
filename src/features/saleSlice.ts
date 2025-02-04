import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from "firebase/firestore";
import { db } from '@/servicces/firebase'
import dayjs from "dayjs";

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

// Fonction pour obtenir le nombre de ventes du jour
export const fetchSalesCountToday = createAsyncThunk("sale/fetchSalesCountToday", async () => {
    const today = dayjs().format("YYYY-MM-DD");
    const salesRef = collection(db, "sales");
    const q = query(salesRef, where("date", "==", today));
    const snapshot = await getDocs(q);
    return snapshot.docs.length; // Nombre de ventes du jour
});

// Fonction pour obtenir le nombre total de ventes
export const fetchTotalSalesCount = createAsyncThunk("sale/fetchTotalSalesCount", async () => {
    const salesRef = collection(db, "sales");
    const snapshot = await getDocs(salesRef);
    return snapshot.docs.length; // Nombre total de ventes
});

// Fonction pour obtenir le montant total des ventes du jour
export const fetchSalesAmountToday = createAsyncThunk("sale/amountToday", async () => {
    const today = dayjs().format("YYYY-MM-DD");
    const salesRef = collection(db, "sales");
    const q = query(salesRef, where("date", "==", today));
    const snapshot = await getDocs(q);

    let totalAmount = 0;
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        totalAmount += data.articles.reduce((acc: any, article: { total: any; }) => acc + article.total, 0);
    });

    return totalAmount; // Montant total des ventes du jour
});

// Fonction pour obtenir le montant total de toutes les ventes
export const fetchTotalSalesAmount = createAsyncThunk("sale/totalAmount", async () => {
    const salesRef = collection(db, "sales");
    const snapshot = await getDocs(salesRef);

    let totalAmount = 0;
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        totalAmount += data.articles.reduce((acc: any, article: { total: any; }) => acc + article.total, 0);
    });

    return totalAmount;
});

// Fonction pour récupérer les 10 dernières ventes
export const fetchLast10Sales = createAsyncThunk("sale/last10", async () => {
    const salesRef = collection(db, "sales");
    const q = query(salesRef, orderBy("created_at", "desc"), limit(10));
    const snapshot = await getDocs(q);

    const last10Sales = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return last10Sales;
});

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