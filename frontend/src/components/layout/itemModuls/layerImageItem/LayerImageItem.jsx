import React from "react";
import "./LayerImageItem.scss"
import { Link } from "react-router-dom";
import { CloseSvg, test3 } from "../../../../images/index";


const ItemModuls = (props) => {  
 
  return (
    <div className={"LayerImageItem " + props.class} onMouseOver={props.onmouseenter} onMouseLeave={props.onmouseleave} >
      <div className="LayerImageItem-wrapper">
        <div className="left-wrapper">
          <div className="img-wrapper">
            <img src={props.img} alt="" />
          </div>
          
          <div className="text-wrapper">
            <div className="big-text">ID: {props.id}</div>
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