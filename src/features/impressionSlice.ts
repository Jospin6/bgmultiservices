import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { db } from '@/servicces/firebase';
import dayjs from "dayjs";

interface ImpressionState {
    id?: string;
    date: string;
    user?: string;
    totalPapers: number;
    amount: number;
}

interface InitialState {
    loading: boolean;
    impressionsAmountCurrentMonth: number | null,
    printedPapersCountCurrentMonth: number | null,
    impression: ImpressionState[] | null;
    nbrImprDay: number | null,
    sumImprDay: number,
    allImprDay: ImpressionState[] | null;
    error: string;
}

const initialState: InitialState = {
    loading: false,
    impression: null,
    error: "",
    impressionsAmountCurrentMonth: 0,
    printedPapersCountCurrentMonth: 0,
    nbrImprDay: 0,
    sumImprDay: 0,
    allImprDay: []
};

export const addImpression = createAsyncThunk("impression/addImpression", async (data: ImpressionState) => {
    const docRef = await addDoc(collection(db, "impressions"), data);
    return { id: docRef.id, ...data };
});

export const fetchImpressions = createAsyncThunk("impression/fetchImpressions", async () => {
    const querySnapshot = await getDocs(collection(db, "impressions"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

// export const updateImpression = createAsyncThunk("impression/updateImpression", async ({ id, data }: { id: string; data: any }) => {
//     const productRef = doc(db, "impressions", id);
//     await updateDoc(productRef, data);
//     return { id, ...data };
// });

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

export const fetchSumDayImpressions = createAsyncThunk("impression/fetchSumDayImpressions", async (date: string) => {
    const impressionsRef = collection(db, "impressions");
    const q = query(impressionsRef, where("date", "==", date));
    const snapshot = await getDocs(q);

    let totalAmount: number = 0;
    snapshot.docs.forEach((doc) => {
        totalAmount += doc.data().amount || 0;
    });
    return totalAmount;
});

export const fetchCountDayImpressions = createAsyncThunk("impression/fetchCountDayImpressions", async (date: string) => {
    const impressionsRef = collection(db, "impressions");
    const q = query(impressionsRef, where("date", "==", date));
    const snapshot = await getDocs(q);

    let totalPrintedPapers: number = 0;
    snapshot.docs.forEach((doc) => {
        totalPrintedPapers += doc.data().totalPapers || 0;
    });
    return totalPrintedPapers;
});

export const fetchAllDaysImpressions = createAsyncThunk("impression/fetchAllDaysImpressions", async (date: string) => {
    const impressionsRef = collection(db, "impressions");
    const q = query(impressionsRef, where("date", "==", date));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
        builder.addCase(deleteImpression.fulfilled, (state, action: PayloadAction<string>) => {
            if (state.impression) {
                state.impression = state.impression.filter(imp => imp.id !== action.payload);
            }
        });
        builder.addCase(fetchImpressionsAmountCurrentMonth.fulfilled, (state, action: PayloadAction<any>) => {
            state.impressionsAmountCurrentMonth = action.payload
        });
        builder.addCase(fetchPrintedPapersCountCurrentMonth.fulfilled, (state, action: PayloadAction<number>) => {
            state.printedPapersCountCurrentMonth = action.payload;
        });

        builder.addCase(fetchSumDayImpressions.fulfilled, (state, action: PayloadAction<number>) => {
            state.sumImprDay = action.payload;
        });
        builder.addCase(fetchCountDayImpressions.fulfilled, (state, action: PayloadAction<number>) => {
            state.nbrImprDay = action.payload;
        });
        builder.addCase(fetchAllDaysImpressions.fulfilled, (state, action: PayloadAction<any>) => {
            state.allImprDay = action.payload;
        });
    }
});

export default impressionSlice.reducer;
