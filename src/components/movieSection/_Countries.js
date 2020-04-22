import React from 'react';
import PropTypes from 'prop-types';
import { getCountriesLocaleName } from 'utils/';

import ReactCountryFlag from 'react-country-flag';

function Countries({ countriesCodes }) {
  return (
    <>
      {countriesCodes.map((countryCode) => {
        const name = getCountriesLocaleName(countryCode, 'ru');

        return (
          <span key={countryCode}>
            <ReactCountryFlag countryCode={countryCode} svg aria-label={name} />
            {name}
          </span>
        );
      })}
    </>
  );
}

Countries.propTypes = {
  countriesCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Countries;
