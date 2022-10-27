import "./PixelBtn.scss";
import React from "react";


const PixelBtn = (props) => {  
 
  return (
    <button className={"PixelBtn " + (props.isBlue ? "Blue" : "Red")}> {props.text} </button>
  )
}

export default PixelBtn;