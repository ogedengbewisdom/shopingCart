import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const cartInitialState = {
    items: [],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        replaceCart (state, action) {
            state.items = action.payload.items
        },
        addItemToCart ( state, action ) { 
            const newItem = action.payload;
            const existingItem = state.items.find( item => item.id === newItem.id ) 
            state.totalQuantity++;
            
// check if item already exist in the array if not add new item if it does exist increase the quantity by 1 and the newPrice to the existing item

            if ( !existingItem ) { 
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },

        removeItemFromCart ( state, action ) { 
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity--;
            
            if ( existingItem.quantity === 1 ) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        }
    }
})


export const sendCartData = ( cart ) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            title: "Sending...",
            status: "pending",
            message: "sending cart data!"
        }))

        const sendRequest = async () => {
            const response = await fetch(`https://advanceredux-8aa58-default-rtdb.firebaseio.com/cart.json`, {
                method: "PUT",
                body: JSON.stringify(cart)
            })

            if ( !response.ok ) {
                throw new Error("Error 404")
            }
        }

        try {
            await sendRequest()
            dispatch(uiActions.showNotification({
                title: "Success",
                status: "success",
                message: "sent cart data!"
            }))
        } 

        catch(error) {
            dispatch(uiActions.showNotification({
                title: "Error 404",
                message: error.message,
                status: "error"
            }))
        }
    }
}


export const cartActions = cartSlice.actions


export default cartSlice