import React from 'react';
import PropTypes from 'prop-types';
import styles from './movieSection.module.css';
import { getCountriesLocaleName } from 'utils/';
import { Section } from 'components/global/section/';
import { Row, Col } from 'components/global/layout';
import Button from 'components/global/button';
import ReactCountryFlag from 'react-country-flag';
import { Play } from 'components/icons'

function movieSection({
  title,
  posterSrc,
  rating,
  releaseDate,
  desc,
  homepage,
  genres,
  productionCountries,
  children,
  trailers,
  onTrailerClick
}) {
  const date = releaseDate.toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const Countries = () => {
    return (
      <>
        {productionCountries.map((countryCode) => {
          const name = getCountriesLocaleName(countryCode, 'ru');
          
          return (
            <span key={countryCode}>
              <ReactCountryFlag
                countryCode={countryCode}
                svg
                aria-label={name}
              />
              {name}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Col lg="3" className={styles.posterBox}>
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
      </Col>
      <Col lg="9" className={styles.contentBox}>
        <Row>
          <h1 className={styles.title}>{title}</h1>
        </Row>
        <Row lg={{ between: true, middle: true }}>
          <div className={styles.details}>
            <span>Дата выхода {date}</span>
          </div>
        </Row>
        <p className={styles.genres}>Жанр: {genres}</p>
        <p className={styles.countries}>
          <Countries />
        </p>
        <Row verticalGap="sm">
          {trailers.length > 0 && (
            <>
            {trailers.map(trailer => (
               <Col
               lg="3"
               key={trailer.key}
               className={styles.trailersList}
             >
               <button className={styles.trailerButton} aria-label={`Смотреть трейлер к фильму ${title}`}
                 onClick={(evt) => onTrailerClick(evt, trailer)}
               >
                 <Play size={45} />
                 <img
                   src={trailer.poster ? trailer.poster : `${process.env.PUBLIC_URL}/img/no-image.jpg`}
                   alt={`Изображение из трейлера к фильму ${title}`}
                 />
               </button>
             </Col>
            ))}
            </>
          )}
        </Row>
        <p className={styles.desc}>{desc}</p>
        {homepage && (
          <p>
            <a
              className={styles.link}
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Официальный сайт фильма
            </a>
          </p>
        )}
      </Col>
    </>
  );
}

movieSection.propTypes = {};

export default movieSection;
