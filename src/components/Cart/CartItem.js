import React, { useContext, useState ,useEffect} from "react";
import Modal from "../UI/Modal";
import classes from "./CartItem.module.css";
import cartContext from "../../context/cartContext";
import Item from "./Item";
import UserInfo from "./UserInfo";
import success from '../../images/tick.png'

const CartItem = (props) => {
  const [isOrderShown, setIsOrderShown] = useState(false);
  const cartCtx = useContext(cartContext);
  const [isUserInfo, setUserInfo] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const ConfirmHandler = async (userInfo) => {
    setSuccess(true);
    await fetch(
      "https://react-learn-3f982-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userInfo,
          orderedItems: cartCtx.items,
        }),
      }
    );
    cartCtx.clearCart();
  };
  useEffect(() => {
    setIsOrderShown(cartCtx.items.length > 0);
  }, [cartCtx.items]);

  const BackHandler = () => {
    setUserInfo(false);
  };
  const OrderHandler = () => {
    setUserInfo(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <Item
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartCtx.additem.bind(null, { ...item, amount: 1 })}
          onRemove={cartCtx.removeitem.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isUserInfo && !isSuccess && cartItems}
      {!isSuccess && (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{`Rs ${cartCtx.totalAmt.toFixed(2)}`}</span>
        </div>
      )}
      {isUserInfo && !isSuccess && (
        <UserInfo onConfirm={ConfirmHandler} onBack={BackHandler} />
      )}
      {!isUserInfo && !isSuccess && (
        <div className={classes.actions}>
          <button onClick={props.onClose} className={classes["button--alt"]}>
            Close
          </button>
          {isOrderShown && <button onClick={OrderHandler} className={classes.button}>
            Order
          </button>}
        </div>
      )}
      {isSuccess && <div className={classes.success}><h3>Ordered successfully...</h3>
        <img src={success} alt="" /></div>}
    </Modal>
  );
};
export default CartItem;
