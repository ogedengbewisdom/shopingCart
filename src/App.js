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
  const notification = useSelector(state => state.ui.notification)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(uiActions.showNotification({
      status: "pending",
      message: "Sending cart data",
      title: "Sending"
    }))

    try {
      const sendData = async () => {
        const response = await fetch(`https://advanceredux-8aa58-default-rtdb.firebaseio.`, {
          method: "PUT",
          body: JSON.stringify(cart)
        })

        if ( isInital ) {
          isInital = false
          return;
        }
        
        if (!response.ok) {
          throw new Error("Something went wrong")
        }
        const responseData = response.json()
        console.log(responseData)
      }

      dispatch(uiActions.showNotification({
        status: "success",
        message: "Successfuly sent cart data",
        title: "Sent"
      }))

       sendData() 
    }

    catch (error) { 
      dispatch(uiActions.showNotification({
        status: "error",
        message: "Failed transaction",
        title: "Error 404"
      }))  
    }
    
  }, [cart, dispatch])


  return (
    <Fragment>
      {notification && <Notification title={notification.title} status={notification.status} message={notification.message} />}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
