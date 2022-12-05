import React from "react";
import "./CartItem.scss"
import { Link } from "react-router-dom";
import { CloseSvg } from "../../../../images/index";
import {   motion, useMotionValue, useTransform, } from "framer-motion"


const CartItem = (props) => {  
 
  const x = useMotionValue(0);
  const xInput = [-100, 0];
  const background = useTransform(x, xInput, [
    "#ffffff",
    "#0D0D0D",
  ]);
  const left = useTransform(x, xInput, [
    "-200vw",
    "0",
  ]); 

  return (
    <motion.div style={{ left }} className="ItemModulAnimation"  onMouseOver={props.onmouseenter} onMouseLeave={props.onmouseleave} >
      <motion.div className={"ItemModul " + props.class}         
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        
        style={{ x }}
        x={x}>
        <div className="ItemModul__img-wrapper">
          <Link to={props.link}>
            <img className="ItemModul-img"  src={props.img} alt="" />
          </Link>
        </div>
        <div>
          <p className="ItemModul-name">{props.text}</p>
          <p className="ItemModul-sizes">{props.sizes}</p>
          <p  className="ItemModul-prices">{props.price}</p>

        </div>
        {props.class === "cart" || props.class === "search" ? 
        <div className="closeBtn">
          <button onClick={props.onClick}><CloseSvg/></button>
        </div> :
        <></>}
      </motion.div>
      
    </motion.div>
    
  )
}



export default CartItem;