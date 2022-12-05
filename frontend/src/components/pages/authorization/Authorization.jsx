import "./Authorization.scss";
import { React, useState, useContext } from "react";
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
import { CartContext } from "../../../context/cartContext";
import "./test.scss";

const variantsInputs = {
  open: { opacity: 1, y: "-8vw" },
  closed: { opacity: 1, y: "20vw" },
};

const btnHidden = {
  open: { opacity: 0},
  closed: { opacity: 1},
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

const Authorization = () => {
  
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
    surname: "",
  });

  const [formRegisterName, setFormRegisterName] = useState({
    name: "",
    surname: "",
  });
  

  const changeHandlerLogin = (event) => {
    setFormLogin({ ...formLogin, [event.target.name]: event.target.value });
  };

  const changeHandlerRegister = (event) => {
    setFormRegister({
      ...formRegister,
      [event.target.name]: event.target.value,
    });
  };

  const changeHandlerRegisterName = (event) => {
    setFormRegisterName({
      ...formRegisterName,
      [event.target.name]: event.target.value,
    });
  };
  const cart = useContext(CartContext);
  const loginHandler = async () => {
    try {
      await request("/api/account/login", "POST", {
        ...formLogin,
      }).then(async (res) => {
        const tok = res.token;
        auth.login(res.token);
        await request("/api/account", "GET", null, null, {
          Authorization: `Bearer ${res.token}`,
        }).then(async (res) => {
          await request(
            `/api/order/find?status=cart&user_id=${res.data._id}`,
            "GET",
            null,
            null,
            { Authorization: `Bearer ${tok}` }

          ).then(async (res) => {
            const items = (() => {
              const fieldValue = localStorage.getItem("cart");
              return fieldValue === null ? [] : JSON.parse(fieldValue);
            })();
            if (items.length > 0 && tok !== null) {
              await Promise.all(
                JSON.parse(localStorage.getItem("cart")).map(
                  async (item, index) => {
                    item.order_id = res.orders[0]._id;
                    await request(
                      "/api/order-clothes/create",
                      "POST",
                      {
                        clothes_id: item.clothes_id._id,
                        order_id: item.order_id,
                        count: item.count,
                        size: item.size,
                        color: item.color,
                      },
                      null,
                      { Authorization: `Bearer ${tok}` }
                    );
                  }
                )
              ).then(async () => {
                const tokenResult = await request("/api/account/login", "POST", {
                  ...formLogin,
                })
                const accountResult = await request(
                  "/api/account",
                  "GET",
                  null,
                  null,
                  {
                    Authorization: `Bearer ${tokenResult.token}`,
                  }
                );
                const orderResult = await request(
                  `/api/order/find?status=cart&user_id=${accountResult.data._id}`,
                  "GET",
                  null,
                  null,
                  { Authorization: `Bearer ${tokenResult.token}` }
                );
                const orderInfoResult = await request(
                  `/api/clothes-to-order/order/info?order_id=${orderResult.orders[0]._id}`,
                  "GET",
                  null,
                  null,
                  { Authorization: `Bearer ${tokenResult.token}` }
                );
                const orderInfo = orderInfoResult.order;
                cart.setCartHeader(orderInfo);
              });
              cart.setIsLocalStorage(false);
              cart.setIsEmptyCart(true);
              localStorage.removeItem("cart");
            }
          });
        });
      });
      NotificationManager.success("Authorization success", "Glad to see you!");
    } catch (e) {
      NotificationManager.error(
        "Error Authorization",
        "Wrong login or password!"
      );
    }
  };

  const registerHandler = async () => {
    try {
      formRegister.name = formRegisterName.name;
      formRegister.surname = formRegisterName.surname;
      await request("/api/account/register", "POST", {
        ...formRegister,
      }).then(async (res) => {
        const tok = res.token;
        auth.login(res.token);
        await request("/api/account", "GET", null, null, {
          Authorization: `Bearer ${res.token}`,
        }).then(async (res) => {
          await request(
            `/api/order/find?status=cart&user_id=${res.data._id}`,
            "GET",
            null,
            null,
            { Authorization: `Bearer ${tok}` }
          ).then(async (res) => {
            const items = (() => {
              const fieldValue = localStorage.getItem("cart");
              return fieldValue === null ? [] : JSON.parse(fieldValue);
            })();
            if (items.length > 0 && tok !== null) {
              await Promise.all(
                JSON.parse(localStorage.getItem("cart")).map(
                  async (item, index) => {
                    item.order_id = res.orders[0]._id;
                    await request(
                      "/api/order-clothes/create",
                      "POST",
                      {
                        clothes_id: item.clothes_id._id,
                        order_id: item.order_id,
                        count: item.count,
                        size: item.size,
                        color: item.color,
                      },
                      null,
                      { Authorization: `Bearer ${tok}` }
                    );
                  }
                )
              ).then(async () => {
                const tokenResult = await request("/api/account/login", "POST", {
                  ...formRegister,
                })
                const accountResult = await request(
                  "/api/account",
                  "GET",
                  null,
                  null,
                  {
                    Authorization: `Bearer ${tokenResult.token}`,
                  }
                );
                const orderResult = await request(
                  `/api/order/find?status=cart&user_id=${accountResult.data._id}`,
                  "GET",
                  null,
                  null,
                  {
                    Authorization: `Bearer ${tokenResult.token}`,
                  }
                );
                const orderInfoResult = await request(
                  `/api/clothes-to-order/order/info?order_id=${orderResult.orders[0]._id}`,
                  "GET",
                  null,
                  null,
                  { Authorization: `Bearer ${tokenResult.token}` }
                );
                const orderInfo = orderInfoResult.order;
                cart.setCartHeader(orderInfo);
              });
              cart.setIsLocalStorage(false);
              cart.setIsEmptyCart(true);
              localStorage.removeItem("cart");
            }
          });
        });
      });
      NotificationManager.success(
        "Authorization success",
        "Welcome to the club, buddy!"
      );
    } catch (e) {
      console.log("Unable to create account");
      NotificationManager.error(
        "Error Registration",
        "Сheck the entered data."
      );
    }
  };


  const GoogleloginHandler = async () => {
    signInWithPopup(auth_, provider).then(async (result) => {
      try {
        await request("/api/account/google/login", "POST", {email: result.user.email, passwordGoogle: result.user.uid, name: result.user.displayName})
        .then(async (res) => {
          const tok = res.token;
          auth.login(res.token);
          await request("/api/account", "GET", null, null, {
            Authorization: `Bearer ${res.token}`,
          }).then(async (res) => {
            await request(
              `/api/order/find?status=cart&user_id=${res.data._id}`,
              "GET",
              null,
              null,
              {
                Authorization: `Bearer ${tok}`,
              }
            ).then(async (res) => {
              const items = (() => {
                const fieldValue = localStorage.getItem("cart");
                return fieldValue === null ? [] : JSON.parse(fieldValue);
              })();
              if (items.length > 0 && tok !== null) {
                await Promise.all(
                  JSON.parse(localStorage.getItem("cart")).map(
                    async (item, index) => {
                      item.order_id = res.orders[0]._id;
                      await request(
                        "/api/order-clothes/create",
                        "POST",
                        {
                          clothes_id: item.clothes_id._id,
                          order_id: item.order_id,
                          count: item.count,
                          size: item.size,
                          color: item.color,
                        },
                        null,
                        { Authorization: `Bearer ${tok}` }
                      );
                    }
                  )
                ).then(async () => {
                  const tokenResult = await request("/api/account/google/login", "POST", {email: result.user.email, passwordGoogle: result.user.uid, name: result.user.displayName})
                  const accountResult = await request(
                    "/api/account",
                    "GET",
                    null,
                    null,
                    {
                      Authorization: `Bearer ${tokenResult.token}`,
                    }
                  );
                  const orderResult = await request(
                    `/api/order/find?status=cart&user_id=${accountResult.data._id}`,
                    "GET",
                    null,
                    null,
                    {
                      Authorization: `Bearer ${tokenResult.token}`,
                    }
                  );
                  const orderInfoResult = await request(
                    `/api/clothes-to-order/order/info?order_id=${orderResult.orders[0]._id}`,
                    "GET",
                    null,
                    null,
                    { Authorization: `Bearer ${tokenResult.token}` }
                  );
                  const orderInfo = orderInfoResult.order;
                  cart.setCartHeader(orderInfo);
                });
                cart.setIsLocalStorage(false);
                cart.setIsEmptyCart(true);
                localStorage.removeItem("cart");
              }
            });
          });
        });
        
        NotificationManager.success("Authorization success", "Glad to see you!");
      } catch(e) {
        NotificationManager.error(
          "Google login error",
          "Please try again later."
        );
      }
    }).catch((error) => {
       console.log(error);
       NotificationManager.error(
        "Google login error",
        "Please try again later."
      );
     });
  };

  return (
    <section className="Authorization">
      <video autoPlay loop muted>
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <NotificationContainer />
      <motion.div
        className="login-bg"
        animate={isOpen ? "open" : "closed"}
        variants={bgVinet}
        transition={{ duration: 0.1 }}
      ></motion.div>
      <div className="autorization__wrapper">
        <div className="login-wrapper">
          <div className="login">
            <motion.div
              className="login-title"
              animate={isOpen ? "open" : "closed"}
              variants={btnHidden}
              transition={{ duration: 0.1 }}
            >
              FOR MEMBER
            </motion.div>
            <div className="login__wraper-btn">
              <form action="">
                <div className="input-flex">
                  <PixelInput
                    id="email"
                    name="email"
                    value={formLogin.email}
                    onChange={changeHandlerLogin}
                    type="text"
                    placeholder="EMAIL"
                    disabled={isOpen}
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}
                  />
                  <PixelInput
                    id="password"
                    name="password"
                    value={formLogin.password}
                    onChange={changeHandlerLogin}
                    type="text"
                    placeholder="PASSWORD"
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
                  <Link>I forgot passwords</Link>
                </motion.div>
                <div className="input-btn-wrapper">
                  <PixelBtn
                    text="ENTER"
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}
                    disabled={loading}
                    onClick={loginHandler}
                    color="Red"
                  />
                </div>
                <div className="input-btn-wrapper">
                  <PixelBtn
                    color="Blue"
                    text="Login-in with Google"
                    animate={isOpen ? "open" : "closed"}
                    variants={btnHidden}
                    disabled={isOpen}
                    onClick={GoogleloginHandler}
                  />
                </div>
              </form>
            </div>
          </div>
          <motion.div
            className="input-btn-wrapper_outside"
            animate={isOpen ? "open" : "closed"}
            variants={variantsInputs}
            disabled={isOpen}
          >
            <PixelBtn
              onClick={() => setIsOpen((isOpen) => false)}
              color="Red"
              text="BACK TO LOGIN"
            />
          </motion.div>
        </div>
        <motion.div
          className="registration-bg"
          animate={isOpen ? "open" : "closed"}
          variants={bgAnimation}
        >
          <div className="decor__wrapper">
            <div className="decor__graffity">KHARKIV</div>
            <div className="decor__jpntext first">衣料品会社</div>

            <motion.div
              className="decor__jpntext second"
              animate={isOpen ? "open" : "closed"}
              variants={decorAnimation}
            >
              登録
            </motion.div>
            <motion.div
              className="label_registration"
              animate={isOpen ? "open" : "closed"}
              variants={decorAnimation}
            >
              <RegistrationLabel />
            </motion.div>
          </div>
          <div className="registration">
            <div className="registration-title">IS THIS YOUR FIRST VISIT</div>
            <div className="input-btn-wrapper">
              <PixelBtn
                onClick={() => setIsOpen((isOpen) => true)}
                text="CREATE AN ACCOUNT"
                animate={isOpen ? "open" : "closed"}
                variants={btnHidden}
                color="Red"
              />
            </div>
            <motion.div
              className="input__menu"
              animate={isOpen ? "open" : "closed"}
              variants={variantsInputs}
            >
              <div className="input-flex">
                <PixelInput
                  id="email"
                  name="email"
                  value={formRegister.email}
                  onChange={changeHandlerRegister}
                  type="text"
                  placeholder="EMAIL"
                />
                <PixelInput
                  id="password"
                  name="password"
                  value={formRegister.password}
                  onChange={changeHandlerRegister}
                  type="text"
                  placeholder="PASSWORD"
                />
              </div>
              <div className="input-flex">
                <PixelInput
                  id="name"
                  name="name"
                  value={formRegisterName.name}
                  onChange={changeHandlerRegisterName}
                  type="text"
                  placeholder="NAME"
                />
                <PixelInput
                  id="surname"
                  name="surname"
                  value={formRegisterName.surname}
                  onChange={changeHandlerRegisterName}
                  type="text"
                  placeholder="SURNAME"
                />
              </div>
              <div className="input-flex">
                <PixelBtn text="ENTER" onClick={registerHandler} color="Red"/>
              </div>
            </motion.div>

            <div className="registration__rules">
              Read the <Link>Privacy Policy</Link>,{" "}
              <Link>
                Rules
                <p>and Site Selection Guidelines</p>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Authorization;
