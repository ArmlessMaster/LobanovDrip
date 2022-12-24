import { Loader } from "../../layout";
import React, { useRef } from 'react';
import './Faq.scss'
import DotGrid from "../../../images/icons/backgroundSvg/Dot Grid.svg"
import { useTranslation } from 'react-i18next'

export const Faq = () => {

    const { t } = useTranslation();
    
    return (
        <section>
            <img className="background_faq" src={DotGrid}></img>
            <div className="container_faq">
                <div className="logo_faq">
                    <p>FREQUENTLY ASKED QUESTIONS</p>
                </div>
                <div class="rectangl_faq"></div>
                <div className="container_information_faq">
                    <div className="information_logo_faq">
                        <p>{t('information')}</p>
                    </div>
                    <div className="information_text_faq">
                        <p>{t('faq_1')}.</p>
                        <p>{t('faq_2')}.</p>
                        <p>{t('faq_3')}.</p>
                        <p>{t('faq_4')}.</p>
                        <p>{t('faq_5')}.</p>
                        <p>{t('faq_6')}.</p>
                        <p>{t('faq_7')}.</p>
                        <p>{t('faq_8')}.</p>
                    </div>
                </div>
                <div className="container_shopping_price_faq">
                    <div className="information_logo_faq">
                        <p>{t("how_is_the_shopping")}?</p>
                    </div>
                    <div className="information_text_faq">
                        <p>{t('faq_9')}.</p>
                        <p>{t('faq_10')}.</p>
                        <p>{t('faq_11')}.</p>
                        <p>{t('faq_12')}.</p>
                        <p>{t('faq_13')}!</p>
                        <p>{t('faq_14')}?</p>
                        <p>{t('faq_15')}.</p>
                        <p>{t('faq_16')}.</p>
                        <p>{t('faq_17')}.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Faq;