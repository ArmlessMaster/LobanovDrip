import "./Authorization.scss";
import {React, useState} from "react";
import {BackgroundVideo, RegistrationLabel} from "../../../images";
import {PixelBtn, PixelInput} from "../../layout/index"
import { motion } from "framer-motion"

const variantsInputs = {
  open: { opacity: 1, y: "-8vw" },
  closed: { opacity: 1, y: "20vw" },
}

const btnHidden = {
  open: { opacity: 0},
  closed: { opacity: 1},
}

const bgVinet = {
  open: { opacity: 1},
  closed: { opacity: 0},
  
}

const bgAnimation = {
  open: { width: "60%"},
  closed: {  width: "50%"},
  
}

const decorAnimation = {
  open: { right: "-16%"},
  closed: {  right: "2%"},
  
}

const textAnimation = {
  open: { opacity: "1"},
  closed: { 
     opacity: "1",
      transition: {
  delay: 0.5,
  staggerChildren: 0.08,
}},
  
}


export const Authorization = () => {

  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen);

  return (

    <section className='Authorization'>
      <video autoPlay loop muted>
        <source src={BackgroundVideo} type="video/mp4"/>
      </video>
      <motion.div className="login-bg"          
            animate={isOpen ? "open" : "closed"}
            variants={bgVinet}
            transition={{ duration: 0.2  }}>
      </motion.div>
      <div className="autorization__wrapper">

        <div className="login-wrapper">
        
          <div className="login">
            <motion.div className="login-title"
              animate={isOpen ? "open" : "closed"}
              variants={btnHidden}
              transition={{ duration: 0.2 }}>
            FOR MEMBER
            </motion.div>
            <div className="login__wraper-btn">
              <form action="">
                <div className="input-flex">
                  <PixelInput type="text"  text="EMAIL" disabled={isOpen} 
                                animate={isOpen ? "open" : "closed"}
                                variants={btnHidden}/>
                  <PixelInput type="text" text="PASSWORD" disabled={isOpen}
                                animate={isOpen ? "open" : "closed"}
                                variants={btnHidden}/>
                </div>
                <motion.div className="forgot__wrapper"
                              animate={isOpen ? "open" : "closed"}
                              variants={btnHidden}
                              transition={{ duration: 0.1 }}>
                  <a href="">I forgot passwords</a>
                </motion.div>
                <div className="input-btn-wrapper">
                  <PixelBtn text="ENTER"
                  animate={isOpen ? "open" : "closed"}
                  variants={btnHidden}
                  disabled={isOpen}/>
                </div>
                <div className="input-btn-wrapper">
                  <PixelBtn  isBlue ="true" text="Login-in with Google"
                  animate={isOpen ? "open" : "closed"}
                  variants={btnHidden}
                  disabled={isOpen}/>
                </div>
              </form>
            </div>
          </div>
          <motion.div className="input-btn-wrapper_outside"
          animate={isOpen ? "open" : "closed"}
          variants={variantsInputs}
          disabled={isOpen}>
                  <PixelBtn onClick={() => setIsOpen(isOpen => false)} text="BACK TO LOGIN"/>
                </motion.div>
        </div>
        <motion.div className="registration-bg"
          animate={isOpen ? "open" : "closed"}
          variants={bgAnimation}>
          <div className="decor__wrapper">
            <div className="decor__graffity">
              KHARKIV
            </div>
            <div className="decor__jpntext first">
              衣料品会社
            </div>

            <motion.div className="decor__jpntext second"
            animate={isOpen ? "open" : "closed"}
            variants={decorAnimation}>
              登録
            </motion.div>
            <motion.div className="label_registration"
            animate={isOpen ? "open" : "closed"}
            variants={decorAnimation}>
              <RegistrationLabel/>
            </motion.div>
          </div>
          <div className="registration">
            <div className="registration-title">
            IS THIS YOUR FIRST VISIT
            </div>
            <div className="input-btn-wrapper">
              <PixelBtn onClick={() => setIsOpen(isOpen => true)} text="CREATE AN ACCOUNT"
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}/>

            </div>
            <motion.div className="input__menu"       
            animate={isOpen ? "open" : "closed"}
            variants={variantsInputs}>
                <div className="input-flex">
                  <PixelInput type="text"  text="EMAIL" />
                  <PixelInput type="text" text="PASSWORD" />
                </div>
                <div className="input-flex">
                  <PixelInput type="text"  text="NAME" />
                  <PixelInput type="text" text="SURNAME" />
                </div>
                <div className="input-flex">
                  <PixelBtn text="ENTER"/>
                </div>
              </motion.div>

            <div className="registration__rules">
              Read the <a href="#">Privacy Policy</a>, <a href="#">Rules
              <p>and Site Selection Guidelines</p></a>
            </div>
          </div>

        </motion.div>
        
      </div> 
      
    </section>
  )
}

