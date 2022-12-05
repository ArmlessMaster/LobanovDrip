import React from "react";
import './Loader.scss';
import { LoaderWhite } from "../../../images";
const Loader = () => {
    return (
    <div className="Loader">
        <div>
            <video  loop autoPlay muted>
                <source src={LoaderWhite} type="video/mp4"/>
            </video>
        </div>  
    </div>
    )
}

export default Loader;