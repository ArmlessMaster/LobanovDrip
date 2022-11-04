import React from "react";
import { motion } from "framer-motion"
import "./ItemModuls.scss"
const ItemModuls = (props) => {  
 
  return (
    <div className={"ItemModul " + props.class}>
      <img className="ItemModul-img" src={props.img} alt="" />
      <div>
        <p className="ItemModul-name">{props.text}</p>
        <p className="ItemModul-sizes">{props.sizes}</p>
        <p  className="ItemModul-prices">{props.price}</p>
      </div>
    </div>
  )
}



export default ItemModuls;