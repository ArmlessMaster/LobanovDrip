import "./PixelBtn.scss";
import React from "react";
import { motion } from "framer-motion"

const PixelBtn = (props) => {  
 
  return (
    <motion.button disabled={props.disabled} type="button" onClick={props.onClick} className={"PixelBtn " + (props.isBlue ? "Blue" : "Red")} variants={props.variants} transition={{ duration: 0.1 }} animate={props.animate}> {props.text} </motion.button>
  )
}



export default PixelBtn;