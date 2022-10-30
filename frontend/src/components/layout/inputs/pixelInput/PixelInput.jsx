import "./PixelInput.scss";
import React from "react";
import { motion } from "framer-motion"

const PixelInput = ({type, 
  placeholder, 
  disabled, 
  animate, 
  variants,
  id,
  name, 
  value,
  onChange,
  className}) => {  
 
  return (
    <motion.div className="pixelInput-wrapper"
      variants={variants} 
      transition={{ duration: 0.1 }} 
      animate={animate}>
        <input className={"pixelInput " + className}
          type={type}
          placeholder={placeholder} 
          disabled={disabled}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          />
    </motion.div>

  )
}


export default PixelInput;