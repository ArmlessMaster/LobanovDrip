import "./ChangePassword.scss";
import { React, useState, useContext, useCallback, useEffect } from "react";
import { BackgroundVideo, RegistrationLabel } from "../../../images";
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
import { useTranslation } from 'react-i18next'

const variantsInputs = {
  open: { opacity: 1, y: "-8vw" },
  closed: { opacity: 1, y: "20vw" },
};

const btnHidden = {
  open: { opacity: 0 },
  closed: { opacity: 1 },
};

const bgVinet = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const bgAnimation = {
  open: { width: "60%" },
  closed: { width: "50%" },
};

const decorAnimation = {
  open: { right: "-16%" },
  closed: { right: "2%" },
};

const ChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false);

  const auth = useContext(AuthContext);

  const { loading, request } = useHttp();

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [formRegisterName, setFormRegisterName] = useState({
    name: "",
    surname: "",
  });

  const changeHandlerLogin = (event) => {
    setFormLogin({ ...formLogin, [event.target.name]: event.target.value });
  };

  const { t } = useTranslation();

  const loginHandler = async () => {
    try {
      const data = await request("/api/account/login", "POST", {
        ...formLogin,
      });
      auth.login(data.token);
      NotificationManager.success(t('authorization_success'), t('glad_to_see_you'));
    } catch (e) {
      console.log("Unable to login account");
      NotificationManager.error(
        t('error_authorization'),
        t('wrong_login')
      );
    }
  };

const [hasLoaded, setHasLoaded] = useState(false);

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

const fetchAccount = useCallback(async () => {
  try {
    await request("/api/account", "GET", null, null,  { Authorization: `Bearer ${auth.token}` }).then((res) => {
      setAccount(res.data);
    });
    setHasLoaded(true);
  } catch (e) {}
}, [request, auth.token]);

useEffect(() => {
  fetchAccount();
}, [fetchAccount]);

const createPasswordHandler = (event) => {
  setCreatePassword({
    ...createPassword,
    [event.target.name]: event.target.value,
  });
};

const changePasswordHandler = (event) => {
  setChangePassword({
    ...changePassword,
    [event.target.name]: event.target.value,
  });
};


const changePassword1 = async () => {
  try {
    const data = await request("api/account/update/password", "PUT", {
      password: changePassword.password, new_password: changePassword.new_password
    }, null,  { Authorization: `Bearer ${auth.token}` });
    NotificationManager.success(
      t('create_password_success'),
      "!"
    );
  } catch (e) {
    console.log("Unable to change password");
    NotificationManager.error(
      t('create_password_error'),
      "!"
    );
  }
};

const createPassword1 = async () => {
  try {
    const data = await request("api/account/update", "PUT", {
      password: createPassword.password,
    }, null,  { Authorization: `Bearer ${auth.token}` });
    NotificationManager.success(
      t('change_password_success'),
      "!"
    );
  } catch (e) {
    console.log("Unable to change password");
    NotificationManager.error(
      t('change_password_error'),
      "!"
    );
  }
};

  return hasLoaded ? (
    <section className="Authorization">
      <video autoPlay loop muted>
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <NotificationContainer />
      <motion.div
        className="login-bg"
        animate={isOpen ? "open" : "closed"}
        variants={bgVinet}
        transition={{ duration: 0.2 }}
      ></motion.div>
      <div className="autorization__wrapper" style={{marginLeft: 300}}>
        <div className="login-wrapper">
          {!account?.password ? (<div className="login">
            <motion.div
              className="login-title"
              animate={isOpen ? "open" : "closed"}
              variants={btnHidden}
              transition={{ duration: 0.2 }}
            >
              {t('create_password')}
            </motion.div>
            <div className="login__wraper-btn">
              <form action="">
                <div className="input-flex">
                  <PixelInput
                    id="password"
                    name="password"
                    value={createPassword.password}
                    onChange={createPasswordHandler}
                    type="text"
                    placeholder={t('password')}
                    disabled={isOpen}
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}
                  />
                  <PixelInput
                    id="password_repeat"
                    name="password_repeat"
                    value={createPassword.password_repeat}
                    onChange={createPasswordHandler}
                    type="text"
                    placeholder={t('password_repeat')}
                    disabled={isOpen}
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}
                  />
                </div>
                <motion.div
                  className="forgot__wrapper"
                  animate={isOpen ? "open" : "closed"}
                  variants={btnHidden}
                  transition={{ duration: 0.1 }}
                >
                </motion.div>
                <div className="input-btn-wrapper">
                  <PixelBtn
                    text={t('confirm')}
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}
                    disabled={loading}
                    onClick={createPassword1}
                  />
                </div>
              </form>
            </div>
          </div>) : (          <div className="login">
            <motion.div
              className="login-title"
              animate={isOpen ? "open" : "closed"}
              variants={btnHidden}
              transition={{ duration: 0.2 }}
            >
              {t('change_password')}
            </motion.div>
            <div className="login__wraper-btn">
              <form action="">
                <div className="input-flex">
                  <PixelInput
                    id="password"
                    name="password"
                    value={changePassword.password}
                    onChange={changePasswordHandler}
                    type="text"
                    placeholder={t('password')}
                    disabled={isOpen}
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}
                  />
                  <PixelInput
                    id="new_password"
                    name="new_password"
                    value={changePassword.new_password}
                    onChange={changePasswordHandler}
                    type="text"
                    placeholder={t('new_password')}
                    disabled={isOpen}
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}
                  />
                                    <PixelInput
                    id="new_password_repeat"
                    name="new_password_repeat"
                    value={changePassword.new_password_repeat}
                    onChange={changePasswordHandler}
                    type="text"
                    placeholder={t('password_repeat')}
                    disabled={isOpen}
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}
                  />
                </div>
                <motion.div
                  className="forgot__wrapper"
                  animate={isOpen ? "open" : "closed"}
                  variants={btnHidden}
                  transition={{ duration: 0.1 }}
                >
                </motion.div>
                <div className="input-btn-wrapper">
                  <PixelBtn
                    text={t('confirm')}
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}
                    disabled={loading}
                    onClick={changePassword1}
                  />
                </div>
              </form>
            </div>
          </div> )}  


        </div>     
      </div>
    </section>
  ) : <div></div>;
};

export default ChangePassword;
