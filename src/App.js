import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux"
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
import { uiActions } from './store/uiSlice';

let isInital = true

function App() {
  const show = useSelector(state => state.ui.showCart) 
  const cart = useSelector( state => state.cart)
  const notification = useSelector( state => state.ui.notification)

  const dispatch = useDispatch()

  // useEffect(() => {

   
  //     const sendData = async () => {

  //    dispatch(uiActions.showNotification({
  //       status: "pending",
  //       message: "Sending cart data",
  //       title: "Sending"
  //   }))

  //       const response = await fetch(`https://advanceredux-8aa58-default-rtdb.firebaseio.`, {
  //         method: "PUT",
  //         body: JSON.stringify(cart)
  //       })
        
  //       if (!response.ok) {
  //         throw new Error("Something went wrong")
  //       }
  //       const responseData = response.json()
  //       console.log(responseData)
  //     }

  //     if ( isInital ) {
  //         isInital = false
  //         return;
  //       }

       
  //      dispatch(uiActions.showNotification({
  //       status: "success",
  //       message: "Successfuly sent cart data",
  //       title: "Sent"
  //     }))
    

  //   sendData().catch ((error) => { 
  //     dispatch(uiActions.showNotification({
  //       status: "error",
  //       message: "Failed transaction",
  //       title: "Error 404"
  //     }))  
  //   })
    
  // }, [cart, dispatch])

  useEffect(() => {

    const sendCartData = async () => {

      dispatch(uiActions.showNotification({
        status: "pending",
        message: "Sending Cart Data",
        title: "Sending"
      }))
    const response = await fetch(`https://advanceredux-8aa58-default-rtdb.firebaseio.com/cart.json`, {
      method: "PUT",
      body: JSON.stringify(cart)
    })
    if ( !response.ok ) {
      throw new Error ("Something went wrong")
    }

    dispatch(uiActions.showNotification({
      status: "success",
      message: "Successfully send Cart data",
      title: "Success"
    }))
    }

    if (  isInital ) {
      isInital = false
      return;
    }

    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: "error",
        message: "Failed to send cart",
        title: "Error 404"
      }))
    })
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
