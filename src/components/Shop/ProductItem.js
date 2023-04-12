import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cartSlice';

const ProductItem = (props) => {
  const { title, price, description, id } = props;

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  
  const addToCartHandler = () => {

    // copy the cart without mutating the original cart array with slice()

    const updatedCarts = cart.items.slice()

    const existingItem = updatedCarts.find(item => item.id === id) 

    if ( existingItem ) {
      const updatedCart = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
        totalPrice: existingItem.totalPrice + price
      }
      // updatedCart.quantity++
      // updatedCart.totalPrice = updatedCart.totalPrice + price
      // check for the existing item index in the updatedCarts
      const existingItemIndex = updatedCarts.findIndex(item => item.id === id)
      updatedCarts[existingItemIndex] = updatedCart
    } else {
      updatedCarts.push({
        id: id,
        price: price,
        quantity: 1,
        totalPrice: price,
        name: title,
      })
    }

    const newCart = {
      items: updatedCarts
    }

    dispatch(cartActions.replaceCart(newCart))

    // dispatch(cartActions.addItemToCart({
    //   id,
    //   title,
    //   price
    // }))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
