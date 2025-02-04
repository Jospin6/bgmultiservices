import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '@/servicces/firebase'


interface ProductState {
    nom: string;
    prix: number;
    stock: number;
}

interface InitialState {
    loading: boolean,
    products: ProductState[] | null,
    error: string
}

const initialState: InitialState = {
    loading: false,
    products: null,
    error: ""
}

export const addProduct = createAsyncThunk("product/addProduct", async (data: ProductState) => {
    try {
        const docRef = await addDoc(collection(db, "products"), data);
        console.log("Produit ajouté avec ID :", docRef.id);
    } catch (e) {
        console.error("Erreur lors de l'ajout :", e);
    }
})

export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Produits récupérés :", products);
    } catch (e) {
        console.error("Erreur lors de la récupération :", e);
    }
})

export const updateProduct = createAsyncThunk("product/updateProduct", async (id: string, newStock: any) => {
    try {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, {
            stock: newStock,
        });
        console.log("Produit mis à jour !");
    } catch (e) {
        console.error("Erreur lors de la mise à jour :", e);
    }
})

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id: string) => {
    try {
        await deleteDoc(doc(db, "products", id));
        console.log("Produit supprimé !");
    } catch (e) {
        console.error("Erreur lors de la suppression :", e);
    }
})

// Fonction pour obtenir le nombre total de produits en stock
export const fetchTotalProductsInStock = createAsyncThunk("product/totalStock", async () => {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    let totalStock = 0;
    snapshot.docs.forEach((doc) => {
        totalStock += doc.data().stock || 0;
    });

    return totalStock; // Nombre total de produits en stock
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default productSlice.reducer