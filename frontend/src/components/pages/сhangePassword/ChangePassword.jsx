import "./ChangePassword.scss";
import { React, useState, useContext, useCallback, useEffect } from "react";
import { RegistrationLabel } from "../../../images";
import { PixelBtn, PixelInput } from "../../layout/index";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { auth_, provider } from "../../../Firebase";


const ChangePassword = () => {

  const auth = useContext(AuthContext);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { loading, request } = useHttp();

  const [changePassword, setChangePassword] = useState({
    password: "",
    new_password: "",
    new_password_repeat: ""
  })
  const [createPassword, setCreatePassword] = useState({
      password: "",
      password_repeat: "",
  })
  const [account, setAccount] = useState(null)


  const changeHandlerPassword = (event) => {
    setChangePassword({
      ...changePassword,
      [event.target.name]: event.target.value,
    });
  };

  const changeCreatePassword = (event) => {
    setCreatePassword({
      ...createPassword,
      [event.target.name]: event.target.value,
    });
  };

  const ReqPassword = async () => {
    try {
      await request("api/account/update/password", "PUT", {password : changePassword.password, new_password : changePassword.new_password}, null, {Authorization: `Bearer ${auth.token}`});
      NotificationManager.success("Authorization success", "Glad to see you!");
    } catch (e) {
      console.log("Unable to login account");
      NotificationManager.error(
        "Error Authorization",
        "Wrong login or password!"
      );
    }
  };
  const ReqNewPassword = async () => {
    try {
      await request("api/account/update", "PUT", {password : createPassword.password}, null, {Authorization: `Bearer ${auth.token}`});
      NotificationManager.success("Authorization success", "Glad to see you!");
    } catch (e) {
      console.log("Unable to login account");
      NotificationManager.error(
        "Error Authorization",
        "Wrong login or password!"
      );
    }
  };

  const fetchAccount = useCallback(async () => {
    try {
        await request("/api/account", "GET", null, null, {Authorization: `Bearer ${auth.token}`})
        .then((res) => {
          setAccount(res.data);   
          console.log(res.data);  
        }).then(setHasLoaded(true));
      } 
    catch (e) {}
    }, [request, auth.token]);
    
    useEffect(() => {
      fetchAccount();
    }, [fetchAccount]);


  return  hasLoaded ? (
    <section className="ChangePassword">

      <NotificationContainer />
      <div className="autorization__wrapper">
        <motion.div
          className="registration-bg">
          <div className="decor__wrapper">
            <div className="decor__graffity first">KHARKIV</div>
            <div className="decor__graffity second">COLLAGE <p>DROPOUT</p></div>
            <div className="decor__graffity third">MF DOOM</div>
            <div className="decor__jpntext first">衣料品会社</div>

            <motion.div className="decor__jpntext second">
              登録
            </motion.div>
            <motion.div
              className="label_registration">
              <RegistrationLabel />
            </motion.div>
          </div>
          <div className="registration">
            <div className="registration-title">CHANGE ACCOUNT PASSWORD</div>
            <div className="input-btn-wrapper">
            </div>
            {  account?.password != null ? (<div className="input__menu">
              <div className="input-flex">
                <PixelInput
                  id="password"
                  name="password"
                  value={changePassword.password}
                  onChange={changeHandlerPassword}
                  type="password"
                  placeholder="OLD PASSWORD"
                />
              </div>
              <div className="input-flex">
                <PixelInput
                  id="new_password"
                  name="new_password"
                  value={changePassword.new_password}
                  onChange={changeHandlerPassword}
                  type="password"
                  placeholder="NEW PASSWORD"
                />
              </div>
              <div className="input-flex">
                <PixelInput
                  id="new_password_repeat"
                  name="new_password_repeat"
                  value={changePassword.new_password_repeat}
                  onChange={changeHandlerPassword}
                  type="password"
                  placeholder="REPEAT NEW PASSWORD"
                />
              </div>
              <div className="input-flex">
                <PixelBtn text="ENTER" onClick={ReqPassword} color="Red"/>
              </div>
            </div>) : (
            <div className="input__menu">
              <div className="input-flex">
                <PixelInput
                  id="password"
                  name="password"
                  value={createPassword.password}
                  onChange={changeCreatePassword}
                  type="password"
                  placeholder="NEW PASSWORD"
                />
              </div>
              <div className="input-flex">
                <PixelInput
                  id="password_repeat"
                  name="password_repeat"
                  value={createPassword.password_repeat}
                  onChange={changeCreatePassword}
                  type="password"
                  placeholder="REPEAT NEW PASSWORD"
                />
              </div>
              <div className="input-flex">
                <PixelBtn text="ENTER" onClick={ReqNewPassword} color="Red" />
              </div>
            </div>)
          }
          </div>
        </motion.div>
      </div>
    </section>
  ) : <div className="test"></div>;
};

export default ChangePassword;
