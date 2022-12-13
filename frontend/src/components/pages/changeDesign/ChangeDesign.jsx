import "./ChangeDesign.scss";
import { React, useState } from "react";
import {Canvas, DesignInput, LayerImageItem, LayerTextItem} from "../../layout/index";
import {AlignSvgLeft, AlignSvgCenter, AlignSvgRight, ImageSvg, SaveSvg, testD, test3} from "../../../images";
import Colorful  from '@uiw/react-color-colorful';
import { Loader } from "../../layout/index";
import FontPicker from "font-picker-react";
import {motion} from "framer-motion";
import { string } from "prop-types";

const btnHidden = {
  open: { bottom: "15%"  },
  closed: { bottom: "-60%" },
};



const ChangeDesign = () => {


  
  const [itemValue, setItemValue] = useState("-1");
  const [itemAligment, setItemAligment] = useState("");

  const [imageData, setImageData] = useState([{
    image: test3,
    image_height: 300,
    image_width: 300,
    rotate: 10,
    scale: 20,
    x_coordinate: 10,
    y_coordinate: 20,
    z_coordinate: "0",
    front_location: true,
    originalname: "test1"
  },
  {
    image: test3,
    image_height: 200,
    image_width: 300,
    rotate: 12,
    scale: 24,
    x_coordinate: 12,
    y_coordinate: 30,
    z_coordinate: "1",
    front_location: true,
    originalname: "test2"
  },
  {
    image: test3,
    image_height: 300,
    image_width: 300,
    rotate: 10,
    scale: 20,
    x_coordinate: 1044,
    y_coordinate: 2044,
    z_coordinate: "2",
    front_location: true,
    originalname: "test3",
    color: "#12443"
  },
  {
    text_id: "12424",
    text_size: 123,
    aligment: "left",
    text: "ababa",
    font: "Roboto",
    font_style: {name: "Black", style: "700"},
    rotate: 10,
    scale: 20,
    front_location: true,
    x_coordinate: 130,
    y_coordinate: 240,
    z_coordinate: "3",
    color: "#cc693b"
  },
  {
    text_id: "124244",
    text_size: 13,
    aligment: "center",
    text: "zalupa",

    font: "Roboto",
    font_style: {name: "Black", style: "700"},
    rotate: 10,
    scale: 20,
    front_location: true,
    x_coordinate: 101,
    y_coordinate: 220,
    z_coordinate: "4",
    color: "#fff"
  }
  
]);


  const handleChangeAligment  = (event) =>{
    setItemAligment(event.target.value);
  }
  const handleChangeLayer = (event) => {
    setItemValue(event.target.value);
    
    setSetting(event.target.id);
    console.log(imageData[event.target.value].font_style);
    setTextState({
      text: imageData[event.target.value].text,
      text_size: imageData[event.target.value].text_size,
      style: imageData[event.target.value].font_style.name,
      activeFontFamily: imageData[event.target.value].font,
      textRotate: imageData[event.target.value].rotate,
      scale: imageData[event.target.value].scale,
      position: {x: imageData[event.target.value].x_coordinate, y: imageData[event.target.value].y_coordinate} 
    })
    setHex(imageData[event.target.value].color);
    setItemAligment(imageData[event.target.value].aligment)
  };

  const [hasLoaded, setHasLoaded] = useState(true);
  const [Setting, setSetting] = useState("Img");
  const [isOpen, setIsOpen] = useState(false);
  const [hex, setHex] = useState("#fff");


  const [textState, setTextState] = useState({
    text: "TEXT",
    size: "16px",
    style: "Normal",
    activeFontFamily: "Open Sans",
    activeFontVariant: "regular",
    scale: "0",
    textRotate: "0",
    position: {x: 0, y: 0},
  })

  return hasLoaded ? (
    <section className="ChangeDesign">
      <div className="design-panel">
        <div className="design-panel-wrapper">
          <ul>
            <li>
              <div className="icon">T</div>
              <p className="text">Text</p>
            </li>
            <li>
              <div className="icon"><ImageSvg/></div>
              <p className="text">Image</p>
            </li>
            <li>              
              <div className="icon"><SaveSvg/></div>
              <p className="text">Save</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="design-panel-layers">
        <div className="design-panel-wrapper">
          <div className="design-panel__text">
            <div className="design-panel__main-text">
              LAYERS
            </div>
            <div className="design-panel__little-text">
              *SWAP LAYERS TO CHANGE PRIORITY
            </div>
          </div>
          <div className="design-panel__layers-grid">
            {imageData.map((item, index) => {
              if(item.text) return(
                <label  className="labl">
                  <input type="radio" 
                  id="Text"
                  name={item.z_coordinate} 
                  onChange={handleChangeLayer} 
                  value={item.z_coordinate} 
                  autoComplete="off" 
                  checked={item.z_coordinate === itemValue}/>
                  <LayerTextItem layer={item.z_coordinate} text={item.text} isFront={item.isFront}/>
                </label>
              )
              else return(
                <label  className="labl">
                  <input type="radio" 
                  id="Img"
                  name={item.z_coordinate} 
                  onChange={handleChangeLayer} 
                  value={item.z_coordinate} 
                  autoComplete="off" 
                  checked={item.z_coordinate === itemValue}/>
                  <LayerImageItem img={item.image} layer={item.z_coordinate} id={item.originalname} isFront={item.isFront}/>
                </label>
              )

            })}

          </div>
        </div>
      </div>
      {Setting === "Img" &&
        <div className="design-panel-info">
        <div className="design-panel-wrapper">
          <div className="design-panel__text">
            <div className="design-panel__main-text">
              TEXT SETTING
            </div>
            <div className="design-panel__little-text">
              *SWAP LAYERS TO CHANGE PRIORITY
            </div>
            <div className="settings">
              <div className="input-wrapper-flex">
                <DesignInput         
                  typeClass ={"little"}       
                  disabled={isOpen}
                  name="name"
                  placeholder="0"
                  description="ROTATE"/>
                <DesignInput 
                  typeClass ={"little"}
                  disabled={isOpen}
                  name="name"
                  placeholder="1"
                  description="SCALE"/>
              </div>
              <div className="input-wrapper-flex">
                <DesignInput         
                  typeClass ={"little"}       
                  disabled={isOpen}
                  name="name"
                  placeholder="0"
                  description="POSITION Y"/>
                <DesignInput 
                  typeClass ={"little"}
                  disabled={isOpen}
                  name="name"
                  placeholder="0"
                  description="POSITION X"/>
              </div>

            </div>
          </div>
        </div>
        </div>
      }
      {Setting === "Text" &&
        <div className="design-panel-info">
              <div className="design-panel-wrapper">
                <div className="design-panel__text">
                  <div className="design-panel__main-text">
                    TEXT SETTING
                  </div>
                  <div className="design-panel__little-text">
                    *SWAP LAYERS TO CHANGE PRIORITY
                  </div>
                  <div className="settings">
       
                    <div className="input-wrapper">
                      <DesignInput                
                        disabled={isOpen}
                        name="name"
                        placeholder={textState.text}
                        description="TEXT CONTENT"/>
                    </div>
                    <div className="input-wrapper">
                      <DesignInput                
                        disabled={isOpen}
                        placeholder={textState.text_size}
                        name="name"
                     
                        description="TEXT SIZE"/>
                    </div>
      
                    <div className="color-input">
                      <p>TEXT COLOR</p>
                      <Colorful
                        color={hex}
                        onChange={(color) => {
                          setHex(color.hex);
                          }}/>
                    </div>
                    <div className="input-wrapper">
                      <DesignInput                
                        disabled={isOpen}
                        name="name"
                        placeholder={textState.scale}
                        description="SCALE"/>
                    </div>
                    <div className="input-wrapper">
                    <p className="input-description">TEXT COLOR</p>
                      <FontPicker
                          apiKey="AIzaSyA6M8JkBAHbYoIz_SwtLbLYr_C2aVQrMxk"
                          activeFontFamily={textState.activeFontFamily}
                          onChange={(nextFont) => setTextState({activeFontFamily: nextFont.family})}
                        />
                    </div>

                    <div className="input-wrapper">
                      <DesignInput                
                        disabled={isOpen}
                        name="name"
                        placeholder={textState.style}
                        description="FONT STYLE"/>
                    </div>
                    <div className="input-wrapper">
                      <DesignInput                
                        disabled={isOpen}
                        name="name"
                        placeholder={textState.textRotate}
                        description="TEXT ROTATE"/>
                    </div>
                    <div className="input-wrapper-flex">
                      <DesignInput         
                        typeClass ={"little"}       
                        disabled={isOpen}
                        name="name"
                        placeholder={textState.position.x}
                        description="POSITION X"/>
                      <DesignInput 
                        typeClass ={"little"}
                        disabled={isOpen}
                        name="name"
                        placeholder={textState.position.y}
                        description="POSITION Y"/>
                    </div>
                    <div className="input-wrapper-aligment">
                      <div className="text">ALIGMENT</div>
                      <div  className="input-aligment-flex">
                        <label  className="labl1">
                          <input type="radio" 
                                  name={"left"} 
                                  onChange={handleChangeAligment} 
                                  value={"left"} 
                                  autoComplete="off" 
                                  checked={"left" === itemAligment}
                          />
                          <div>
                            <img src={AlignSvgLeft} alt=""/>
                          </div>
      
                        </label >
                        <label  className="labl1">
                          <input type="radio" 
                                  name={"center"} 
                                  onChange={handleChangeAligment} 
                                  value={"center"} 
                                  autoComplete="off" 
                                  checked={"center" === itemAligment}/>
                          <div>
                            <img src={AlignSvgCenter} alt=""/>
                          </div>
                        </label >
                        <label  className="labl1">
                          <input type="radio"
                                 name={"right"} 
                                 onChange={handleChangeAligment} 
                                 value={"right"} 
                                 autoComplete="off" 
                                 checked={"right" === itemAligment} />
                          <div>
                            <img src={AlignSvgRight} alt=""/>
                          </div>
                        </label >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      }

      <div className="design-model">
        <img src={testD} alt="" />
        <div className="model-wrapper"></div>
      </div>
    </section>
  ) : (
    <Loader></Loader>
  );
};

export default ChangeDesign;
