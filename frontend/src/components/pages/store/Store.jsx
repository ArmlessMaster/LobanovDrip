import "./Store.scss";
import {React, useCallback, useState, useEffect} from "react";
import { ItemModule, CursorElement, Loader } from "../../layout";
import { useHttp } from "../../../hooks/http.hook";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { motion } from "framer-motion"


import "swiper/css";
import "swiper/css/pagination";


const Store = () => {

  const [hasLoaded, setHasLoaded] = useState(false);

  const [clothes, setClothes] = useState([]);
  const [collection, setCollection] = useState([]);
  const { request } = useHttp();
  
  const fetchClothes = useCallback(async () => {
    try {
        const allfetched = [];
        await request("/api/clothes/find?type=T-Shirt&limit=3")
        .then((res) => {
          allfetched.push(res.clothes);
        })
        .then(async () => {
          await request("/api/clothes/find?type=Hoodie&limit=3").then((res) => {
            allfetched.push(res.clothes);
          });
        })
        .then(async () => {
          await request("/api/clothes/find?type=Sweatshirt&limit=3")
            .then((res) => {
              allfetched.push(res.clothes);
              setClothes([].concat(...allfetched))
            })
        });

        await request("/api/collection").then((res) => {
          setCollection(res.collections);
        }).then(setHasLoaded(true));
      } 
    catch (e) {}
    }, [request]);
    
    useEffect(() => {
      fetchClothes();
    }, [fetchClothes]);

    function sizeUpload(sizeArr){
      var size = "";
      sizeArr.forEach((element) => (element.count > 0 ? size += element.size + " " : ""));
      return size;
    }
    
    const [mousePos, setMousePos] = useState({});

    useEffect(() => {
      const handleMouseMove = (event) => {
        setMousePos({ x: event.clientX, y: event.clientY });
      };
  
      window.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        window.removeEventListener(
          'mousemove',
          handleMouseMove
        );
      };
    }, []);

  return hasLoaded ? (

    <section className='Store'>
      
      <div className="store-decor">
        <div className="decor-jpn first">洋服屋</div>
        <div className="decor-graffity first">WHY U <p>mad?</p></div>
        <div className="decor-graffity second">KHARKOV</div>
        <div className="decor-graffity third">THE COLLEGE<p>DROPOUT</p></div>
      </div>
      <div className="store__collection-carusel">
        <div className="store__collection-carusel_wrapper"> 
          <Swiper spaceBetween={1} centeredSlides={true} loop={true} autoplay={{delay: 4000, disableOnInteraction: false, }} speed={1600} pagination={{clickable: true,}} navigation={true} modules={[Autoplay, Pagination, Navigation]}>
            {collection.map((item, index) => {
              return(<SwiperSlide><div className="store__collection__img-resize-wrapper"><img className="store__collection-carusel_element" src={item.imagesUrls[1]}/><img className="store__collection-element-label" src={item.imagesUrls[0]}/></div></SwiperSlide>) 
            })}
          </Swiper>
        </div>
      </div>
      <div className="store-item-carusel">
        <div className="store__label">LOBANOV<span>EXCLUSIVE</span></div>
        <div className="store-item-carusel-flex" >
        <Swiper  slidesPerView={3} spaceBetween={50}   speed={1600} pagination={{clickable: true,}} navigation={true}  grid={{rows: 1,}} modules={[Autoplay, Pagination, Navigation]}>
        
          {clothes.map((cloth, index) => {
              return( <SwiperSlide><ItemModule class="high" link={`/store/${cloth.type}/${cloth._id}`} onMouseEnter={console.log("ababa")} text={cloth.name} price={cloth.price + "₴"}  key={cloth._id} img={cloth.imagesUrls[0]} sizes={sizeUpload(cloth.clothesCount)}/></SwiperSlide>) 
            })}
         </Swiper>
         </div>
      </div>
      <div className="store-item-grid">
        <div className="store__label">LOBANOV<span className="label-border">NEW DROPS</span></div>
        <div className="store-item-flex_center">
          <div className="store-item-grid_wrapper"> 
          {clothes.map((cloth, index) => {
            return(<ItemModule class="high" text={cloth.name} price={cloth.price + "₴"} link={`/store/${cloth.type}/${cloth._id}`} key={cloth._id} img={cloth.imagesUrls[0]} sizes={sizeUpload(cloth.clothesCount)}/>) 
          })}
          </div>
        </div>
          {/* cloth.clothesCount.forEach(element => (element.count > 0 ? element.size : ""))*/}
      </div>
      <CursorElement/>
    </section>
  ) : <Loader/>
}

export default Store;