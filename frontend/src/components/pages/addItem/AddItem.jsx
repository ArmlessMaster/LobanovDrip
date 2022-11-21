import "./AddItem.scss";
import { React, useState, useContext, useEffect, useCallback } from "react";
import { BackgroundVideo } from "../../../images";
import { PixelBtn, PixelInput, Uploader, Loader } from "../../layout";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import Select from "react-select";
import makeAnimated from "react-select/animated";


const AddItem = () => {
  const animatedComponents = makeAnimated();

  const auth = useContext(AuthContext);

  const { loading, request } = useHttp();

  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);

  const [previewGif, setPreviewGif] = useState();
  const [gif, setGif] = useState();

  const [previewCollection, setPreviewCollection] = useState([]);
  const [imagesCollection, setImagesCollection] = useState([]);

  const [previewGifCollection, setPreviewGifCollection] = useState(null);
  const [gifCollection, setGifCollection] = useState(null);

  const [collection, setCollection] = useState(null);

  const [clothesData, setClothesData] = useState({
    name: "",
    type: "",
    price: null,
    material: "",
    care: "",

    color: [],
    sex: "",
    collection_id: "",
    sale: null,
    company: "",
    clothesCount: [{size: "XS", count: 0,},{ size: "S",count: 0,},
      {
        size: "M",
        count: 0,
      },
      {
        size: "L",
        count: 0,
      },
      {
        size: "XL",
        count: 0,
      },
      {
        size: "XXL",
        count: 0,
      },
      {
        size: "UN",
        count: 0,
      },
    ],
  });

  const [collectionData, setCollectionsData] = useState({
    name: "",
    description: "",
  });

  const changeHandlerItem = (event) => {
    setClothesData((prevState) =>
      event.target.id === "clothesCount"
        ? {
            ...clothesData,
            clothesCount: prevState.clothesCount.map((obj) =>
              obj.size === event.target.name
                ? Object.assign(obj, { count: parseInt(event.target.value) })
                : obj
            ),
          }
        : { ...clothesData, [event.target.name]: event.target.value }
    );
  };

  const changeHandlerItemCollection = (event) => {
    setCollectionsData({
      ...collectionData,
      [event.target.name]: event.target.value,
    });
  };

  const createItemCloth = async () => {
    try {
      //setImages((prevState) => [...prevState, gif]);
      await request("/api/clothes/create", "POST", { ...clothesData }, images, {
        Authorization: `Bearer ${auth.token}`,
      }).then(() => {
        setClothesData({
          name: "",
          type: "",
          price: 0,
          material: "",
          care: "",
          color: [],
          sex: "",
          collection_id: "",
          sale: 0,
          company: "",
          clothesCount: [{size: "XS", count: 0,},{ size: "S",count: 0,},
            {
              size: "M",
              count: 0,
            },
            {
              size: "L",
              count: 0,
            },
            {
              size: "XL",
              count: 0,
            },
            {
              size: "XXL",
              count: 0,
            },
            {
              size: "UN",
              count: 0,
            },
          ],
        });
        setImages([]);
        setPreview([]);
        setGif([]);
        setPreviewGif([]);
      });
      // NotificationManager.success('Authorization success', 'Glad to see you!');
    } catch (e) {
      // NotificationManager.error('Error Authorization', 'Wrong login or password!');
    }
  };

  const createItemCollection = async () => {
    try {
      imagesCollection.push(gifCollection);
      console.log(imagesCollection)
      const data = await request(
        "/api/collection/create",
        "POST",
        { ...collectionData },
        imagesCollection,
        { Authorization: `Bearer ${auth.token}` }
      ).then(() => {
        setCollectionsData({
          name: "",
          description: "",
        });
        setPreviewCollection([]);
        setImagesCollection([]);
        setPreviewGifCollection([]);
        setGifCollection([]);
      });
      const newElement = data.collection;
      collection.push(newElement);
      setCollection(collection);
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
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImagesCollection((prevState) => [...prevState, newImage]);

      //
      let file_preview = await getBase64(newImage);
      setPreviewCollection((prevState) => [...prevState, file_preview]);
      //
    }
  };

  const handleChangeCollectionGif = async (e) => {
    const newImage = e.target.files[0];
    newImage["id"] = Math.random();
    let file_preview = await getBase64(newImage);
    setPreviewGifCollection(file_preview);
    setGifCollection(newImage);
  };

  const colourOptions = [
    { value: "black", label: "Black" },
    { value: "White", label: "White" },
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Grey", label: "Grey" },
    { value: "Green", label: "Green" },
    { value: "Yellow", label: "Yellow" },
  ];

  const typeOptions = [
    { value: "T-Shirt", label: "T-Shirt" },
    { value: "Hoodie", label: "Hoodie" },
    { value: "Pants", label: "Pants" },
    { value: "Backpack", label: "Backpack" },
    { value: "Case", label: "Case" },
    { value: "Sweatshirt", label: "Sweatshirt" },
  ];

  const [hasLoaded, setHasLoaded] = useState();
  const fetchCollections = useCallback(async () => {
    try {
      await request("/api/collection", "GET", null).then((res) => {
        setCollection(res.collections);
      });
      setHasLoaded(true);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const handleChangeColors = (options) => {
    let array = [];
    options.map((o) => array.push(o.value));
    setClothesData({ ...clothesData, color: array });
  };

  const handleChangeCollections = (option) => {
    setClothesData({ ...clothesData, collection_id: option._id });
  };

  const handleChangeTypes = (option) => {
    setClothesData({ ...clothesData, type: option.value });
  };

  const onClickInputFile = async (e) => {
    e.target.value = null;
  };
  
  return hasLoaded ? (
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
          <div className="select-wrapper">
          <Select
              isMulti={true}
              name="colors"
              value={clothesData.color.map((option) => ({value: option, label: option})
                )}
              options={colourOptions}
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              components={animatedComponents}
              onChange={handleChangeColors}
              menuPosition="fixed"
            />

          </div>
          <div className="select-wrapper">
          <Select
              isMulti={false}
              name="collection"
              options={collection}
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              components={animatedComponents}
              onChange={handleChangeCollections}
              menuPosition="fixed"
            />
          </div>

            
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
              placeholder="Sex"
            />
            <PixelInput
              id="sale"
              name="sale"
              value={clothesData.sale}
              onChange={changeHandlerItem}
              type="text"
              placeholder="Sale"
            />
          </div>
          <div className="input-flex">
            <PixelInput
              id="company"
              name="company"
              value={clothesData.company}
              onChange={changeHandlerItem}
              type="text"
              placeholder="Company"
            />
          </div>
        <div className="input-flex">
           <div className="select-wrapper">
           <Select
              isMulti={false}
              name="type"
              value={clothesData.type === "" ? null : {value: clothesData.type, label: clothesData.type}}
              options={typeOptions}
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              components={animatedComponents}
              onChange={handleChangeTypes}
              menuPosition="fixed"
            />
            </div>
          </div>
          <div className="input-flex">
            <PixelInput
              onChange={changeHandlerItem}
              id="clothesCount"
              name="XS"
              type="text"
              placeholder="XS"
              className="little"
            />
            <PixelInput
              onChange={changeHandlerItem}
              id="clothesCount"
              name="S"
              type="text"
              placeholder="S"
              className="little"
            />
            <PixelInput
              onChange={changeHandlerItem}
              id="clothesCount"
              name="M"
              type="text"
              placeholder="M"
              className="little"
            />
            <PixelInput
              onChange={changeHandlerItem}
              id="clothesCount"
              name="L"
              type="text"
              placeholder="L"
              className="little"
            />
            <PixelInput
              onChange={changeHandlerItem}
              id="clothesCount"
              name="XL"
              type="text"
              placeholder="XL"
              className="little"
            />
            <PixelInput
              onChange={changeHandlerItem}
              id="clothesCount"
              name="XXL"
              type="text"
              placeholder="XXL"
              className="little"
            />
            <PixelInput
              onChange={changeHandlerItem}
              id="clothesCount"
              name="UN"
              type="text"
              placeholder="UN"
              className="little"
            />
          </div>
          <div className="images__add">
            <div className="images__add-form">
              <Uploader handleChange={handleChange} isMultiple={true} accept={".png, .jpg, .jpeg"} onClick={onClickInputFile}/>
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
              <Uploader handleChange={handleChangeGif} accept={".gif"} onClick={onClickInputFile}/>
              <div className="create-left-grid">
                {(previewGif && previewGif.length >= 1) && (
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
              color="Red"
            />
          </div>
        </div>
        <div className="input__menu-clothes">
          <div className="input-flex">
            <PixelInput
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={collectionData.name}
              onChange={changeHandlerItemCollection}
            />
          </div>
          <div className="input-flex">
            <PixelInput
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              value={collectionData.description}
              onChange={changeHandlerItemCollection}
            />
          </div>

          <div className="images__add">
            <div className="images__add-form">
              <Uploader handleChange={handleChangeCollection} accept={".png, .jpg, .jpeg"} onClick={onClickInputFile}/>
              <div className="create-left-grid">
              {previewCollection.map((item) => {
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
                              for (let i = 0; i < previewCollection.length; i++) {
                                if (previewCollection[i] === item) {
                                  break;
                                }
                                x++;
                              }
                              setPreviewCollection(
                                previewCollection.filter((prev) => prev !== item)
                              );
                              imagesCollection.splice(x, 1);
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
              <Uploader handleChange={handleChangeCollectionGif} accept={".gif"} onClick={onClickInputFile} />
              <div className="create-left-grid">
              {(previewGifCollection && previewGifCollection.length >= 1) && (
                  <div className="imgs-wrapper">
                    <img src={previewGifCollection} alt="" className="" />
                    <div className="button-create-wrapper">
                      <button
                        className="button-create-delete"
                        onClick={() => {
                          setPreviewGifCollection(null);
                          setGifCollection(null);
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
              onClick={createItemCollection}
              color="Red"
            />
          </div>
        </div>
      </div>
    </section>
  ) : <Loader/>
};

export default AddItem;