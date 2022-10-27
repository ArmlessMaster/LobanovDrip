import "./Authorization.scss";
import React from "react";
import BackgroundVideo from "../../../images/video/bg_dots.mp4";
import {PixelBtn, PixelInput} from "../../layout/index"
import { motion } from "framer-motion"


export const Authorization = () => {

  
  return (

    <section className='Authorization'>
      <video autoPlay loop muted>
        <source src={BackgroundVideo} type="video/mp4"/>
      </video>
      <div className="autorization__wrapper">
        <div className="login">
          <div className="login-title">
            FOR MEMBER
          </div>
          <div className="login__wraper-btn">
            <form action="">
              <div className="input-flex">
                <PixelInput type="text"  text="EMAIL" />
                <PixelInput type="text" text="PASSWORD" />
              </div>
              <div className="forgot__wrapper">
                <a href="">I forgot passwords</a>
              </div>
              <div className="input-btn-wrapper">
                <PixelBtn text="ENTER"/>
              </div>
              <div className="input-btn-wrapper">
                <PixelBtn  isBlue ="true" text="Login-in with Google"/>
              </div>
            </form>
          </div>
        </div>
        <div className="registration-bg">
          <div className="registration">
            <div className="registration-title">
            IS THIS YOUR FIRST VISIT
            </div>
            <div className="input-btn-wrapper">
              <PixelBtn text="CREATE AN ACCOUNT"/>
            </div>
            <motion.div className="input__menu">
                <PixelInput type="text"  text="EMAIL" />
                <PixelInput type="text" text="PASSWORD" />
                <PixelInput type="text"  text="EMAIL" />
                <PixelInput type="text" text="PASSWORD" />
                <PixelBtn text="ENTER"/>
              </motion.div>

            <div className="registration__rules">
              Read the <a href="#">Privacy Policy</a>, <a href="#">Rules
              <p>and Site Selection Guidelines</p></a>
            </div>
          </div>
        </div>

      </div> 
    </section>
  )
}