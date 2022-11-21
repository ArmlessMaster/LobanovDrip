import "./Cart.scss";
import { React, useState, useContext } from "react";
import { BackgroundVideo, RegistrationLabel, PaySvg, PaySvg1, PaySvg2, AttenSvg } from "../../../images";
import { PixelBtn, PixelInput } from "../../layout/index";
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


const variantsInputs = {
  open: { opacity: 1, y: "-8vw" },
  closed: { opacity: 1, y: "20vw" },
};

const btnHidden = {
  open: { opacity: 0},
  closed: { opacity: 1},
};

const bgVinet = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const bgAnimation = {
  open: { width: "40%" },
  closed: { width: "30%" },
};

const decorAnimation = {
  open: { right: "-16%" },
  closed: { right: "2%" },
};

const Cart = () => {
  
  const [isOpen, setIsOpen] = useState(false);


  return (
    <section className="Cart">
      
      <motion.div
        className="login-bg"
        animate={isOpen ? "open" : "closed"}
        variants={bgVinet}
        transition={{ duration: 0.1 }}>
      </motion.div>
      <div className="cart__wrapper">
        <div className="cart-wrapper">
          <div className="cart-label">
            CART <span>2 ITEMS</span>
          </div>
          <div className="cart-label-atten">
            <AttenSvg/> Do not offer bathing. Adding goods to cats is not for bookings
          </div>
        </div>
        <motion.div
          className="order-wrapper"
          animate={isOpen ? "open" : "closed"}
          variants={bgAnimation}>
            <div className="order-label">
              ORDER INFO
            </div>
            <div className="order-info">
              <div className="order-info__little">DELIVERY: <span>10$</span></div>
              <div className="order-info__big">CLOTHES PRICE: <span>388$</span></div>
            </div>
            <div className="order-btn">
              <PixelBtn
                onClick={() => setIsOpen((isOpen) => false)}
                text="MAKE AN ORDER"
                color="Red"/>
            </div>
            <div className="order-payment">
              <p>PAYMENT METHODS:</p>
              <PaySvg/>
              <PaySvg1/>
              <span>
                <PaySvg2/>
              </span>
            </div>
            <div className="order-static__info">
              <p>When choosing a delivery method at the point of choice, payment can only be made online on the site. 
                If online payment is not far away, it is possible that it is due to the fact that you have paid for the 
                cordon (trading international payments), in which case you need to go back to your bank.</p>
              <ul>
                <li>365 days for a return</li>
                <li>Free shipping to 950 UAH</li>
              </ul>
              <p>We appreciate your respect: as the amount of unmanaged orders, as created in the online stores of the LPP brand, 
                we will change the equivalent of 150 euros (delivery costs) - the amount of the parcel, if you remove it, will 
                be deposited in the additional vartost of the tax.</p>
            </div>
              {/* <PixelBtn
                onClick={() => setIsOpen((isOpen) => true)}
                text="CREATE AN ACCOUNT"
                animate={isOpen ? "open" : "closed"}
                variants={btnHidden} /> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Cart;
