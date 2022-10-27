import "./PixelInput.scss";
import React from "react";


const PixelInput = (props) => {  
 
  return (
    <div className="pixelInput-wrapper">
      <input className="pixelInput" placeholder={props.text}/>
    </div>

  )
}

export default PixelInput;