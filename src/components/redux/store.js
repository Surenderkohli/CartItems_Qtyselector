import { configureStore } from '@reduxjs/toolkit'
import { itemReducer, itemSlice } from './slices/itemSlice'
export const store=configureStore({
    reducer:{
        items:itemSlice

    }
})