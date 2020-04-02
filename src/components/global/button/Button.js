import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./button.module.css";

const classNamesModule = classNames.bind(styles);

function Button({
  text,
  iconComponent = null,
  iconRight = false,
  handler,
  disabled = false,
  width = "auto",
  type = "button",
  styleType = "default",
  isLink = false,
  linkPath = "#!"
}) {
  const iconStyles = classNamesModule({
    icon: "icon",
    iconRight: iconRight
  });

  return (
    <>
      {isLink ? (
        <a
          style={{ width: width }}
          className={styles[styleType]}
          href={linkPath}
          target="_blank"
          rel="noopener noreferrer"
        >
          {iconComponent && (
            <span className={iconStyles}>{iconComponent()}</span>
          )}
          <span>{text}</span>
        </a>
      ) : (
        <button
          style={{ width: width }}
          className={styles[styleType]}
          type={type}
          disabled={disabled}
          onClick={handler}
        >
          {iconComponent && (
            <span className={iconStyles}>{iconComponent()}</span>
          )}
          <span>{text}</span>
        </button>
      )}
    </>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  iconComponent: PropTypes.func,
  iconRight: PropTypes.bool,
  handler: PropTypes.func,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  styleType: PropTypes.oneOf(["primary", "default", "invert"]),
  isLink: PropTypes.bool,
  linkPath: PropTypes.string
};

export default Button;
