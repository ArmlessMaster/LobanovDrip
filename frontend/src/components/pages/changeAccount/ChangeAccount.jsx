import "./ChangeAccount.scss";
import { React, useState, useContext, useCallback, useEffect } from "react";
import {
  PixelBtn,
  PixelInput,
  AccountMenu,
  ChangeBtn,
  NovaposhtaInput
} from "../../layout/index";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Loader } from "../../layout/index";
import Select from "react-select";
import Async from 'react-select/async';
import makeAnimated from "react-select/animated";
import { useTranslation } from 'react-i18next'


const btnHidden = {
  // open: { opacity: 1,  transform: "scaleX(1)"},
  // closed: { opacity: 0, transform: "scaleX(0)" },
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const Cart = () => {
  const [account, setAccount] = useState({
    email: null,
    name: null,
    surname: null,
    patronymic: null,
    region: null,
    city: null,
    novaposhta: null,
    phone: null,
  });

  const changeHandlerAccount = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
    console.log(account);
  };

  const { loading, request } = useHttp();
  const [hasLoaded, setHasLoaded] = useState();
  const auth = useContext(AuthContext);
  const fetchAccount = useCallback(async () => {
    try {
      await request("/api/account", "GET", null, null, {
        Authorization: `Bearer ${auth.token}`,
      }).then((res) => {
        setAccount(res.data);
      });
      setHasLoaded(true);
    } catch (e) {}
  }, [request, auth]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);

  const updateAccount = async () => {
    try {
      delete account.password;
      delete account.passwordGoogle;
      await request("/api/account/update", "PUT", { ...account }, null, {
        Authorization: `Bearer ${auth.token}`,
      });
    } catch (e) {}
  };

  //
  const animatedComponents = makeAnimated();
   // https://new.novaposhta.ua/dashboard/settings/developers - apiKey
  const apiKey =  process.env.REACT_APP_NOVAPOSHTA_APIKEY;
  const [wareHouses, setWareHouses] = useState([]);

  const handleChangeCity = async (option) => {
    setAccount({
      ...account,
      region: option.AreaDescription === "АРК" ? option.AreaDescription : option.AreaDescription += " обл.",
      city: option.Description
    });
    const result = await request("/api-novaposhta", "POST", {
      apiKey: apiKey,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: option.Description,
      },
    });
    setWareHouses(result.data);
  };

  const fetchCitiesOptions = (async (inputValue) => {
    try {
      const result = await request("/api-novaposhta", "POST", {
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          FindByString: inputValue
        },
      });
      return result.data;
    } catch (e) {}
  });

  const handleWareHouses = (option) => {
    setAccount({
      ...account,
      novaposhta: option.Description,
    });
  };

  const fetchWareHousesOptions = (async (inputValue) => {
    try {
      const result = await request("/api-novaposhta", "POST", {
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: account.city,
          FindByString: inputValue,
        },
      });
      setWareHouses(result.data);
      return result.data
    } catch (e) {}
  });

  const { t } = useTranslation();

  return hasLoaded ? (
    <section className="ChangeAccount">
      <div className="ChangeAccount-wrapper">
        <div className="ChangeAccount-menu">
          <AccountMenu hov="MyAccountHover" />
        </div>
        <div className="ChangeAccount-values">
          <div className="ChangeAccount-label">{t('my_account')}</div>
          <div className="ChangeAccount-inputs">
            <div className="inputs-label">{t('personal_info')}</div>
            <div className="change-btn">
              <ChangeBtn
                onClick={() => setIsOpen((isOpen) => !isOpen)}
                text={t('tap_to_change')}
              />
            </div>
            <div className="inputs-grid">
              <PixelInput
                disabled={!isOpen}
                name="name"
                placeholder={t('name')}
                description={t('name')}
                onChange={changeHandlerAccount}
                value={account.name}
              />
              <PixelInput
                disabled={!isOpen}
                name="surname"
                placeholder={t('surname')}
                description={t('surname')}
                onChange={changeHandlerAccount}
                value={account.surname}
              />
              <PixelInput
                disabled={!isOpen}
                name="patronymic"
                placeholder={t('patronymic')}
                description={t('patronymic')}
                onChange={changeHandlerAccount}
                value={account.patronymic}
              />
              <PixelInput
                disabled={!isOpen}
                name="phone"
                placeholder={t('phone')}
                description={t('phone')}
                onChange={changeHandlerAccount}
                value={account.phone}
              />
              <PixelInput
                disabled={!isOpen}
                name="email"
                placeholder={t('email')}
                onChange={changeHandlerAccount}
                description={t('email')}
                value={account.email}
              />

              <div className="inputsBtn">
                <PixelBtn
                  text={t('save_changes')}
                  color="BigRed"
                  animate={isOpen ? "open" : "closed"}
                  variants={btnHidden}
                  onClick={updateAccount}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
          <div className="ChangeAccount-inputs">
            <div className="inputs-label">{t('personal_info')}</div>
            <div className="change-btn">
              <ChangeBtn
                onClick={() => setIsOpenSecond((isOpenSecond) => !isOpenSecond)}
                text={t('tap_to_change')}
              />
            </div>
            <div className="inputs-grid">
              <PixelInput
                disabled={true}
                name="region"
                placeholder={t('region')}
                description={t('region')}
                onChange={changeHandlerAccount}
                value={account.region}
              />
              <NovaposhtaInput  description={t('city_region')}
                                name="city"
                                defaultValue={account.city}
                                value={{Description: account.city, Ref:account.city}}
                                loadOptions={fetchCitiesOptions}
                                components={animatedComponents}
                                getOptionLabel={(option) => option.Description}
                                getOptionValue={(option) => option.Ref}
                                onChange={handleChangeCity}
                                menuPosition="fixed"/>
              <NovaposhtaInput  description={t('department')} 
                                name="novaposhta"
                                defaultValue={account.novaposhta}
                                value={{Description: account.novaposhta, Ref: account.novaposhta}}
                                loadOptions={fetchWareHousesOptions}
                                defaultOptions={wareHouses}
                                getOptionLabel={(option) => option.Description}
                                getOptionValue={(option) => option.Ref}
                                components={animatedComponents}
                                onChange={handleWareHouses}
                                menuPosition="fixed"/>

              <div className="inputsBtn">
                <PixelBtn
                  text={t('save_changes')}
                  color="BigRed"
                  animate={isOpenSecond ? "open" : "closed"}
                  variants={btnHidden}
                  onClick={updateAccount}
                  disabled={loading}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loader></Loader>
  );
};

export default Cart;
