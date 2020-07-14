import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'components/global/typography';
import TrailerButton from 'components/trailerButton';
import { Col, Row } from 'components/global/layout';

const HEAD_TRAILERS_QUANTITY = 2;
function TrailerList({
  trailersList,
  movieTitle,
  onTrailerClick,
  onMoreTrailerClick,
  allTrailers,
}) {
  const headTrailer = trailersList.slice(0, HEAD_TRAILERS_QUANTITY);
  const otherTrailers = trailersList.slice(HEAD_TRAILERS_QUANTITY);

  return (
    <Row fluid verticalGap="md">
      {allTrailers ? (
        <>
          {trailersList.map((trailer) => (
            <Col lg="4" md="6" key={trailer.id} verticalGap="sm">
              <TrailerButton
                movieTitle={movieTitle}
                onClick={onTrailerClick}
                poster={trailer.poster}
                trailerID={trailer.id}
              />
            </Col>
          ))}
        </>
      ) : (
        <>
          {headTrailer.map((trailer) => {
            return (
              <Col lg="6" key={trailer.id} verticalGap="sm">
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
            <button
              type="button"
              className="reset-button"
              onClick={onMoreTrailerClick}
            >
              <Typography
                size="sm"
                tagName="span"
                isInteractiveOpacity
                color="accent"
              >
                {`Смотреть все трейлеры (${trailersList.length}) →`}
              </Typography>
            </button>
          )}
        </>
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
  onMoreTrailerClick: PropTypes.func,
  allTrailers: PropTypes.bool,
};

export default TrailerList;
