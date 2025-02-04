import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from '@/servicces/firebase';
import dayjs from "dayjs";

interface ImpressionState {
    date: string;
    totalPapers: number;
    amount: number;
}

interface InitialState {
    loading: boolean;
    impression: ImpressionState[] | null;
    error: string;
}

const initialState: InitialState = {
    loading: false,
    impression: null,
    error: ""
};

export const addImpression = createAsyncThunk("impression/addImpression", async (data: ImpressionState) => {
    const docRef = await addDoc(collection(db, "impressions"), data);
    return { id: docRef.id, ...data };
});

export const fetchImpressions = createAsyncThunk("impression/fetchImpressions", async () => {
    const querySnapshot = await getDocs(collection(db, "impressions"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const updateImpression = createAsyncThunk("impression/updateImpression", async ({ id, data }: { id: string; data: any }) => {
    const productRef = doc(db, "impressions", id);
    await updateDoc(productRef, data);
    return { id, ...data };
});

export const deleteImpression = createAsyncThunk("impression/deleteImpression", async (id: string) => {
    await deleteDoc(doc(db, "impressions", id));
    return id;
});

export const fetchImpressionsAmountCurrentMonth = createAsyncThunk("impression/amountCurrentMonth", async () => {
    const startOfMonth = dayjs().startOf("month").format("YYYY-MM");
    const impressionsRef = collection(db, "impressions");
    const q = query(impressionsRef, where("date", ">=", startOfMonth));
    const snapshot = await getDocs(q);
    let totalAmount = 0;
    snapshot.docs.forEach((doc) => {
        totalAmount += doc.data().amount || 0;
    });
    return totalAmount;
});

export const fetchPrintedPapersCountCurrentMonth = createAsyncThunk("impression/papersCountCurrentMonth", async () => {
    const startOfMonth = dayjs().startOf("month").format("YYYY-MM");
    const impressionsRef = collection(db, "impressions");
    const q = query(impressionsRef, where("date", ">=", startOfMonth));
    const snapshot = await getDocs(q);
    let totalPrintedPapers = 0;
    snapshot.docs.forEach((doc) => {
        totalPrintedPapers += doc.data().totalPapers || 0;
    });
    return totalPrintedPapers;
});

const impressionSlice = createSlice({
    name: "impression",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchImpressions.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchImpressions.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.impression = action.payload;
        });
        builder.addCase(fetchImpressions.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload || 'An error occurred';
        });
        builder.addCase(addImpression.fulfilled, (state, action: PayloadAction<ImpressionState>) => {
            state.impression = state.impression ? [...state.impression, action.payload] : [action.payload];
        });
        builder.addCase(updateImpression.fulfilled, (state, action: PayloadAction<ImpressionState>) => {
            if (state.impression) {
                state.impression = state.impression.map(imp => imp.date === action.payload.date ? action.payload : imp);
            }
        });
        builder.addCase(deleteImpression.fulfilled, (state, action: PayloadAction<string>) => {
            if (state.impression) {
                state.impression = state.impression.filter(imp => imp.date !== action.payload);
            }
        });
        builder.addCase(fetchImpressionsAmountCurrentMonth.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(fetchPrintedPapersCountCurrentMonth.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.error = "";
        });
    }
});

export default impressionSlice.reducer;
