import "./ChangeAccount.scss";
import { React, useState, useContext } from "react";
import { BackgroundVideo, RegistrationLabel, PaySvg, PaySvg1, PaySvg2, AttenSvg } from "../../../images";
import { PixelBtn, PixelInput, AccountMenu, ChangeBtn} from "../../layout/index";
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



const Cart = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);

  return (
    <section className="ChangeAccount">
      <div className="ChangeAccount-wrapper">
        <div className="ChangeAccount-menu">
          <AccountMenu hov="MyAccountHover"/>
        </div>
        <div className="ChangeAccount-values">
          <div className="ChangeAccount-label">
            MY ACCOUNT
          </div>
          <div className="ChangeAccount-inputs">
            <div className="inputs-label">PERSONAL INFO</div>
            <div className="change-btn"><ChangeBtn onClick={() => setIsOpen((isOpen) => !isOpen)} text={"TAP TO CHANGE"}/></div>
            <div className="inputs-grid">
              <PixelInput disabled={!isOpen} placeholder="NAME" description="NAME"/>
              <PixelInput disabled={!isOpen} placeholder="SURNAME" description="SURNAME"/>
              <PixelInput disabled={!isOpen} placeholder="PATRONYMIC" description="PATRONYMIC"/>
              <PixelInput disabled={!isOpen} placeholder="PHONE" description="PHONE"/>
              <PixelInput disabled={!isOpen} placeholder="EMAIL" description="EMAIL"/>

              <div className="inputsBtn">
                <PixelBtn text="Save Changes" color="BigRed"
                 animate={isOpen ? "open" : "closed"}
                 variants={btnHidden}/>
              </div>
            </div>
          </div>
          <div className="ChangeAccount-inputs">
            <div className="inputs-label">PERSONAL INFO</div>
            <div className="change-btn"><ChangeBtn onClick={() => setIsOpenSecond((isOpenSecond) => !isOpenSecond)} text={"TAP TO CHANGE"}/></div>
            <div className="inputs-grid">
              <PixelInput disabled={!isOpenSecond} placeholder="NAME" description="NAME"/>
              <PixelInput disabled={!isOpenSecond} placeholder="SURNAME" description="SURNAME"/>
              <PixelInput disabled={!isOpenSecond} placeholder="PATRONYMIC" description="PATRONYMIC"/>
              <div className="inputsBtn">
                <PixelBtn text="Save Changes" color="BigRed"
                animate={isOpenSecond ? "open" : "closed"}
                variants={btnHidden}/>
              </div>

            </div>
          </div>
        </div>
      
      </div>
     
    </section>
  );
};

export default Cart;
