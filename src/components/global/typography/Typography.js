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
  align,
  bottomIndent,
  className,
  isGlitch = false,
  isUnderline = false,
  inlineChildren = false,
  isInteractiveOpacity,
  ...props
}) {
  const typographyStyles = classNamesModule({
    typography: true,
    [`size_${size}`]: size,
    [`bottomIndent_${bottomIndent}`]: bottomIndent,
    [`color_${color}`]: color,
    [`weight_${weight}`]: weight,
    [`glitch_${color}`]: isGlitch,
    [`align_${align}`]: align,
    underline: isUnderline,
    inlineChildren: inlineChildren,
    'interactive-opacity': isInteractiveOpacity,
    [className]: className,
  });

  if (isGlitch) {
    return React.createElement(
      tagName,
      { ...props, className: typographyStyles, text: children },
      children
    );
  }

  return React.createElement(
    tagName,
    { ...props, className: typographyStyles },
    children
  );
}

Typography.propTypes = {
  tagName: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xs']),
  weight: PropTypes.oneOf(['regular', 'bold']),
  align: PropTypes.oneOf(['center', 'left', 'right']),
  color: PropTypes.oneOf(['base', 'light', 'contrast', 'accent', 'changed-contrast', 'inherit']),
  bottomIndent: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  isGlitch: PropTypes.bool,
  isUnderline: PropTypes.bool,
  children: PropTypes.node,
};

export default Typography;
