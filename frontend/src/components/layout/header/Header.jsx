import "./Header.scss";
import { React, useState, useEffect, useCallback, useContext } from "react";
import { motion } from "framer-motion"
import { PenSvg, TshirtSvg, TestAbaba } from "../../../images/"
import { useDetectClickOutside } from 'react-detect-click-outside';
import { ItemModule, BlackBtn, PixelBtn } from "../index";
import { NavLink } from "react-router-dom";
import { Authorization } from "../../pages";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { CartContext } from "../../../context/cartContext";
import { useTranslation } from 'react-i18next'
const menuDrop = {
  open: { y: "80%" },
  closed: { y: "-60%" }
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [delayedSearchTerm, setDelayedSearchTerm] = useState("");
  const { request } = useHttp();
  const [headerClothes, setHeaderClothes] = useState([]);
  const {isEmptyCart, setIsEmptyCart} = useContext(CartContext)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDelayedSearchTerm(searchTerm);
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, request])

  const fetchClothes = useCallback(async () => {
    try {
      if (delayedSearchTerm.length >= 1) {
        await request(`/api/clothes/find?name=${delayedSearchTerm}&fullTextSearch=true`, "GET", null).then((res) => {
          setHeaderClothes(res.clothes);
        });
      }
    } catch (e) { }
  }, [request, delayedSearchTerm]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes])

  const handleSetOpen = () => {
    Authorization.setIsOpen(true);
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  function multipleStates(isOpen, isOpenSecond, isOpenSearch, isOpenCard, isOpenAccount) {
    setIsOpen(isOpen)
    setIsOpenSecond(isOpenSecond)
    setIsOpenSearch(isOpenSearch)
    setIsOpenCard(isOpenCard)
    setIsOpenAccount(isOpenAccount)
  }

  const handleClickOutside = () => {
    setIsOpen(false)
    setIsOpenSecond(false)
    setIsOpenSearch(false)
    setIsOpenCard(false)
    setIsOpenAccount(false)
  };

  function sizeUpload(sizeArr) {
    var size = "";
    sizeArr.forEach((element) => (element.count > 0 ? size += element.size + " " : ""));
    return size;
  }

  const [hasLoaded, setHasLoaded] = useState(true);
  const {isLocalStorage, setIsLocalStorage} = useContext(CartContext);
  const auth = useContext(AuthContext);
  const {cartHeader, setCartHeader} = useContext(CartContext)
  const fetchCart = useCallback(async () => {
    try {
      if(auth.token !== null){
        await request("/api/clothes-to-order/order/info", "GET", null, null,  { Authorization: `Bearer ${auth.token}` }).then((res) => {
          setCartHeader(res.order);
          setHasLoaded(true);
          if(res.order.clothes.length > 0){
            setIsEmptyCart(true);
          }
        });
      }
      else{
        setCartHeader(JSON.parse(localStorage.getItem("cart") || "[]"));
        let temp = JSON.parse(localStorage.getItem("cart") || "[]")
        if(temp.length > 0){
          setIsEmptyCart(true);
          setIsLocalStorage(true);
        }
        setHasLoaded(true);
      }
    } catch (e) {}
  }, [request, auth.token]);
  
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  function totalSum(array) {
    var total = 0;
    array.forEach((element) => (total += element.clothes_id.price));
    return total;
  }







  const { t } = useTranslation(); 

  const languages = [
    { value: 'en', text: t('english') },
    { value: 'ru', text: t('russian') },
    { value: 'uk', text: t('ukrainian') }
  ]

  const [lang, setLang] = useState(localStorage.getItem('i18nextLng').length > 0 ? localStorage.getItem('i18nextLng') : "en");

  const handleChange = e => { 
    setLang(e.target.value);
    const url = window.location.href;
    window.location.replace(url.substring(0, url.lastIndexOf('?')) + "?lng=" + e.target.value)
  }

  const ref = useDetectClickOutside({ onTriggered: handleClickOutside })
  return hasLoaded ? (
    <div className='header' ref={ref}>
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
            <p><NavLink to="/store">{t("new_drops")}</NavLink></p>
            <p>{t("discounts")}</p>
            <li><NavLink to="/store/T-Shirt">{t('t-shirts')}</NavLink></li>
            <li><NavLink to="/store/Hoodie">{t('hoodies')}</NavLink></li>
            <li><NavLink to="/store/Pants">{t('pants')}</NavLink></li>
            <li><NavLink to="/store/Cases">{t('cases')}</NavLink></li>
            <li><NavLink to="/store/Briefcase">{t('briefcases')}</NavLink></li>
            <li><NavLink to="/store/Sweatshirts">{t('sweatshirts')}</NavLink></li>
            <li>
            <div className="language-wrapper">
            </div>
            </li>
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
            <div><PenSvg /></div>
            <div><TshirtSvg /></div>
          </div>
          <div className="header__menu-drop__item-center">
            <div><p>{t('design')}</p></div>
            <div><p>{t('sets')}</p></div>
          </div>
        </motion.div>
        <motion.div className="header__menu-drop__item search"
          animate={isOpenSearch ? "open" : "closed"}
          variants={menuDrop}>
          <div className="decor">
          </div>
          <div className="header__menu-drop__item-flex grid">
            {headerClothes.map((cloth, index) => {
              return (<ItemModule class="search" text={cloth.name} price={cloth.price + "₴"} link={`/store/${cloth.type}/${cloth._id}`} key={cloth._id} img={cloth.imagesUrls[0]} sizes={sizeUpload(cloth.clothesCount)} />)
            })}
          </div>
        </motion.div>
        <motion.div className="header__menu-drop__item card"
          animate={isOpenAccount ? "open" : "closed"}
          variants={menuDrop}>
          <div className="decor">
          </div>
          <div className="header__menu-drop__item-flex grid">
            {!isLocalStorage && isEmptyCart && auth.token ? 
            cartHeader?.clothes.map((cart, index) => {
              return (<ItemModule class="search" text={cart.name} price={cart.totalPrice + "₴"} link={cart.isModeling ? `/modeling/${cart?.modeling?._id}` : `/store/${cart?.name.split(' ')[0]}/${cart.clothes_id}`} key={cart._id} img={cart.image} sizes={cart.size} />)
            }) 
            : isLocalStorage && isEmptyCart && !auth.token ? 
            cartHeader?.map((cart, index) => { 
              return (<ItemModule class="search" text={cart.clothes_id.name} price={cart.clothes_id.price + "₴"} link={`/store/${cart?.clothes_id.name.split(' ')[0]}/${cart.clothes_id._id}`} img={cart.clothes_id.imagesUrls[0]} sizes={cart.size} />) 
            })
            : (<div></div>)}
          </div>


          {
          isEmptyCart ?
            (<div className="header__menu-accept">
              <div className="accept-btn">
              <NavLink to="/cart">
                <PixelBtn text={t('open_cart')} color="RedLittle" />
              </NavLink>
              </div>
              <div className="price">
                <div className="price-label">{!isLocalStorage ? `${t('total_price')}: ` + cartHeader.total + "₴" : `${t('total_price')}: ` +  totalSum(JSON.parse(localStorage.getItem("cart") || "[]")) + "₴"}</div>
                <div className="low-text">{t('vat')}</div>
              </div>
            </div>)
            :
            (<div className="header__menu-empty">
              <img src={TestAbaba} />
            </div>)
          }


        </motion.div>
        <motion.div className="header__menu-drop__item account"
          animate={isOpenCard ? "open" : "closed"}
          variants={menuDrop}>
          <div className="decor">
          </div>

          <div className="header__menu-drop__item-account-wrapper">
            <div className="header__menu-drop__item-account">
              <div className="header__menu-drop__item-account_big-text">
                {t('aur')}
              </div>
            </div>
            <div className="header__menu-drop__item-account">
              <div>
                <NavLink to="/auth">
                  <BlackBtn text={t('login')} class="little" onClick={handleSetOpen} />
                </NavLink>
              </div>
            </div>
            <div className="header__menu-drop__item-account">
              <div className="header__menu-drop__item-account_big-text">
                {t('ftots')}
              </div>
              <div className="header__menu-drop__item-account_little-text">
                {t('aruwdatrfaaf')}
              </div>
            </div>
            <div className="header__menu-drop__item-account">
              <div>
                <NavLink to="/auth">
                  <BlackBtn text={t('register')} class="little" onClick={handleSetOpen} />
                </NavLink>
              </div>
            </div>
          </div>


        </motion.div>
      </div>
      <div className='header__wrapper'>
        <div className="header__logo">BUHALO</div>
        <select className="language-select" value={lang} onChange={handleChange}>
          {languages.map(item => {
            return (<option key={item.value} 
            value={item.value}>{item.text}</option>);
          })}
        </select>
        <ul className="header__menu">
          
          <li><button onClick={() => multipleStates(!isOpen, false, false, false, false)}>{t('shop')}</button></li>
          <li><button onClick={() => multipleStates(false, !isOpenSecond, false, false, false)}>{t('create')}</button></li>
          <li>{t('my_design')}</li>
          <li>FAQ</li>
          
        </ul>
        <div className="header__search">
          <form>
            <input onChange={handleOnChange} onClick={() => multipleStates(false, false, true, false, false)} type="text" placeholder={t('search')} name="search" />
          </form>
        </div>
        <div className="header__btns">
        <style dangerouslySetInnerHTML={{
          __html: [
            '.account-btn::after {',
            ` content: "${t('account_header')}";`,
            ' color: white;',
            ' position: absolute;',
            ' top: 0.5vw;',
            ' font-size: 0.4vw;',
            '}'
            ].join('\n')
          }}>
        </style>
          <div onClick={() => multipleStates(false, false, false, !isOpenAccount, false)} className="header__btns-wrapper account-btn">
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.9477 16.2057L20.2598 16.7439L21.0722 17.0645C23.6158 18.0685 25.8364 19.7417 27.496 21.9047C29.1555 24.0673 30.1918 26.6381 30.4941 29.3413C30.5234 29.6153 30.4427 29.8901 30.2691 30.106C30.1004 30.3157 29.8571 30.4534 29.5891 30.4906L29.449 30.4906L29.446 30.4907C29.1838 30.4922 28.9306 30.3971 28.7354 30.2243C28.5403 30.0516 28.4169 29.8137 28.3883 29.5567L28.3882 29.5558C28.0323 26.4047 26.5215 23.495 24.1453 21.3824C21.7692 19.2699 18.6943 18.1025 15.5081 18.1025C12.3218 18.1025 9.24689 19.2699 6.87077 21.3824C4.49457 23.495 2.98379 26.4047 2.62786 29.5558L2.62773 29.557C2.59696 29.8352 2.45626 30.0905 2.23559 30.2665C2.01482 30.4425 1.73225 30.5245 1.45008 30.4936C1.16794 30.4627 0.910388 30.3217 0.733715 30.1026C0.64625 29.9941 0.581244 29.8697 0.54228 29.7365C0.503344 29.6034 0.49114 29.4641 0.506333 29.3264C0.807118 26.6306 1.83788 24.0662 3.48903 21.9066C5.14023 19.747 7.35003 18.0732 9.88307 17.0639L10.6914 16.7419L10.0061 16.2057C8.56077 15.0748 7.50623 13.5243 6.98867 11.7703C6.47113 10.0163 6.51616 8.14549 7.11753 6.41808C7.71892 4.69064 8.84692 3.19208 10.3451 2.13121C11.8433 1.07031 13.6371 0.5 15.4769 0.5C17.3167 0.5 19.1105 1.07031 20.6087 2.13121C22.1069 3.19208 23.2349 4.69064 23.8363 6.41808C24.4376 8.14549 24.4827 10.0163 23.9651 11.7703C23.4476 13.5243 22.393 15.0748 20.9477 16.2057ZM11.7386 14.8717C12.8454 15.6072 14.1463 15.9996 15.4769 15.9996C17.2611 15.9996 18.9727 15.2947 20.2352 14.0392C21.4977 12.7836 22.2075 11.08 22.2075 9.30315C22.2075 7.97811 21.8124 6.68305 21.0725 5.58176C20.3326 4.4805 19.2812 3.62259 18.0517 3.11609C16.8222 2.6096 15.4694 2.47712 14.1643 2.7353C12.8593 2.99347 11.6601 3.63079 10.7186 4.56709C9.77711 5.50343 9.13563 6.69672 8.87571 7.99623C8.61579 9.29575 8.74922 10.6427 9.25899 11.8667C9.76876 13.0906 10.6318 14.1363 11.7386 14.8717Z" fill="white" stroke="black" />
            </svg>
          </div>
          <style dangerouslySetInnerHTML={{
          __html: [
            '.cart-btn::after {',
            ` content: "${t('cart_header')}";`,
            ' color: white;',
            ' position: absolute;',
            ' top: 0.5vw;',
            ' width: 2vw',
            ' text-align: center;',
            ' font-size: 0.4vw;',
            '}'
            ].join('\n')
          }}>
        </style>
          <div onClick={() => multipleStates(false, false, false, false, !isOpenCard)} className="header__btns-wrapper cart-btn">
            <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.432 32.8661L25.2424 10.6854C25.1962 10.2172 24.8022 9.86065 24.3317 9.86065H20.2369V6.24176C20.2369 2.79959 17.4369 0 13.9956 0C10.554 0 7.75433 2.79966 7.75433 6.24176V9.86072H3.65902C3.18856 9.86072 2.79494 10.2173 2.74841 10.6855L0.546215 32.9948C0.520718 33.2521 0.605191 33.5078 0.778602 33.699C0.951945 33.891 1.19853 34 1.45676 34H26.5345C26.5372 34 26.5402 34 26.5434 34C27.0488 34 27.4584 33.59 27.4584 33.0851C27.4584 33.0091 27.4494 32.9359 27.432 32.8661ZM9.58434 6.24176C9.58434 3.80948 11.5632 1.83007 13.9956 1.83007C16.4279 1.83007 18.4068 3.80955 18.4068 6.24176V9.86072H9.58434V6.24176ZM4.4882 11.6908H7.75426V13.5423C7.75426 14.0471 8.16405 14.4572 8.66933 14.4572C9.17468 14.4572 9.58434 14.0471 9.58434 13.5423V11.6908H18.4068V13.5423C18.4068 14.0471 18.8165 14.4572 19.3217 14.4572C19.8271 14.4572 20.2367 14.0471 20.2367 13.5423V11.6908H23.5024L25.1676 28.5564H2.82308L4.4882 11.6908ZM2.46645 32.1702L2.6425 30.3865H25.3487L25.5247 32.1702H2.46645Z" fill="white" stroke="black" />
            </svg>
          </div>
        </div>
      </div>


    </div>








  ) : (
    <div className='header' ref={ref}>
    </div>
  )
}