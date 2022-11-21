import "./ChangeBtn.scss";
import React from "react";
import { motion } from "framer-motion"

const ChangeBtn = ({
  disabled, 
  onClick, 
  isBlue, 
  variants, 
  animate, 
  text,  }) => {  
 
  return (
    <motion.button 
      disabled={disabled} 
      onClick={onClick}
      type="button" 
      className={"changeBtn"} 
      variants={variants} 
      transition={{ duration: 0.1 }} 
      animate={animate}> 
            {text} 
    </motion.button>
  )
}



export default ChangeBtn;