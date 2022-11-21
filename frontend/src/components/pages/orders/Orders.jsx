import "./Orders.scss";
import { React, useState, useContext } from "react";
import { BackgroundVideo, RegistrationLabel, PaySvg, PaySvg1, PaySvg2, AttenSvg, test1 } from "../../../images";
import { PixelBtn, PixelInput, AccountMenu, ChangeBtn, OrderItem} from "../../layout/index";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { auth_, provider } from "../../../Firebase";



const btnHidden = {
  // open: { opacity: 1,  transform: "scaleX(1)"},
  // closed: { opacity: 0, transform: "scaleX(0)" },
  open: { opacity: 1},
  closed: { opacity: 0},
};



const Orders = () => {
  const clothes = [test1, test1, test1]
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);

  return (
    <section className="Orders">
        <div className="decor__wrapper">
            <div className="decor__graffity first">PAPICH</div>
            <div className="decor__graffity second">NEW MAGIC <p> WAND </p></div>
            <div className="decor__graffity third">BUHALO</div>
            <div className="decor__jpntext first">私の注文</div>

            <motion.div className="decor__jpntext second">
              船首
            </motion.div>
        </div>
      <div className="Orders-wrapper">
        <div className="Orders-menu">
          <AccountMenu hov="MyOrders"/>
        </div>
        <div className="Orders-values">
          <div className="Orders-label">
            MY ORDERS 
          </div>  
          <div>
            <OrderItem clothes={clothes} label="№14031055" price="1234" data="1 oct. 2022 16:03:39" status="Issued"/>
            <OrderItem clothes={clothes} label="№14031055" price="1234" data="1 oct. 2022 16:03:39" status="Expensive"/>
            
            <OrderItem clothes={clothes} label="№14031055" price="1234" data="1 oct. 2022 16:03:39" status="Forming"/>
          </div>
        </div>
      </div>
     
    </section>
  );
};

export default Orders;
