import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './index.module.css';

const classNamesModule = classNames.bind(styles);

function Col({
  tagName = 'div',
  auto,
  gap,
  verticalGap,
  lg,
  lm,
  md,
  sm,
  lgOffset,
  MdOffset,
  SmOffset,
  className,
  children,
  center,
  ...props
}) {
  const colStyles = classNamesModule({
    col: auto,
    [`gap_${gap}`]: gap,
    [`verticalGap_${verticalGap}`]: verticalGap,
    [`colLg${lg}`]: lg,
    [`colLm${lm}`]: lm,
    [`colMd${md}`]: md,
    [`colSm${sm}`]: sm,
    [`colLgOffset${lgOffset}`]: lgOffset,
    [`colLgOffset${MdOffset}`]: MdOffset,
    [`colLgOffset${SmOffset}`]: SmOffset,
    colCenter: center,
    [className]: className,
  });

  return React.createElement(
    tagName,
    { ...props, className: colStyles },
    children
  );
}

Col.propTypes = {
  tagName: PropTypes.string,
  auto: PropTypes.bool,
  gap: PropTypes.oneOf(['xs', 'sm', 'lg', 'md']),
  verticalGap: PropTypes.oneOf(['xs', 'sm', 'lg', 'md']),
  lg: PropTypes.oneOf([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]),
  md: PropTypes.oneOf([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]),
  sm: PropTypes.oneOf([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]),
  lgOffset: PropTypes.oneOf([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]),
  MdOffset: PropTypes.oneOf([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]),
  SmOffset: PropTypes.oneOf([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ]),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Col;
