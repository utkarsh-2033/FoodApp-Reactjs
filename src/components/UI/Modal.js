import React from "react";
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

const Backdrop=(props)=>{
    return <div onClick={props.onClose} className={styles.backdrop}></div>
}

const Overlay=(props)=>{
    return <div className={styles.modal}>{props.children}</div>
}

const Modal=(props)=>{
    return(
        ReactDOM.createPortal(
            <React.Fragment>
                <Backdrop onClose={props.onClose}/>
                <Overlay>{props.children}</Overlay>
            </React.Fragment>
            ,document.getElementById("overlays"))
    )
}

export default Modal;