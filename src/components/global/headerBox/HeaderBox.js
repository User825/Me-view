import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./headerBox.module.css";
import paths from 'config/routerPaths';

import Logo from "./Logo";

const mainPath = paths.MAIN;
function HeaderBox({ children }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logoBox}>
          <Link to={mainPath}>
            <Logo />
          </Link>
        </div>
        <div className={styles.actionsBox}>{children}</div>
      </div>
    </header>
  );
}

HeaderBox.propTypes = {
  children: PropTypes.node,
  LinkComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

export default HeaderBox;
