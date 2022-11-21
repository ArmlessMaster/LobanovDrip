import React from "react";
import { motion } from "framer-motion"
import "./ItemModuls.scss"
import { Link } from "react-router-dom";

const ItemModuls = (props) => {  
 
  return (
    <div className={"ItemModul " + props.class}>
      <div className="ItemModul__img-wrapper">
        <Link to={props.link}>
          <img className="ItemModul-img" src={props.img} alt="" />
        </Link>
      </div>
      <div>
        <p className="ItemModul-name">{props.text}</p>
        <p className="ItemModul-sizes">{props.sizes}</p>
        <p  className="ItemModul-prices">{props.price}</p>
      </div>
    </div>
  )
}



export default ItemModuls;