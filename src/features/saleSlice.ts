import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from "firebase/firestore";
import { db } from '@/servicces/firebase'
import { SaleState } from "@/helpers/types"

interface InitialState {
    loading: boolean,
    salesCountToday: number | null,
    totalSalesCount: number | null,
    salesAmountToday: number | null,
    totalSalesAmount: number | null,
    salesLast7Days: any[] | null,
    salesByProduct: any[] | null,
    sales: SaleState[] | null,
    error: string
}

const initialState: InitialState = {
    loading: false,
    salesLast7Days: [],
    sales: null,
    error: "",
    salesByProduct: [],
    salesCountToday: 0,
    totalSalesCount: 0,
    salesAmountToday: 0,
    totalSalesAmount: 0
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
        return produits;
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
    // Obtenir la date d'aujourd'hui au format souhaité  
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = String(today.getUTCMonth() + 1).padStart(2, '0'); // Mois de 0 à 11, donc ajouter 1  
    const day = String(today.getUTCDate()).padStart(2, '0');
    const todayISOString = `${year}-${month}-${day}T00:00:00.000Z`; // Format souhaité  

    const salesRef = collection(db, "sales");
    const q = query(salesRef, where("date", "==", todayISOString));
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
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = String(today.getUTCMonth() + 1).padStart(2, '0'); // Mois de 0 à 11, donc ajouter 1  
    const day = String(today.getUTCDate()).padStart(2, '0');
    const todayISOString = `${year}-${month}-${day}T00:00:00.000Z`; // Convertir en format ISO  

    const salesRef = collection(db, "sales");
    const q = query(salesRef, where("date", "==", todayISOString));
    const snapshot = await getDocs(q);

    let totalAmount: number = 0;
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        totalAmount += data.total;
    });

    return totalAmount; // Montant total des ventes du jour  
});

// Fonction pour obtenir le montant total de toutes les ventes
export const fetchTotalSalesAmount = createAsyncThunk("sale/totalAmount", async () => {
    const salesRef = collection(db, "sales");
    const snapshot = await getDocs(salesRef);

    let totalAmount: number = 0;
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        totalAmount += data.total;
    });

    return totalAmount;
});

// Fonction pour récupérer les 10 dernières ventes
export const fetchLast10Sales = createAsyncThunk("sale/last10", async () => {
    const salesRef = collection(db, "sales");
    const q = query(salesRef, orderBy("date", "desc"), limit(10));
    const snapshot = await getDocs(q);

    const last10Sales = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return last10Sales;
});

// Fonction pour récupérer les ventes des 7 derniers jours
export const fetchSalesLast7Days = createAsyncThunk("sale/last7Days", async () => {
    // Calcul de la date de début pour les 7 derniers jours (sans dayjs)  
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - 7); // Soustraire 7 jours  
    startDate.setHours(0, 0, 0, 0); // Mettre à zéro l'heure  

    // Formatage de la date de début pour correspondre au format requis  
    const startDateISOString = `${startDate.getUTCFullYear()}-${String(startDate.getUTCMonth() + 1).padStart(2, '0')}-${String(startDate.getUTCDate()).padStart(2, '0')}T00:00:00.000Z`;

    const salesRef = collection(db, "sales");
    const q = query(salesRef, where("date", ">=", startDateISOString)); // Utilisation du format ISO  
    const snapshot = await getDocs(q);

    // Initialisation des données des 7 derniers jours  
    let salesData: { [key: string]: number } = {};

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        const formattedDate = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}T00:00:00.000Z`; // Format "YYYY-MM-DDTHH:mm:ss.sssZ"  
        salesData[formattedDate.split("T")[0]] = 0; // Utiliser seulement la partie date  
    }

    // Traitement des ventes pour chaque jour  
    snapshot.docs.forEach((doc) => {
        const data = doc.data();

        // Conversion de la date de la vente  
        const saleDateObj = new Date(data.date); // Supposé être une date au format ISO  
        const saleDateISOString = `${saleDateObj.getUTCFullYear()}-${String(saleDateObj.getUTCMonth() + 1).padStart(2, '0')}-${String(saleDateObj.getUTCDate()).padStart(2, '0')}T00:00:00.000Z`; // Format "YYYY-MM-DDTHH:mm:ss.sssZ"  
        const saleDate = saleDateISOString.split("T")[0]; // Format "YYYY-MM-DD"  

        // Vérifier si la date appartient aux 7 derniers jours  
        if (salesData.hasOwnProperty(saleDate)) {
            salesData[saleDate] += data.total;
        }
    });

    return salesData;
});

export const fetchSalesByProduct = createAsyncThunk("sale/byProduct", async () => {
    const salesRef = collection(db, "sales");
    const snapshot = await getDocs(salesRef);

    let productSales: { [key: string]: number } = {};

    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        data.articles.forEach((article: { nom: string | number; total: any; }) => {
            if (!productSales[article.nom]) {
                productSales[article.nom] = 0;
            }
            productSales[article.nom] += article.total;
        });
    });

    return productSales;
});

const saleSlice = createSlice({
    name: "sale",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addSale.pending, (state) => {
                state.loading = true;
            })
            .addCase(addSale.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addSale.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSales.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSales.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.sales = action.payload;
            })
            .addCase(fetchSales.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateSale.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSale.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateSale.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteSale.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSale.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteSale.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSalesCountToday.fulfilled, (state, action: PayloadAction<any>) => {
                state.salesCountToday = action.payload;
            })
            .addCase(fetchTotalSalesCount.fulfilled, (state, action: PayloadAction<any>) => {
                state.totalSalesCount = action.payload;
            })
            .addCase(fetchSalesAmountToday.fulfilled, (state, action: PayloadAction<any>) => {
                state.salesAmountToday = action.payload;
            })
            .addCase(fetchTotalSalesAmount.fulfilled, (state, action: PayloadAction<any>) => {
                state.totalSalesAmount = action.payload;
            })
            .addCase(fetchLast10Sales.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.sales = action.payload;
            })
            .addCase(fetchSalesLast7Days.fulfilled, (state, action: PayloadAction<any>) => {
                state.salesLast7Days = action.payload;
            })
            .addCase(fetchSalesByProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.salesByProduct = action.payload;
            });
    }
});

export default saleSlice.reducer;