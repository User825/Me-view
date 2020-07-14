import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './doubleSelector.module.css';

const randomID = new Date().getTime();

function DoubleSelector({ leftLabel, rightLabel, value, onChange }) {
  const [checkedLeft, setCheckedLeft] = useState(value);
  const onInputChange = (evt, type) => {
    const isLeftChecked = type === 'left';

    setCheckedLeft(isLeftChecked);
    onChange(isLeftChecked);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="radio"
          name={`double-selector_${randomID}`}
          checked={checkedLeft}
          onChange={(evt) => onInputChange(evt, 'left')}
        />
        <span className={styles.labelText}>{leftLabel}</span>
      </label>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="radio"
          name={`double-selector_${randomID}`}
          checked={!checkedLeft}
          onChange={(evt) => onInputChange(evt, 'right')}
        />
        <span className={styles.labelText}>{rightLabel}</span>
      </label>
    </div>
  );
}

DoubleSelector.propTypes = {
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DoubleSelector;
