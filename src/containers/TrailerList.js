import React from 'react';
import PropTypes from 'prop-types';

import Accordion from 'components/accordion/';
import TrailerButton from 'components/trailerButton';
import { Col, Row } from 'components/global/layout';

function TrailerList({ trailersList, movieTitle, onTrailerClick }) {
  const headTrailer = trailersList.slice(0, 3);
  const otherTrailers = trailersList.slice(3);

  return (
    <Row fluid verticalGap="md">
      {headTrailer.map((trailer) => {
        return (
          <Col lg="4" key={trailer.id}>
            <TrailerButton
              movieTitle={movieTitle}
              onClick={onTrailerClick}
              poster={trailer.poster}
              trailerID={trailer.id}
            />
          </Col>
        );
      })}
      {otherTrailers.length > 0 && (
        <Accordion buttonText="Ещё трейлеры">
          <Row fluid>
            {otherTrailers.map((trailer) => (
              <Col lg="3" md="4" key={trailer.id}>
                <TrailerButton
                  movieTitle={movieTitle}
                  onClick={onTrailerClick}
                  poster={trailer.poster}
                  trailerID={trailer.id}
                />
              </Col>
            ))}
          </Row>
        </Accordion>
      )}
    </Row>
  );
}

TrailerList.propTypes = {
  trailersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      poster: PropTypes.string,
    })
  ).isRequired,
  movieTitle: PropTypes.string.isRequired,
  onTrailerClick: PropTypes.func.isRequired,
};

export default TrailerList;
