import React, { useRef, useState } from "react";
import classes from "./UserInfo.module.css";
const isEmpty = (value) => value.trim() === "";
const is6char = (value) => value.trim().length === 6;
const is10digit = (value) => value.trim().length === 10;
const UserInfo = (props) => {
  const [FormValidity, setFormValidity] = useState({
    name: true,
    street: true,
    phone: true,
    city: true,
    pin: true,
  });
  const NameRef = useRef();
  const StreetRef = useRef();
  const PhoneRef = useRef();
  const CityRef = useRef();
  const PinRef = useRef();
  const BackHandler = () => {
    props.onBack();
  };
  const ConfirmHandler = (evt) => {
    evt.preventDefault();

    const enteredName = NameRef.current.value;
    const enteredPhone = PhoneRef.current.value;
    const enteredStreet = StreetRef.current.value;
    const enteredCity = CityRef.current.value;
    const enteredPin = PinRef.current.value;

    const NameisValid = !isEmpty(enteredName);
    const StreetisValid = !isEmpty(enteredStreet);
    const CityisValid = !isEmpty(enteredCity);
    const PhoneisValid = is10digit(enteredPhone);
    const PinisValid = is6char(enteredPin);

    setFormValidity({
      name: NameisValid,
      street: StreetisValid,
      phone: PhoneisValid,
      city: CityisValid,
      pin: PinisValid,
    });

    const FormisValid =
      NameisValid && StreetisValid && CityisValid && PinisValid && PhoneisValid;

    if (!FormisValid) return;

    props.onConfirm({
        name:enteredName,
        phone:enteredPhone,
        street:enteredStreet,
        city:enteredCity,
        pincode:enteredPin
    });
  };

  const nameClass = `${classes["form-control"]} ${
    FormValidity.name ? "" : classes.invalid
  }`;
  const streetClass = `${classes["form-control"]} ${
    FormValidity.street ? "" : classes.invalid
  }`;
  const cityClass = `${classes["form-control"]} ${
    FormValidity.city ? "" : classes.invalid
  }`;
  const phoneClass = `${classes["form-control"]} ${
    FormValidity.phone ? "" : classes.invalid
  }`;
  const pinClass = `${classes["form-control"]} ${
    FormValidity.pin ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={ConfirmHandler} className={classes["checkout-form"]}>
      <div className={nameClass}>
        <label htmlFor="name">Name</label>
        <input ref={NameRef} id="name" type="text" />
      </div>
      <div className={phoneClass}>
        <label htmlFor="phone">Phone Number</label>
        <input ref={PhoneRef} id="phone" type="tel" />
        {!FormValidity.phone && <p>Must be 10 digit</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input ref={StreetRef} id="street" type="text" />
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input ref={CityRef} id="city" type="text" />
      </div>
      <div className={pinClass}>
        <label htmlFor="pincode">Pincode</label>
        <input ref={PinRef} id="pincode" type="text" />
        {!FormValidity.pin && <p>Must be 6 digit</p>}
      </div>
      <div className={classes.actions}>
        <button
          onClick={BackHandler}
          type="button"
          className={classes["button--alt"]}
        >
          Back
        </button>
        <button className={classes.button}>Confirm</button>
      </div>
    </form>
  );
};

export default UserInfo;
