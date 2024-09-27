import React, { useReducer } from "react";
import CartContext from "./cartContext";

const deafultState = {
  items: [],
  totalAmt: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "Add") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: +existingItem.amount + +action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmt: state.totalAmt + action.item.price * action.item.amount,
    };
  }
  if (action.type === "Remove") {
    let updatedItems;
    const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmt = state.totalAmt - existingItem.price;
    if (existingItem.amount=== 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } 
    else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmt: updatedTotalAmt,
    };
  }
  return deafultState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, deafultState);

  const addItemHandler = (item) => {
    dispatchCartState({ type: "Add", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartState({ type: "Remove", id: id });
  };
  const clearCartHandler = (item) => {
    dispatchCartState({ type: "Clear" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmt: cartState.totalAmt,
    additem: addItemHandler,
    removeitem: removeItemHandler,
    clearCart: clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
