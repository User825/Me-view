import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./index.module.css";

const classNamesModule = classNames.bind(styles);

function Wrapper({ children, className, gap, verticalGap, }) {
  const wrapperStyles = classNamesModule({
    wrapper: "wrapper",
    [`gap_${gap}`]: gap,
    [`verticalGap_${verticalGap}`]: verticalGap,
    [className]: className
  });

  return <div className={wrapperStyles}>{children}</div>;
}

Wrapper.propTypes = {
  className: PropTypes.string, 
  gap: PropTypes.oneOf(['sm', 'lg', 'md', 'xl']),
  verticalGap: PropTypes.oneOf(['sm', 'lg', 'md']),
  children: PropTypes.node,
};

export default Wrapper;