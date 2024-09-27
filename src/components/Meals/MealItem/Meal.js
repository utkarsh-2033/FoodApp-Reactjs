import React,{useContext} from "react";
import styles from './Meal.module.css'
import MealForm from "./MealForm";
import CartContext from "../../../context/cartContext";

const Meal=(props)=>{
    const cartCtx=useContext(CartContext)
  const additemHandler=(amount)=>{
    cartCtx.additem({
        ...props.meal,
        amount:amount
    })
    // console.log(cartCtx.items)
  }
    const price=`Rs ${props.meal.price}`;
    return(
        <li className={styles.meal}>
            <img src={props.meal.image} alt={props.name} className={styles.image} />
            <div className={styles.details}>
                <h3>{props.meal.name}</h3>
                <div className={styles.description}>{props.meal.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
                <MealForm onAdditem={additemHandler} meal={props.meal}/>
            </div>
        </li>
    )
}
export default Meal;
