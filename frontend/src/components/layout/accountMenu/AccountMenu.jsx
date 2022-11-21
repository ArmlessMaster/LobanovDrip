import React from "react";
import { motion } from "framer-motion"
import "./AccountMenu.scss"
import { Link } from "react-router-dom";

const AccountMenu = (props) => {  
 
  return (
    <div className={"accountMenu"}>
      <ul className={"accountMenu-list " + props.hov}>
        <li>MY ORDERS</li>
        <li>MY ACCOUNT</li>
        <li>CHANGE PASSWORD</li>
        <li>LOGOUT</li>
      </ul>
    </div>
  )
}



export default AccountMenu;