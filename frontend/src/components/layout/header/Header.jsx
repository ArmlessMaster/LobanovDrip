import "./Header.scss";
import {React, useState, useEffect, useCallback} from "react";
import { motion } from "framer-motion"
import {PenSvg, TshirtSvg} from "../../../images/"
import { useDetectClickOutside } from 'react-detect-click-outside';
import {ItemModule} from "../index";
import { NavLink, useNavigate } from "react-router-dom";

import { useHttp } from "../../../hooks/http.hook";

const menuDrop = {
  open: {  y: "5%" },
  closed: {  y: "-100%" }
}



export const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [delayedSearchTerm, setDelayedSearchTerm] = useState("");
  const { request } = useHttp();
  const [headerClothes, setHeaderClothes] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDelayedSearchTerm(searchTerm);
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, request])

  const fetchClothes = useCallback(async () => {
    try {
      await request(`api/clothes/find?name=${delayedSearchTerm}&fullTextSearch=true`, "GET", null).then((res) => {
        setHeaderClothes(res.clothes);
      });
    } catch (e) {}
  }, [request, delayedSearchTerm]);

  useEffect(() => {
      fetchClothes();
  }, [fetchClothes])

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  function multipleStates(isOpen, isOpenSecond, isOpenSearch){
    setIsOpen(isOpen)
    setIsOpenSecond(isOpenSecond)
    setIsOpenSearch(isOpenSearch)
  }

  
  const handleClickOutside = () => {
    setIsOpen(false)
    setIsOpenSecond(false)
    setIsOpenSearch(false)
  };

  function sizeUpload(sizeArr){
    var size = "";
    sizeArr.forEach((element) => (element.count > 0 ? size += element.size + " " : ""));
    return size;
  }

  const ref = useDetectClickOutside({ onTriggered: handleClickOutside })
  return (

    <div className='header'  ref={ref}>
      <div className="header__menu-drop">
        <motion.div className="header__menu-drop__item first"
          animate={isOpen ? "open" : "closed"}
          variants={menuDrop}>
          <div className="decor">
            <div className="decor__item">
              洋服屋
            </div>
          </div>
          <ul>
            <li><NavLink to="/store/t-shirt">T-SHIRT</NavLink></li>
            <li><NavLink to="/store/hoodie">HOODIE</NavLink></li>
            <li><NavLink to="/store/pants">PANTS</NavLink></li>
            <li><NavLink to="/store/cases">CASES</NavLink></li>
            <li><NavLink to="/store/briefcase">BRIEFCASE</NavLink></li>
            <li><NavLink to="/store/sweatshirts">SWEATSHIRTS</NavLink></li>
          </ul>
        </motion.div>
        <motion.div className="header__menu-drop__item second"
          animate={isOpenSecond ? "open" : "closed"}
          variants={menuDrop}>
          <div className="decor">
            <div className="decor__item">
              洋服屋
            </div>
            <div className="decor__line"></div>
          </div>
          <div className="header__menu-drop__item-flex">
            <div><PenSvg/></div>
            <div><TshirtSvg/></div>
          </div>
          <div className="header__menu-drop__item-center">
            <div><p>DESIGN</p></div>
            <div><p>SETS</p></div>
          </div>
        </motion.div>
        <motion.div className="header__menu-drop__item search"
          animate={isOpenSearch ? "open" : "closed"}
          variants={menuDrop}>
          <div className="decor">
          </div>
          <div className="header__menu-drop__item-flex grid">
          {headerClothes.map((cloth, index) => {
            return(<ItemModule class="search" text={cloth.name} price={cloth.price + "₴"}  key={cloth._id} img={cloth.imagesUrls[0]} sizes={sizeUpload(cloth.clothesCount)}/>) 
          })}
          </div>
        </motion.div>
      </div>
       <div className='header__wrapper'>
        <div className="header__logo">BUHALO</div>
        <ul className="header__menu">
          <li><button  onClick={() => multipleStates(!isOpen, false, false)}>STORE</button></li>
          <li><button  onClick={() => multipleStates(false, !isOpenSecond, false)}>CREATE</button></li>
          <li>MY DESIGN</li>
          <li>FAQ</li>
        </ul>
        <div className="header__search">
          <form>
            <input onChange={handleOnChange} onClick={() => multipleStates(false, false, true)} type="text" placeholder="SEARCH" name="search"/>
          </form>
        </div>
        <div className="header__btns">
          <div className="header__btns-wrapper account-btn">
            <NavLink to="/auth">
              <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9477 16.2057L20.2598 16.7439L21.0722 17.0645C23.6158 18.0685 25.8364 19.7417 27.496 21.9047C29.1555 24.0673 30.1918 26.6381 30.4941 29.3413C30.5234 29.6153 30.4427 29.8901 30.2691 30.106C30.1004 30.3157 29.8571 30.4534 29.5891 30.4906L29.449 30.4906L29.446 30.4907C29.1838 30.4922 28.9306 30.3971 28.7354 30.2243C28.5403 30.0516 28.4169 29.8137 28.3883 29.5567L28.3882 29.5558C28.0323 26.4047 26.5215 23.495 24.1453 21.3824C21.7692 19.2699 18.6943 18.1025 15.5081 18.1025C12.3218 18.1025 9.24689 19.2699 6.87077 21.3824C4.49457 23.495 2.98379 26.4047 2.62786 29.5558L2.62773 29.557C2.59696 29.8352 2.45626 30.0905 2.23559 30.2665C2.01482 30.4425 1.73225 30.5245 1.45008 30.4936C1.16794 30.4627 0.910388 30.3217 0.733715 30.1026C0.64625 29.9941 0.581244 29.8697 0.54228 29.7365C0.503344 29.6034 0.49114 29.4641 0.506333 29.3264C0.807118 26.6306 1.83788 24.0662 3.48903 21.9066C5.14023 19.747 7.35003 18.0732 9.88307 17.0639L10.6914 16.7419L10.0061 16.2057C8.56077 15.0748 7.50623 13.5243 6.98867 11.7703C6.47113 10.0163 6.51616 8.14549 7.11753 6.41808C7.71892 4.69064 8.84692 3.19208 10.3451 2.13121C11.8433 1.07031 13.6371 0.5 15.4769 0.5C17.3167 0.5 19.1105 1.07031 20.6087 2.13121C22.1069 3.19208 23.2349 4.69064 23.8363 6.41808C24.4376 8.14549 24.4827 10.0163 23.9651 11.7703C23.4476 13.5243 22.393 15.0748 20.9477 16.2057ZM11.7386 14.8717C12.8454 15.6072 14.1463 15.9996 15.4769 15.9996C17.2611 15.9996 18.9727 15.2947 20.2352 14.0392C21.4977 12.7836 22.2075 11.08 22.2075 9.30315C22.2075 7.97811 21.8124 6.68305 21.0725 5.58176C20.3326 4.4805 19.2812 3.62259 18.0517 3.11609C16.8222 2.6096 15.4694 2.47712 14.1643 2.7353C12.8593 2.99347 11.6601 3.63079 10.7186 4.56709C9.77711 5.50343 9.13563 6.69672 8.87571 7.99623C8.61579 9.29575 8.74922 10.6427 9.25899 11.8667C9.76876 13.0906 10.6318 14.1363 11.7386 14.8717Z" fill="white" stroke="black"/>
              </svg>
            </NavLink>
          </div>
          <div className="header__btns-wrapper cart-btn">
            <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.432 32.8661L25.2424 10.6854C25.1962 10.2172 24.8022 9.86065 24.3317 9.86065H20.2369V6.24176C20.2369 2.79959 17.4369 0 13.9956 0C10.554 0 7.75433 2.79966 7.75433 6.24176V9.86072H3.65902C3.18856 9.86072 2.79494 10.2173 2.74841 10.6855L0.546215 32.9948C0.520718 33.2521 0.605191 33.5078 0.778602 33.699C0.951945 33.891 1.19853 34 1.45676 34H26.5345C26.5372 34 26.5402 34 26.5434 34C27.0488 34 27.4584 33.59 27.4584 33.0851C27.4584 33.0091 27.4494 32.9359 27.432 32.8661ZM9.58434 6.24176C9.58434 3.80948 11.5632 1.83007 13.9956 1.83007C16.4279 1.83007 18.4068 3.80955 18.4068 6.24176V9.86072H9.58434V6.24176ZM4.4882 11.6908H7.75426V13.5423C7.75426 14.0471 8.16405 14.4572 8.66933 14.4572C9.17468 14.4572 9.58434 14.0471 9.58434 13.5423V11.6908H18.4068V13.5423C18.4068 14.0471 18.8165 14.4572 19.3217 14.4572C19.8271 14.4572 20.2367 14.0471 20.2367 13.5423V11.6908H23.5024L25.1676 28.5564H2.82308L4.4882 11.6908ZM2.46645 32.1702L2.6425 30.3865H25.3487L25.5247 32.1702H2.46645Z" fill="white" stroke="black"/>
            </svg>
          </div>
        </div>
       </div>

    
    </div>
  )
}