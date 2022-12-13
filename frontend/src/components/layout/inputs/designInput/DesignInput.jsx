import "./DesignInput.scss";
import React from "react";
import { motion } from "framer-motion"

const DesignInput = ({type, 
  placeholder, 
  disabled, 
  animate, 
  variants,
  id,
  name, 
  value,
  onChange,
  description,
  typeClass}) => {  
 
  return (
    <motion.div className="designInput-wrapper"
      variants={variants} 
      transition={{ duration: 0.1 }} 
      animate={animate}>
        <p className="description">{description}</p>
        <input className={"designInput " + typeClass}
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


export default DesignInput;