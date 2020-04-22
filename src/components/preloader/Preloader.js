import React from 'react';
import PropTypes from 'prop-types';

import styles from './preloader.module.css';

function Preloader({ text = 'Идёт загрузка' }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.triangleWrap}>
        <div className={styles.triangleMain}></div>
        <div className={styles.triangleRed}></div>
        <div className={styles.triangleBlue}></div>
        <div className={styles.triangleText}>{text}</div>
      </div>
    </div>
  );
}

Preloader.propTypes = {
  text: PropTypes.string,
};

export default Preloader;
