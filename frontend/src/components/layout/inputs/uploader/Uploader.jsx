import React from "react";
import './Uploader.scss';

const Uploader = ({ handleChange, isMultiple, accept, onClick  }) => {
    return (
        <form className="form-fireBaseUploader" method="POST">
            <p>Drag your files here or click in this area.</p>
            <input type="file" multiple={isMultiple} onClick={onClick} onChange={handleChange} accept={accept}/>
        </form>
    )



}

export default Uploader;