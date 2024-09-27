import React,{useContext} from "react";
import styles from "./CartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../context/cartContext";

const CartButton = (props) => {
  const CartCtx=useContext(CartContext);
  const numberOfCartItems=CartCtx.items.reduce((total,item)=>{
    return total+item.amount;
  },0)
  return (
    <button onClick={props.onClick}  className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
