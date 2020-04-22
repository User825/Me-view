import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./index.module.css";

const classNamesModule = classNames.bind(styles);

function Container({ tagName = "div", fluid, className, children, gap, verticalGap, ...props }) {
  const rowStyles = classNamesModule({
    container: "container",
    [`gap_${gap}`]: gap,
    [`verticalGap_${verticalGap}`]: verticalGap,
    containerFluid: fluid,
    [className]: className
  });

  return React.createElement(
    tagName,
    { ...props, className: rowStyles },
    children
  );
}

Container.propTypes = {
  tagname: PropTypes.string,
  fluid: PropTypes.bool,
  className: PropTypes.string, 
  children: PropTypes.node,
  gap: PropTypes.oneOf(['sm', 'lg', 'md']), 
  verticalGap: PropTypes.oneOf(['sm', 'lg', 'md']),
};

export default Container;
