import { configureStore } from "@reduxjs/toolkit"
import cartSliceReducers from "./cart"

const store = configureStore({
    reducer: {showCart: cartSliceReducers }
})

export default store
