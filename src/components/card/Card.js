import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './card.module.css';

const classNamesModule = classNames.bind(styles);

function Card({
  imgSrc,
  title,
  desc,
  rating,
  year,
  genres,
  stylesType = 'default',
  size = 'default',
  fixedTitleHeight = false,
  children,
  onlyContainer = false,
}) {
  const cardStyles = classNamesModule({
    default: stylesType === 'default',
    light: stylesType === 'light',
  });

  const containerStyles = classNamesModule({
    container: size === 'default',
    smallContainer: size === 'small',
  });

  const titleStyles = classNamesModule({
    title: !fixedTitleHeight,
    fixedTitle: fixedTitleHeight,
  });

  const childrenBoxStyle = classNamesModule({
    childrenBox: onlyContainer,
  });

  return (
    <div className={cardStyles}>
      <div className={containerStyles}>
        {!onlyContainer && (
          <>
            <img
              className={styles.poster}
              src={
                imgSrc ? imgSrc : `${process.env.PUBLIC_URL}/img/no-image.jpg`
              }
              alt={`Poster for ${title} movie`}
            />
            <div className={styles.contentBox}>
              <h3 className={titleStyles}>{title}</h3>
              <b className={styles.subtitle}>
                {year && <span>{year}</span>}
                {year && genres && <span>, </span>}
                {genres && <span>{genres}</span>}
              </b>
              {desc && <p className={styles.desc}>{desc}</p>}
            </div>
          </>
        )}
        {children && <div className={childrenBoxStyle}>{children}</div>}
      </div>
      {rating && (
        <div className={styles.ratingBox}>
          <span>{rating}</span>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  year: PropTypes.string,
  genre: PropTypes.string,
};

export default Card;
