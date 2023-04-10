import { createSlice } from "@reduxjs/toolkit";

const uiInitialStat = {
    showCart: false
}
const uiSlice = createSlice({
    name: "ui",
    initialState: uiInitialStat,
    reducers: {
        toggle(state) {
            state.showCart = !state.showCart
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice