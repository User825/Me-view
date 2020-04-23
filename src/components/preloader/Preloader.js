import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './preloader.module.css';

const classNamesModule = classNames.bind(styles);
function Preloader({ text = 'Загрузка', isAbsolutePosition}) {
  const wrapperStyles = classNamesModule({
    wrapper: true,
    absolute: isAbsolutePosition
  });

  return (
    <div className={wrapperStyles}>
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
