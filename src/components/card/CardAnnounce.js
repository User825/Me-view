import React from 'react';
import PropTypes from 'prop-types';

import styles from './cardAnnounce.module.css';

const CardAnnounce = ({
  title,
  desc,
  urlSrcMobile,
  urlSrcDesktop,
  date,
  rating,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.poster}>
        <picture>
          {
            // * Not @2x small images from API
            /* <source srcSet={urlSrcMobile} media="(max-width: 768px)" /> */
          }
          <img
            className={styles.poster}
            src={urlSrcDesktop ? urlSrcDesktop : `${process.env.PUBLIC_URL}/img/no-image.jpg`}
            alt={`Постер к фильму ${title}`}
          />
        </picture>
      </div>
      <div className={styles.detailsBox}>
        <div className={styles.date}>
          <span>С {date}</span>
        </div>
        <div className={styles.rating}>
          <span>{rating}</span>
        </div>
      </div>

      <div className={styles.contentBox}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{desc}</p>
      </div>
    </div>
  );
};

CardAnnounce.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  urlSrcMobile: PropTypes.string,
  urlSrcDesktop: PropTypes.string,
  date: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CardAnnounce;
