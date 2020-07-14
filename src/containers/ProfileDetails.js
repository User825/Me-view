import React from 'react';
import PropTypes from 'prop-types';
import { getCountriesLocaleName } from 'utils/';

import Typography from 'components/global/typography';
import CountryDesc from 'components/countryDesc/';

const getDateString = (date) => {
  const localeDate = date.toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `Дата выхода: ${localeDate}`;
};

function ProfileDetails({ date, genres, productionCountries, children }) {
  const dateString = getDateString(date);

  return (
    <>
      <Typography size="sm" bottomIndent="sm">
        {dateString}
      </Typography>
      <Typography size="sm" bottomIndent="sm">
        Жанр: {genres}
      </Typography>
      {productionCountries && (
        <Typography size="sm" bottomIndent="sm">
          {productionCountries.map((countryCode) => (
            <CountryDesc
              key={countryCode}
              countryCode={countryCode}
              countryName={getCountriesLocaleName(countryCode, 'ru')}
            />
          ))}
        </Typography>
      )}
      {children && (
        <Typography tagName="div" size="sm" bottomIndent="sm">
          {children}
        </Typography>
      )}
    </>
  );
}

ProfileDetails.propTypes = {
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  genres: PropTypes.string,
  productionCountries: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

export default ProfileDetails;
