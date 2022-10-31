import "./AddItem.scss";
import { React, useState, useContext, useEffect, useCallback } from "react";
import { BackgroundVideo } from "../../../images";
import { PixelBtn, PixelInput, Uploader } from "../../layout/index";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export const AddItem = () => {
  const animatedComponents = makeAnimated();
  const colourOptions = [
    { value: 'black', label: 'Black'},
    { value: 'White', label: 'White'},
    { value: 'Red', label: 'Red'},
    { value: 'Blue', label: 'Blue'},
    { value: 'Grey', label: 'Grey'},
    { value: 'Green', label: 'Green'},
    { value: 'Yellow', label: 'Yellow'},
  ];


  const auth = useContext(AuthContext);

  const { loading, requestWithFiles, request } = useHttp();




  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);

  const [previewGif, setPreviewGif] = useState();
  const [gif, setGif] = useState();


  const [previewCollection, setPreviewCollection] = useState(null);
  const [imagesCollection, setImagesCollection] = useState(null);

  const [previewGifCollection, setPreviewGifCollection] = useState(null);
  const [gifCollection, setGifCollection] = useState(null);

  const [Collection, setCollection] = useState(null)

  const [clothesData, setClothesData] = useState({
    name: "",
    type: "",
    price: 0,
    material: "",
    care: "",
    size: ["xs", "s", "m", "l", "xl", "xxl", "un"],
    color: [],
    sex: "",
    collection_id: "",
    sale: 0,
    company: "",
    clothesCount: [{
      size: "xs",
      count: 0
    }],
  });

  const [collectionData, setCollectionsData] = useState({
    name: "",
    description: ""
  });

  

  const changeHandlerItem = (event) => {
    
    setClothesData({ ...clothesData, [event.target.name]: event.target.value});
  };

  const changeHandlerItemCollection = (event) => {
    
    setCollectionsData({ ...collectionData, [event.target.name]: event.target.value});
  };

  
  const createItemCloth = async () => {
    try {
      //setImages((prevState) => [...prevState, gif]);
      await request(
        "/api/clothes/create",
        "POST",
        { ...clothesData },
        images,
        { Authorization: `Bearer ${auth.token}` }
      );

      // NotificationManager.success('Authorization success', 'Glad to see you!');
    } catch (e) {
      // NotificationManager.error('Error Authorization', 'Wrong login or password!');
    }
  };

  const createItemCollection = async () => {
    try {
      const imagesArray = [];
      
      imagesArray.push(imagesCollection);
      imagesArray.push(gifCollection);

      await request(
        "/api/collection/create",
        "POST",
        { ...collectionData },
        imagesArray,
        { Authorization: `Bearer ${auth.token}` }
      );
      // NotificationManager.success('Authorization success', 'Glad to see you!');
    } catch (e) {
      // NotificationManager.error('Error Authorization', 'Wrong login or password!');
    }
  };


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
      const newImage = e.target.files[0];
      newImage["id"] = Math.random();
      let file_preview = await getBase64(newImage);
      setPreviewGif(file_preview);
      setGif(newImage);
  };


  const handleChangeCollection = async (e) => {
    const newImage = e.target.files[0];
    newImage["id"] = Math.random();
    let file_preview = await getBase64(newImage);
    setPreviewCollection(file_preview);
    setImagesCollection(newImage);
  };

  const handleChangeCollectionGif = async (e) => {
  
      const newImage = e.target.files[0];
      newImage["id"] = Math.random();
      let file_preview = await getBase64(newImage);
      setPreviewGifCollection(file_preview);
      setGifCollection(newImage);
  };

  const ababa = []
  const fetchCollections = useCallback(async () => {
    try {
        const fetched = await request('/api/collection', 'GET', null);
          setCollection(fetched);
      } catch (e) {
      }
    }, [request]);
  
    useEffect(() => {
      fetchCollections();
    }, [fetchCollections]);
  console.log(Collection);
  return (
    <section className="AddItem">
      <video autoPlay loop muted>
        <source src={BackgroundVideo} type="video/mp4" />
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
              placeholder="Name"
            />
            <PixelInput
              id="price"
              name="price"
              value={clothesData.price}
              onChange={changeHandlerItem}
              type="number"
              placeholder="Price"
            />
          </div>

          <div className="input-flex">
            <Select
              defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="colors"
              options={colourOptions}
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              components={animatedComponents}/>
            <Select
              name="collection"
              options={colourOptions}
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              components={animatedComponents}/>
          </div>

          <div className="input-flex">
            <PixelInput
              id="material"
              name="material"
              value={clothesData.material}
              onChange={changeHandlerItem}
              type="text"
              placeholder="Material"
            />
            <PixelInput
              id="care"
              name="care"
              value={clothesData.care}
              onChange={changeHandlerItem}
              type="text"
              placeholder="Clothing Care"
            />
          </div>

          <div className="input-flex">
            <PixelInput
              id="sex"
              name="sex"
              value={clothesData.sex}
              onChange={changeHandlerItem}
              type="text"
              placeholder="Sex"/>
            <PixelInput
              id="sale"
              name="sale"
              value={clothesData.sale}
              onChange={changeHandlerItem}
              type="text"
              placeholder="Sale"/>
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
              className="little"
            />
            <PixelInput
              id="m"
              name="m"
              type="text"
              placeholder="M"
              className="little"
            />
            <PixelInput
              id="l"
              name="l"
              type="text"
              placeholder="L"
              className="little"
            />
            <PixelInput
              id="xl"
              name="xl"
              type="text"
              placeholder="XL"
              className="little"
            />
            <PixelInput
              id="xxl"
              name="xxl"
              type="text"
              placeholder="XXL"
              className="little"
            />
            <PixelInput
              id="un"
              name="un"
              type="text"
              placeholder="UN"
              className="little"
            />
          </div>
          <div className="images__add">
            <div className="images__add-form">
              <Uploader handleChange={handleChange} isMultiple={true} />
              <div className="create-left-grid">
                {preview.map((item) => {
                  return (
                    <div className="imgs-wrapper">
                      <div className="imgs-wrapper-flex">
                        <img src={`${item}`} alt="123" />
                      </div>
                      <div className="imgs-wrapper-flex">
                        <div className="button-create-wrapper">
                          <button
                            className="button-create-delete"
                            onClick={() => {
                              let x = 0;
                              for (let i = 0; i < preview.length; i++) {
                                if (preview[i] === item) {
                                  break;
                                }
                                x++;
                              }
                              setPreview(
                                preview.filter((prev) => prev !== item)
                              );
                              images.splice(x, 1);
                            }}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="images__add-form">
              <Uploader handleChange={handleChangeGif} />
              <div className="create-left-grid">
                {previewGif && (
                  <div className="imgs-wrapper">
                    <img src={previewGif} alt="" className="" />
                    <div className="button-create-wrapper">
                      <button
                        className="button-create-delete"
                        onClick={() => {
                          setPreviewGif(null);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="input-flex">
            <PixelBtn
              text="ENTER"
              disabled={loading}
              onClick={createItemCloth}
            />
          </div>
        </div>
        <div className="input__menu-clothes">
          
          <div className="input-flex">
            <PixelInput id="name" name="name" type="text" placeholder="Name" 
             value={collectionData.name}
             onChange={changeHandlerItemCollection}/>
          </div>
          <div className="input-flex">
            <PixelInput id="description" name="description" type="text" placeholder="Description" 
                         value={collectionData.description}
                         onChange={changeHandlerItemCollection}/>
          </div>

          <div className="images__add">
          <div className="images__add-form">
              <Uploader handleChange={handleChangeCollection} />
              <div className="create-left-grid">
                {previewCollection && (
                  <div className="imgs-wrapper">
                    <img src={previewCollection} alt="" className="" />
                    <div className="button-create-wrapper">
                      <button
                        className="button-create-delete"
                        onClick={() => {
                          setPreviewCollection(null);
                          setImagesCollection(null)
                        }}>
                        X
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="images__add-form">
              <Uploader handleChange={handleChangeCollectionGif} />
              <div className="create-left-grid">
                {previewGifCollection && (
                  <div className="imgs-wrapper">
                    <img src={previewGifCollection} alt="" className="" />
                    <div className="button-create-wrapper">
                      <button
                        className="button-create-delete"
                        onClick={() => {
                          setPreviewGifCollection(null);
                          setGifCollection(null);
                        }}>
                        X
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>         
          </div>              
               



          <div className="input-flex">
            <PixelBtn text="ENTER"              
            disabled={loading}
            onClick={createItemCollection} />
          </div>
        </div>
      </div>
    </section>
  );
};
