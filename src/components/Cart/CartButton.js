import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/uiSlice';

const CartButton = (props) => {

  const dispatch = useDispatch()

  const cartQuantity = useSelector( state => state.cart.totalQuantity )
  
  // const cartQuantity = cartItem.reduce((accumulator, currentValue) => {
  //   return accumulator + currentValue.quantity
  // }, 0)

  const buttonToggleHandler = () => {
    dispatch(uiActions.toggle())
  }
  return (
    <button onClick={buttonToggleHandler} type='button' className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
