import React from 'react';
import PropTypes from 'prop-types';

import Typography, { TextLink } from 'components/global/typography';

function MovieDesc({ desc, homepage }) {
  return (
    <>
      <Typography bottomIndent="md">{desc}</Typography>
      {homepage && (
        <Typography>
          <TextLink href={homepage}>Официальный сайт фильма</TextLink>
        </Typography>
      )}
    </>
  );
}

MovieDesc.propTypes = {
  desc: PropTypes.string.isRequired,
  homepage: PropTypes.string,
};

export default MovieDesc;
