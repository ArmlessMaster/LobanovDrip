import "./Store.scss";
import {React, useState, useContext} from "react";
import { motion } from "framer-motion"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { Carousel, renderArrowPrev, renderArrowNext } from 'react-responsive-carousel';  
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Link } from "react-router-dom";
import {test} from "../../../images"



export const Store = () => {

  
  const [isOpen, setIsOpen] = useState(false);

  return (

    <section className='Store'>
      <div className="store__collection-carusel">
        <div className="store__collection-carusel_wrapper">
          <Carousel autoPlay infiniteLoop showThumbs={false} interval="3000" emulateTouch >  
            
            <div className="store__collection-carusel_element">  
                <img src={test} />  
            </div>  
            <div className="store__collection-carusel_element">  
                <img src={test}/>  
            </div>  
            <div className="store__collection-carusel_element">  
                <img src={test } />  
            </div>  
          </Carousel>  
        </div>
      </div>
      <div className="store-item-carusel">
        <div className="store__label">LOBANOV<span>EXCLUSIVE</span></div>
      </div>
    </section>
  )
}

