import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import styles from './select.module.css';

function Select({ options, placeholder, onChange }) {
  return (
    <ReactSelect
      isMulti
      options={options}
      className={styles.container}
      classNamePrefix={'selectCustom'}
      placeholder={placeholder}
      onChange={onChange}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary25: '#B3E5FC',
          primary: '#03A9F4',
          neutral0: '#F9F9FC',
        },
      })}
    />
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Select;
