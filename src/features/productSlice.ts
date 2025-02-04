import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '@/servicces/firebase';

interface ProductState {
    id?: string;
    nom: string;
    prix: number;
    stock: number;
}

interface InitialState {
    loading: boolean;
    products: ProductState[] | null;
    error: string;
}

const initialState: InitialState = {
    loading: false,
    products: null,
    error: ""
};

export const addProduct = createAsyncThunk("product/addProduct", async (data: ProductState) => {
    const docRef = await addDoc(collection(db, "products"), data);
    return { id: docRef.id, ...data };
});

export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const updateProduct = createAsyncThunk("product/updateProduct", async ({ id, newStock }: { id: string; newStock: number }) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { stock: newStock });
    return { id, newStock };
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    return id;
});

export const fetchTotalProductsInStock = createAsyncThunk("product/totalStock", async () => {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    let totalStock = 0;
    snapshot.docs.forEach((doc) => {
        totalStock += doc.data().stock || 0;
    });
    return totalStock;
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(addProduct.fulfilled, (state, action: PayloadAction<ProductState>) => {
            state.products = state.products ? [...state.products, action.payload] : [action.payload];
        });
        builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<{ id: string; newStock: number }>) => {
            if (state.products) {
                state.products = state.products.map(prod => prod.id === action.payload.id ? { ...prod, stock: action.payload.newStock } : prod);
            }
        });
        builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
            if (state.products) {
                state.products = state.products.filter(prod => prod.id !== action.payload);
            }
        });
        builder.addCase(fetchTotalProductsInStock.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.error = "";
        });
    }
});

export default productSlice.reducer;