import React from "react";
import "./ItemModuls.scss"
import { Link } from "react-router-dom";
import { CloseSvg } from "../../../../images/index";

const ItemModuls = (props) => {  
 
  return (
    <div className={"ItemModul " + props.class} onMouseOver={props.onmouseenter} onMouseLeave={props.onmouseleave} >
      <div className="ItemModul__img-wrapper">
        <Link to={props.link}>
          <img className="ItemModul-img"  src={props.img} alt="" />
        </Link>
      </div>
      <div>
        <p className="ItemModul-name">{props.text}</p>
        <p className="ItemModul-sizes">{props.sizes}</p>
        <p  className="ItemModul-prices">{props.price}</p>

      </div>
      {props.class === "cart" ? 
      <div className="closeBtn">
        <button onClick={props.onClick}><CloseSvg/></button>
      </div> :
      <></>}

    </div>
  )
}



export default ItemModuls;