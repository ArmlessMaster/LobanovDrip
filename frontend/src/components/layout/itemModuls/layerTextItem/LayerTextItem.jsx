import React from "react";
import "./LayerTextItem.scss"
import { Link } from "react-router-dom";
import { CloseSvg, test3 } from "../../../../images/index";


const ItemModuls = (props) => {  
 
  return (
    <div className={"LayerTextItem " + props.class} onMouseOver={props.onmouseenter} onMouseLeave={props.onmouseleave} >
      <div className="LayerTextItem-wrapper">
        <div className="left-wrapper">
          <div className="img-wrapper">
            <p>T</p>
          </div>
          
          <div className="text-wrapper">
            <div className="big-text">FILL: {props.text}</div>
            <div className="little-text">{props.isFront ? "Front" : "Back"}</div>
          </div>
        </div>
        <div className="layer-wrapper">
          Layer {props.layer}
        </div>
        <div className="delete-btn">
          <CloseSvg/>
        </div>
      </div>

    </div>
  )
}



export default ItemModuls;