import React from "react";
import './Uploader.scss';

const Uploader = ({ handleChange, isMultiple, accept, onClick  }) => {
    return (
        <form className="form-fireBaseUploader" method="POST">
            <input type="file" multiple={isMultiple} onClick={onClick} onChange={handleChange} accept={accept}/>
        </form>
    )



}

export default Uploader;