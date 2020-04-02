import React from "react";
import PropTypes from "prop-types";
import styles from "./page.module.css";

function PageFooter({ children }) {
  return <footer className={styles.page__footer}>{children}</footer>;
}

PageFooter.propTypes = {
  children: PropTypes.node
};

export default PageFooter;
