import React from 'react';
import PropTypes from 'prop-types';

import styles from './cardAnnounce.module.css';

const CardAnnounce = ({
  title,
  desc,
  imgSrc,
  date,
  rating,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.poster}>
        <img
          className={styles.poster}
          src={
            imgSrc
              ? imgSrc
              : `${process.env.PUBLIC_URL}/img/no-image.jpg`
          }
          alt={`Постер к фильму ${title}`}
        />
      </div>
      <div className={styles.detailsBox}>
        <div className={styles.date}>
          <span>С {date}</span>
        </div>
        {rating && (
          <div className={styles.rating}>
            <span>{rating}</span>
          </div>
        )}
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
  imgSrc: PropTypes.string,
  date: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CardAnnounce;
