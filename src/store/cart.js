import { createSlice } from "@reduxjs/toolkit";

const cartInitialStat = {
    showCart: false
}
const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialStat,
    reducers: {
        showCart(state) {
            state.showCart = !state.showCart
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer