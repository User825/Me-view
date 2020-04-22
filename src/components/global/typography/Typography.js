import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './typography.module.css';

const classNamesModule = classNames.bind(styles);

function Typography({
  tagName = 'p',
  children,
  size = 'sm',
  weight = 'regular',
  color = 'base',
  bottomIndent,
  className,
  ...props
}) {
  const typographyStyles = classNamesModule({
    typography: true,
    [`size_${size}`]: size,
    [`bottomIndent_${bottomIndent}`]: bottomIndent,
    [`color_${color}`]: color,
    [`weight_${weight}`]: weight,
    [className]: className,
  });

  return React.createElement(
    tagName,
    { ...props, className: typographyStyles },
    children
  );
}

Typography.propTypes = {
  tagName: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  weight: PropTypes.oneOf(['regular', 'bold']),
  color: PropTypes.oneOf(['base', 'light', 'contrast', 'accent']),
  bottomIndent: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Typography;
