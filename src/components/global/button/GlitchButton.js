import React from 'react';
import PropTypes from 'prop-types';
import styles from './glitchButton.module.css';
import classNames from 'classnames/bind';

import Typography from 'components/global/typography';

const classNamesModule = classNames.bind(styles);

function GlitchButton({ text, size, styleType = 'primary', onClick }) {
  const buttonClassName = classNamesModule({
    [styleType]: styleType,
  });

  return (
    <button className={buttonClassName} onClick={onClick}>
      <Typography tagName="span" size={size} isGlitch color="inherit">
        {text}
      </Typography>
    </button>
  );
}

GlitchButton.propTypes = {
  styleType: PropTypes.oneOf(['primary', 'default', 'invert']),
};

export default GlitchButton;
