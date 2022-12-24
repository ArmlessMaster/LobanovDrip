import "./SavedDesign.scss";
import { React, useState, useEffect, useCallback, useContext } from "react";
import {BackgroundVideo} from "../../../images";
import { DesignItem, Loader } from "../../layout";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from 'react-i18next'
import { CartContext } from "../../../context/cartContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";


const HelpDesign = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const auth = useContext(AuthContext);
  const [modeling, setModeling] = useState([]);
  const [order, setOrder] = useState(null);
  const { cartHeader, setCartHeader } = useContext(CartContext);
  const {isEmptyCart, setIsEmptyCart } = useContext(CartContext)
  const {isLocalStorage, setIsLocalStorage} = useContext(CartContext);
  const { request } = useHttp();

  const fetchClothes = useCallback(async () => {
    try {
        await request("/api/modeling", "GET", null, null, {Authorization: `Bearer ${auth.token}`}).then(async (res) => {
          const modeling1 = res.modeling;
          await Promise.all(res.modeling.map(async (item, index)=>{
            await request(`/api/clothes/find?_id=${item.clothes_id}`, "GET", null, null, {Authorization: `Bearer ${auth.token}`}).then((res)=>{
              modeling1[index].clothes_id = res.clothes[0];
            })
          }))
          setModeling(modeling1)
        }).then(setHasLoaded(true))

      } 
    catch (e) {}
    }, [request]);
    
    useEffect(() => {
      fetchClothes();
    }, [fetchClothes]);


    const fetchOrder = useCallback(async () => {
      try {
        await request("/api/account", "GET", null, null, {
          Authorization: `Bearer ${auth.token}`,
        }).then((res) => {
          request(
            `/api/order/find?status=cart&user_id=${res.data._id}`,
            "GET",
            null,
            null,
            { Authorization: `Bearer ${auth.token}` }
          ).then((res) => {
            setOrder(res.orders[0]._id);
          });
        });
      } catch (e) {}
    }, [request, auth.token]);
  
    useEffect(() => {
      fetchOrder();
    }, [fetchOrder]);




    const cartHandler = async (event) => {
      try {
        const modeling1 = modeling.filter((item)=>item._id === event.target.name)[0] 
        const obj = {
          clothes_id: modeling1._id, 
          size: modeling1.size, 
          color: modeling1.clothes_id.color[0], 
          order_id: order, 
          productModel: "Modeling", 
          count: 1
        }
        
          await request(
            "/api/order-clothes/create",
            "POST",
            { ...obj },
            null,
            { Authorization: `Bearer ${auth.token}` }
          ).then(
            await request("/api/clothes-to-order/order/info", "GET", null, null,  { Authorization: `Bearer ${auth.token}` }).then((res) => {
              setCartHeader(res.order);
              setIsLocalStorage(false);
              setIsEmptyCart(true);
            })
          )
      } catch (e) {}
    };

  const { t } = useTranslation();

  return hasLoaded ? (
    <section className="SavedDesign">
      <video autoPlay loop muted>
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <div className="savedDesign-wrapper">
        <Swiper  slidesPerView={3} spaceBetween={50}   speed={1600} pagination={{clickable: true,}} navigation={true}  grid={{rows: 1,}} modules={[Autoplay, Pagination, Navigation]}>
          {modeling.map((model, index) => {
              return( <SwiperSlide><DesignItem class="save" text={model.name} key={model._id} img={model.clothes_id.imagesUrls[0]} sizes={model.size}/></SwiperSlide>) 
          })}
        </Swiper>
      </div>
    </section>
  ) : (
    <Loader></Loader>
  );
};

export default HelpDesign;