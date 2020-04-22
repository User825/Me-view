import React from 'react';
import PropTypes from 'prop-types';

import styles from './fieldInput.module.css';

function FieldInput({ placeholder, onChange, value, type = 'text' }) {
  return (
    <input
      className={styles.field}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

FieldInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FieldInput;
