import React from 'react';
import PropTypes from 'prop-types';

import ReactCountryFlag from 'react-country-flag';

import styles from './countryDesc.module.css';

function CountryDesc({ countryCode, countryName }) {
  return (
    <span key={countryCode} className={styles.box}>
      <ReactCountryFlag
        className={styles.flag}
        countryCode={countryCode}
        svg
        aria-label={countryName}
      />
      {countryName}
    </span>
  );
}

CountryDesc.propTypes = {
  countryCode: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
};

export default CountryDesc;
