import "./AddItem.scss";
import {React, useState, useContext} from "react";
import {BackgroundVideo} from "../../../images";
import {PixelBtn, PixelInput, Uploader} from "../../layout/index"
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext"; 


export const AddItem = () => {

const auth = useContext(AuthContext);
const [previewGif, setPreviewGif] = useState();
const { loading, requestWithFiles } = useHttp();
const [preview, setPreview] = useState([]);
const [images, setImages] = useState([]);
const [gif, setGif] = useState();

const [clothesData, setClothesData] = useState({
  name: "",
  type: "123",
  price: "",
  material: "",
  care: "",
  size: ["XS"],
  color: ["VovavoV ababa"],
  sex: "",
  collection_id: "635d8e2ed56ec8e913c016eb",
  sale: 0,
  company: "",
  clothesCount: [
    {size: "XS", count: 12}
  ],
  images: []
});

const changeHandlerItem = (event) => {
  setClothesData({ ...clothesData, [event.target.name]: event.target.value });
};


const createItemCloth = async () => {
  try {
      setImages((prevState) => [...prevState, gif]);
      await requestWithFiles('/api/clothes/create', 'POST', {...clothesData}, images, { Authorization: `Bearer ${auth.token}` });
      // NotificationManager.success('Authorization success', 'Glad to see you!');
  } catch (e) {
      // NotificationManager.error('Error Authorization', 'Wrong login or password!');
  }
}

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => resolve(reader.result);
  
      reader.onerror = (error) => reject(error);
    });

const handleChange = async (e) => {
  for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);

      //
      let file_preview = await getBase64(newImage);
      setPreview((prevState) => [...prevState, file_preview]);
      //
  }
};

const handleChangeGif = async (e) => {
  for (let i = 0; i < e.target.files.length; i++) {
    const newImage = e.target.files[i];
    newImage["id"] = Math.random();
    let file_preview = await getBase64(newImage);
    setPreviewGif(file_preview);
    setGif(newImage);
  } 
};




  return (

    <section className='AddItem'>
      <video autoPlay loop muted>
        <source src={BackgroundVideo} type="video/mp4"/>
      </video>
      
      <div className="AddItemflex">
        
        <div className="input__menu-clothes">    
        
                  <div className="input-flex">
                    <PixelInput 
                      id="name"
                      name="name"
                      value={clothesData.name}
                      onChange={changeHandlerItem}
                      type="text" 
                      placeholder="Name"/>
                    <PixelInput 
                      id="price"
                      name="price"
                      value={clothesData.price}
                      onChange={changeHandlerItem}
                      type="text" 
                      placeholder="Price"/>
                  </div>

                  <div className="input-flex">
                    <PixelInput 
                      id="colors"
                      name="colors"
                      type="text" 
                      placeholder="Colors"/>
                  </div>

                  <div className="input-flex">
                    <PixelInput 
                      id="material"
                      name="material"
                      value={clothesData.material}
                      onChange={changeHandlerItem}
                      type="text" 
                      placeholder="Material"/>
                    <PixelInput 
                      id="care"
                      name="care"
                      value={clothesData.care}
                      onChange={changeHandlerItem}
                      type="text" 
                      placeholder="Clothing Care" />
                  </div>
                  
                  <div className="input-flex">
                    <PixelInput 
                      id="sex"
                      name="sex"
                      value={clothesData.sex}
                      onChange={changeHandlerItem}
                      type="text" 
                      placeholder="Sex"/>
                  </div>
                  <div className="input-flex">
                    <PixelInput 
                      id="collection_id"
                      name="collection_id"
                      type="text" 
                      placeholder="Collection id"/>
                    <PixelInput 
                      id="sale"
                      name="sale"
                      value={clothesData.sale}
                      onChange={changeHandlerItem}
                      type="text" 
                      placeholder="Sale" />
                  </div>
                  <div className="input-flex">
                    <PixelInput 
                      id="company"
                      name="company"
                      value={clothesData.company}
                      onChange={changeHandlerItem}
                      type="text" 
                      placeholder="Company"/>
                  </div>
                  <div className="input-flex">
                    <PixelInput 
                      id="xs"
                      name="xs"
                      type="text" 
                      placeholder="XS"
                      className="little"/>
                    <PixelInput 
                      id="s"
                      name="s"
                      type="text" 
                      placeholder="S" 
                      className="little"/>
                    <PixelInput 
                      id="m"
                      name="m"
                      type="text" 
                      placeholder="M"
                      className="little"/>
                    <PixelInput 
                      id="l"
                      name="l"
                      type="text" 
                      placeholder="L" 
                      className="little"/>
                    <PixelInput 
                      id="xl"
                      name="xl"
                      type="text" 
                      placeholder="XL"
                      className="little"/>
                    <PixelInput 
                      id="xxl"
                      name="xxl"
                      type="text" 
                      placeholder="XXL"
                      className="little" />
                  </div>
          <div className="images__add">
            <div className="images__add-form">
              <Uploader handleChange={handleChange}  isMultiple={true}/>
              <div className='create-left-grid'>
                {preview.map(item => {
                  return (
                  <div className='imgs-wrapper'>
                    <div  className='imgs-wrapper-flex'>
                      <img src={`${item}`}/>
                    </div>
                    <div className='imgs-wrapper-flex'>
                      <div className='button-create-wrapper'><button className='button-create-delete' onClick={() => {
                        let x = 0;
                        for (let i = 0; i < preview.length; i++) {
                          if (preview[i] === item) {
                            break;
                          }
                          x++;
                        }
                        setPreview(preview.filter(prev => prev !== item));
                        images.splice(x, 1);}}>X</button>
                      </div>
                  </div>
                </div>)})}
              </div>
            </div>
            <div className="images__add-form">
              <Uploader handleChange={handleChangeGif}/>
              <div className='create-left-grid'>
                {previewGif && <div className='imgs-wrapper'>
                  <img src={previewGif} alt="" className="" />
                  <div className='button-create-wrapper'><button className='button-create-delete' onClick={() => {
                    setPreviewGif(null);
                    }}>X</button>
                  </div>
                </div>}
              </div>
            </div>
          </div>
          
          <div className="input-flex">
            <PixelBtn text="ENTER" disabled={loading} onClick={createItemCloth}/>
          </div>
        </div>
        <div className="input__menu-clothes">    
                  <div className="input-flex">
                    <PixelInput 
                      id="name"
                      name="name"
                      type="text" 
                      placeholder="Name"/>
                    <PixelInput 
                      id="price"
                      name="price"
                      type="text" 
                      placeholder="Price"/>
                  </div>

                  <div className="input-flex">
                    <PixelInput 
                      id="colors"
                      name="colors"
                      type="text" 
                      placeholder="Colors"/>
                  </div>

                  <div className="input-flex">
                    <PixelInput 
                      id="material"
                      name="material"
                      type="text" 
                      placeholder="Material"/>
                    <PixelInput 
                      id="care"
                      name="care"
                      type="text" 
                      placeholder="Clothing Care" />
                  </div>
                  <div className="input-flex">
                    <PixelInput 
                      id="xs"
                      name="xs"
                      type="text" 
                      placeholder="XS"
                      className="little"/>
                    <PixelInput 
                      id="s"
                      name="s"
                      type="text" 
                      placeholder="S" 
                      className="little"/>
                    <PixelInput 
                      id="m"
                      name="m"
                      type="text" 
                      placeholder="M"
                      className="little"/>
                    <PixelInput 
                      id="l"
                      name="l"
                      type="text" 
                      placeholder="L" 
                      className="little"/>
                    <PixelInput 
                      id="xl"
                      name="xl"
                      type="text" 
                      placeholder="XL"
                      className="little"/>
                    <PixelInput 
                      id="xxl"
                      name="xxl"
                      type="text" 
                      placeholder="XXL"
                      className="little" />
                  </div>

          <div className="input-flex">
            <PixelBtn text="ENTER"/>
          </div>
        </div>
      </div>


    </section>
  )
}

