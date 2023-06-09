import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux"
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from "./store/cartActions"

let isInital = true

function App() {
  const show = useSelector(state => state.ui.showCart) 
  const cart = useSelector( state => state.cart)
  const notification = useSelector( state => state.ui.notification)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(uiActions.showNotification({
  //       status: "pending",
  //       message: "Sending Cart Data",
  //       title: "Sending"
  //     }))
  //   const response = await fetch(`https://advanceredux-8aa58-default-rtdb.firebaseio.com/cart.json`, {
  //     method: "PUT",
  //     body: JSON.stringify(cart)
  //   })
  //   if ( !response.ok ) {
  //     throw new Error ("Something went wrong")
  //   }
  //   dispatch(uiActions.showNotification({
  //     status: "success",
  //     message: "Successfully send Cart data",
  //     title: "Success"
  //   }))
  //   }
  //   if ( isInital ) {
  //     isInital = false
  //     return;
  //   }
  //   sendCartData().catch(error => {
  //     dispatch(uiActions.showNotification({
  //       status: "error",
  //       message: "Failed to send cart",
  //       title: "Error 404"
  //     }))
  //   })
  // }, [cart, dispatch])

  // useEffect(() => {
  //   const sendCartDatass = async () => {
  //     if (isInital) {
  //       isInital = false
  //       return;
  //     }
  
  //     dispatch(uiActions.showNotification({
  //       status: "pending",
  //       title: "Sending",
  //       message: "Sending cart data"
  //     }))
  //     const sendCartData = async () => {
  //       const response = await fetch(`https://advanceredux-8aa58-default-rtdb.firebaseio.com/cart.json`, {
  //         method: "PUT",
  //         body: JSON.stringify(cart)
  //       })
  //       if ( !response.ok ) {
  //         throw new Error ("Error 404")
  //       }
  //     }
  //     try {
  //       await sendCartData();
  //       dispatch(uiActions.showNotification({
  //         status: "success",
  //         title: "Success",
  //         message: "Sent cart data"
  //       }))

  //     } 
  //     catch (error) {
  //       dispatch(uiActions.showNotification({
  //         status: "error",
  //         title: "Error 404",
  //         message: error.message
  //       }))
  //     }
  //   }
  //   sendCartDatass()
    
  // }, [cart, dispatch])

  useEffect( () => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect( () => {
    if ( isInital ) {
      isInital = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart))
    }
  
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification 
      title = {notification.title}
      status = {notification.status}
      message = {notification.message}
      />}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
