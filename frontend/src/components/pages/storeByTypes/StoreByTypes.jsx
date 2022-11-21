import "../store/Store.scss";
import {React, useCallback, useState, useEffect} from "react";
import { ItemModule, Filter, Loader } from "../../layout";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { useHttp } from "../../../hooks/http.hook";
import 'swiper/css';
import { useParams } from 'react-router-dom'


export const StoreByTypes = (props) => {
  const [max, setMax] = useState(null);
  const [hasLoaded, setHasLoaded] = useState();
  const [clothes, setClothes] = useState([]);
  const { request } = useHttp();
  const [filterNumber, setFilterNumber] = useState(0);
  const type = useParams().type;
  const handleChangeSort = (options) => {
    if (options.value === "3") {
      setFilterNumber(3);
      //setClothes(clothes?.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1));
    }
    if (options.value === "2") {
      setFilterNumber(2);
      //setClothes(clothes?.sort((a, b) => a.price > b.price ? -1 : 1));
    }
    if (options.value === "1") {
      setFilterNumber(1);
      //setClothes(clothes?.sort((a, b) => a.price < b.price ? -1 : 1));
    }
    console.log(clothes);
  };

  const startSort = () => {
    if (filterNumber === 3) {
      setClothes(clothes?.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
    }
    if (filterNumber === 2) {
      setClothes(clothes?.sort((a, b) => (a.price > b.price ? -1 : 1)));
    }
    if (filterNumber === 1) {
      setClothes(clothes?.sort((a, b) => (a.price < b.price ? -1 : 1)));
    }
  };

  const runSort = async () => {
    if (filterNumber >= 0) {
      startSort();
    }
  };

  useEffect(() => {
    runSort();
  }, [runSort]);

  const fetchClothes = useCallback(async () => {
    try {
      await request(`/api/clothes/find?type=${type}`, "GET", null)
        .then((res) => {
          setClothes(res.clothes)
          setMax(Math.max(...res.clothes.map((o) => o.price)))
        })
        .then(setHasLoaded(true));

    } catch (e) {}
  }, [request, type]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes]);

  function sizeUpload(sizeArr) {
    var size = "";
    sizeArr.forEach((element) =>
      element.count > 0 ? (size += element.size + " ") : ""
    );
    return size;
  }
  const [hasLoadedClothes, setHasLoadedClothes] = useState(true);
  return hasLoaded && max ? (
    <section className="Store">
      <div className="store-item-grid">
        <div className="store__label">
          LOBANOV<span>NEW THINGS</span>
        </div>
        <Filter
          handleChangeSort={handleChangeSort}
          clothesFilter={clothes}
          setClothesFilter={setClothes}
          type={type}
          max={max}
          setMax={setMax}
          setHasLoadedClothes={setHasLoadedClothes}
        />
        <div className="store-item-flex_center">
          <div className="store-item-grid_wrapper">
            {hasLoadedClothes ? clothes.map((cloth, index) => {
               return  (
                <ItemModule
                  class="high"
                  clothes={clothes}
                  text={cloth.name}
                  price={cloth.price + "₴"}
                  key={cloth._id}
                  link={`/store/${cloth.type}/${cloth._id}`}
                  img={cloth.imagesUrls[0]}
                  sizes={sizeUpload(cloth.clothesCount)}
                />
              )
            }) : <Loader/>}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loader/>
  );
};












// import "../store/Store.scss";
// import {React, useCallback, useState, useEffect} from "react";
// import { ItemModule, Filter } from "../../layout/index";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
// import { useHttp } from "../../../hooks/http.hook";
// import 'swiper/css';



// export const StoreByTypes = (props) => {


//   const [hasLoaded, setHasLoaded] = useState();
//   const [clothes, setClothes] = useState([]);
//   const { request } = useHttp();

//   const handleChangeSort = (options) => {
//     setClothes([]);
//     if (options.value === "3"){
//       setClothes(clothes?.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1));
//       console.log(clothes);
//     }
//     if (options.value === "2"){
//       setClothes(clothes?.sort((a, b) => a.price > b.price ? -1 : 1));
//       console.log(clothes);
//     }
//     if (options.value === "1"){
//       setClothes(clothes?.sort((a, b) => a.price < b.price ? -1 : 1));
//       console.log(clothes);
//     }
//   };


//   // const fetchClothes = useCallback(async () => {
//   //   try {
//   //       await request(`/api/clothes/find?type=${props.type}`, "GET", null).then((res) => {
//   //         setClothes(res.clothes);
//   //       }).then(setHasLoaded(true));
//   //     } 
//   //   catch (e) {

//   //     }
//   //   }, [request, props.type]);
    
//   //   useEffect(() => {
//   //     fetchClothes();
//   //   }, [fetchClothes]);


//   const fetchClothes = async () => {
//     try {
//         await request(`/api/clothes/find?type=${props.type}`, "GET", null).then((res) => {
//           setClothes(res.clothes);
//         }).then(setHasLoaded(true));
//       } 
//     catch (e) {

//       }
//     };

    

//     function sizeUpload(sizeArr){
//       var size = "";
//       sizeArr.forEach((element) => (element.count > 0 ? size += element.size + " " : ""));
//       return size;
//     }



//   return hasLoaded ? (

//     <section className='Store'>
//       <div className="store-item-grid">
//         <div className="store__label">LOBANOV<span>NEW THINGS</span></div>
//         <Filter handleChangeSort={handleChangeSort} clothesFilter={clothes} setClothesFilter={setClothes} type={props.type}/>
//         <div className="store-item-flex_center">
//           <div className="store-item-grid_wrapper"> 
//           {clothes.map((cloth, index) => {
//             return(<ItemModule class="high" text={cloth.name} price={cloth.price + "₴"}  key={cloth._id} img={cloth.imagesUrls[0]} sizes={sizeUpload(cloth.clothesCount)}/>) 
//           })}
//           </div>
//         </div>
//       </div>
//     </section>
//   ) : <div className="ababa">ababa</div>
// }

