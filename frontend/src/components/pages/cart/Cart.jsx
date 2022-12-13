import "./Cart.scss";
import { React, useState, useContext, useCallback, useEffect } from "react";
import { PixelBtn, ChangeBtn, PixelInput, ItemModule, NovaposhtaInput  } from "../../layout/index";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { CartContext } from "../../../context/cartContext";
import makeAnimated from "react-select/animated";
import Async from 'react-select/async';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next'

const bgAnimation = {
  open: { width: "30%" },
  closed: { width: "30%" },
};

const btnHidden = {
  open: { opacity: 1 },
  process: { opacity: 0 },
  closed: { opacity: 0 },
};

const btnHidden2 = {
  open: {  x: "200%"},
  process: {  x: "0%" },
  closed: {  x: "0%" },
};

const animToRight = {
  open: {  x: "0%"},
  process: {  x: "100%" },
  closed: {  x: "100%" },
}
const animToRight2 = {
  open: {  x: "-130%"},
  process: { x: "0%"},
  closed: { x: "150%"  },
}


const Cart = () => {
  
  const [isOpen, setIsOpen] = useState("open");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLocalStorage, setIsLocalStorage] = useState(false);
  const[cart, setCart] = useState(null);
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();
  const {cartHeader, setCartHeader} = useContext(CartContext);
  const {isEmptyCart, setIsEmptyCart} = useContext(CartContext);
  const animationPayment = () => {
    setIsOpen(true)
  }



  const fetchCart = useCallback(async () => {
    try {
      if(auth.token !== null){
      await request("/api/clothes-to-order/order/info", "GET", null, null,  { Authorization: `Bearer ${auth.token}` }).then((res) => {
        setCart(res.order);
        setHasLoaded(true);
      });
    }
    else{
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
      if(JSON.parse(localStorage.getItem("cart") || "[]").length > 0){
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

  function deleteFromLS(target) {
    var storedNames = JSON.parse(localStorage.getItem("cart"));
    storedNames.splice(target, 1);
    localStorage.setItem('cart', JSON.stringify(storedNames));
    if(JSON.parse(localStorage.getItem("cart") || "[]").length === 0){
      localStorage.removeItem("cart");
      setCart(JSON.parse(localStorage.getItem("cart")));
      setCartHeader(JSON.parse(localStorage.getItem("cart")));
      setIsEmptyCart(false)
    }else{
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
      setCartHeader(JSON.parse(localStorage.getItem("cart") || "[]"));
    }
  }

  function deleteFromDB(target) {
    request(
      "/api/order-clothes/delete",
      "DELETE",
      {
        _id: cart.clothes[target].orderClothes_id
      },
      null,
      { Authorization: `Bearer ${auth.token}` }
    );
    request("/api/clothes-to-order/order/info", "GET", null, null,  { Authorization: `Bearer ${auth.token}` }).then((res) => {
      setCart(res.order);
      setCartHeader(res.order);
      if(res.order.clothes?.length === undefined){
        setIsEmptyCart(false)
      }
    });
  }
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      const [account, setAccount] = useState({
        email: null,
        name: null,
        surname: null,
        patronymic: null,
        region: null,
        city: null,
        novaposhta: null,
        phone: null,
      });

      const changeHandlerAccount = (event) => {
        setAccount({
          ...account,
          [event.target.name]: event.target.value,
        });
        console.log(account);
      };

      const fetchAccount = useCallback(async () => {
        try {
          await request("/api/account", "GET", null, null, {
            Authorization: `Bearer ${auth.token}`,
          }).then((res) => {
            setAccount(res.data);
          });
          setHasLoaded(true);
        } catch (e) {}
      }, [request, auth]);

      useEffect(() => {
        fetchAccount();
      }, [fetchAccount]);

      const [isOpenSecond, setIsOpenSecond] = useState(false);
      const [isOpenThird, setIsOpenThird] = useState(false);
      const updateAccount = async () => {
        try {
          delete account.password;
          delete account.passwordGoogle;
          await request("/api/account/update", "PUT", { ...account }, null, {
            Authorization: `Bearer ${auth.token}`,
          });
        } catch (e) {}
      };

      //
      const animatedComponents = makeAnimated();
      // https://new.novaposhta.ua/dashboard/settings/developers - apiKey
      const apiKey =  process.env.REACT_APP_NOVAPOSHTA_APIKEY;
      const [wareHouses, setWareHouses] = useState([]);

      const handleChangeCity = async (option) => {
        setAccount({
          ...account,
          region: option.AreaDescription === "АРК" ? option.AreaDescription : option.AreaDescription += " обл.",
          city: option.Description
        });
        const result = await request("/api-novaposhta", "POST", {
          apiKey: apiKey,
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityName: option.Description,
          },
        });
        setWareHouses(result.data);
      };

      const fetchCitiesOptions = (async (inputValue) => {
        try {
          const result = await request("/api-novaposhta", "POST", {
            apiKey: apiKey,
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: {
              FindByString: inputValue
            },
          });
          return result.data;
        } catch (e) {}
      });

      const handleWareHouses = (option) => {
        setAccount({
          ...account,
          novaposhta: option.Description,
        });
      };

      const fetchWareHousesOptions = (async (inputValue) => {
        try {
          const result = await request("/api-novaposhta", "POST", {
            apiKey: apiKey,
            modelName: "Address",
            calledMethod: "getWarehouses",
            methodProperties: {
              CityName: account.city,
              FindByString: inputValue,
            },
          });
          setWareHouses(result.data);
          return result.data
        } catch (e) {}
      });

  const paymenMehod = async () => {
    try {
      const cartItem = cart.clothes;
      const id = account._id;
      await request(`/api/order/create-checkout-session`, "POST", {
        cartItem,
        userId: id,
      },
      null,
      {
        Authorization: `Bearer ${auth.token}`,
      }
      )
      .then((response) => {
        const order_id = cart.order_id
        if(response.check === true){
          request("/api/order/update", "PUT",
          {
            _id: order_id,
            status: "processing",
            payment_type: "card",
            email: account.email,
            name: account.name,
            surname: account.surname,
            patronymic: account.patronymic,
            region: account.region,
            city: account.city,
            novaposhta: account.novaposhta,
            phone: account.phone,
          },
          null, 
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        }
        if (response.url) {
          window.location.href = response.url;
        }
      })
    } catch (e) {
      console.log(e)
    }
  };

  const { t } = useTranslation();

  return hasLoaded ? (
    <section className="Cart">
      <motion.div
        className="login-bg">
      </motion.div>
      <div className="cart__wrapper">
        <motion.div className="cart-wrapper"
         animate={isOpen}
         variants={animToRight}
         transition={{ duration: 0.8 }}>
          <div className="cart-label">
          {t('cart')} <span>{!isLocalStorage && cart?.clothes?.length > 0 ? cart?.clothes?.length + " " + t('things') : isLocalStorage && JSON.parse(localStorage.getItem("cart") || "[]").length > 0 ? cart?.length + " " + t('things') : "0 " + t('things') }</span>
          </div>
          <div className="cart-label-atten">
            {t('offer_delay')}
          </div>
          <div className="cart-items-list">
          {!isLocalStorage && cart?.clothes?.length > 0 ? cart.clothes.map((cart, index) => {
              return (<ItemModule class="cart" text={cart.name} price={cart.totalPrice + "₴"} link={`/store/${cart.name.split(' ')[0]}/${cart.clothes_id}`} key={cart._id} img={cart.image} sizes={cart.size} onClick={()=>{deleteFromDB(index)}}/>)
            }) : isLocalStorage && JSON.parse(localStorage.getItem("cart") || "[]")?.length > 0 ?
            cart.map((cart, index) => {
              return (<ItemModule class="cart" text={cart.clothes_id.name} price={cart.clothes_id.price + "₴"} link={`/store/${cart.clothes_id.name.split(' ')[0]}/${cart.clothes_id._id}`} img={cart.clothes_id.imagesUrls[0]} sizes={cart.size} onClick={()=>{deleteFromLS(index)}} />)
            }) : <div></div>}
          </div>
        </motion.div>
        <motion.div className="ChangeAccount-values"          
        animate={isOpen}
         variants={animToRight2}
         transition={{ duration: 0.8 }}>
          <div className="ChangeAccount-label">{t('user_info')}</div>
          <div className="ChangeAccount-inputs">
            <div className="inputs-label">{t('personal_info')}</div>
            <div className="change-btn">
              <ChangeBtn
                onClick={() => setIsOpenThird((isOpenThird) => !isOpenThird)}
                text={t('tap_to_change')}/>
            </div>
            <div className="inputs-grid">
              <PixelInput
                disabled={!isOpen}
                name="name"
                placeholder={t('name')}
                description={t('name')}
                onChange={changeHandlerAccount}
                value={account.name}
              />
              <PixelInput
                disabled={!isOpen}
                name="surname"
                placeholder={t('surname')}
                description={t('surname')}
                onChange={changeHandlerAccount}
                value={account.surname}
              />
              <PixelInput
                disabled={!isOpen}
                name="patronymic"
                placeholder={t('patronymic')}
                description={t('patronymic')}
                onChange={changeHandlerAccount}
                value={account.patronymic}
              />
              <PixelInput
                disabled={!isOpen}
                name="phone"
                placeholder={t('phone')}
                description={t('phone')}
                onChange={changeHandlerAccount}
                value={account.phone}
              />

              <div className="inputsBtn">
                <PixelBtn
                  text={t('save_changes')}
                  color="BigRed"
                  animate={isOpenThird ? "open" : "closed"}
                  variants={btnHidden}
                  onClick={updateAccount}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          <div className="ChangeAccount-inputs">
            <div className="inputs-label">{t('personal_info')}</div>
            <div className="change-btn">
              <ChangeBtn
                onClick={() => setIsOpenSecond((isOpenSecond) => !isOpenSecond)}
                text={t('tap_to_change')}
              />
            </div>
            <div className="inputs-grid">
              <PixelInput
                disabled={true}
                name="region"
                placeholder={t('region')}
                description={t('region')}
                onChange={changeHandlerAccount}
                value={account.region}/>
              <NovaposhtaInput
                description={t('city_region')}
                name="city"
                defaultValue={account.city}
                value={{Description: account.city, Ref:account.city}}
                loadOptions={fetchCitiesOptions}
                components={animatedComponents}
                getOptionLabel={(option) => option.Description}
                getOptionValue={(option) => option.Ref}
                onChange={handleChangeCity}
                menuPosition="fixed"/>
              <NovaposhtaInput
                description={t('department')} 
                name="novaposhta"
                defaultValue={account.novaposhta}
                value={{Description: account.novaposhta, Ref: account.novaposhta}}
                loadOptions={fetchWareHousesOptions}
                defaultOptions={wareHouses}
                getOptionLabel={(option) => option.Description}
                getOptionValue={(option) => option.Ref}
                components={animatedComponents}
                onChange={handleWareHouses}
                menuPosition="fixed"/>

              <div className="inputsBtn">
                <PixelBtn
                  text={t('save_changes')}
                  color="BigRed"
                  animate={isOpenSecond ? "open" : "closed"}
                  variants={btnHidden}
                  onClick={updateAccount}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="order-wrapper"
          animate={isOpen}
          variants={bgAnimation}>
            <div className="order-label">
            {t('order_info')}
            </div>
            <div className="order-info">
              <div className="order-info__little">{t('view_vat')}</div>
              <div className="order-info__big">{t('clothes_price')}: <span>{!isLocalStorage && cart?.total > 0 ? cart?.total +"₴" : isLocalStorage && JSON.parse(localStorage.getItem("cart") || "[]").length > 0 ? totalSum(JSON.parse(localStorage.getItem("cart") || "[]")) + "₴" : "0₴"}</span></div>
            </div>
            <div className="order-btn">
              {auth.token !== null ? 
              <PixelBtn
                onClick={() => setIsOpen((isOpen) => "process")}
                text={t('make_an_order')}
                color="BigRed"
                animate={isOpen}
                variants={btnHidden}/> 
                : 
              <NavLink to="/auth">
                <PixelBtn
                text={t('make_an_order')}
                color="BigRed"
                animate={isOpen}
                variants={btnHidden}/>
              </NavLink>
              }
              <PixelBtn
                onClick={paymenMehod}
                text={t('pay')}
                color="BigRed"
                animate={isOpen}
                variants={btnHidden2}/>
              <PixelBtn
                onClick={() => setIsOpen((isOpen) => "open")}
                text={t('back')}
                color="Blue"
                animate={isOpen}
                variants={btnHidden2}/>


            </div>
            <div className="order-payment">
              <p>{t('payment_methods')}:</p>
            </div>
            <div className="order-static__info">
              <p>{t('delivery_method')}</p>
              <ul>
                <li>{t('365_days')}</li>
                <li>{t('free_shipping')}</li>
              </ul>
              <p>{t('tax')}</p>
            </div>
        </motion.div>
      </div>
    </section>
  ):(<div></div>);
};

export default Cart;