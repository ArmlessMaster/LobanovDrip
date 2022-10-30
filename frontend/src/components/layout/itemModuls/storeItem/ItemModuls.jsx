import React from "react";
import { motion } from "framer-motion"
import {BackgroundVideo, RegistrationLabel} from "../../../images";
import {PixelBtn, PixelInput} from "../../layout/index"

const ItemModuls = (props) => {  
 
  return (
    <p className={"title " + props.variant}>{props.text}</p>
  )
}



export default ItemModuls;