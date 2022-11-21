import React from "react";
import { motion } from "framer-motion"
import "./OrderItem.scss"
import { Link } from "react-router-dom";

const OrderItem = (props) => {  
 
  return (
    <div className={"OrderItem " + props.class}>
      <div className="OrderItem-flex">
        <div className="OrderItem-flex__left">
          <p className="OrderItem-label">{props.label}</p>
          <p className="OrderItem-price"> {props.price} <span>UAH</span></p>
        </div>
        <div className="OrderItem-flex__right">
          <p className="OrderItem-data">{props.data}</p>
          <p className={"OrderItem-status " + props.status}>{props.status}</p>
        </div>
      </div>
      <div className="OrderItem-clothes"> 
        {props.clothes.map(item => (
          <div className='item'>
            <img src={item} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}



export default OrderItem;