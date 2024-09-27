import React, { useRef, useState } from "react";
import styles from "./MealForm.module.css";
import Input from "../../UI/Input";

const MealForm = (props) => {
  const [isAmountValid, setAmountValid] = useState(true);
  const amountRef = useRef();
  const additemHandler = (evt) => {
    evt.preventDefault();
    const amount = amountRef.current.value;
    const enteredAmount = +amount;

    if (enteredAmount >= 1 && enteredAmount <= 5) {
      setAmountValid(true);
      props.onAdditem(enteredAmount);
    } else {
      setAmountValid(false);
    }
  };
  return (
    <form onSubmit={additemHandler} className={styles.form}>
      <Input
        ref={amountRef}
        label="amount"
        input={{
          type: "number",
          id: "amount" + props.id,
          min: "1",
          max: "5",
          step: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter valid amount</p>}
    </form>
  );
};

export default MealForm;
