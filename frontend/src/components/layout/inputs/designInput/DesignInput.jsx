import "./DesignInput.scss";
import React from "react";
import { motion } from "framer-motion";

const DesignInput = ({
  type,
  placeholder,
  disabled,
  animate,
  variants,
  id,
  name,
  value,
  onChange,
  description,
  typeClass,
}) => {
  if (
    value &&
    placeholder &&
    typeof value === "object" &&
    typeof placeholder === "object" &&
    Array.isArray(value) &&
    Array.isArray(placeholder) &&
    value.length >= 0 &&
    placeholder.length >= 0 &&
    value[0].hasOwnProperty("name") &&
    value[0].hasOwnProperty("value") &&
    placeholder[0].hasOwnProperty("name") &&
    placeholder[0].hasOwnProperty("value")
  ) {
    value = value[0].name;
    placeholder = value[0].name;
  }

  return (
    <motion.div
      className="designInput-wrapper"
      variants={variants}
      transition={{ duration: 0.1 }}
      animate={animate}
    >
      <p className="description">{description}</p>
      <input
        className={"designInput " + typeClass}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </motion.div>
  );
};

export default DesignInput;
