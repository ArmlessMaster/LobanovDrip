import React from "react";
import { motion } from "framer-motion"
import "./AccountMenu.scss"
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next'

const AccountMenu = (props) => {  
 
  const { t } = useTranslation(); 

  return (
    <div className={"accountMenu"}>
      <ul className={"accountMenu-list " + props.hov}>
          <li><NavLink to="/orders">{t('my_orders')}</NavLink></li>
          <li><NavLink to="/account">{t('my_account')}</NavLink></li>
          <li><NavLink to="/password">{t('change_password')}</NavLink></li>
          <li><NavLink to="/logout">{t('logout')}</NavLink></li>
      </ul>
    </div>
  )
}



export default AccountMenu;