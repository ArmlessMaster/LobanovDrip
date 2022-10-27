import "./Authorization.scss";
import React from "react";
import BackgroundVideo from "../../../images/video/bg_dots.mp4";

export const Authorization = () => {
 
  return (


    <section className='Authorization'>
      <video autoPlay loop muted>
        <source src={BackgroundVideo} type="video/mp4"/>
      </video>
      <div className="autorization__wrapper">
        <div className="login">
          <div className="login-title">
            FOR MEMBER
          </div>
          <div className="login__wraper-btn">
            <form action="">
              <div className="input-flex">
                <input type="text" />
                <input type="text" />
              </div>
              <div className="input-btn-wrapper">
                <button className="login-btn">Enter</button>
              </div>
              <div className="input-btn-wrapper">
                W<button className="login__google-btn">Google</button>
              </div>
            </form>
          </div>
        </div>
        <div className="registration">1</div>
      </div> 
    </section>
  )
}