import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './profileSection.module.css';

function ProfileSection({ title, posterSrc, rating, children }) {
  useEffect(() => {
    if (posterSrc) {
      document.documentElement.style.setProperty(
        '--poster-image',
        `url('${posterSrc}')`
      );
    }
  }, [posterSrc]);

  return (
    <div className={styles.container}>
      <div className={styles.posterBox}>
        <div className={styles.poster}>
          {rating && (
            <div className={styles.rating}>
              <span>{rating}</span>
            </div>
          )}
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
      <div className={styles.contentBox}>{children}</div>
    </div>
  );
}

ProfileSection.propTypes = {
  title: PropTypes.string.isRequired,
  posterSrc: PropTypes.string,
  rating: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
};


export default ProfileSection;
