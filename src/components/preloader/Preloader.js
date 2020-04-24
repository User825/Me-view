import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Typography from 'components/global/typography';

import styles from './preloader.module.css';

const classNamesModule = classNames.bind(styles);
function Preloader({ text = 'Загрузка', isAbsolutePosition }) {
  const wrapperStyles = classNamesModule({
    wrapper: true,
    absolute: isAbsolutePosition,
  });

  return (
    <div className={wrapperStyles}>
      <div className={styles.text}>
        <Typography
          tagName="span"
          weight="bold"
          size="lg"
          isGlitch
          color="contrast"
        >
          {text}
        </Typography>
      </div>
    </div>
  );
}

Preloader.propTypes = {
  text: PropTypes.string,
};

export default Preloader;
