import "./ChangeDesign.scss";
import { React, useState } from "react";
import {Canvas, PixelBtn} from "../../layout/index";
import {ImageSvg, SaveSvg} from "../../../images";

import { Loader } from "../../layout/index";

import {motion} from "framer-motion";

const btnHidden = {
  open: { bottom: "15%"  },
  closed: { bottom: "-60%" },
};

const ChangeDesign = () => {
  const [hasLoaded, setHasLoaded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);


  return hasLoaded ? (
    <section className="ChangeDesign">
      <div className="design-panel">
        <div className="design-panel-wrapper">
          <ul>
            <li>
              <div className="icon">T</div>
              <p className="text">Text</p>
            </li>
            <li>
              <div className="icon"><ImageSvg/></div>
              <p className="text">Image</p></li>
              <li>              
              <div className="icon"><SaveSvg/></div>
              <p className="text">Model</p>
            </li>
            <li>              
              <div className="icon"><SaveSvg/></div>
              <p className="text">Save</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  ) : (
    <Loader></Loader>
  );
};

export default ChangeDesign;
