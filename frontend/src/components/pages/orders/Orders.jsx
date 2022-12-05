import "./Orders.scss";
import { React, useState, useContext, useCallback, useEffect } from "react";
import { test1 } from "../../../images";
import { AccountMenu, OrderItem} from "../../layout/index";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Loader } from "../../layout/index";


const btnHidden = {
  // open: { opacity: 1,  transform: "scaleX(1)"},
  // closed: { opacity: 0, transform: "scaleX(0)" },
  open: { opacity: 1},
  closed: { opacity: 0},
};



const Orders = () => {
  const clothes = [test1, test1, test1]
  const { loading, request } = useHttp();
  const [hasLoaded, setHasLoaded] = useState();
  const auth = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const fetcOrders = useCallback(async () => {
    try {
      await request("/api/clothes-to-order/orders/info", "GET", null, null, {
        Authorization: `Bearer ${auth.token}`,
      }).then((res) => {
        res.orders = res.orders.filter((item) => item.status !== 'cart');
        setOrders(res.orders);
      });
      setHasLoaded(true);
    } catch (e) {}
  }, [request, auth]);

  useEffect(() => {
    fetcOrders();
  }, [fetcOrders]);


  return hasLoaded ?  (
    <section className="Orders">
        <div className="decor__wrapper">
            <div className="decor__graffity first">PAPICH</div>
            <div className="decor__graffity second">NEW MAGIC <p> WAND </p></div>
            <div className="decor__graffity third">BUHALO</div>
            <div className="decor__jpntext first">私の注文</div>

            <motion.div className="decor__jpntext second">
              船首
            </motion.div>
        </div>
      <div className="Orders-wrapper">
        <div className="Orders-menu">
          <AccountMenu hov="MyOrders"/>
        </div>
        <div className="Orders-values">
          <div className="Orders-label">
            MY ORDERS 
          </div>  
          <div>
          {orders.map((item) => {return (
            
            <OrderItem clothes={item.images} label={item.order_number} price={item.total} data={item.status_update} status={item.status}/>
          )})}
          </div>
        </div>
      </div>
     
    </section>
  ) : <Loader></Loader>;
};

export default Orders;
