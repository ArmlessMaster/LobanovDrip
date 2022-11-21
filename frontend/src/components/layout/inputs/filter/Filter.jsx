import "./Filter.scss";
import {React, useState} from "react";
import Select from "react-select";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";
import { useHttp } from "../../../../hooks/http.hook";                     


const variantsInputs = {
  open: { opacity: 1, y: "-8vw" },
  closed: { opacity: 1, y: "20vw" },
}

const Filter = (props) => { 
  const { loading, request } = useHttp();
  const [from_price, setFrom_price] = useState(0);
  const [to_price, setTo_price] = useState(props.max);
  const [size, setSize] = useState(["XS", "S", "M", "L", "XL", "XXL"]);



  const sizeOptions = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];
  const sortOption = [
    { value: "1", label: "Price Descending" },
    { value: "2", label: "Price Ascending" },
    { value: "3", label: "Newnees" },
  ];

  const handleChangeColors = (options) => {
    let array = [];
    options.map((o) => array.push(o.value));
    setSize(array);
  };






  const getClothesFilter = async () => {
    try {
      await request(`/api/clothes/find?type=${props.type}`, "GET", null)
      .then((res) => {
        props.setHasLoadedClothes(false);
        props.setClothesFilter(res.clothes)
      }).then(async () => {
        await request("/api/clothes/filter?" + new URLSearchParams({type: props.type, from_price: from_price, to_price: to_price, size: size})).then((res) => {
          props.setClothesFilter(res.clothes);
          props.setHasLoadedClothes(true);
      });
      })

    } catch (e) {

    }
  };



  return (
    <div className="filter">
      <div className="filter-wrapper">
      <div className="filter-slider">
      <MultiRangeSlider
    min={0}
    max={props.max +1}
    onChange={({ min, max }) => {setTo_price(max + 1); setFrom_price(min)}}
  />
        </div>
        <div className="filter-dropdown">
          <Select
                        defaultValue={sizeOptions}
              onChange={handleChangeColors}
              isMulti={true}
              name="colors"
              options={sizeOptions}
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              menuPosition="fixed"/>
        </div>
        <div className="filter-button">

          <button onClick={getClothesFilter}> APPLY </button>
        </div>
      </div>
      <div className="sort-wrapper">
      <div className="sort-dropdown">
          <Select
              defaultValue={sortOption[2]}
              onChange={props.handleChangeSort}
              name="sort"
              options={sortOption}
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              menuPosition="fixed"/>
        </div>
        <div className="filter-slider"></div>
      </div>
    </div>

  )
}


export default Filter;