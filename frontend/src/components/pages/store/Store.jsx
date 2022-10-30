import "./Store.scss";
import {React} from "react";
import { ItemModule } from "../../layout/index";
import { motion } from "framer-motion"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { Carousel } from 'react-responsive-carousel';  
import {test, test1, test2, test3} from "../../../images"




export const Store = () => {

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
      <div className="store-item-grid">
        <div className="store__label">LOBANOV<span>NEW THINGS</span></div>
        <div className="store-item-flex_center">
          <div className="store-item-grid_wrapper">
            <ItemModule class="high" text="Hoodie Evangelion black oversized" sizes="XS S M XL" price="880$" img={test1} />
            <ItemModule class="high" text="Hoodie Evangelion black oversized" sizes="XS S M XL" price="880$" img={test1} />
            <ItemModule class="high" text="Hoodie Evangelion black oversized" sizes="XS S M XL" price="880$" img={test1} />
            <ItemModule class="high" text="Hoodie Evangelion black oversized" sizes="XS S M XL" price="880$" img={test1} />
            <ItemModule class="high" text="Hoodie Evangelion black oversized" sizes="XS S M XL" price="880$" img={test1} />
          </div>
        </div>

      </div>
    </section>
  )
}

