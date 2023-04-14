import { cartActions } from "./cartSlice"
import { uiActions } from "./uiSlice"


export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchRequest = async () => {
            const response = await fetch(`https://advanceredux-8aa58-default-rtdb.firebaseio.com/cart.json`)
            if (!response.ok) {
                throw new Error ("Error 404")
            }
            const data = await response.json()
            return data
        }

        try {
           const cartData = await fetchRequest()
           dispatch(cartActions.replaceCart(cartData))
        }

        catch (error) {
            dispatch(uiActions.showNotification({
                title: "Error 404",
                message: error.message,
                status: "error"
            }))
        }
    }
}


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