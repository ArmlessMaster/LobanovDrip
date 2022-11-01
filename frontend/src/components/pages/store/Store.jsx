import "./Store.scss";
import {React, useCallback, useState, useEffect} from "react";
import { ItemModule } from "../../layout/index";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { Carousel } from 'react-responsive-carousel';  
import {test} from "../../../images"
import { useHttp } from "../../../hooks/http.hook";



export const Store = () => {
  const [clothesData, setClothesData] = useState({
    type: ""
  });

  const [hasLoaded, setHasLoaded] = useState();
  const [visible, setVisible] = useState(15);

  const [clothes, setClothes] = useState([]);
  const { loading, request } = useHttp();
  
  const fetchClothes = useCallback(async () => {
    try {
        const fetched = await request('/api/clothes/findByType', 'GET',  { type: 'T-Shirt', limit: 3})
        setClothes(fetched);

        setHasLoaded(true);
      } 
    catch (e) {

      }
    }, [request]);
    
    useEffect(() => {
      fetchClothes();
    }, [fetchClothes]);

    function sizeUpload(sizeArr){
      var size = "";
      sizeArr.forEach((element) => (element.count > 0 ? size += element.size + " " : ""));
      return size;
    }

    console.log(clothes);
  return hasLoaded ? (

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
      <div className="store-item-grid">
        <div className="store__label">LOBANOV<span>NEW THINGS</span></div>
        <div className="store-item-flex_center">
          <div className="store-item-grid_wrapper"> 
          {clothes.clothes.slice(0, visible).map((cloth, index) => {
            return(<ItemModule class="high" text={cloth.name} price={cloth.price + "₴"}  key={cloth._id} img={cloth.imagesUrls[0]} sizes={sizeUpload(cloth.clothesCount)}/>) 
          })}
          </div>
        </div>
          {/* cloth.clothesCount.forEach(element => (element.count > 0 ? element.size : ""))*/}
      </div>
    </section>
  ) : <div className="ababa">ababa</div>
}

