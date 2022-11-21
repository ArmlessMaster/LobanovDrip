import "./ShowProduct.scss";
import "./data.scss";
import { React, useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { useHttp } from "../../../hooks/http.hook";
import { Loader } from "../../layout";


const COLOR_BTNS = document.querySelectorAll('.color');
COLOR_BTNS.forEach(color => {
  color.addEventListener('click', () => {
    let colorNameClass = color.className;
    if (!color.classList.contains('active-color')) {
      let colorName = colorNameClass.slice(colorNameClass.indexOf('-') + 1, colorNameClass.length);
      console.log(colorName);
      resetActiveBtns();
      color.classList.add('active-color');
      setNewColor(colorName)
    }
  });
})

function resetActiveBtns() {
  COLOR_BTNS.forEach(color => {
    color.classList.remove('active-color');
  });
}

// set new color on the banner right 
function setNewColor(color) {
  document.querySelector('.single_img img').src = `../../../images/lobanovdrip/hoodie_${color}.jpg`;
}

const ShowProduct = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [hasLoaded, setHasLoaded] = useState();
  const [clothItem, setClothItem] = useState(null);
  const [clothCollection, setClothCollection] = useState([]);
  const id = useParams().id;
  const { request } = useHttp();
  const fetchClothes = useCallback(async () => {
    try {
      await request(`/api/clothes/find?_id=${id}`, "GET", null).then((res) => {
        setClothItem(res.clothes[0])
      })

    } catch (e) { }
  }, [request, id]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes])

  const fetchCollections = useCallback(async () => {
    try {
      if(clothItem?.collection_id !== null && clothItem?.collection_id !== undefined){
        await request(`/api/clothes/find?collection_id=${clothItem?.collection_id?._id}`, "GET", null).then((res) => {
          setClothCollection(res.clothes)
        }) 
      }
      else{
          await request(`/api/clothes/find?type=${clothItem?.type}`, "GET", null).then((res) => {
          setClothCollection(res.clothes)
        }) 
      } 
    } catch (e) { }
  }, [request, clothItem?.collection_id, clothItem?.type]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections])




  const changeHandlerClothes = useCallback(() => {
    try {
      if (clothItem.type !== "Case" && clothItem.type !== "Briefcase") {
        clothItem.clothesCount = clothItem.clothesCount.slice(0, 6);
        setClothItem(clothItem);
        setHasLoaded(true)
      }
      else {
        clothItem.clothesCount = clothItem.clothesCount.slice(6, 7);
        setClothItem(clothItem)
        setHasLoaded(true)
      }
    } catch (e) { }
  }, [clothItem]);

  useEffect(() => {
    changeHandlerClothes();
  }, [changeHandlerClothes]);


  function styles(color) {
    return ({
      backgroundColor: color
    });
  }


  return hasLoaded ? (
    <section className='Product'>
      <div className="ShowProduct">
        <section id="prodetails" class="section_p1">
          <div class="single_img">
            <img src={clothItem?.imagesUrls[0]} width="100%" id="MainImg" alt=""></img>

            <div className="small_img_group">
              <div className="small_img_col">
                <img src={clothItem?.imagesUrls[0]} width="100%" class="small_img" alt=""></img>
              </div>

              <div className="small_img_col">
                <img src={clothItem?.imagesUrls[0]} width="100%" class="small_img" alt=""></img>
              </div>

              <div className="small_img_col">
                <img src={clothItem?.imagesUrls[0]} width="100%" class="small_img" alt=""></img>
              </div>
            </div>
          </div>
        </section>

        <div class="product-info">
          <section className="product-info-wrapper">
            <div className="product-info">
              <div className="product-text">{clothItem?.name}</div>
              <div className="product-price">{clothItem?.price + "₴"}</div>
            </div>
          </section>
          <section className="product-color-wrapper">
            <div className="product-text-color">Color:</div>
            <div className="color-groups">
              {clothItem?.color.map((color, index) => {
                return (<button className="color"><div style={styles(color)}></div></button>)
              })}
            </div>
          </section>
          <section className="size-picker">
            <div className="product-text-size">Size:</div>
            <div className="size-buttons">
              {clothItem?.clothesCount.map((size, index) => {
                return (<button disabled={!size.count} class="size-col1"><a class="btn">{size.size}</a></button>)
              })}
            </div>
          </section>
          <section className="check-size">
            <button className="lineal">
              <div href="" class="lineal-img" alt=""></div>
              Check your size
            </button>
          </section>
          <button className="redbtn">
            <span>Add to cart</span>
          </button>
          <div className="material-group">
            <div className="material-title"> Material:</div>
            <div className="material-info">
              {clothItem?.material.split('-').map((vovaAboba, index) => {
                return (<p>-{vovaAboba}</p>)
              })}</div>
          </div>

          <div className="care">
            <div className="care-text">Care:</div>
            <div className="careinfo-text">
              {clothItem?.care.split('-').map((vovaAboba, index) => {
                return (<p>-{vovaAboba}</p>)
              })}
            </div>
          </div>
        </div>
      </div>

      <div class="similar-text"> COMPLETE YOUR LOOK
        <div class="rectangl-undertext"></div>
      </div>

      <div className='App'>
        <Slider {...settings} slidesToShow={4}>
          {clothCollection.map(item => item.type !== "Case" && item.type !== "Briefcase" ? (
            <div className='card'>
              <div className='card-top'>
                <img src={item.imagesUrls[0]} alt={item.name} />
                <p className="title">{item.name}</p>
              </div>
              <div className='card-bottom'>
                <p className="sizes">{item.sizes}</p>
                <p className="prices">{item.price + "₴"}</p>
              </div>
            </div>
          ) : null
          )}
        </Slider>
      </div>
      <div class="decor-wrapper">
        <div class="decor-graffity1"> 洋服屋</div>
        <div class="decor-graffity2">KHARKOV</div>
        <div class="decor-graffity3">WHY U mad?</div>
        <div class="decor-graffity4">GLINOMES</div>
        <div class="decor-graffity5">絶好</div>
      </div>
    </section>


  )
    :  <Loader/>
}

export default ShowProduct;