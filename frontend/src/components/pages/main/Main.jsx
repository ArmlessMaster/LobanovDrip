import "./Main.scss";
import {React, useState, useContext} from "react";
import {BackgroundMainVideo} from "../../../images";
import {PixelBtn, PixelInput} from "../../layout/index"
import { motion } from "framer-motion"
import { Link } from "react-router-dom";




const Main = () => {


  return (

    <section className='Main'>
      <video autoPlay loop muted>
        <source src={BackgroundMainVideo} type="video/mp4"/>
      </video>
      <div className="main__label-wrapper">
        <div className="main__label-text">
          <span>BUHALO</span><span>CREW</span>
        </div>
        <div className="main__label-graffity">

        </div>
      </div>
    </section>
  )
}

export default Main;