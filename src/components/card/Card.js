import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './card.module.css';

const classNamesModule = classNames.bind(styles);
const heightCustomPropsName = '--card-height';

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
  onlyContainer = false,
  height,
  children,
}) {
  const cardRef = useRef();

  const cardStyles = classNamesModule({
    default: stylesType === 'default',
    light: stylesType === 'light',
    bigCard: size === 'big',
  });

  const containerStyles = classNamesModule({
    container: size !== 'small',
    smallContainer: size === 'small',
  });

  const titleStyles = classNamesModule({
    title: !fixedTitleHeight,
    fixedTitle: fixedTitleHeight,
  });

  const childrenBoxStyle = classNamesModule({
    childrenBox: onlyContainer,
  });

  const posterStyles = classNamesModule({
    poster: true,
    bigPoster: size === 'big',
  });

  useEffect(() => {
    if (height) {
      cardRef.current.style.setProperty(heightCustomPropsName, height);
    }
  }, [height]);

  return (
    <div ref={cardRef} className={cardStyles}>
      <div className={containerStyles}>
        {!onlyContainer && (
          <>
            <img
              className={posterStyles}
              src={
                imgSrc ? imgSrc : `${process.env.PUBLIC_URL}/img/no-image.jpg`
              }
              alt={`Poster for ${title} movie`}
              loading="lazy"
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
  title: PropTypes.string,
  desc: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  year: PropTypes.string,
  genres: PropTypes.string,
  styleType: PropTypes.oneOf(['light', 'default']),
  size: PropTypes.oneOf(['small', 'default', 'big']),
  fixedTitleHeight: PropTypes.bool,
  onlyContainer: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

export default Card;
