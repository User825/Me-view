import React from 'react';
import PropTypes from 'prop-types';

import ReactSlider from 'react-slider';

import styles from './slider.module.css';

function Slider({
  max,
  min,
  defaultValues,
  orientation = 'horizontal',
  onChange,
}) {
  return (
    <ReactSlider
      orientation={orientation}
      max={max}
      min={min}
      className={styles.box}
      thumbClassName="slider__thumb"
      thumbActiveClassName="slider__thumb--active"
      trackClassName="slider__track"
      defaultValue={defaultValues}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      pearling
      minDistance={1}
      onAfterChange={onChange}
    />
  );
}

Slider.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  defaultValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  onChange: PropTypes.func.isRequired,
};

export default Slider;
