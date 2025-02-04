import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import productReducer from "./productSlice"
import saleReducer from "./saleSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        sale: saleReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch