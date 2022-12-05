import "./GlichBtn.scss";
import React from "react";
import { motion } from "framer-motion"

const GlichBtn = ({
  disabled, 
  onClick, 
  color, 
  variants, 
  animate, 
  text,  }) => {  
 
  return (
    <motion.button 
      id='press'
      disabled={disabled} 
      onClick={onClick}
      type="button" 
      className={"GlichBtn " + color} 
      variants={variants} 
      transition={{ duration: 0.1 }} 
      animate={animate}> 
            {text} 
    </motion.button>
  )
}



export default GlichBtn;