import "./PixelInput.scss";
import React from "react";
import { motion } from "framer-motion"

const PixelInput = (props) => {  
 
  return (
    <motion.div className="pixelInput-wrapper" variants={props.variants} transition={{ duration: 0.1 }} animate={props.animate}>
      <input className="pixelInput" placeholder={props.text} disabled={props.disabled}/>
    </motion.div>

  )
}

export default PixelInput;