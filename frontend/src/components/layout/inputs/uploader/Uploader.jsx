import React from "react";
import './Uploader.scss';

const Uploader = ({ handleChange, isMultiple }) => {
    return (
        <form className="form-fireBaseUploader" method="POST">
            <p>Drag your files here or click in this area.</p>
            <input type="file" multiple={isMultiple} onChange={handleChange} />
        </form>
    )



}

export default Uploader;