import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'components/global/layout';
import { Play } from 'components/icons';

import styles from './_trailers.module.css';

function Trailers({ trailersList, movieTitle, onTrailerClick }) {
  return (
    <>
      {trailersList.map((trailer) => (
        <Col lg="3" md="4" key={trailer.id} className={styles.trailersList}>
          <button
            className={styles.trailerButton}
            aria-label={`Смотреть трейлер к фильму ${movieTitle}`}
            onClick={(evt) => onTrailerClick(evt, trailer)}
          >
            <Play size={45} />
            <img
              src={
                trailer.poster
                  ? trailer.poster
                  : `${process.env.PUBLIC_URL}/img/no-image.jpg`
              }
              alt={`Изображение из трейлера к фильму ${movieTitle}`}
            />
          </button>
        </Col>
      ))}
    </>
  );
}

Trailers.propTypes = {
  trailersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      site: PropTypes.oneOf(['YouTube', 'Vimeo']),
      poster: PropTypes.string,
    })
  ).isRequired,
  movieTitle: PropTypes.string.isRequired,
  onTrailerClick: PropTypes.func.isRequired,
};

export default Trailers;
