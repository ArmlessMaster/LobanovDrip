import React from "react";
import './Loader.scss';

const Loader = () => {
    return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
        <div class="spinner">
            <span class="spinner-inner-1"></span>
            <span class="spinner-inner-2"></span>
            <span class="spinner-inner-3"></span>
        </div>
    </div>
    )
}

export default Loader;