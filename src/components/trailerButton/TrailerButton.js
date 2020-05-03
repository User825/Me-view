import React from 'react';
import PropTypes from 'prop-types';

import { Play } from 'components/icons';

import styles from './trailerButton.module.css';

function TrailerButton({ movieTitle, poster, onClick, trailerID }) {
  return (
    <div className={styles.box}>
      <button
        className={styles.trailerButton}
        aria-label={`Смотреть трейлер к фильму ${movieTitle}`}
        onClick={(evt) => onClick(evt, trailerID)}
      >
        <Play size={45} />
        <img
          src={poster ? poster : `${process.env.PUBLIC_URL}/img/no-image.jpg`}
          alt={`Изображение из трейлера к фильму ${movieTitle}`}
        />
      </button>
    </div>
  );
}

TrailerButton.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  poster: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  trailerID: PropTypes.string.isRequired,
};

export default TrailerButton;
