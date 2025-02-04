import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import productReducer from "./productSlice"
import saleReducer from "./saleSlice"
import impressionReducer from "./impressionSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        sale: saleReducer,
        impression: impressionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch