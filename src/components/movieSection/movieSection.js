import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'components/global/typography';

import styles from './movieSection.module.css';

function movieSection({
  title,
  posterSrc,
  rating,
  DescContent,
  DetailsContent,
  TrailersContent,
}) {
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
        <Typography tagName="h2" weight="bold" size="lg" bottomIndent="lg">
          {title}
        </Typography>
      </div>
      <div className={styles.details}>
        <DetailsContent />
      </div>
      {TrailersContent && <TrailersContent />}
      <div className={styles.descBox}>
        <DescContent />
      </div>
    </section>
  );
}

movieSection.propTypes = {
  title: PropTypes.string.isRequired,
  posterSrc: PropTypes.string,
  rating: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  DescContent: PropTypes.func,
  DetailsContent: PropTypes.func,
  TrailersContent: PropTypes.func,
};

export default movieSection;
