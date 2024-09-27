import React, { useState } from "react";
import Header from "./components/Header/Header";
import MealSection from "./components/Meals/MealSection";
import CartItem from "./components/Cart/CartItem";
import CartContextProvider from "./context/cartContextProvider";
// import './App.css';

function App() {
const [isCartShown , setCardShown]= useState(false);

const cartShownHandler=()=>{
  setCardShown(true)
}
const cartCloseHandler=()=>{
  setCardShown(false)
}
  return (
    <CartContextProvider>
     {isCartShown && <CartItem onClose={cartCloseHandler}/>} 
      <Header onCartShown={cartShownHandler}/>
      <MealSection />
    </CartContextProvider>
  );
}

export default App;
