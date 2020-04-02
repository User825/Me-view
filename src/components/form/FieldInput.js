import React from "react";
import PropTypes from "prop-types";

import styles from "./fieldInput.module.css";

function FieldInput({ placeholder, onChange, value, type = 'text', resultsQuantity }) {
  
  return (
      <input
        className={styles.search}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
  );
}

FieldInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default FieldInput;
