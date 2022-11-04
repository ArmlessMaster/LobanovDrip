import "../store/Store.scss";
import {React, useCallback, useState, useEffect} from "react";
import { ItemModule } from "../../layout/index";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { useHttp } from "../../../hooks/http.hook";
import 'swiper/css';

export const StoreByTypes = (props) => {


  const [hasLoaded, setHasLoaded] = useState();
  const [clothes, setClothes] = useState([]);
  const { request } = useHttp();
  
  const fetchClothes = useCallback(async () => {
    try {
        await request(`/api/clothes/find?type=${props.type}`, "GET", null).then((res) => {
          setClothes(res.clothes);
        }).then(setHasLoaded(true));
      } 
    catch (e) {

      }
    }, [request, props.type]);
    
    useEffect(() => {
      fetchClothes();
    }, [fetchClothes]);

    function sizeUpload(sizeArr){
      var size = "";
      sizeArr.forEach((element) => (element.count > 0 ? size += element.size + " " : ""));
      return size;
    }

  return hasLoaded ? (

    <section className='Store'>
      <div className="store-item-grid">
        <div className="store__label">LOBANOV<span>NEW THINGS</span></div>
        <div className="store-item-flex_center">
          <div className="store-item-grid_wrapper"> 
          {clothes.map((cloth, index) => {
            return(<ItemModule class="high" text={cloth.name} price={cloth.price + "₴"}  key={cloth._id} img={cloth.imagesUrls[0]} sizes={sizeUpload(cloth.clothesCount)}/>) 
          })}
          </div>
        </div>
      </div>
    </section>
  ) : <div className="ababa">ababa</div>
}

