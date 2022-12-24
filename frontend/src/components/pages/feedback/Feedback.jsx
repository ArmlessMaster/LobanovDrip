import { Loader } from "../../layout";
import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Feedback.scss'
import { TestAbaba } from "../../../images/"
import DotGrid from "../../../images/icons/backgroundSvg/Dot Grid.svg"
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
    NotificationContainer,
    NotificationManager,
  } from "react-notifications";
  import { useTranslation } from 'react-i18next'

export const Feedback = () => {
    const [verfied, setVerifed] = useState(false)
    const form = useRef();

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerifed(true);
    }
    function sendEmail(e) {
        try{

        
        e.preventDefault();

        emailjs.sendForm('service_12k2nih', 'template_cyvn7fa', form.current, 'nFV8YI8koVrkudt2J')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
        NotificationManager.success("Message sent");    
    }catch(e){
        NotificationManager.error("KashaSalini4enko");   
        }
    };

    const { t } = useTranslation();

    return(
        <section>
            <NotificationContainer />
            <img className="background_feedback" src={DotGrid}></img>
            <div className="image_feedback">
                <img src={TestAbaba}></img>
            </div>
            <div className="container_feedback">
                <form ref={form} onSubmit={sendEmail} class="feedback_input-container" id="form">
                    <div className="feedback_text">
                        <p>{t("feedback")}</p>
                    </div>
                    <div class="feedback_rectangl"></div>
                    <div>
                        <p className="feedback_input_text">
                            {t("your_name")}*
                        </p>
                        <input type="text" id="name" name="name" class="feedback_input" required />
                    </div>
                    <div>
                        <p className="feedback_input_text">
                        {t("your_email")}*
                        </p>
                        <input type="email" name="email" class="feedback_input" required />
                    </div>
                    <div className="textarea">
                        <p className="feedback_input_text">
                            {t("your_message")}*
                        </p>
                        <textarea name="message" class="feedback_input_message" required></textarea>
                    </div>
                    <div class="feedback_button">
                        <ReCAPTCHA 
                        className="g-recaptcha"
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={onChange}
                    />
                        <button type="submit" class="feedback_input-btn" disabled={!verfied}>{t("send")}</button>
                    </div>
                </form>
            </div>
        </section>
    )
};
export default Feedback;

