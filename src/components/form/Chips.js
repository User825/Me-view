import React from 'react';
import PropTypes from 'prop-types';

import styles from './chips.module.css';
import classNames from 'classnames/bind';

const classNamesModule = classNames.bind(styles);

function Chips({
  label,
  styleType = 'primary',
  inputType = 'checkbox',
  onChange,
  checked,
}) {
  const labelClassName = classNamesModule({
    [styleType]: styleType,
  });

  return (
    <label className={styles.box}>
      <input
        className={styles.input}
        type={inputType}
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <span className={labelClassName}>{label}</span>
    </label>
  );
}

Chips.propTypes = {
  label: PropTypes.string.isRequired,
  styleType: PropTypes.oneOf(['primary', 'invert', 'gray']),
  inputType: PropTypes.oneOf(['checkbox', 'radio']),
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Chips;
