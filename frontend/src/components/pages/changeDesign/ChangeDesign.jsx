import "./ChangeDesign.scss";
import {
  React,
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { DesignInput, LayerImageItem, LayerTextItem } from "../../layout/index";
import {
  AlignSvgLeft,
  AlignSvgCenter,
  AlignSvgRight,
  ImageSvg,
  SaveSvg,
} from "../../../images";
import Colorful from "@uiw/react-color-colorful";
import { Loader, Uploader } from "../../layout/index";
import FontPicker from "font-picker-react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { CartContext } from "../../../context/cartContext";
import { getImageSize } from "react-image-size";
import { useParams } from "react-router";

const ChangeDesign = () => {
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();
  const { cartHeader, setCartHeader } = useContext(CartContext);
  const {isEmptyCart, setIsEmptyCart} = useContext(CartContext)
  const {isLocalStorage, setIsLocalStorage} = useContext(CartContext);
  const [modeling, setModeling] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const _id = useParams().id;
  const [Setting, setSetting] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [itemValue, setItemValue] = useState("-1");
  const [itemVision, setItemVision] = useState("Front");
  const [selectedItem, setSelectedItem] = useState({});
  const [files, setFiles] = useState([]);
  const [order, setOrder] = useState(null);
  const [sizeValue, setSizeValue] = useState("");
  const [modelingData, setModelingData] = useState({
    clothes_id: "",
    order_id: "",
    size: "UN",
    color: "",
    productModel: "Modeling", 
    count: 1
  });
  const fetchModelingItems = useCallback(async () => {
    try {
      setHasLoaded(false);
      await request(`/api/modeling/find?_id=${_id}`, "GET", null, null, {
        Authorization: `Bearer ${auth.token}`,
      }).then(async (res) => {
        const data = 
        await request(`/api/clothes/find?_id=${res.modeling[0].clothes_id}`, "GET", null, null, {
          Authorization: `Bearer ${auth.token}`,
        })
        res.modeling[0].clothes_id = (data.clothes[0]);
        if (res.modeling.length >= 1) {
          setModeling(res.modeling[0]);
          setItems(res.modeling[0].images);
          res.modeling[0].texts.map((item) => {
            setItems((oldArray) => [...oldArray, item]);
          });
          setItems((data) => {
            const dataToSort = [...data];
            dataToSort.sort(
              (a, b) => Number(a.z_coordinate) - Number(b.z_coordinate)
            );
            return dataToSort;
          });
          setHasLoaded(true);
        }
      });
      setHasLoaded(true);
    } catch (e) { }
  }, [request]);

  useEffect(() => {
    fetchModelingItems();
  }, [fetchModelingItems]);

  const updateItemsState = (data, setData, replacement) => {
    const newState = data.map((obj) => {
      if (obj.z_coordinate === replacement.z_coordinate) {
        return replacement;
      }
      return obj;
    });
    setData(newState);
  };

  const updateModelingState = () => {
    updateItemsState(items, setItems, selectedItem);
    setModeling({
      ...modeling,
      images: items.filter((item) => !item.text),
      texts: items.filter((item) => item.text),
    });

    const newItems = items.map((obj) => {
      if (obj.z_coordinate === selectedItem.z_coordinate) {
        return selectedItem;
      }
      return obj;
    });

    const newModeling = modeling;
    newModeling.images = newItems.filter((item) => !item.text);
    newModeling.texts = newItems.filter((item) => item.text);
    return newModeling;
  };

  const handleChangeVision = (event) => {
    setItemVision(event.target.value);
  };
  const handleChangeLayer = (event) => {
    updateModelingState();
    setSetting(event.target.id);
    setItemValue(event.target.value - 1 + 1);
    setSelectedItem(items[event.target.value - 1]);
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === "s") {
      saveModeling();
    }
  };

  const handleKeyDownChangeLayers = (event) => {
    event.preventDefault();
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if (charCode === "&") {
      moveLayer("up");
    } else if (charCode === "(") {
      moveLayer("down");
    } else if (charCode === ".") {
      if (
        selectedItem.hasOwnProperty("text_id") ||
        selectedItem.hasOwnProperty("imageUrl")
      ) {
        if (selectedItem.text) {
          deleteLayer(selectedItem.text_id);
        } else {
          deleteLayer(selectedItem.imageUrl);
        }
      }
    } else if ((event.ctrlKey || event.metaKey) && charCode === "c") {
      copyLayer();
    } else if ((event.ctrlKey || event.metaKey) && charCode === "v") {
      pasteLayer();
    } else if ((event.ctrlKey || event.metaKey) && charCode === "x") {
      cutLayer();
    }
  };

  const copyLayer = () => {
    alert("copy");
    //setCopiedItem(selectedItem);
  };

  const pasteLayer = () => {
    alert("paste");
  };

  const cutLayer = () => {
    alert("cut");
    // setCopiedItem(selectedItem);
    // if (
    //   selectedItem.hasOwnProperty("text_id") ||
    //   selectedItem.hasOwnProperty("imageUrl")
    // ) {
    //   if (selectedItem.text) {
    //     deleteLayer(selectedItem.text_id);
    //   } else {
    //     deleteLayer(selectedItem.imageUrl);
    //   }
    // }
  };

  const moveLayer = (direction) => {
    if (items && itemValue > 1 && direction === "up") {
      setItems((prevState) => {
        let data = [...prevState];
        let temp = data[itemValue - 2];
        data[itemValue - 2] = data[itemValue - 1];
        data[itemValue - 1] = temp;
        data[itemValue - 2].z_coordinate = data[itemValue - 2].z_coordinate - 1;
        data[itemValue - 1].z_coordinate = data[itemValue - 1].z_coordinate + 1;
        return data;
      });
      setSelectedItem(items[itemValue - 1]);
      setItemValue((prevState) => {
        return prevState - 1;
      });
    }
    if (items && itemValue < items.length && direction === "down") {
      setItems((prevState) => {
        let data = [...prevState];
        let temp = data[itemValue];
        data[itemValue] = data[itemValue - 1];
        data[itemValue - 1] = temp;
        data[itemValue].z_coordinate = data[itemValue].z_coordinate + 1;
        data[itemValue - 1].z_coordinate = data[itemValue - 1].z_coordinate - 1;
        return data;
      });
      setSelectedItem(items[itemValue]);
      setItemValue((prevState) => {
        return prevState + 1;
      });
    }
  };

  const handleChangeAligment = (event) => {
    if (selectedItem.text) {
      setSelectedItem({ ...selectedItem, alignment: event.target.value });
      setItems((prevState) => {
        prevState.map((item, index) => {
          if (
            item.text &&
            selectedItem.text &&
            item.text_id === selectedItem.text_id
          ) {
            prevState[index] = selectedItem;
          }
          if (
            item.imageUrl &&
            selectedItem.imageUrl &&
            item.imageUrl === selectedItem.imageUrl
          ) {
            prevState[index] = selectedItem;
          }
        });
        return prevState;
      });
      updateModelingState();
      setItemVision((prevState) => prevState);
    }
  };

  const handleChangeColor = (event) => {
    if (selectedItem.text) {
      setSelectedItem({ ...selectedItem, text_color: event.hex });
      setItems((prevState) => {
        prevState.map((item, index) => {
          if (
            item.text &&
            selectedItem.text &&
            item.text_id === selectedItem.text_id
          ) {
            prevState[index] = selectedItem;
          }
          if (
            item.imageUrl &&
            selectedItem.imageUrl &&
            item.imageUrl === selectedItem.imageUrl
          ) {
            prevState[index] = selectedItem;
          }
        });
        return prevState;
      });
      updateModelingState();
      setItemVision((prevState) => prevState);
    }
  };

  const handleChangeFont = (event) => {
    if (selectedItem.text) {
      setSelectedItem({ ...selectedItem, font: event.family });
      setItems((prevState) => {
        prevState.map((item, index) => {
          if (
            item.text &&
            selectedItem.text &&
            item.text_id === selectedItem.text_id
          ) {
            prevState[index] = selectedItem;
          }
          if (
            item.imageUrl &&
            selectedItem.imageUrl &&
            item.imageUrl === selectedItem.imageUrl
          ) {
            prevState[index] = selectedItem;
          }
        });
        return prevState;
      });
      updateModelingState();
      setItemVision((prevState) => prevState);
    }
  };

  const handleChangeFontStyle = (event) => {
    const font_styles = selectedItem.font_style;
    if (event.target.value === "") {
      event.target.value = "Normal";
    }
    font_styles[0].name = event.target.value;
    setSelectedItem({ ...selectedItem, font_style: font_styles });
    setItems((prevState) => {
      prevState.map((item, index) => {
        if (
          item.text &&
          selectedItem.text &&
          item.text_id === selectedItem.text_id
        ) {
          prevState[index] = selectedItem;
        }
        if (
          item.imageUrl &&
          selectedItem.imageUrl &&
          item.imageUrl === selectedItem.imageUrl
        ) {
          prevState[index] = selectedItem;
        }
      });
      return prevState;
    });
    updateModelingState();
    setItemVision((prevState) => prevState);
  };

  const getFileExtension = (filename) => {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
  };

  const saveModeling = async () => {
    try {
      updateModelingState();
      let newModeling = updateModelingState();
      newModeling.filesDescription = newModeling.images.filter(
        (item) => item.imageUrl.indexOf("%E2%98%82") < 0
      );
      newModeling.images = newModeling.images.filter(
        (item) => item.imageUrl.indexOf("%E2%98%82") >= 0
      );
      newModeling.filesDescription.forEach((item, index) => {
        const originalname = item.originalname
          .split("." + getFileExtension(item.originalname))
          .join("");
        newModeling.filesDescription[index].originalname = originalname;
      });

      await request("/api/modeling/update", "PUT", { ...newModeling }, files, {
        Authorization: `Bearer ${auth.token}`,
      }).then(() => {
        alert("Saved");
        setFiles([]);
      });
    } catch (e) { }
  };

  const handleChangeModeling = (event) => {
    setModeling({
      ...modeling,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeSelectedItem = (event) => {
    setSelectedItem({
      ...selectedItem,
      [event.target.name]: event.target.value,
    });
    
    setItems((prevState) => {
      prevState.map((item, index) => {
        if (
          item.text &&
          selectedItem.text &&
          item.text_id === selectedItem.text_id
        ) {
          prevState[index] = selectedItem;
        }
        if (
          item.imageUrl &&
          selectedItem.imageUrl &&
          item.imageUrl === selectedItem.imageUrl
        ) {
          prevState[index] = selectedItem;
        }
      });
      return prevState;
    });
    updateModelingState();
    setItemVision((prevState) => prevState);
  };

  const deleteLayer = async (param) => {
    try {
      const _id = "638f84364f5032265b62c959";
      const newState = items.map((obj) => {
        if (obj.z_coordinate === selectedItem.z_coordinate) {
          return selectedItem;
        }
        return obj;
      });
      setItems(newState);
      const temp = items.filter((item) => {
        if (item.imageUrl === param) {
          return false;
        }
        if (item.text_id === param) {
          return false;
        }
        return true;
      });
      setItems(
        items.filter((item) => {
          if (item.imageUrl === param) {
            return false;
          }
          if (item.text_id === param) {
            return false;
          }
          return true;
        })
      );
      temp.map((item, index) => {
        if (item.z_coordinate !== index + 1) {
          temp[index].z_coordinate -= 1;
        }
      });
      setItems(temp);
      setModeling({
        ...modeling,
        images: items.filter((item) => !item.text),
        texts: items.filter((item) => item.text),
      });
      const newItems = temp.map((obj) => {
        if (obj.z_coordinate === selectedItem.z_coordinate) {
          return selectedItem;
        }
        return obj;
      });
      const newModeling = modeling;
      newModeling.images = newItems.filter((item) => !item.text);
      newModeling.texts = newItems.filter((item) => item.text);
      setModeling(newModeling);
      setSetting(null);
      setSelectedItem({});
      setItemValue("-1");
      // await request("/api/modeling/update", "PUT", { ...newModeling }, null, {
      //   Authorization: `Bearer ${auth.token}`,
      // }).then(() => {
      //   alert("Deleted");
      // });
    } catch (e) { }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });

  const handleChangeImage = async (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      let file_preview = await getBase64(newImage);
      const { width, height } = await getImageSize(file_preview);
      const object = {
        imageUrl: file_preview,
        image_height: height,
        image_width: width,
        rotate: 0,
        scale: 1,
        front_location: itemVision === "Front" ? true : false,
        x_coordinate: 0,
        y_coordinate: 0,
        z_coordinate: items.length + 1,
        originalname: newImage["name"],
      };

      setItems((prevState) => {
        let data = [...prevState];
        data.push(object);
        return data;
      });
      setFiles((prevState) => {
        let data = [...prevState];
        data.push(newImage);
        return data;
      });
    }
  };

  const randGen = () => {
    const abc =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let name = "";
    while (name.length < 50) {
      name += abc[Math.floor(Math.random() * abc.length)];
    }
    return name;
  };

  const handleChangeText = async (e) => {
    const object = {
      text_id: randGen(),
      text_size: 14,
      aligment: "center",
      text: "text",
      font: "Roboto",
      font_style: [{ name: "Black", value: "300" }],
      rotate: 0,
      scale: 1,
      front_location: itemVision === "Front" ? true : false,
      x_coordinate: 1,
      y_coordinate: 1,
      z_coordinate: items.length + 1,
      text_color: "#fff",
    };
    setItems((prevState) => {
      let data = [...prevState];
      data.push(object);
      return data;
    });
  };

  const onClickInputFile = async (e) => {
    e.target.value = null;
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

  const handleChangeSize = (event) => {
    setSizeValue(event.target.value);
    setModelingData({
      ...modelingData,
      clothes_id: modeling._id,
      size: event.target.value,
      order_id: order,
      color: modeling.clothes_id.color[0],
    });
  };
  const cartHandler = async () => {
    try {
      if (modelingData.size !== "UN" && auth.token !== null) {
        await request(
          "/api/order-clothes/create",
          "POST",
          { ...modelingData },
          null,
          { Authorization: `Bearer ${auth.token}` }
        );

        if(Object.keys(cartHeader).length === 0){
          await request("/api/clothes-to-order/order/info", "GET", null, null,  { Authorization: `Bearer ${auth.token}` }).then((res) => {
             setCartHeader(res.order);
             setIsLocalStorage(false);
             setIsEmptyCart(true);
        })
        }else{
          let temp = cartHeader;
          temp.clothes.push({
            clothes_id: modeling.clothes_id._id,
            color: modelingData.color,
            count: 1,
            image:
            modeling.clothes_id.imagesUrls[0],
            name:  modeling.clothes_id.name,
            price: modeling.clothes_id.price,
            sale: modeling.clothes_id.sale,
            salePrice: modeling.clothes_id.price -
            modeling.clothes_id.price * (modeling.clothes_id.sale / 100),
            size: modelingData.size,
            totalPrice: modeling.clothes_id.price -
            modeling.clothes_id.price * (modeling.clothes_id.sale / 100),
        });
         
        temp.total += modeling.clothes_id.price -
        modeling.clothes_id.price * (modeling.clothes_id.sale / 100);
        console.log(temp)
        setCartHeader(temp);
        setIsLocalStorage(false);
        setIsEmptyCart(true);
        }
      }
    } catch (e) {}
  };




  return hasLoaded ? (
    <section className="ChangeDesign">
      <div className="design-panel">
        <div className="design-panel-wrapper">
          <ul>
            <li onClick={handleChangeText}>
              <div className="icon">T</div>
              <p className="text">Text</p>
            </li>
            <li>
              <div className="icon">
                <Uploader
                  handleChange={handleChangeImage}
                  isMultiple={false}
                  accept={".png, .jpg, .jpeg"}
                  onClick={onClickInputFile}
                />
                <ImageSvg />
              </div>
              <p className="text">Image</p>
            </li>
            <li onClick={() => setSetting(null)}>
              <div className="icon">
                <SaveSvg />
              </div>
              <p className="text">Save</p>
            </li>
          </ul>
        </div>
      </div>
      <div
        onKeyDown={handleKeyDownChangeLayers}
        tabIndex="0"
        className="design-panel-layers"
      >
        <div className="design-panel-wrapper">
          <div className="design-panel__text">
            <div className="design-panel__main-text">LAYERS</div>
            <div className="design-panel__little-text">
              *SWAP LAYERS TO CHANGE PRIORITY
            </div>
          </div>
          <div className="design-panel__layers-grid">
            {items.map((item, index) => {
              if (item.text)
                return (
                  <label className="labl">
                    <input
                      type="radio"
                      id="Text"
                      name={item.z_coordinate}
                      onChange={handleChangeLayer}
                      value={item.z_coordinate}
                      autoComplete="off"
                      checked={item.z_coordinate === itemValue}
                    />
                    <LayerTextItem
                      layer={item.z_coordinate}
                      text={item.text}
                      isFront={item.front_location}
                      onClick={deleteLayer}
                      text_id={item.text_id}
                    />
                  </label>
                );
              else
                return (
                  <label className="labl">
                    <input
                      type="radio"
                      id="Img"
                      name={item.z_coordinate}
                      onChange={handleChangeLayer}
                      value={item.z_coordinate}
                      autoComplete="off"
                      checked={item.z_coordinate === itemValue}
                    />
                    <LayerImageItem
                      img={item.imageUrl}
                      layer={item.z_coordinate}
                      id={
                        item.imageUrl.indexOf("%E2%98%82") !== -1
                          ? item.imageUrl
                            .split("%E2%98%82")[1]
                            .split("%E2%98%81")[0]
                          : item.originalname
                      }
                      isFront={item.front_location}
                      onClick={deleteLayer}
                      imageUrl={item.imageUrl}
                    />
                  </label>
                );
            })}
          </div>
        </div>
      </div>
      {Setting === "Img" && (
        <div className="design-panel-info">
          <div className="design-panel-wrapper">
            <div className="design-panel__text">
              <div className="design-panel__main-text">IMAGE SETTING</div>
              <div className="design-panel__little-text">
                *SWAP LAYERS TO CHANGE PRIORITY
              </div>
              <div className="settings">
                <div className="input-wrapper-flex">
                  <DesignInput
                    typeClass={"little"}
                    disabled={isOpen}
                    name="rotate"
                    placeholder="0"
                    description="ROTATE"
                    value={selectedItem?.rotate}
                    onChange={handleChangeSelectedItem}
                  />
                  <DesignInput
                    typeClass={"little"}
                    disabled={isOpen}
                    name="scale"
                    placeholder="1"
                    description="SCALE"
                    value={selectedItem?.scale}
                    onChange={handleChangeSelectedItem}
                  />
                </div>
                <div className="input-wrapper-flex">
                  <DesignInput
                    typeClass={"little"}
                    disabled={isOpen}
                    name="y_coordinate"
                    placeholder="0"
                    description="POSITION Y"
                    value={selectedItem?.y_coordinate}
                    onChange={handleChangeSelectedItem}
                  />
                  <DesignInput
                    typeClass={"little"}
                    disabled={isOpen}
                    name="x_coordinate"
                    placeholder="0"
                    description="POSITION X"
                    value={selectedItem?.x_coordinate}
                    onChange={handleChangeSelectedItem}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {Setting === "Text" && (
        <div className="design-panel-info">
          <div className="design-panel-wrapper">
            <div className="design-panel__text">
              <div className="design-panel__main-text">TEXT SETTING</div>
              <div className="design-panel__little-text">
                *SWAP LAYERS TO CHANGE PRIORITY
              </div>
              <div className="settings">
                <div className="input-wrapper">
                  <DesignInput
                    disabled={isOpen}
                    name="text"
                    placeholder={selectedItem?.text}
                    description="TEXT CONTENT"
                    value={selectedItem?.text}
                    onChange={handleChangeSelectedItem}
                  />
                </div>
                <div className="input-wrapper">
                  <DesignInput
                    disabled={isOpen}
                    placeholder={selectedItem?.text_size}
                    name="text_size"
                    description="TEXT SIZE"
                    value={selectedItem?.text_size}
                    onChange={handleChangeSelectedItem}
                  />
                </div>

                <div className="color-input">
                  <p>TEXT COLOR</p>
                  <Colorful
                    color={selectedItem?.text_color}
                    onChange={handleChangeColor}
                  />
                </div>
                <div className="input-wrapper">
                  <DesignInput
                    disabled={isOpen}
                    name="scale"
                    placeholder={selectedItem?.scale}
                    description="SCALE"
                    value={selectedItem?.scale}
                    onChange={handleChangeSelectedItem}
                  />
                </div>
                <div className="input-wrapper">
                  <p className="input-description">TEXT COLOR</p>
                  <FontPicker
                    apiKey="AIzaSyA6M8JkBAHbYoIz_SwtLbLYr_C2aVQrMxk"
                    activeFontFamily={selectedItem?.font}
                    onChange={handleChangeFont}
                  />
                </div>

                <div className="input-wrapper">
                  <DesignInput
                    disabled={isOpen}
                    name="font_style"
                    description="FONT STYLE"
                    placeholder={selectedItem?.font_style}
                    value={selectedItem?.font_style}
                    onChange={handleChangeFontStyle}
                  />
                </div>
                <div className="input-wrapper">
                  <DesignInput
                    disabled={isOpen}
                    name="rotate"
                    placeholder={selectedItem?.rotate}
                    description="TEXT ROTATE"
                    value={selectedItem?.rotate}
                    onChange={handleChangeSelectedItem}
                  />
                </div>
                <div className="input-wrapper-flex">
                  <DesignInput
                    typeClass={"little"}
                    disabled={isOpen}
                    name="x_coordinate"
                    placeholder={selectedItem?.x_coordinate}
                    description="POSITION X"
                    value={selectedItem?.x_coordinate}
                    onChange={handleChangeSelectedItem}
                  />
                  <DesignInput
                    typeClass={"little"}
                    disabled={isOpen}
                    name="y_coordinate"
                    placeholder={selectedItem?.y_coordinate}
                    description="POSITION Y"
                    value={selectedItem?.y_coordinate}
                    onChange={handleChangeSelectedItem}
                  />
                </div>
                <div className="input-wrapper-aligment">
                  <div className="text">ALIGMENT</div>
                  <div className="input-aligment-flex">
                    <label className="labl1">
                      <input
                        type="radio"
                        name={"left"}
                        onChange={handleChangeAligment}
                        value={"left"}
                        autoComplete="off"
                        checked={
                          selectedItem.alignment
                            ? "left" === selectedItem.alignment
                            : "left" === items[itemValue - 1].alignment
                        }
                      />
                      <div>
                        <img src={AlignSvgLeft} alt="" />
                      </div>
                    </label>
                    <label className="labl1">
                      <input
                        type="radio"
                        name={"center"}
                        onChange={handleChangeAligment}
                        value={"center"}
                        autoComplete="off"
                        checked={
                          selectedItem.alignment
                            ? "center" === selectedItem.alignment
                            : "center" === items[itemValue - 1].alignment
                        }
                      />
                      <div>
                        <img src={AlignSvgCenter} alt="" />
                      </div>
                    </label>
                    <label className="labl1">
                      <input
                        type="radio"
                        name={"right"}
                        onChange={handleChangeAligment}
                        value={"right"}
                        autoComplete="off"
                        checked={
                          selectedItem.alignment
                            ? "right" === selectedItem.alignment
                            : "right" === items[itemValue - 1].alignment
                        }
                      />
                      <div>
                        <img src={AlignSvgRight} alt="" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!Setting && (
        <div className="design-panel-info">
          <div className="design-panel-wrapper">
            <div className="design-panel__text">
              <div className="design-panel__main-text">MODEL SETTING</div>
              <div className="design-panel__little-text">
                *EDIT AND SAVE MODEL
              </div>
              <div className="settings">
                <div className="input-wrapper-flex">
                  <DesignInput
                    disabled={isOpen}
                    name="name"
                    placeholder="Name"
                    description="Name"
                    value={modeling?.name}
                    onChange={handleChangeModeling}
                  />
                </div>
                <div className="input-grid">

                  <p>Add your size</p>
                  <div className="input-wrapper-grid">

                    <div className="size-label">
                      <input
                        type="radio"
                        id={"XS"}
                        name={"XS"}
                        value={"XS"}
                        className="size-radio"
                        onChange={handleChangeSize}
                        autoComplete="off"
                        checked={"XS" === sizeValue}
                      />

                      <label htmlFor="XS">XS</label>
                    </div>
                    <div className="size-label">
                      <input
                        type="radio"
                        id={"S"}
                        name={"S"}
                        value={"S"}
                        className="size-radio"
                        onChange={handleChangeSize}
                        autoComplete="off"
                        checked={"S" === sizeValue}
                      />

                      <label htmlFor="S">S</label>
                    </div>
                    <div className="size-label">
                      <input
                        type="radio"
                        id={"M"}
                        name={"M"}
                        value={"M"}
                        className="size-radio"
                        onChange={handleChangeSize}
                        autoComplete="off"
                        checked={"M" === sizeValue}
                      />

                      <label htmlFor="M">M</label>
                    </div>
                    <div className="size-label">
                      <input
                        type="radio"
                        id={"L"}
                        name={"L"}
                        value={"L"}
                        className="size-radio"
                        onChange={handleChangeSize}
                        autoComplete="off"
                        checked={"L" === sizeValue}
                      />

                      <label htmlFor="L">L</label>
                    </div>
                    <div className="size-label">
                      <input
                        type="radio"
                        id={"XL"}
                        name={"XL"}
                        value={"XL"}
                        className="size-radio"
                        onChange={handleChangeSize}
                        autoComplete="off"
                        checked={"XL" === sizeValue}
                      />

                      <label htmlFor="XL">XL</label>
                    </div>
                    <div className="size-label">
                      <input
                        type="radio"
                        id={"XXL"}
                        name={"XXL"}
                        value={"XXL"}
                        className="size-radio"
                        onChange={handleChangeSize}
                        autoComplete="off"
                        checked={"XXL" === sizeValue}
                      />
                      <label htmlFor="XXL">XXL</label>
                    </div>
                  </div>
                </div>
                <div className="button-wrapper">
                  <button className="button-design" onClick={cartHandler}>ADD TO CART</button>
                </div>
                <div className="button-wrapper">
                  <button className="button-design" onClick={saveModeling}>SAVE MODEL</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {

        itemVision === "Front" ?
          (
            <div onKeyDown={handleKeyDown} tabIndex="0" className="design-model">
              <img src={modeling.clothes_id.imagesUrls[0]} alt="" />
              <div className="model-wrapper">
                <div className="model-wrapper-relitive">
                  {items.map((item, index) => {
                    if (item.text && item.front_location === true)
                      return (
                        <div className="model-wrapper-text">
                          <div
                            className="model-wrapper-text-element"
                            style={{
                              color: item.text_color,
                              fontFamily: item.font,
                              fontSize: Number(item.text_size),
                              transform: `rotate(${item.rotate}deg) scale(${Number(item.scale)})`,
                              left: Number(item.x_coordinate),
                              top: Number(item.y_coordinate),
                              textAlign: item.aligment,
                              fontWeight: item?.font_style[0].name,
                            }}
                          >
                            {item.text}
                          </div>
                        </div>
                      );
                    else if (item.imageUrl && item.front_location === true)
                      return (

                        <img className="labl" src={item.imageUrl} alt=""
                          style={{
                            transform: `rotate(${item.rotate}deg) scale(${Number(item.scale)})`,
                            marginLeft: Number(item.x_coordinate),
                            marginTop: Number(item.y_coordinate),
                          }}
                        />
                      );
                  })}
                </div>
              </div>
            </div>
          )
          : (
            <div onKeyDown={handleKeyDown} tabIndex="0" className="design-model">
              <img src={modeling.clothes_id.imagesUrls[1]} alt="" />
              <div className="model-wrapper">
                <div className="model-wrapper-relitive">
                  {items.map((item, index) => {
                    if (item.text && item.front_location === false)
                      return (
                        <div className="model-wrapper-text">
                          <div
                            className="model-wrapper-text-element"
                            style={{
                              color: item.text_color,
                              fontFamily: item.font,
                              fontSize: Number(item.text_size),
                              transform: `rotate(${item.rotate}deg) scale(${Number(item.scale)})`,
                              left: Number(item.x_coordinate),
                              top: Number(item.y_coordinate),
                              textAlign: item.aligment,
                              fontWeight: item?.font_style[0].name,
                            }}
                          >
                            {item.text}
                          </div>
                        </div>
                      );
                    else if (item.imageUrl && item.front_location === false)
                      return (

                        <img className="labl" src={item.imageUrl} alt=""
                          style={{
                            transform: `rotate(${item.rotate}deg) scale(${Number(item.scale)})`,
                            marginLeft: Number(item.x_coordinate),
                            marginTop: Number(item.y_coordinate),
                          }}
                        />
                      );
                  })}
                </div>
              </div>
            </div>

          )
      }

      <div className="design-model-front_back">
        <label className="design-model-front_back-element">
          <input
            type="radio"
            name={"Front"}
            onChange={handleChangeVision}
            value={"Front"}
            autoComplete="off"
            checked={"Front" === itemVision}
          />
          <div>
            <p>FRONT</p>
          </div>
        </label>
        /
        <label className="design-model-front_back-element">
          <input
            type="radio"
            name={"Back"}
            onChange={handleChangeVision}
            value={"Back"}
            autoComplete="off"
            checked={"Back" === itemVision}
          />
          <div>
            <p>BACK</p>
          </div>
        </label>
      </div>
    </section>
  ) : (
    <Loader></Loader>
  );
};


export default ChangeDesign;