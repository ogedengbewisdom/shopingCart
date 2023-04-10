import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/uiSlice';

const CartButton = (props) => {

  const dispatch = useDispatch()

  const buttonToggleHandler = () => {
    dispatch(uiActions.toggle())
  }
  return (
    <button onClick={buttonToggleHandler} type='button' className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
