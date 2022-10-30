import React from "react";
import { motion } from "framer-motion"

const PixelBtn = (props) => {  
 
  return (
    <p className={"title " + props.variant}>{props.text}</p>
  )
}



export default PixelBtn;