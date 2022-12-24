import "./ShowProduct.scss";
import { React, useCallback, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHttp } from "../../../hooks/http.hook";
import { Loader, ItemModule } from "../../layout";
import { AuthContext } from "../../../context/AuthContext";
import { CartContext } from "../../../context/cartContext";
import { useTranslation } from 'react-i18next'
import { Autoplay, Pagination, Navigation } from "swiper";

const COLOR_BTNS = document.querySelectorAll(".color");
COLOR_BTNS.forEach((color) => {
  color.addEventListener("click", () => {
    let colorNameClass = color.className;
    if (!color.classList.contains("active-color")) {
      let colorName = colorNameClass.slice(
        colorNameClass.indexOf("-") + 1,
        colorNameClass.length
      );
      resetActiveBtns();
      color.classList.add("active-color");
      setNewColor(colorName);
    }
  });
});

function resetActiveBtns() {
  COLOR_BTNS.forEach((color) => {
    color.classList.remove("active-color");
  });
}

// set new color on the banner right
function setNewColor(color) {
  document.querySelector(
    ".single_img img"
  ).src = `../../../images/lobanovdrip/hoodie_${color}.jpg`;
}

function sizeUpload(sizeArr){
  var size = "";
  sizeArr.forEach((element) => (element.count > 0 ? size += element.size + " " : ""));
  return size;
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [hasLoaded, setHasLoaded] = useState(false);
  const [clothItem, setClothItem] = useState(null);
  const [clothCollection, setClothCollection] = useState([]);
  const id = useParams().id;
  const { request } = useHttp();
  const fetchClothes = useCallback(async () => {
    try {
      await request(`/api/clothes/find?_id=${id}`, "GET", null).then((res) => {
        setClothItem(res.clothes[0]);
      });
    } catch (e) {}
  }, [request, id]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes]);

  const fetchCollections = useCallback(async () => {
    try {
      if (
        clothItem?.collection_id !== null &&
        clothItem?.collection_id !== undefined
      ) {
        await request(
          `/api/clothes/find?collection_id=${clothItem?.collection_id?._id}`,
          "GET",
          null
        ).then((res) => {
          setClothCollection(res.clothes);
        });
      } else {
        await request(
          `/api/clothes/find?type=${clothItem?.type}`,
          "GET",
          null
        ).then((res) => {
          setClothCollection(res.clothes);
        });
      }
    } catch (e) {}
  }, [request, clothItem?.collection_id, clothItem?.type]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const changeHandlerClothes = useCallback(() => {
    try {
      if (clothItem.type !== "Case" && clothItem.type !== "Briefcase") {
        clothItem.clothesCount = clothItem.clothesCount.slice(0, 6);
        setClothItem(clothItem);
        setHasLoaded(true);
      } else {
        clothItem.clothesCount = clothItem.clothesCount.slice(6, 7);
        setClothItem(clothItem);
        setHasLoaded(true);
      }
    } catch (e) {}
  }, [clothItem]);

  useEffect(() => {
    changeHandlerClothes();
  }, [changeHandlerClothes]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [sizeValue, setSizeValue] = useState("UN");
  const [order, setOrder] = useState(null);
  const auth = useContext(AuthContext);
  const { cartHeader, setCartHeader } = useContext(CartContext);
  const {isEmptyCart, setIsEmptyCart} = useContext(CartContext)
  const {isLocalStorage, setIsLocalStorage} = useContext(CartContext);

  const [clothData, setClothData] = useState({
    clothes_id: id,
    order_id: "",
    count: 1,
    size: "UN",
    color: "",
    productModel: "Clothes"
  });

  const handleChangeSize = (event) => {
    setSizeValue(event.target.value);
    setClothData({
      ...clothData,
      size: event.target.value,
      order_id: order,
      color:
        clothItem.name.split(" ").pop().charAt(0).toUpperCase() +
        clothItem.name.split(" ").pop().slice(1),
    });
  };

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

  const cartHandler = async () => {
    try {
      if (sizeValue !== "UN" && auth.token !== null) {
        await request(
          "/api/order-clothes/create",
          "POST",
          { ...clothData },
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        if(Object.keys(cartHeader).length === 0){
          await request("/api/clothes-to-order/order/info", "GET", null, null,  { Authorization: `Bearer ${auth.token}` }).then((res) => {
            setCartHeader(res.order);
            setIsLocalStorage(false);
            setIsEmptyCart(true);
          })
        } else{
          let temp = cartHeader;
          temp.clothes.push({
            clothes_id: id,
            color: clothData.color,
            count: 1,
            image:
            clothItem.imagesUrls[0],
            name: clothItem.name,
            price: clothItem.price,
            sale: clothItem.sale,
            salePrice: clothItem.price -
            clothItem.price * (clothItem.sale / 100),
            size: clothData.size,
            totalPrice: clothItem.price -
            clothItem.price * (clothItem.sale / 100),
          });
          temp.total += clothItem.price -
          clothItem.price * (clothItem.sale / 100);

          setCartHeader(temp);
          setIsLocalStorage(false);
          setIsEmptyCart(true);
        }
      } else if (sizeValue !== "UN") {
        const items = (() => {
          const fieldValue = localStorage.getItem("cart");
          return fieldValue === null ? [] : JSON.parse(fieldValue);
        })();
        clothData.clothes_id = clothItem;
        let temp = JSON.parse(localStorage.getItem("cart")|| "[]")
        items.push(clothData);
        localStorage.setItem("cart", JSON.stringify(items));

        temp.push({
          clothes_id: clothItem,
          color: clothData.color,
          count: 1,
          image:
          clothItem.imagesUrls[0],
          name: clothItem.name,
          price: clothItem.price,
          sale: clothItem.sale,
          salePrice: clothItem.price -
          clothItem.price * (clothItem.sale / 100),
          size: clothData.size,
          totalPrice: clothItem.price -
          clothItem.price * (clothItem.sale / 100),
        });

        setCartHeader(temp);
        setIsLocalStorage(true);
        setIsEmptyCart(true);
      } else {
        //TODO: Notification
      }
    } catch (e) {}
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function styles(color) {
    return {
      backgroundColor: color,
    };
  }


  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item);
  };

  const handelRotationRight = () => {
    const totalLength = clothItem.imagesUrls.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = clothItem.imagesUrls[0];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = clothItem.imagesUrls.filter((item) => {
      return clothItem.imagesUrls.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    const totalLength = clothItem.imagesUrls.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = clothItem.imagesUrls[totalLength - 1];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = clothItem.imagesUrls.filter((item) => {
      return clothItem.imagesUrls.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const [selectedImg = clothItem?.imagesUrls[0], setSelectedImg] = useState()

  const { t } = useTranslation();

  return hasLoaded ? (
    <section className='Product'>
      <div className="ShowProduct">

        <section id="prodetails" class="section_p1">
          <div key={0} class="single_img" id="single">
            <img src={selectedImg} width="100%" id="MainImg" alt="" onClick={() => handleClick(selectedImg, 0)} />
            <div className="small_img_group">
              {clothItem.imagesUrls.map((item, index) => {
                return (
                  <div className="small_img_col" style={{ borderBottom: selectedImg === item ? "0.230vw solid #F55B5B" : "", bottom:"0"}}>
                    <img
                      src={item}
                      key={index}
                      width="100%"
                      class="small_img"
                      alt="clothes"
                      onClick={() => setSelectedImg(item)}></img>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
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
            <div className="product-text-color">{t('color')}:</div>
            <div className="color-groups">
              {clothItem?.color.map((color, index) => {
                return (
                  <button className="color">
                    <div style={styles(color)}></div>
                  </button>
                );
              })}
            </div>
          </section>
          <section className="size-picker">
            <div className="product-text-size">{t('size')}:</div>
            <div className="size-buttons">
              {clothItem?.clothesCount.map((size, index) => {
                return (
                  <div className="size-label">
                    <input
                      disabled={!size.count}
                      type="radio"
                      id={size.size}
                      name={size.size}
                      value={size.size}
                      className="size-radio"
                      onChange={handleChangeSize}
                      autoComplete="off"
                      checked={size.size === sizeValue}
                    />

                    <label htmlFor={size.size}>{size.size}</label>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="check-size">
            <button className="lineal">
              <div href="" class="lineal-img" alt=""></div>
              {t('check_size')}
            </button>
          </section>
          <button className="redbtn" onClick={cartHandler}>
            <span>{t('add_to_cart')}</span>
          </button>
          <div className="material-group">
            <div className="material-title">{t('material')}:</div>
            <div className="material-info">
              {clothItem?.material.split("-").map((vovaAboba, index) => {
                return <p>-{vovaAboba}</p>;
              })}
            </div>
          </div>

          <div className="care">
            <div className="care-text">{t('care')}:</div>
            <div className="careinfo-text">
              {clothItem?.care.split("-").map((vovaAboba, index) => {
                return <p>-{vovaAboba}</p>;
              })}
            </div>
          </div>
        </div>
      </div>

      <div class="similar-text">
        {" "}
        {t('complete_look')}
        <div class="rectangl-undertext"></div>
      </div>

      <div className="App">
        <Swiper slidesPerView={4} spaceBetween={50}   speed={1600} pagination={{clickable: true,}} navigation={true}  grid={{rows: 1,}} modules={[Autoplay, Pagination, Navigation]} {...settings}>
          {clothCollection.map((item) =>
            item.type !== "Case" && item.type !== "Briefcase" ? (
              <SwiperSlide >
                {/* <div className="card">
                  <div className="card-top">
                    <img src={item.imagesUrls[0]} alt={item.name} />
                    <p className="title">{item.name}</p>
                  </div>
                  <div className="card-bottom">
                    <p className="sizes">{item.sizes}</p>
                    <p className="prices">{item.price + "₴"}</p>
                  </div>
                </div> */}
                <ItemModule class="little" text={item.name} price={item.price + "₴"} link={`/store/${item.type}/${item._id}`} key={item._id} img={item.imagesUrls[0]} sizes={sizeUpload(item.clothesCount)}/>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
      <div class="decor-wrapper">
        <div class="decor-graffity1"> 洋服屋</div>
        <div class="decor-graffity2">KHARKOV</div>
        <div class="decor-graffity3">WHY U mad?</div>
        <div class="decor-graffity4">GLINOMES</div>
        <div class="decor-graffity5">絶好</div>
      </div>
    </section>
  ) : (
    <Loader />
  );
};

export default ShowProduct;
