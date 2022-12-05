import "./NovaposhtaInput.scss";
import React from "react";
import { motion } from "framer-motion"
import Async from 'react-select/async';

const NovaposhtaInput = (props) => {  
  console.log(props)
  return (
    <div className="novaposhta-input">
      <p className="description">{props.description}</p>

      <Async
        isMulti={false}
        name={props.name}
        defaultValue={props.defaultValue}
        value={props.value}
        loadOptions={props.loadOptions}
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        components={props.components}
        getOptionLabel={props.getOptionLabel}
        getOptionValue={props.getOptionValue}
        onChange={props.onChange}
        menuPosition="fixed"
        isDisabled = {false}
      />
  </div>

  )
}


export default NovaposhtaInput;

