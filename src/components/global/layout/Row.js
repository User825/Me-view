import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './index.module.css';

const classNamesModule = classNames.bind(styles);

function Row({
  tagName = 'div',
  lg = {},
  md = {},
  sm = {},
  fluid,
  reverse,
  className,
  children,
  gap,
  verticalGap,
  ...props
}) {
  const rowStyles = classNamesModule({
    row: 'row',
    [`gap_${gap}`]: gap,
    [`verticalGap_${verticalGap}`]: verticalGap,
    rowFluid: fluid,
    rowReverse: reverse,
    rowStartLg: lg.start,
    rowCenterLg: lg.center,
    rowEndLg: lg.end,
    rowTopLg: lg.top,
    rowMiddleLg: lg.middle,
    rowBottomLg: lg.bottom,
    rowAroundLg: lg.around,
    rowBetweenLg: lg.between,
    rowStartMd: md.start,
    rowCenterMd: md.center,
    rowEndMd: md.end,
    rowTopMd: md.top,
    rowMiddleMd: md.middle,
    rowBottomMd: md.bottom,
    rowAroundMd: md.around,
    rowBetweenMd: md.between,
    rowStartSm: sm.start,
    rowCenterSm: sm.center,
    rowEndSm: sm.end,
    rowTopSm: sm.top,
    rowMiddleSm: sm.middle,
    rowBottomSm: sm.bottom,
    rowAroundSm: sm.around,
    rowBetweenSm: sm.between,
    [className]: className,
  });

  return React.createElement(
    tagName,
    { ...props, className: rowStyles },
    children
  );
}

Row.propTypes = {
  tagName: PropTypes.string,
  lg: PropTypes.shape({
    start: PropTypes.bool,
    center: PropTypes.bool,
    end: PropTypes.bool,
    top: PropTypes.bool,
    middle: PropTypes.bool,
    bottom: PropTypes.bool,
    around: PropTypes.bool,
    between: PropTypes.bool,
  }),
  md: PropTypes.shape({
    start: PropTypes.bool,
    center: PropTypes.bool,
    end: PropTypes.bool,
    top: PropTypes.bool,
    middle: PropTypes.bool,
    bottom: PropTypes.bool,
    around: PropTypes.bool,
    between: PropTypes.bool,
  }),
  sm: PropTypes.shape({
    start: PropTypes.bool,
    center: PropTypes.bool,
    end: PropTypes.bool,
    top: PropTypes.bool,
    middle: PropTypes.bool,
    bottom: PropTypes.bool,
    around: PropTypes.bool,
    between: PropTypes.bool,
  }),
  fluid: PropTypes.bool,
  reverse: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  gap: PropTypes.oneOf(['sm', 'lg', 'md']),
  verticalGap: PropTypes.oneOf(['sm', 'lg', 'md']),
};

export default Row;
