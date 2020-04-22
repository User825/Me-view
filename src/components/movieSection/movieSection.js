import React from 'react';
import PropTypes from 'prop-types';

import styles from './movieSection.module.css';

import { Row } from 'components/global/layout';
import Countries from './_Countries';
import Trailers from './_Trailers';
import Typography from 'components/global/typography';

function movieSection({
  title,
  posterSrc,
  rating,
  releaseDate,
  desc,
  homepage,
  genres,
  productionCountries,
  trailers,
  onTrailerClick,
}) {
  const date = releaseDate.toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className={styles.container}>
      <div className={styles.posterBox}>
        <div className={styles.poster}>
          <div className={styles.rating}>
            <span>{rating}</span>
          </div>
          <img
            src={
              posterSrc
                ? posterSrc
                : `${process.env.PUBLIC_URL}/img/no-image.jpg`
            }
            alt={`Poster for ${title}`}
          />
        </div>
      </div>
      <div className={styles.titleBox}>
        <Typography tagName="h1" weight="bold" size="lg" bottomIndent="lg">
          {title}
        </Typography>
      </div>
      <div className={styles.details}>
        <Typography size="sm" bottomIndent="sm">
          Дата выхода {date}
        </Typography>
        <Typography size="sm" bottomIndent="sm" className={styles.genres}>
          Жанр: {genres}
        </Typography>
        <Typography size="sm" bottomIndent="sm" className={styles.countries}>
          {productionCountries && (
            <Countries countriesCodes={productionCountries} />
          )}          
        </Typography>
      </div>
      {trailers.length > 0 && (
        <Row className={styles.trailersBox} verticalGap="md">
          <Trailers
            trailersList={trailers}
            movieTitle={title}
            onTrailerClick={onTrailerClick}
          />
        </Row>
      )}
      <div className={styles.descBox}>
        <Typography bottomIndent="md" className={styles.desc}>
          {desc}
        </Typography>
        {homepage && (
          <Typography>
            <a
              className={styles.link}
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Официальный сайт фильма
            </a>
          </Typography>
        )}
      </div>
    </section>
  );
}

movieSection.propTypes = {
  title: PropTypes.string.isRequired,
  posterSrc: PropTypes.string,
  rating: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  releaseDate: PropTypes.instanceOf(Date),
  desc: PropTypes.string,
  homepage: PropTypes.string,
  genres: PropTypes.string,
  productionCountries: PropTypes.arrayOf(PropTypes.string),
  trailers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      site: PropTypes.oneOf(['YouTube', 'Vimeo']),
      poster: PropTypes.string,
    })
  ),
  onTrailerClick: PropTypes.func,
};

export default movieSection;
