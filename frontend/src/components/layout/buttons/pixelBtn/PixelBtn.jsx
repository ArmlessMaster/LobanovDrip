import "./PixelBtn.scss";
import React from "react";
import { motion } from "framer-motion"

const PixelBtn = ({
  disabled, 
  onClick, 
  color, 
  variants, 
  animate, 
  text,  }) => {  
 
  return (
    <motion.button 
      disabled={disabled} 
      onClick={onClick}
      type="button" 
      className={"PixelBtn " + color} 
      variants={variants} 
      transition={{ duration: 0.1 }} 
      animate={animate}> 
            {text} 
    </motion.button>
  )
}



export default PixelBtn;