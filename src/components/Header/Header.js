import React from "react";
import styles from './Header.module.css'
import CartButton from "./CartButton";
import meals from '../../images/meals.jpg'

const Header=(props)=>{
    return(
        <React.Fragment>
            <header className={styles.header}>
                <h1>YummyMeals</h1>
                <CartButton onClick={props.onCartShown} />
            </header>
            <div className={styles['main-image']}>
                <img src={meals} alt="" />
            </div>
        </React.Fragment>
    )
}

export default Header;