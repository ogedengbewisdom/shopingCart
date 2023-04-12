import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux"

function App() {
  const show = useSelector(state => state.ui.showCart) 

  const cart = useSelector( state => state.cart)

  useEffect(() => {
    fetch(`https://advanceredux-8aa58-default-rtdb.firebaseio.com/cart.json`, {
      method: "PUT",
      body: JSON.stringify(cart)
    })
  }, [cart])
  return (
    <Layout>
      {show && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
