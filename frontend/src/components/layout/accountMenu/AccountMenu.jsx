import React from "react";
import { motion } from "framer-motion"
import "./AccountMenu.scss"
import { NavLink } from "react-router-dom";

const AccountMenu = (props) => {  
 
  return (
    <div className={"accountMenu"}>
      <ul className={"accountMenu-list " + props.hov}>
          <li><NavLink to="/orders">MY ORDERS</NavLink></li>
          <li><NavLink to="/account">MY ACCOUNT</NavLink></li>
          <li><NavLink to="/password">CHANGE PASSWORD</NavLink></li>
          <li><NavLink to="/logout">LOGOUT</NavLink></li>
      </ul>
    </div>
  )
}



export default AccountMenu;