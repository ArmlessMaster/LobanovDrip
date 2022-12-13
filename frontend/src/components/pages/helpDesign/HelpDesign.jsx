import "./HelpDesign.scss";
import { React, useState } from "react";
import {Canvas, PixelBtn} from "../../layout/index";
import {testDVideo} from "../../../images";
import { Loader } from "../../layout/index";
import {motion} from "framer-motion";
import { useTranslation } from 'react-i18next'

const btnHidden = {
  open: { bottom: "15%"  },
  closed: { bottom: "-60%" },
};

const HelpDesign = () => {
  const [hasLoaded, setHasLoaded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  return hasLoaded ? (
    <section className="HelpDesign">
      <Canvas/>
      <div className="helpDesign-svg">
        <div className="svg-heart">
          <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M46.0021 24.386C47.0369 15.0729 45.4707 9.59425 36.0021 5.38598C19.4988 -1.94883 2.78573 21.5457 3.00208 35.6082C3.12839 43.8182 8.07551 50.8262 14.6687 55.0527C21.6504 59.5281 26.785 65.2954 33.0021 70.6082C38.1314 74.9915 42.0021 78.3736 42.0021 85.3304C42.0021 88.7528 38.5982 94.6553 36.0021 96.386" stroke="#313131" stroke-width="6" stroke-linecap="round"/>
            <path d="M46.002 29.386C46.002 22.5665 48.8749 18.4297 54.2242 14.1638C62.2874 7.7336 68.8591 2.00546 79.3908 6.88601C92.1451 12.7965 100.094 26.3612 97.002 40.2749C95.7759 45.7922 91.6427 48.3088 87.5575 51.8305C79.5417 58.7407 68.7663 63.6229 59.6686 68.9416C53.0845 72.7907 47.751 78.7838 41.6131 83.3305C36.8671 86.8459 36.002 91.7015 36.002 97.386" stroke="#313131" stroke-width="6" stroke-linecap="round"/>
          </svg>
        </div>
        <div className="svg-line">
          <svg width="174" height="35" viewBox="0 0 174 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 14C6.44234 22.2709 15.8132 24.1623 24.8333 25.2778C41.118 27.2917 57.6943 26.5549 73.7778 23.4167C79.6984 22.2614 85.6017 20.8479 91.2778 18.7778C95.1414 17.3687 100.155 15.5946 102.944 12.3333C105.734 9.07261 98.1727 7.16681 96.2778 6.88889C85.2788 5.27571 74.5198 19.1009 78.4444 29.6111C79.5309 32.5206 82.4721 32.728 85.1389 32.6944C95.8638 32.5595 106.777 29.3891 116.917 26.2222C136.382 20.1426 154.459 11.7828 172 1.5" stroke="black" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
        <div className="svg-stroke">
          <svg width="2365" height="568" viewBox="0 0 2365 568" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M151 417.8C183.167 323.633 314 104.438 758 158.438C1313 225.938 1777 437.438 2214.5 216.938" stroke="#6D8DFF" stroke-width="300" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
      <div className="helpDesign-wrapper">
        <div className="helpDesign-logo">BUHALO DESIGN</div>
        <div className="helpDesign-label">{t('design_your')} <span>{t('style')}</span> {t('on_our')} 
        <p><span>Buhalo</span> {t('buhalo_design')}</p></div>
        <div className="helpDesign-btn">
          <PixelBtn color="Black" text={t('create_design')}/>
        </div>
        <motion.div className="videoWrapper"
         onClick={() => setIsOpen((isOpen) => !isOpen)}
                          animate={isOpen ? "open" : "closed"}
                          variants={btnHidden}>
          <video>
            <source control src={testDVideo} type="video/mp4"/>
          </video>
        </motion.div>

      </div>
    </section>
  ) : (
    <Loader></Loader>
  );
};

export default HelpDesign;
