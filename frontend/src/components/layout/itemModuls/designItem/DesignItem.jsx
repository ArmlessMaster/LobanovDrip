import React from "react";
import "./DesignItem.scss"
import { Link } from "react-router-dom";
import { CloseSvgGrey } from "../../../../images/index";

const ItemModuls = (props) => {  
 
  return (
    <div className={"DesignItem " + props.class} onMouseOver={props.onmouseenter} onMouseLeave={props.onmouseleave} >
      <div className="ItemModul__img-wrapper">
        <img name={props.name} onClick={props.onClick} className="ItemModul-img"  src={props.img} alt="" />
      </div>
      <div>
        <p className="ItemModul-name">{props.text}</p>
        <p  className="ItemModul-prices">{props.price}</p>
      </div>
      {props.class === "save" ? 
      <div className="closeBtn">
        <button onClick={props.onClick}><CloseSvgGrey/></button>
      </div> :
      <></>}
      {props.class === "save" ? 
        <div className="label-absolute">
          MODEL
        </div> :
      <></>}
    </div>
  )
}



export default ItemModuls;