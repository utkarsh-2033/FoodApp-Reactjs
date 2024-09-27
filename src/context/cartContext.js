import React from "react";

const CartContext= React.createContext({
    items:[],
    totalAmt:0,
    additem:()=>{},
    removeitem:()=>{},
    clearCart:()=>{}
})

export default CartContext;