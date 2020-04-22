import React from 'react';
import PropTypes from 'prop-types';

import styles from './cardSkeleton.module.css';

function CardSkeleton({ text }) {
  return (
    <div className={styles.card}>
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
}

CardSkeleton.propTypes = {
  text: PropTypes.string,
};

export default CardSkeleton;
